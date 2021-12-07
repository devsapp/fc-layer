import _ from 'lodash';
import path from 'path';
import ComponentStarter from '../src/index';
import Client from '../src/lib/client';
import FC from '@alicloud/fc2';
import fs from 'fs-extra';

const inputs = {
  props: {},
  credentials: {
    AccountID: 'AccountID',
    AccessKeyID: 'AccessKeyID',
    AccessKeySecret: 'AccessKeySecret',
  },
  appName: 'fc-sync-test',
  project: {
    component: 'devsapp/fc-sync',
    access: 'test',
    projectName: 'test',
  },
  command: '',
  args: '--region',
  path: {
    configPath: path.join(process.cwd(), '..', 'example', 's.yaml'),
  },
};

describe('test/index.test.ts', () => {
  const listLayersRes = [
    {
      "compatibleRuntime": [
        "nodejs12",
        "nodejs10",
      ],
      "arn": "dcd6a873f4f5adf7ad3375ddac7171ec#layer#1",
      "description": "",
      "layerName": "layer",
      "version": "1"
    },
    {
      "compatibleRuntime": [
        "nodejs10",
      ],
      "arn": "dcd6a873f4f5adf8883375ddac7171ec#layer1#2",
      "description": "",
      "layerName": "layer1",
      "version": "2"
    },
  ];
  let componentStarter;

  beforeEach(async () => {
    const fcClient = new FC(inputs.credentials.AccountID, {
      accessKeyID: inputs.credentials.AccessKeyID,
      accessKeySecret: inputs.credentials.AccessKeySecret,
      region: 'cn-shenzhen',
    });
    fcClient.publishLayerVersion = () => ({ data: { arn: "dcd6a873f4f5adf7ad3375ddac7171ec#layer#1" } });
    // fcClient.listLayers = () => ({ data: { layers: listLayersRes, } });
    // fcClient.listLayerVersions = () => ({
    //   data: { layers: [
    //     {
    //       layerName: "layer",
    //       description: "",
    //       version: "1",
    //       compatibleRuntime: [
    //         "nodejs12",
    //         "nodejs10",
    //       ],
    //       arn: "dcd6a873f4f5adf7ad3375ddac7171ec#layer#1",
    //     },
    // ]}});
    fcClient.getLayerVersion = () => ({ data: { arn: "dcd6a873f4f5adf7ad3375ddac7171ec#layer#1" } });
    fcClient.deleteLayerVersion = () => ({ data: "" });
    fcClient.get_all_list_data = (path) => {
      console.log('path:: ', path);
      if (path === '/layers') {
        return {
          data: { layers: [
            {
              layerName: "layer",
              description: "",
              version: "1",
              compatibleRuntime: [
                "nodejs12",
                "nodejs10",
              ],
              arn: "dcd6a873f4f5adf7ad3375ddac7171ec#layer#1",
            },
        ]}};
      }
      return { data: { layers: listLayersRes, } };
    };


    Client.setFcClient = jest.fn().mockImplementation(() => {
      Client.fcClient = fcClient;
      return fcClient;
    });
    componentStarter = new ComponentStarter();
  });

  afterAll(() => {
    fs.removeSync(path.join(process.cwd(), '.s'));
  });

  it('list cli', async () => {
    const inp = _.cloneDeep(inputs);
    inp.args = '--region cn-shenzhen --prefix layer';

    const result = await componentStarter.list(inp);

    expect(result).toMatchObject([
      { "layerName": "layer" },
      { "layerName": "layer1" },
    ]);
  });

  it('list yaml', async () => {
    const inp = _.cloneDeep(inputs);
    inp.props = {
      region: 'cn-shenzhen',
    };

    const result = await componentStarter.list(inp);
    expect(result).toMatchObject([
      { "layerName": "layer" },
      { "layerName": "layer1" },
    ]);
  });

  it('publish yaml', async () => {
    const inp = _.cloneDeep(inputs);
    inp.props = {
      region: 'cn-shenzhen',
      layerName: 'layer',
      code: path.join(__dirname, 'test.zip'),
    };

    const result = await componentStarter.publish(inp);
    expect(result).toMatch(/#layer#/);
  });

  it('versions yaml', async () => {
    const inp = _.cloneDeep(inputs);
    inp.props = {
      region: 'cn-shenzhen',
      layerName: 'layer',
    };

    const result = await componentStarter.versions(inp);
    expect(result).toMatchObject([{ "layerName": "layer" }]);
  });

  it('versionConfig yaml', async () => {
    const inp = _.cloneDeep(inputs);
    inp.props = {
      region: 'cn-shenzhen',
      layerName: 'layer',
      versionId: '1',
    };

    const result = await componentStarter.versionConfig(inp);
    expect(result?.arn || '').toMatch(/#layer#/);
  });

  it('deleteVersion yaml', async () => {
    const inp = _.cloneDeep(inputs);
    inp.props = {
      region: 'cn-shenzhen',
      layerName: 'layer',
      versionId: '1',
    };

    const result = await componentStarter.deleteVersion(inp);
    expect(result).toBeUndefined();
  });

  it('deleteLayer yaml', async () => {
    const inp = _.cloneDeep(inputs);
    inp.props = {
      region: 'cn-shenzhen',
      layerName: 'layer',
    };
    inp.args = '-y';

    const result = await componentStarter.deleteLayer(inp);
    expect(result).toBeUndefined();
  });
});
