import { lodash, CatchableError, spinner, downloadRequest, getRootHome, fse } from '@serverless-devs/core';
import Table from 'tty-table';
import path from 'path';
import Client from './client';
import { zipCodeFile } from './make-code';
import { IProps } from '../common/entity';
import logger from '../common/logger';
import inquirer from 'inquirer';
import { putOss } from './oss';

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
    let codeConfig: any = {};

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
        const { size, content, zipFilePath } = await zipCodeFile(code);
        if (size < 52428800) {
          logger.debug(`upload base64: ${size}`);
          codeConfig.zipFile = content;
        } else {
          const { data: { CodeSizeLimit } } = await Client.fcClient.getAccountConfigs({ config: ['CodeSizeLimit'] });
          if (size > CodeSizeLimit) {
            throw new Error(`the size of file ${size} could not greater than ${CodeSizeLimit}`);
          }
          codeVm.text = 'push to oss...';
          codeConfig = await putOss(Client.fcClient, zipFilePath);
          logger.debug(`upload oss: ${JSON.stringify(codeConfig)}`);
        }

        if (!code.endsWith('.zip')) {
          codeVm.text = `remove file: ${zipFilePath}`;
          fse.removeSync(zipFilePath);
        }
        codeVm.stop();
      } catch (ex) {
        codeVm.fail();
        throw ex;
      }
    }

    const createVm = spinner('publish layer...');
    try {
      const { data } = await Client.fcClient.publishLayerVersion(layerName, {
        code: codeConfig,
        description,
        compatibleRuntime,
      });
      logger.debug(`arn: ${data?.arn}`);
      createVm.stop();

      return data?.arn;
    } catch (ex) {
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

  async getVersion({ version, layerName }) {
    return (await Client.fcClient.getLayerVersion(layerName, version))?.data;
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
