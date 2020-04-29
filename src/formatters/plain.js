import _ from 'lodash';

const separator = '\n';

const getValueAction = (val) => {
  const valueAction = [
    {
      check: (value) => _.isObject(value),
      action: () => '[complex value]',
    },
    {
      check: (value) => _.isString(value),
      action: (value) => `'${value}'`,
    },
    {
      check: (value) => _.isBoolean(value),
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

export default (tree) => {
  const render = (data, acc) => data
    .filter(({ state }) => state !== 'unchanged')
    .map((node) => {
      const state = getPropertyAction(node);
      const keys = [...acc, node.key];
      return state(keys, node, render);
    })
    .flat()
    .join(separator);
  return render(tree, []);
};
