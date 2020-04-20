import _ from 'lodash';

const separator = '\n';

const getValue = (before, after, key) => (
  {
    value: after[key], valueOld: before[key],
  }
);

const propertyActions = [
  {
    state: 'added',
    check: (before, after, key) => !_.has(before, key) && _.has(after, key),
    getValue,
  },
  {
    state: 'deleted',
    check: (before, after, key) => _.has(before, key) && !_.has(after, key),
    getValue,
  },
  {
    state: 'unchanged',
    check: (before, after, key) => before[key] === after[key],
    getValue,
  },
  {
    state: 'changed',
    check: (before, after, key) => before[key] !== after[key],
    getValue,
  },
];

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

const getPropertyActions = (before, after, key) => {
  // eslint-disable-next-line no-shadow
  const { state, getValue } = propertyActions.find(({ check }) => check(before, after, key));
  const value = getValue(before, after, key);
  return { key, state, ...value };
};

const buildData = (before, after) => {
  const uniqKeys = _.union(_.keys(before), _.keys(after));
  const result = uniqKeys.reduce((acc, key) => {
    const item = getPropertyActions(before, after, key);
    return [...acc, item];
  }, []);
  return getDataToString(result);
};

export default buildData;
