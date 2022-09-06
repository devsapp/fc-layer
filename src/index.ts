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
    } = await this.handlerInputs(inputs);

    if (help) {
      core.help(help_constant.PUBLISH);
      return;
    }

    this.checkLayerNameEmpty(layerName);
    const layer = new Layer();
    return await layer.acl({ layerName, status });
  }

  async publish(inputs: InputProps) {
    const {
      help,
      props,
    } = await this.handlerInputs(inputs);

    if (help) {
      core.help(help_constant.PUBLISH);
      return;
    }
    this.checkLayerNameEmpty(props.layerName);

    const layer = new Layer();
    return await layer.publish(props);
  }

  async list(inputs: InputProps) {
    const {
      help,
      table,
      props: { prefix, status, official },
    } = await this.handlerInputs(inputs);

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
      props: { layerName },
      table,
    } = await this.handlerInputs(inputs);

    if (help) {
      core.help(help_constant.VERSIONS);
      return;
    }
    this.checkLayerNameEmpty(layerName);
    const layer = new Layer();
    return await layer.versions({ layerName }, table);
  }

  async detail(inputs: InputProps) {
    const {
      help,
      props,
      parsedArgs,
    } = await this.handlerInputs(inputs);

    if (help) {
      core.help(help_constant.VERSION_CONFIG);
      return;
    }

    const { version, layerName, arn } = props;
    if (!arn) {
      this.checkLayerNameEmpty(layerName);
      this.checkVersionIdEmpty(version);
    }

    const layer = new Layer();
    return await layer.getVersion({
      simple: parsedArgs?.data?.simple,
      version: props.version,
      layerName: props.layerName,
      arn: props.arn,
    });
  }

  async versionConfig(inputs: InputProps) {
    return await this.detail(inputs);
  }

  async deleteVersion(inputs: InputProps) {
    const {
      help,
      props: { version, layerName },
    } = await this.handlerInputs(inputs);

    if (help) {
      core.help(help_constant.DELETE_VERSION);
      return;
    }

    this.checkLayerNameEmpty(layerName);
    this.checkVersionIdEmpty(version);

    const layer = new Layer();
    return await layer.deleteVersion({ version, layerName });
  }

  async deleteLayer(inputs: InputProps) {
    const {
      help,
      props: { layerName, assumeYes },
    } = await this.handlerInputs(inputs);

    if (help) {
      core.help(help_constant.DELETE_LAYER);
      return;
    }

    this.checkLayerNameEmpty(layerName);

    const layer = new Layer();
    await layer.deleteLayer({ layerName, assumeYes });
  }

  async download(inputs: InputProps) {
    const {
      help,
      props,
    } = await this.handlerInputs(inputs);
    const { version, layerName, region, arn } = props;
    if (help) { return {}; }

    if (!arn) {
      this.checkLayerNameEmpty(layerName);
      this.checkVersionIdEmpty(version);
    }

    const layer = new Layer();
    return await layer.download({ arn, layerName, version, region });
  }

  private async handlerInputs(inputs: InputProps) {
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

    this.checkRegionEmpty(region);

    let { compatibleRuntime } = props;
    if (parsedData['compatible-runtime']) {
      compatibleRuntime = parsedData['compatible-runtime'].split(',');
    }

    const endProps: IProps = {
      region,
      compatibleRuntime,
      layerName: parsedData['layer-name'] || props.layerName,
      description: parsedData.description || props.description,
      code: parsedData.code || props.code,
      prefix: parsedData.prefix || props.prefix,
      assumeYes: parsedData.y,
      version: parsedData['version-id'] || props.version || props.versionId,
      ossBucket: parsedData.ossBucket || props.ossBucket,
      ossKey: parsedData.ossKey || props.ossKey,
      status: parsedData.public,
      official: parsedData.official,
      arn: parsedData.arn || props.arn,
    };

    await Client.setFcClient(region, inputs.credentials, inputs.project?.access);

    return {
      parsedArgs,
      props: endProps,
      table: parsedData.table,
    };
  }

  private checkRegionEmpty(region: string) {
    if (!region) {
      throw new core.CatchableError('The parameter region was not found, please use --region to specify');
    }
  }

  private checkLayerNameEmpty(layerName: string) {
    if (!layerName) {
      throw new core.CatchableError('The parameter layerName was not found, please use --layer-name to specify');
    }
  }

  private checkVersionIdEmpty(version: number) {
    if (!version) {
      throw new core.CatchableError('The parameter version was not found, please use --version-id to specify');
    }
  }
}
