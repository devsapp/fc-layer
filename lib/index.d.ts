import BaseComponent from './common/base';
import { InputProps } from './common/entity';
export default class ComponentDemo extends BaseComponent {
    publish(inputs: InputProps): Promise<any>;
    list(inputs: InputProps): Promise<any>;
    versions(inputs: InputProps): Promise<any>;
    versionConfig(inputs: InputProps): Promise<any>;
    deleteVersion(inputs: InputProps): Promise<void>;
    deleteLayer(inputs: InputProps): Promise<void>;
    private handlerInputs;
}
