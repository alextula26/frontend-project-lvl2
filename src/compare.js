import { union, keys, has } from 'lodash';

const separator = '\n';

const actions = [
  {
    action: 'update',
    get: (data1, data2, key, acc) => {
      if (data1[key] === data2[key]) {
        return [...acc, [' ', key, data1[key]]];
      }
      return [...acc, ['+', key, data2[key]], ['-', key, data1[key]]];
    },
  },
  {
    action: 'delete',
    get: (data1, data2, key, acc) => [...acc, ['-', key, data1[key]]],
  },
  {
    action: 'add',
    get: (data1, data2, key, acc) => [...acc, ['+', key, data2[key]]],
  },
];

const getCompareResult = (property, data1, data2, key, acc) => {
  const object = actions.find(({ action }) => action === property);
  return object.get(data1, data2, key, acc);
};

const compareResultToString = (array) => {
  const str = array.reduce((acc, [action, key, value]) => `${acc} ${action} ${key}: ${value}${separator}`, '');
  return `{${separator}${str}}`;
};

const compare = (data1, data2) => {
  const uniqKeys = union(keys(data1), keys(data2));
  const result = uniqKeys.reduce((acc, key) => {
    if (has(data1, key) && has(data2, key, acc)) {
      return getCompareResult('update', data1, data2, key, acc);
    }

    if (has(data1, key) && !has(data2, key, acc)) {
      return getCompareResult('delete', data1, data2, key, acc);
    }

    return getCompareResult('add', data1, data2, key, acc);
  }, []);

  return compareResultToString(result);
};

export default compare;
