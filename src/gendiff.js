import _ from 'lodash';

const getPropertyActions = (before, after, property) => {
  const propertyActions = [
    {
      state: 'added',
      check: (key) => !_.has(before, key) && _.has(after, key),
      action: (key) => ({ value: after[key], valueOld: before[key] }),
    },
    {
      state: 'deleted',
      check: (key) => _.has(before, key) && !_.has(after, key),
      action: (key) => ({ value: after[key], valueOld: before[key] }),
    },
    {
      state: 'children',
      check: (key) => _.isObject(before[key]) && _.isObject(after[key]),
      action: (key, fn) => ({ children: fn(before[key], after[key]) }),
    },
    {
      state: 'unchanged',
      check: (key) => before[key] === after[key],
      action: (key) => ({ value: after[key], valueOld: before[key] }),
    },
    {
      state: 'changed',
      check: (key) => before[key] !== after[key],
      action: (key) => ({ value: after[key], valueOld: before[key] }),
    },
  ];

  return propertyActions.find(({ check }) => check(property));
};

const buildStatDiff = (before, after) => {
  const unionKeys = _.union(_.keys(before), _.keys(after));
  return unionKeys.reduce((acc, key) => {
    const { state, action } = getPropertyActions(before, after, key);
    const data = action(key, buildStatDiff);
    return [...acc, { key, state, ...data }];
  }, []);
};

export default buildStatDiff;
