import _ from 'lodash';

const separator = '\n';

const getValueAction = (val) => {
  const valueAction = [
    {
      check: (value) => _.isObject(value),
      action: () => '[complex value]',
    },
    {
      check: (value) => typeof value === 'string',
      action: (value) => `'${value}'`,
    },
    {
      check: (value) => typeof value === 'boolean',
      action: (value) => value,
    },
  ];

  return valueAction.find(({ check }) => check(val));
};

const stringify = (value) => {
  const { action } = getValueAction(value);
  return action(value);
};

const getPropertyAction = (data) => {
  const propertyAction = {
    changed: (keys, { value, valueOld }) => `Property '${keys.join('.')}' was changed from ${stringify(valueOld)} to ${stringify(value)}`,
    deleted: (keys) => `Property '${keys.join('.')}' was deleted`,
    added: (keys, { value }) => `Property '${keys.join('.')}' was added with value: ${stringify(value)}`,
    children: (keys, { children }, fn) => fn(children, keys),
  };
  return propertyAction[data.state];
};

export default (coll) => {
  const render = (arr, acc) => arr
    .filter(({ state }) => state !== 'unchanged')
    .map((data) => {
      const state = getPropertyAction(data);
      const keys = [...acc, data.key];
      return state(keys, data, render);
    })
    .flat()
    .join(separator);
  return render(coll, []);
};
