import fs from 'fs';
import path from 'path';
import compare from './compare.js';

export default (filepath1, filepath2) => {
  const fullPathFile1 = path.resolve(process.cwd(), `${filepath1}`);
  const fullPathFile2 = path.resolve(process.cwd(), `${filepath2}`);
  let file1;
  let file2;
  try {
    file1 = fs.readFileSync(fullPathFile1, 'utf-8');
    file2 = fs.readFileSync(fullPathFile2, 'utf-8');
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('Путь до файл не верный или файл не существует');
    } else {
      throw e;
    }
  }
  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);

  return compare(data1, data2);
};
