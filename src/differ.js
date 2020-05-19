import _ from 'lodash';

const getPropertyActions = (before, after, property) => {
  const getValue = (key) => ({ value: after[key], valueOld: before[key] });

  const propertyActions = [
    {
      state: 'added',
      check: (key) => !_.has(before, key) && _.has(after, key),
      getValue,
    },
    {
      state: 'deleted',
      check: (key) => _.has(before, key) && !_.has(after, key),
      getValue,
    },
    {
      state: 'children',
      check: (key) => _.isObject(before[key]) && _.isObject(after[key]),
      getValue: (key, fn) => ({ children: fn(before[key], after[key]) }),
    },
    {
      state: 'unchanged',
      check: (key) => before[key] === after[key],
      getValue,
    },
    {
      state: 'changed',
      check: (key) => before[key] !== after[key],
      getValue,
    },
  ];

  return propertyActions.find(({ check }) => check(property));
};

const differ = (before, after) => (
  _.union(_.keys(before), _.keys(after))
    .sort()
    .map((key) => {
      const { state, getValue } = getPropertyActions(before, after, key);
      const data = getValue(key, differ);
      return { key, state, ...data };
    })
);

export default differ;
