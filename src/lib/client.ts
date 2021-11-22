import * as core from '@serverless-devs/core';
export default class Client {
  static fcClient: any;

  static async setFcClient(region: string, credentials, access: string) {
    const fcCommon = await core.loadComponent('devsapp/fc-common');
    const fcClient = await fcCommon.makeFcClient({
      project: { access },
      credentials,
      props: {
        region,
      },
    });

    this.fcClient = fcClient;

    return fcClient;
  }
}
