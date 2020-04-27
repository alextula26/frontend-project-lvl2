import fs from 'fs';
import gendiff from '../src/index.js';

const testFilesPath = `${__dirname}/../__fixtures__/`;
const expans = ['json', 'yml', 'ini'];

// let resultJson;
let resultRecursion;

beforeEach(() => {
  // resultJson = fs.readFileSync(`${testFilesPath}result_json.txt`, 'utf-8');
  resultRecursion = fs.readFileSync(`${testFilesPath}result_recursion.txt`, 'utf-8');
});

describe.each(expans)('gendiff %s', (exp) => {
  const before = `${testFilesPath}before.${exp}`;
  const after = `${testFilesPath}after.${exp}`;
  test('gendiff', () => {
    // expect(gendiff(before, after, 'json')).toEqual(resultJson.trim());
    expect(gendiff(before, after, 'recursion')).toEqual(resultRecursion.trim());
  });
});
