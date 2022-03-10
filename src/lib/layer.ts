import { zip, lodash, CatchableError, downloadRequest, getRootHome, fse } from '@serverless-devs/core';
import Table from 'tty-table';
import path from 'path';
import Client from './client';
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
  'nodejs12',
  'nodejs10',
  'nodejs8',
  'nodejs6',
  'python3',
  'python2.7',
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
      compatibleRuntime = COMPATIBLE_RUNTIME,
    } = props;
    const codeResolvePath = path.resolve(code);

    const zipPath = path.join(process.cwd(), '.s', 'layer');
    const outputFileName = `catch-${new Date().getTime()}.zip`;
    const zipFilePath = path.join(zipPath, outputFileName);

    try {
      fse.emptyDir(zipPath);
    } catch (ex) {
      logger.debug(ex);
    }

    await zip({
      codeUri: codeResolvePath,
      outputFilePath: zipPath,
      outputFileName,
    });
    const zipFile = fse.readFileSync(zipFilePath, 'base64');
    fse.removeSync(zipFilePath);

    const { data } = await Client.fcClient.publishLayerVersion(layerName, {
      code: { zipFile },
      description,
      compatibleRuntime,
    });
    logger.debug(`arn: ${data?.arn}`);

    return data?.arn;
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

  private async forDeleteVersion(layerName, versions) {
    for (const { version } of versions) {
      await this.deleteVersion({ version, layerName });
    }
  }
}
