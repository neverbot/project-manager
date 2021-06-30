import { promises as fs } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// don't ask me why, import spec does not allow directly importing json files...
// we have to use a require or reading the file
export const readConfigFile = async (fileName) => {
  return JSON.parse(await fs.readFile(__dirname + '/../config/' + fileName, 'utf8'));
};
