import { lodash, CatchableError, spinner, downloadRequest, getRootHome, fse } from '@serverless-devs/core';
import Table from 'tty-table';
import path from 'path';
import Client from './client';
import { zipCodeFile } from './make-code';
import { IProps } from '../common/entity';
import logger from '../common/logger';
import inquirer from 'inquirer';

async function promptForConfirmOrDetails(message: string): Promise<boolean> {
  const answers: any = await inquirer.prompt([{
    type: 'list',
    name: 'prompt',
    message,
    choices: ['yes', 'no'],
  }]);

  return answers.prompt === 'yes';
}

const COMPATIBLE_RUNTIME = [
  'custom',
  'nodejs14',
  'nodejs12',
  'nodejs10',
  'nodejs8',
  'nodejs6',
  'python3',
  'python2.7',
  'python3.9',
  'go1',
];

const tableShow = (data) => {
  const options = {
    borderStyle: 'solid',
    borderColor: 'blue',
    headerAlign: 'center',
    align: 'left',
    color: 'cyan',
    width: '100%',
  };

  const showKey = ['layerName', 'description', 'version', 'compatibleRuntime', 'arn'];
  const header = showKey.map((value) => ({
    value,
    headerColor: 'cyan',
    color: 'cyan',
    align: 'left',
    width: 'auto',
    formatter: (v) => v,
  }));

  console.log(Table(header, data, options).render());
};

export default class Layer {
  async publish(props: IProps) {
    const {
      layerName,
      code = '.',
      description = '',
      ossBucket,
      ossKey,
      compatibleRuntime = COMPATIBLE_RUNTIME,
    } = props;
    const codeConfig: any = {};
    let publishLayerFunctionName = 'publishLayerVersion';
    let removeZip;
    let codeChecksum;

    if (ossBucket || ossKey) {
      if (lodash.isNil(ossBucket) || lodash.isNil(ossKey)) {
        throw new CatchableError(`Through the OSS publishing layer, both ossBucket and ossKey must be passed. ossBucket incoming ${ossBucket}, OSSKey incoming ${ossKey}`);
      }
      codeConfig.ossBucketName = ossBucket;
      codeConfig.ossObjectName = ossKey;
      logger.debug(`upload oss: ${JSON.stringify(codeConfig)}`);
    } else {
      const codeVm = spinner('zip code...');
      try {
        const layerZipPayload = await zipCodeFile(code);
        const { size, content, zipFilePath } = layerZipPayload;
        removeZip = layerZipPayload.removeZip;
        codeChecksum = layerZipPayload.codeChecksum;
        if (size < 52428800) {
          logger.debug(`upload base64: ${size}`);
          codeConfig.zipFile = content;
        } else {
          codeConfig.size = size;
          codeConfig.zipFilePath = zipFilePath;
          publishLayerFunctionName = 'publishLayerVersionForBigCode';
        }
        codeVm.stop();
      } catch (ex) {
        codeVm.fail();
        removeZip?.();
        throw ex;
      }
    }

    // 如果 codeChecksum 存在，则和线上进行对比，如果一致则不再上传
    // https://github.com/devsapp/fc/issues/807
    if (codeChecksum) {
      try {
        const versionConfig = await this.getVersion({ version: 'latest', layerName });
        logger.debug(`local codeChecksum: ${codeChecksum}\nremote codeChecksum: ${versionConfig.codeChecksum}`);
        if (versionConfig.codeChecksum === codeChecksum && lodash.isEqualWith(compatibleRuntime, versionConfig.compatibleRuntime)) {
          const { arn } = versionConfig;
          logger.info('It is detected that the latest online version of codechecksum is consistent with the local version, skipping this deployment');
          return arn;
        }
      } catch (ex) {
        // 不影响主进程
        logger.debug(`Failed to compare Codes: ${ex.toString()}`);
      }
    }

    const createVm = spinner('publish layer...');
    try {
      const { data } = await Client.fcClient[publishLayerFunctionName](layerName, {
        code: codeConfig,
        codeConfig,
        description,
        compatibleRuntime,
      });
      logger.debug(`arn: ${data?.arn}`);
      createVm.stop();
      removeZip?.();

      return data?.arn;
    } catch (ex) {
      removeZip?.();
      createVm.fail();
      throw ex;
    }
  }

  async list({ prefix }, table) {
    logger.info('Getting layer list');
    const list = await Client.fcClient.get_all_list_data('/layers', 'layers', { prefix });
    logger.debug(`layer list: ${JSON.stringify(list)}`);

    if (table) {
      tableShow(list);
    } else {
      return list.map(({
        layerName,
        description,
        version,
        compatibleRuntime,
        arn,
      }) => ({ layerName, arn, version, description, compatibleRuntime }));
    }
  }

  async versions({ layerName }, table) {
    const versions = await Client.fcClient.get_all_list_data(`/layers/${layerName}/versions`, 'layers');

    if (table) {
      tableShow(versions);
    } else {
      return versions.map(({
        layerName: ln,
        description,
        version,
        compatibleRuntime,
        arn,
      }) => ({ layerName: ln, arn, version, description, compatibleRuntime }));
    }
  }

  async getVersion({ simple, version, layerName }: { layerName: string; version: any; simple?: boolean }) {
    if (version === undefined || version === 'latest') {
      const versionsConfig = await this.versions({ layerName }, false);
      if (!versionsConfig.length) {
        throw new CatchableError(`Not fount ${layerName} for latest version`, 'The latest version may not exist, please try using Publish upload');
      }
      version = lodash.get(versionsConfig, `[${versionsConfig.length - 1}].version`);
    }

    const layerConfig = (await Client.fcClient.getLayerVersion(layerName, version))?.data;
    if (simple) {
      return { arn: layerConfig.arn };
    }
    return layerConfig;
  }

  async deleteVersion({ version, layerName }) {
    if (!version) {
      throw new Error('Not fount version');
    }
    const { data } = await Client.fcClient.deleteLayerVersion(layerName, version);
    if (data) {
      logger.error(data);
    }
  }

  async deleteLayer({ layerName, assumeYes }) {
    const versions = await this.versions({ layerName }, false);
    if (assumeYes) {
      await this.forDeleteVersion(layerName, versions);
    } else {
      const meg = `Whether to delete all versions of ${layerName}`;
      tableShow(versions);
      if (await promptForConfirmOrDetails(meg)) {
        return await this.forDeleteVersion(layerName, versions);
      }
    }
  }

  async download({ version, layerName, region }) {
    if (lodash.isNil(version) || lodash.isNil(layerName)) {
      throw new CatchableError('Down load layer version and layerName is must');
    }

    const localDir = path.join(getRootHome(), 'cache', 'layers', `${Client.fcClient.accountid}-${region}-${layerName}`);
    const filename = `${version}.zip`;
    const localPath = path.join(localDir, filename);
    if (await fse.exists(localPath)) {
      logger.debug('The code already exists locally, skip the download');
      return localPath;
    }

    const { code } = await this.getVersion({ version, layerName });
    const codeUrl = code.location.replace('-internal.aliyuncs.com', '.aliyuncs.com');
    await downloadRequest(codeUrl, localDir, { filename });
    return localPath;
  }
  // s layer publish --layer-name test --ossBucket cn-shenzhen-images --ossKey fc-api-js.zip
  private async forDeleteVersion(layerName, versions) {
    for (const { version } of versions) {
      await this.deleteVersion({ version, layerName });
    }
  }
}
