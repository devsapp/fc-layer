import stdoutFormatterStarter from '../src/common/stdout-formatter';

describe('test/stdout-formatter.ts', () => {
  test('log', async () => {
    await stdoutFormatterStarter.initStdout();
    expect(stdoutFormatterStarter.stdoutFormatter).not.toBeUndefined();
  });
});
