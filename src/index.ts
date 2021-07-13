import * as core from '@serverless-devs/core';
import BaseComponent from './common/base';
import logger from './common/logger';
import { InputProps, IProps } from './common/entity';
import * as help_constant from './lib/help';
import StdoutFormatter from './common/stdout-formatter';
import Layer from './lib/layer';

export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props)
  }

  public async publish(inputs: InputProps) {
    const {
      credentials,
      help,
      props,
    } = await this.handlerInputs(inputs, 'publish');

    if (help) {
      core.help(help_constant.PUBLISH);
      return;
    }
    await StdoutFormatter.initStdout();

    const layer = new Layer({ region: props.region, credentials });

    return await layer.publish(props);
  }

  public async list(inputs: InputProps) {
    const {
      credentials,
      help,
      props,
      table,
    } = await this.handlerInputs(inputs, 'list');

    if (help) {
      core.help(help_constant.LIST);
      return;
    }

    const layer = new Layer({ region: props.region, credentials });
    return await layer.list({ prefix: props.prefix }, table);
  }

  public async versions(inputs: InputProps) {
    const {
      credentials,
      help,
      props,
      table,
    } = await this.handlerInputs(inputs, 'versions');

    if (help) {
      core.help(help_constant.VERSIONS);
      return;
    }
    await StdoutFormatter.initStdout();

    const layer = new Layer({ region: props.region, credentials });
    return await layer.versions({ layerName: props.layerName }, table);
  }

  public async versionConfig(inputs: InputProps) {
    const {
      credentials,
      help,
      props,
    } = await this.handlerInputs(inputs, 'versionConfig');

    if (help) {
      core.help(help_constant.VERSION_CONFIG);
      return;
    }
    await StdoutFormatter.initStdout();

    const layer = new Layer({ region: props.region, credentials });
    return await layer.getVersion({ version: props.version, layerName: props.layerName });
  }

  public async deleteVersion(inputs: InputProps) {
    const {
      credentials,
      help,
      props,
    } = await this.handlerInputs(inputs, 'deleteVersion');

    if (help) {
      core.help(help_constant.DELETE_VERSION);
      return;
    }
    await StdoutFormatter.initStdout();

    const layer = new Layer({ region: props.region, credentials });
    return await layer.deleteVersion({ version: props.version, layerName: props.layerName });
  }

  public async deleteLayer(inputs: InputProps) {
    const {
      credentials,
      help,
      props,
    } = await this.handlerInputs(inputs, 'deleteLayer');

    if (help) {
      core.help(help_constant.DELETE_LAYER);
      return;
    }
    await StdoutFormatter.initStdout();

    const layer = new Layer({ region: props.region, credentials });
    return await layer.deleteLayer({ layerName: props.layerName, assumeYes: props.assumeYes });
  }

  private async handlerInputs(inputs: InputProps, command: string) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help', 'table', 'y'],
      string: ['region', 'layer-name', 'code', 'description', 'compatible-runtime', 'prefix'],
      number: ['version'],
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

    const version = parsedData.version || props.version;
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

    return {
      parsedArgs,
      credentials,
      props: endProps,
      table: parsedData.table,
    }
  }
}
