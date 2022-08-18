import * as core from '@serverless-devs/core';
import logger from './common/logger';
import { InputProps, IProps } from './common/entity';
import * as help_constant from './lib/help';
import Layer from './lib/layer';
import Client from './lib/client';

export default class ComponentDemo {
  async acl(inputs: InputProps) {
    const {
      help,
      props: { layerName, status },
    } = await this.handlerInputs(inputs, 'acl');

    if (help) {
      core.help(help_constant.PUBLISH);
      return;
    }

    const layer = new Layer();
    return await layer.acl({ layerName, status });
  }

  async publish(inputs: InputProps) {
    const {
      help,
      props,
    } = await this.handlerInputs(inputs, 'publish');

    if (help) {
      core.help(help_constant.PUBLISH);
      return;
    }

    const layer = new Layer();
    return await layer.publish(props);
  }

  async list(inputs: InputProps) {
    const {
      help,
      table,
      props: { prefix, status, official },
    } = await this.handlerInputs(inputs, 'list');

    if (help) {
      core.help(help_constant.LIST);
      return;
    }

    const layer = new Layer();
    return await layer.list({ prefix, status, official }, table);
  }

  async versions(inputs: InputProps) {
    const {
      help,
      props,
      table,
    } = await this.handlerInputs(inputs, 'versions');

    if (help) {
      core.help(help_constant.VERSIONS);
      return;
    }

    const layer = new Layer();
    return await layer.versions({ layerName: props.layerName }, table);
  }

  async detail(inputs: InputProps) {
    const {
      help,
      props,
      parsedArgs,
    } = await this.handlerInputs(inputs, 'detail');

    if (help) {
      core.help(help_constant.VERSION_CONFIG);
      return;
    }

    const layer = new Layer();
    return await layer.getVersion({ simple: parsedArgs?.data?.simple, version: props.version, layerName: props.layerName });
  }

  async versionConfig(inputs: InputProps) {
    return await this.detail(inputs);
  }

  async deleteVersion(inputs: InputProps) {
    const {
      help,
      props,
    } = await this.handlerInputs(inputs, 'deleteVersion');

    if (help) {
      core.help(help_constant.DELETE_VERSION);
      return;
    }

    const layer = new Layer();
    return await layer.deleteVersion({ version: props.version, layerName: props.layerName });
  }

  async deleteLayer(inputs: InputProps) {
    const {
      help,
      props,
    } = await this.handlerInputs(inputs, 'deleteLayer');

    if (help) {
      core.help(help_constant.DELETE_LAYER);
      return;
    }

    const layer = new Layer();
    await layer.deleteLayer({ layerName: props.layerName, assumeYes: props.assumeYes });
  }

  async download(inputs: InputProps) {
    const {
      help,
      props,
    } = await this.handlerInputs(inputs, 'download');
    const { version, layerName, region } = props;
    if (help) { return {}; }

    const layer = new Layer();
    return await layer.download({ layerName, version, region });
  }

  private async handlerInputs(inputs: InputProps, command: string) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: { [key: string]: any } = core.commandParse(inputs, {
      boolean: ['help', 'table', 'y', 'simple', 'public', 'official'],
      string: ['region', 'layer-name', 'code', 'description', 'compatible-runtime', 'prefix'],
      number: ['version-id'],
      alias: { help: 'h', 'assume-yes': 'y' },
    });

    const parsedData = parsedArgs?.data || {};
    if (parsedData.help) {
      return { help: true };
    }

    const props = inputs.props || {};
    const region = parsedData.region || props.region;
    if (!region) {
      throw new Error('The parameter region was not found, please use --region to specify');
    }
    const layerName = parsedData['layer-name'] || props.layerName;
    if (!layerName && command !== 'list') {
      throw new Error('The parameter layerName was not found, please use --layer-name to specify');
    }
    let { compatibleRuntime } = props;
    if (parsedData['compatible-runtime']) {
      compatibleRuntime = parsedData['compatible-runtime'].split(',');
    }

    const version = parsedData['version-id'] || props.version || props.versionId;
    if (!version && (command === 'detail' || command === 'download')) {
      throw new Error('The parameter version was not found, please use --version-id to specify');
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
      ossBucket: parsedData.ossBucket || props.ossBucket,
      ossKey: parsedData.ossKey || props.ossKey,
      status: parsedData.public,
      official: parsedData.official,
    };

    await Client.setFcClient(region, inputs.credentials, inputs.project?.access);

    return {
      parsedArgs,
      props: endProps,
      table: parsedData.table,
    };
  }
}
