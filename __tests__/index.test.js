import fs from 'fs';
import gendiff from '../src/index.js';

const testFilesPath = `${__dirname}/../__fixtures__/`;
const expans = ['json', 'yml', 'ini'];

let resultTree;
let resultPlain;
let resultJson;

beforeEach(() => {
  resultTree = fs.readFileSync(`${testFilesPath}result_tree.txt`, 'utf-8');
  resultPlain = fs.readFileSync(`${testFilesPath}result_plain.txt`, 'utf-8');
  resultJson = fs.readFileSync(`${testFilesPath}result_json.txt`, 'utf-8');
});

describe.each(expans)('gendiff %s', (exp) => {
  const before = `${testFilesPath}before.${exp}`;
  const after = `${testFilesPath}after.${exp}`;
  test('gendiff', () => {
    expect(gendiff(before, after, 'tree')).toEqual(resultTree.trim());
    expect(gendiff(before, after, 'plain')).toEqual(resultPlain.trim());
    expect(gendiff(before, after, 'json')).toEqual(resultJson.trim());
  });
});
