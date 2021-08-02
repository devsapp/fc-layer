import { IProps } from '../common/entity';
export default class Layer {
    publish(props: IProps): Promise<any>;
    list({ prefix }: {
        prefix: any;
    }, table: any): Promise<any>;
    versions({ layerName }: {
        layerName: any;
    }, table: any): Promise<any>;
    getVersion({ version, layerName }: {
        version: any;
        layerName: any;
    }): Promise<any>;
    deleteVersion({ version, layerName }: {
        version: any;
        layerName: any;
    }): Promise<void>;
    deleteLayer({ layerName, assumeYes }: {
        layerName: any;
        assumeYes: any;
    }): Promise<void>;
    private forDeleteVersion;
}
