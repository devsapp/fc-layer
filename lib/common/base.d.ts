export default class BaseComponent {
    protected inputs: any;
    protected client: any;
    private name;
    private basePath;
    constructor(inputs: any);
    protected __report(reportData: ServerlessDevsReport.ReportData): ServerlessDevsReport.FcLayer;
    __getBasePath(): string;
    __doc(projectName?: string): string;
}
