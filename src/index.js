import fs from 'fs';
import path from 'path';

export default (filepath1, filepath2) => {
  const fullPathFile1 = path.resolve(process.cwd(), `${filepath1}`);
  const fullPathFile2 = path.resolve(process.cwd(), `${filepath2}`);
  try {
    const file1 = fs.readFileSync(fullPathFile1, 'utf-8');
    const file2 = fs.readFileSync(fullPathFile2, 'utf-8');

    const jsonFile1 = JSON.parse(file1);
    const jsonFile2 = JSON.parse(file2);

    console.log(jsonFile1);
    console.log(jsonFile2);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('Путь до файл не верный или файл не существует');
    } else {
      throw e;
    }
  }
};
