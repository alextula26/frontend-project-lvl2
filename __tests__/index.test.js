import gendiff from '../src/index.js';

test('gendiff', () => {
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
  const filepath1 = `${__dirname}/fixtures/file1.json`;
  const filepath2 = `${__dirname}/fixtures/file2.json`;
  const diff = gendiff(filepath1, filepath2);
  expect(diff).toEqual(result);
});
