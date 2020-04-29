import _ from 'lodash';

const getPropertyActions = (before, after, property) => {
  const action = (key) => ({ value: after[key], valueOld: before[key] });

  const propertyActions = [
    {
      state: 'added',
      check: (key) => !_.has(before, key) && _.has(after, key),
      action,
    },
    {
      state: 'deleted',
      check: (key) => _.has(before, key) && !_.has(after, key),
      action,
    },
    {
      state: 'children',
      check: (key) => _.isObject(before[key]) && _.isObject(after[key]),
      action: (key, fn) => ({ children: fn(before[key], after[key]) }),
    },
    {
      state: 'unchanged',
      check: (key) => before[key] === after[key],
      action,
    },
    {
      state: 'changed',
      check: (key) => before[key] !== after[key],
      action,
    },
  ];

  return propertyActions.find(({ check }) => check(property));
};

const buildStatDiff = (before, after) => (
  _.union(_.keys(before), _.keys(after))
    .sort()
    .map((key) => {
      const { state, action } = getPropertyActions(before, after, key);
      const data = action(key, buildStatDiff);
      return { key, state, ...data };
    })
);

export default buildStatDiff;
