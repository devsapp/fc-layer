declare namespace ServerlessDevsReport {
  export interface FcLayer {
    region: string;
    arn: string;
  }
  export interface ReportData {
    name: string;
    content: FcLayer;
  }
}
