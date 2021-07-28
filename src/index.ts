import * as core from '@serverless-devs/core';
import BaseComponent from './common/base';
import logger from './common/logger';
import { InputProps, IProps } from './common/entity';
import * as help_constant from './lib/help';
import StdoutFormatter from './common/stdout-formatter';
import Layer from './lib/layer';
import Client from './lib/client';

export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props)
  }

  public async publish(inputs: InputProps) {
    const {
      help,
      props,
    } = await this.handlerInputs(inputs, 'publish');

    if (help) {
      core.help(help_constant.PUBLISH);
      return;
    }
    await StdoutFormatter.initStdout();

    const layer = new Layer();
    const arn = await layer.publish(props);
    super.__report({
      name: 'fc-layer',
      content: { arn, region: props.region }
    });

    return arn;
  }

  public async list(inputs: InputProps) {
    const {
      help,
      props,
      table,
    } = await this.handlerInputs(inputs, 'list');

    if (help) {
      core.help(help_constant.LIST);
      return;
    }

    const layer = new Layer();
    return await layer.list({ prefix: props.prefix }, table);
  }

  public async versions(inputs: InputProps) {
    const {
      help,
      props,
      table,
    } = await this.handlerInputs(inputs, 'versions');

    if (help) {
      core.help(help_constant.VERSIONS);
      return;
    }
    await StdoutFormatter.initStdout();

    const layer = new Layer();
    return await layer.versions({ layerName: props.layerName }, table);
  }

  public async versionConfig(inputs: InputProps) {
    const {
      help,
      props,
    } = await this.handlerInputs(inputs, 'versionConfig');

    if (help) {
      core.help(help_constant.VERSION_CONFIG);
      return;
    }
    await StdoutFormatter.initStdout();

    const layer = new Layer();
    return await layer.getVersion({ version: props.version, layerName: props.layerName });
  }

  public async deleteVersion(inputs: InputProps) {
    const {
      help,
      props,
    } = await this.handlerInputs(inputs, 'deleteVersion');

    if (help) {
      core.help(help_constant.DELETE_VERSION);
      return;
    }
    await StdoutFormatter.initStdout();

    const layer = new Layer();
    return await layer.deleteVersion({ version: props.version, layerName: props.layerName });
  }

  public async deleteLayer(inputs: InputProps) {
    const {
      help,
      props,
    } = await this.handlerInputs(inputs, 'deleteLayer');

    if (help) {
      core.help(help_constant.DELETE_LAYER);
      return;
    }
    await StdoutFormatter.initStdout();

    const layer = new Layer();
    await layer.deleteLayer({ layerName: props.layerName, assumeYes: props.assumeYes });
    super.__report({
      name: 'fc-layer',
      content: { arn: '', region: props.region }
    });
  }

  private async handlerInputs(inputs: InputProps, command: string) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help', 'table', 'y'],
      string: ['region', 'layer-name', 'code', 'description', 'compatible-runtime', 'prefix'],
      number: ['version-id'],
      alias: { help: 'h', 'assume-yes': 'y', }
    });

    const parsedData = parsedArgs?.data || {};
    if (parsedData.help) {
      core.reportComponent('fc-layer', { command, uid: inputs.credentials?.AccountID || '' });
      return { help: true };
    }

    const props = inputs.props || {};
    const region = parsedData.region || props.region;
    if (!region) {
      throw new Error(`Not fount region`);
    }
    const layerName = parsedData['layer-name'] || props.layerName;
    if (!layerName && command !== 'list') {
      throw new Error(`Not fount layerName`);
    }
    let compatibleRuntime = props.compatibleRuntime;
    if (parsedData['compatible-runtime']) {
      compatibleRuntime = parsedData['compatible-runtime'].split(',');
    }

    const version = parsedData['version-id'] || props.version || props.versionId;
    if (!version && command === 'versionConfig') {
      throw new Error(`Not fount version`);
    }

    const endProps: IProps = {
      region,
      layerName,
      compatibleRuntime,
      description: parsedData.description || props.description,
      code: parsedData.code || props.code,
      prefix: parsedData.prefix || props.prefix,
      assumeYes: parsedData.y,
      version,
    }

    const credentials = inputs.credentials || await core.getCredential(inputs.project.access);
    core.reportComponent('fc-layer', { command, uid: credentials.AccountID });

    await Client.setFcClient(region, credentials);

    return {
      parsedArgs,
      credentials,
      props: endProps,
      table: parsedData.table,
    }
  }
}
