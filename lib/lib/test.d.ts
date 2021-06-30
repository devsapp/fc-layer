export default class Layer {
    constructor({ region, credentials }: {
        region: any;
        credentials: any;
    });
    getLayerConfig(serviceName: any, functionPath: any): Promise<any>;
    publishLayerVersion(serviceName: any, functionPath: any): Promise<any>;
}
