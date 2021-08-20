import { zip } from '@serverless-devs/core';
import fse from 'fs-extra';
import Table from 'tty-table';
import path from 'path';
import Client from './client';
import { IProps } from '../common/entity';
import StdoutFormatter from '../common/stdout-formatter';
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
    borderStyle: "solid",
    borderColor: "blue",
    headerAlign: "center",
    align: "left",
    color: "cyan",
    width: "100%"
  };

  const showKey = ['layerName', 'description', 'version', 'compatibleRuntime', 'Arn'];
  const header = showKey.map(value => ({
    value,
    headerColor: "cyan",
    color: "cyan",
    align: "left",
    width: "auto",
    formatter: value => value,
  }));

  console.log(Table(header, data, options).render());
}

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
    } catch(ex) {
      logger.debug(ex);
    }

    await zip({
      codeUri: codeResolvePath,
      outputFilePath: zipPath,
      outputFileName,
    });
    const zipFile = fse.readFileSync(zipFilePath, 'base64');
    fse.removeSync(zipFilePath);

    logger.info(StdoutFormatter.stdoutFormatter.create('layer', layerName));
    const { arn, Arn } = await Client.fcClient.publishLayerVersion(layerName, {
      code: { zipFile },
      description,
      compatibleRuntime,
    });
    logger.debug(`Arn: ${arn || Arn}`);
    
    return arn || Arn;
  }

  async list({ prefix }, table) {
    logger.info('Getting layer list');
    const list = await Client.fcClient.listLayers({ prefix });
    logger.debug(`layer list: ${JSON.stringify(list)}`);

    if (table) {
      tableShow(list)
    } else {
      return list.map(({ layerName, description, version, compatibleRuntime, Arn }) => ({ layerName, Arn, version, description, compatibleRuntime }));
    }
  }

  async versions({ layerName }, table) {
    logger.info(StdoutFormatter.stdoutFormatter.get('layer versions', layerName));
    const versions = await Client.fcClient.listLayerVersions(layerName);

    if (table) {
      tableShow(versions);
    } else {
      return versions.map(({ layerName, description, version, compatibleRuntime, Arn }) => ({ layerName, Arn, version, description, compatibleRuntime }));
    }
  }

  async getVersion({ version, layerName }) {
    logger.info(StdoutFormatter.stdoutFormatter.get('layer version config', `${layerName}.${version}`));
    return await Client.fcClient.getLayerVersion(layerName, version);
  }

  async deleteVersion({ version, layerName }) {
    if (!version) {
      throw new Error('Not fount version');
    }
    logger.info(StdoutFormatter.stdoutFormatter.remove('layer version', `${layerName}.${version}`));
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

  private async forDeleteVersion(layerName, versions) {
    for (const { version } of versions) {
      await this.deleteVersion({ version, layerName });
    }
  }
}