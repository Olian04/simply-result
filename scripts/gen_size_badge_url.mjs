import * as url from 'url';
import * as path from 'path';
import { gzipSizeFromFileSync } from 'gzip-size';

const intoHumanReadableSize = (sizeInBytes) => {
  if (sizeInBytes < 1000) {
    return `${size}B`;
  }
  const sizeInKilobytes = size / 1000;
  if (sizeInKilobytes < 1000) {
    return `${sizeInKilobytes.toPrecision(3)}KB`
  }
  const sizeInMegabytes = sizeInKilobytes / 1000;
  if (sizeInMegabytes < 1000) {
    return `${sizeInMegabytes.toPrecision(3)}MB`
  }
  throw new Error('Size too big');
}

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const size = gzipSizeFromFileSync(path.join(__dirname, '..', 'tmp', 'bundle.js'));

console.log(`https://img.shields.io/badge/package%20size-${intoHumanReadableSize(size)}-blue`);
