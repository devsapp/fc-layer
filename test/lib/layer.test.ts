import Layer from "../../src/lib/layer";
import Client from "../../src/lib/client";

describe('publish', function () {
    it('should work with Layer-FC plugins\' output', async () => {
        let region = "cn-shenzhen";
        await Client.setFcClient(region, null, "default");

        let layer = new Layer();

        try {
            let arn = await layer.publish({
                    "region": region,
                    // "service": {"name": "www-e2e-test", "role": "acs:ram::0000000000000000:role/aliyunfcdefaultrole"},
                    // "function": {
                    //     "name": "my-function",
                    //     "handler": "dummy-handler",
                    //     "timeout": 60,
                    //     "runtime": "custom",
                    //     "environmentVariables": {
                    //         "TZ": "Asia/Shanghai",
                    //         "PATH": "/opt/node-v16.14.2-linux-x64/bin:/usr/local/bin/apache-maven/bin:/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/ruby/bin"
                    //     },
                    //     "instanceConcurrency": 100,
                    //     "codeUri": "./dist"
                    // },
                    // "triggers": [{
                    //     "name": "http",
                    //     "type": "http",
                    //     "config": {"authType": "anonymous", "methods": ["GET", "HEAD"]}
                    // }],
                    "layerName": "nodejs16_fc_auto_created",
                    "code": null,
                    "compatibleRuntime": ["custom"],
                    "description": null,
                    "ossBucket": "fc-layers-cn-shenzhen",
                    "ossKey": "node-v16.14.2-linux-x64.zip"
                }
            );
            expect(arn).toBeDefined();
        } catch (e) {
            fail(e);
        }
    });
});