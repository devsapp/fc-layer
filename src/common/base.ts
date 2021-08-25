export default class BaseComponent {
  protected __report(reportData: ServerlessDevsReport.ReportData) {
    if (process && process.send) {
      const { name, content } = reportData;
      process.send({
        action: 'resource',
        data: {
          name,
          content: JSON.stringify(content),
        },
      });
      return content;
    }
  }
}
