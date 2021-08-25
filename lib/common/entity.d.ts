export interface ICredentials {
    AccountID?: string;
    AccessKeyID?: string;
    AccessKeySecret?: string;
    SecurityToken?: string;
}
export interface InputProps {
    props: any;
    credentials: ICredentials;
    appName: string;
    project: {
        component: string;
        access: string;
        projectName: string;
    };
    command: string;
    args: string;
    path: {
        configPath: string;
    };
}
export interface IProps {
    region: string;
    layerName: string;
    description?: string;
    code?: string;
    compatibleRuntime?: string[];
    prefix?: string;
    assumeYes?: boolean;
    version?: number;
}
export declare function isProps(args: any): args is IProps;
