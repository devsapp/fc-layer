import * as core from '@serverless-devs/core';

export default class Client {
  static fcClient: any;

  static async setFcClient(region: string, credentials, access: string) {
    const fcCore = await core.loadComponent('devsapp/fc-core');
    const fcClient = await fcCore.makeFcClient({
      access,
      credentials,
      region,
    });

    this.fcClient = fcClient;

    return fcClient;
  }
}
