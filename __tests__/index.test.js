import gendiff from '../src/index.js';

const result = `{
    name: Alexander
  + age: 30
  - age: 15
  + country: Russia
  - country: Kazakhstan
  + job: true
  - job: false
  + children: true
}`;

const testFilePath = `${__dirname}/../__fixtures__/`;

describe.each([
  'json',
  'yml',
  'ini',
])('gendiff %s', (expans) => {
  test('gendiff', () => {
    const filepath1 = `${testFilePath}before.${expans}`;
    const filepath2 = `${testFilePath}after.${expans}`;
    const diff = gendiff(filepath1, filepath2);
    expect(diff).toEqual(result);
  });
});
