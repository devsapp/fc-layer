jest.mock('ali-oss', () => {
    console.log('mocking OssClient');
    return MockOssClient;
})

class MockOssClient {

    constructor() {
    }

    put(object, localFilePath) {
        console.log(`put {} to {} success`, localFilePath, object);
    }
}