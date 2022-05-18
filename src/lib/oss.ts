
import OSS from 'ali-oss';
import { got } from '@serverless-devs/core';
import path from 'path';

export const putOss = async (fcClient, zipFilePath) => {

  const { data: {
    ossRegion,
    credentials,
    ossBucket,
    objectName,
  } } = await fcClient.getTempBucketToken();

  const client = new OSS({
    region: ossRegion,
    accessKeyId: credentials.AccessKeyId,
    accessKeySecret: credentials.AccessKeySecret,
    stsToken: credentials.SecurityToken,
    bucket: ossBucket,
    timeout: '600000', // 10min
    refreshSTSToken: async () => {
      const refreshToken = await got.get('https://127.0.0.1/sts');
      return {
        accessKeyId: refreshToken.data.credentials.AccessKeyId,
        accessKeySecret: refreshToken.data.credentials.AccessKeySecret,
        stsToken: refreshToken.data.credentials.SecurityToken,
      };
    },
  });
  const ossObjectName = `${fcClient.accountid}/${objectName}`;
  await client.put(ossObjectName, path.normalize(zipFilePath))
  return { ossBucketName: ossBucket, ossObjectName };
}