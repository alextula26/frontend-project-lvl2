import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import buildStatDiff from './gendiff.js';

const recursionFormater = (data) => {
  console.log(data);
  return data;
};
const jsonFormater = (data) => JSON.stringify(data);

const formater = (data, type) => {
  const format = {
    recursion: recursionFormater,
    json: jsonFormater,
  };

  return format[type](data);
};

export default (beforeConfigFilePath, afterConfigFilePath, type) => {
  const beforeConfigFileFullPath = path.resolve(process.cwd(), `${beforeConfigFilePath}`);
  const afterConfigFileFullPath = path.resolve(process.cwd(), `${afterConfigFilePath}`);
  const beforeFileExtension = path.extname(beforeConfigFileFullPath).slice(1);
  const afterFileExtension = path.extname(afterConfigFileFullPath).slice(1);
  let beforeConfigFileContent;
  let afterConfigFileContent;
  try {
    beforeConfigFileContent = fs.readFileSync(beforeConfigFileFullPath, 'utf-8');
    afterConfigFileContent = fs.readFileSync(afterConfigFileFullPath, 'utf-8');
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('Путь до файл не верный или файл не существует');
    } else {
      throw e;
    }
  }

  const beforeConfigData = parser(beforeConfigFileContent, beforeFileExtension);
  const afterConfigData = parser(afterConfigFileContent, afterFileExtension);
  const result = buildStatDiff(beforeConfigData, afterConfigData);
  console.log(formater(result, type));
  return true;
};
