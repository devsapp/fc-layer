import _ from 'lodash';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import { exec } from 'child_process';
import ComponentStarter from '../src/index';

describe('Integration::command', () => {
  dotenv.config();

  let arn = '';
  const random = `layer-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;

  const inputs = {
    props: {
      region: 'cn-shenzhen',
      layerName: random,
    },
    credentials: {
      AccountID: process.env.AccountID,
      AccessKeyID: process.env.AccessKeyID,
      AccessKeySecret: process.env.AccessKeySecret,
    },
    appName: 'fc-layer-test',
    project: {
      access: random,
      component: '${path(.)}',
      projectName: 'test',
    },
    command: '',
    args: '--region',
    path: {
      configPath: path.join(process.cwd(), '..', 'example', 's.yaml'),
    },
  };

  beforeAll(async () => {
    await exec(`s config add --AccountID ${process.env.AccountID} --AccessKeyID ${process.env.AccessKeyID} --AccessKeySecret ${process.env.AccessKeySecret} -a ${random}`);
  });

  afterAll(async () => {
    await exec(`s config delete -a ${random}`);
    fs.removeSync(path.join(process.cwd(), '.s'));
  })

  it('publish cli', async () => {
    const inp = _.cloneDeep(inputs);
    inp.props = {};
    inp.args = `--region cn-shenzhen --layer-name ${random} --code ${path.join(__dirname, 'test.zip')}`;

    const componentStarter = new ComponentStarter();
    const result = await componentStarter.publish(inp);
    const reg = new RegExp(`#${random}#1$`);
    expect(result).toMatch(reg);
  });

  it('publish yaml', async () => {
    const inp = _.cloneDeep(inputs);
    inp.props.code = path.join(__dirname, 'test.zip');

    const componentStarter = new ComponentStarter();
    const result = await componentStarter.publish(inp);
    arn = result;
    
    const reg = new RegExp(`#${random}#2$`);
    expect(result).toMatch(reg);
  });

  it('list yaml', async () => {
    const inp = _.cloneDeep(inputs);
    const componentStarter = new ComponentStarter();
    const result = await componentStarter.list(inp);
    expect(result.map(({ arn: Arn }) => Arn)).toContain(arn);
  });

  it('versions yaml', async () => {
    const componentStarter = new ComponentStarter();
    const result = await componentStarter.versions(_.cloneDeep(inputs));
    expect(result.map(({ arn: Arn }) => Arn)).toContain(arn);
  });

  it('versionConfig yaml', async () => {
    const inp = _.cloneDeep(inputs);
    inp.args = '--version-id 2';

    const componentStarter = new ComponentStarter();
    const result = await componentStarter.versionConfig(inp);
    expect(result?.arn || '').toEqual(arn);
  });

  it('deleteVersion yaml', async () => {
    const inp = _.cloneDeep(inputs);
    inp.args = '--version-id 2';

    const componentStarter = new ComponentStarter();
    const result = await componentStarter.deleteVersion(inp);
    expect(result).toBeUndefined();
  });

  it('deleteLayer yaml', async () => {
    const inp = _.cloneDeep(inputs);
    inp.args = '-y';

    const componentStarter = new ComponentStarter();
    const result = await componentStarter.deleteLayer(inp);
    expect(result).toBeUndefined();
  });

  it('versions cli', async () => {
    const inp = _.cloneDeep(inputs);
    inp.props = {};
    inp.args = `--region cn-shenzhen --layer-name ${random}`;

    const componentStarter = new ComponentStarter();
    try {
      await componentStarter.versions(inp)
      expect(1).toBeNull();
    } catch (ex) {
      expect(ex.code).toEqual('LayerNotFound');
    }
  });
})