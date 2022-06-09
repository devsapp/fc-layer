import { zip, fse, getRootHome, downloadRequest } from '@serverless-devs/core';
import path from 'path';
import { v5 as uuidv5 } from 'uuid';
import logger from '../common/logger';

const getFileConfig = async (filePath) => {
  const { size } = await fse.stat(filePath);
  return {
    size,
    content: size > 52428800 ? undefined : await fse.readFile(filePath, 'base64'),
    zipFilePath: filePath,
  };
};

export function isUrl(codeUri) {
  return codeUri.startsWith('https://') || codeUri.startsWith('http://');
}


export async function zipCodeFile(codeUri): Promise<{ size: number; content?: string; zipFilePath: string }> {
  if (isUrl(codeUri)) {
    const localDir = path.join(getRootHome(), 'cache', 'layers');
    const filename = `${uuidv5(codeUri, uuidv5.URL)}.zip`;
    await downloadRequest(codeUri, localDir, { filename });
    codeUri = path.join(localDir, filename);
  }

  if (codeUri.endsWith('.zip')) {
    return await getFileConfig(codeUri);
  }
  const codeResolvePath = path.resolve(codeUri);
  const zipPath = path.join(getRootHome(), '.s', 'layer');
  const outputFileName = `upload-cache-${new Date().getTime()}.zip`;
  const zipFilePath = path.join(zipPath, outputFileName);

  try {
    fse.emptyDir(zipPath);
  } catch (ex) {
    logger.debug(ex);
  }

  await zip({
    codeUri: codeResolvePath,
    outputFilePath: zipPath,
    outputFileName,
  });

  const fileConfig = await getFileConfig(zipFilePath);
  return fileConfig;
}
