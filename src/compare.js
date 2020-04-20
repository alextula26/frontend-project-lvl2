import _ from 'lodash';

const separator = '\n';

const getPropertyState = (before, after, key) => {
  const getValue = (name) => ({ value: after[name], valueOld: before[name] });
  const propertyActions = [
    {
      state: 'added',
      check: (name) => !_.has(before, name) && _.has(after, name),
      getValue,
    },
    {
      state: 'deleted',
      check: (name) => _.has(before, name) && !_.has(after, name),
      getValue,
    },
    {
      state: 'unchanged',
      check: (name) => before[name] === after[name],
      getValue,
    },
    {
      state: 'changed',
      check: (name) => before[name] !== after[name],
      getValue,
    },
  ];

  return propertyActions.find(({ check }) => check(key));
};

const propertyState = {
  added: (data) => `+ ${data.key}: ${data.value}`,
  deleted: (data) => `- ${data.key}: ${data.valueOld}`,
  unchanged: (data) => `  ${data.key}: ${data.value}`,
  changed: (data) => `+ ${data.key}: ${data.value}${separator}  - ${data.key}: ${data.valueOld}`,
};

const getDataToString = (data) => {
  const str = data.reduce((acc, item) => {
    const { state } = item;
    return `${acc}  ${propertyState[state](item)}${separator}`;
  }, '');
  return `{${separator}${str}}`;
};

const getPropertyAction = (before, after, key) => {
  const { state, getValue } = getPropertyState(before, after, key);
  const value = getValue(key);
  return { key, state, ...value };
};

const buildStatDiff = (before, after) => {
  const uniqKeys = _.union(_.keys(before), _.keys(after));
  const statDiffData = uniqKeys.reduce((acc, key) => {
    const data = getPropertyAction(before, after, key);
    return [...acc, data];
  }, []);

  return getDataToString(statDiffData);
};

export default buildStatDiff;
