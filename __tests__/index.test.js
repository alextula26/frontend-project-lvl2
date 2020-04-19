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

test('gendiff json', () => {
  const filepath1 = `${__dirname}/../__fixtures__/before.json`;
  const filepath2 = `${__dirname}/../__fixtures__/after.json`;
  const diff = gendiff(filepath1, filepath2);
  expect(diff).toEqual(result);
});

test('gendiff yml', () => {
  const filepath1 = `${__dirname}/../__fixtures__/before.yml`;
  const filepath2 = `${__dirname}/../__fixtures__/after.yml`;
  const diff = gendiff(filepath1, filepath2);
  expect(diff).toEqual(result);
});
