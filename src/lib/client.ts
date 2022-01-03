import * as fcCore from '@serverless-devs/fc-core';
export default class Client {
  static fcClient: any;

  static async setFcClient(region: string, credentials, access: string) {
    const fcClient = await fcCore.makeFcClient({
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
