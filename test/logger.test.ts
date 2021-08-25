import loggerStarter from '../src/common/logger';

describe('test/logger.ts', () => {
  test('log', async () => {
    loggerStarter.setContent('TEST');
    loggerStarter.log('TEST');
    loggerStarter.info('TEST');
    loggerStarter.debug('TEST');
    loggerStarter.error('TEST');
    loggerStarter.warning('TEST');
    loggerStarter.success('TEST');
  });
});
