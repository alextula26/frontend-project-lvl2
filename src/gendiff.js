import _ from 'lodash';

// const separator = '\n';

const getPropertyActions = (before, after, key) => {
  const propertyActions = [
    {
      state: 'added',
      check: (name) => !_.has(before, name) && _.has(after, name),
      func: (name) => ({ value: after[name], valueOld: before[name] }),
    },
    {
      state: 'deleted',
      check: (name) => _.has(before, name) && !_.has(after, name),
      func: (name) => ({ value: after[name], valueOld: before[name] }),
    },
    {
      state: 'children',
      check: (name) => _.isObject(before[name]) && _.isObject(after[name]),
      func: (name, f) => ({ children: f(before[name], after[name]) }),
    },
    {
      state: 'unchanged',
      check: (name) => before[name] === after[name],
      func: (name) => ({ value: after[name], valueOld: before[name] }),
    },
    {
      state: 'changed',
      check: (name) => before[name] !== after[name],
      func: (name) => ({ value: after[name], valueOld: before[name] }),
    },
  ];

  return propertyActions.find(({ check }) => check(key));
};

/* const propertyState = {
  added: (data) => `+ ${data.key}: ${data.value}`,
  deleted: (data) => `- ${data.key}: ${data.valueOld}`,
  unchanged: (data) => `  ${data.key}: ${data.value}`,
  changed: (data) => `+ ${data.key}: ${data.value}${separator}  - ${data.key}: ${data.valueOld}`,
  children: (data, f) => f(data),
}; */

/* const getDataToString = (data) => {
  console.log(data);
  const str = data.reduce((acc, item) => {
    const { state } = item;
    return `${acc}  ${propertyState[state](item, getDataToString)}${separator}`;
  }, '');
  return `{${separator}${str}}`;
}; */

const buildStatDiff = (before, after) => {
  const uniqKeys = _.union(_.keys(before), _.keys(after));
  return uniqKeys.reduce((acc, key) => {
    const { state, func } = getPropertyActions(before, after, key);
    const data = func(key, buildStatDiff);
    return [...acc, { key, state, ...data }];
  }, []);
};

export default buildStatDiff;
