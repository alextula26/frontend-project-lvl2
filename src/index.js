import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import genDiff from './differ.js';
import formatter from './formatters/index.js';

const readFile = (pathFile) => {
  const fullPathFile = path.resolve(process.cwd(), pathFile);
  return fs.readFileSync(fullPathFile, 'utf-8');
};

const getExtname = (pathFile) => {
  const fullPathFile = path.resolve(process.cwd(), pathFile);
  return path.extname(fullPathFile).slice(1);
};

export default (pathFile1, pathFile2, type) => {
  const content1 = readFile(pathFile1);
  const content2 = readFile(pathFile2);
  const extname1 = getExtname(pathFile1);
  const extname2 = getExtname(pathFile2);

  const data1 = parser(content1, extname1);
  const data2 = parser(content2, extname2);
  const result = genDiff(data1, data2);

  return formatter(result, type);
};
