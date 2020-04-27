import _ from 'lodash';

const separator = '\n';
const spaces = 2;
const tabs = 4;
const countSpaces = (indent) => ((indent > 1) ? ' '.repeat(spaces ** indent + spaces) : ' '.repeat(spaces));
const countTabs = (indent) => ' '.repeat(tabs * indent);

const getValueAction = (val) => {
  const valueAction = [
    {
      check: (value) => !_.isObject(value),
      action: (value) => _.identity(value),
    },
    {
      check: (value) => _.isObject(value),
      action: (value, indent) => {
        const result = _.keys(value)
          .map((key) => `${countTabs(indent)}    ${key}: ${value[key]}`);
        return `{${separator}${result.join(separator)}${separator}${countTabs(indent)}}`;
      },
    },
  ];

  return valueAction.find(({ check }) => check(val));
};

const stringify = (value, indent) => {
  const { action } = getValueAction(value);
  return action(value, indent);
};

const getPropertyAction = (data) => {
  const propertyAction = {
    unchanged: ({ key, value }, indent) => `${countSpaces(indent)}  ${key}: ${stringify(value, indent)}`,
    changed: ({ key, value, valueOld }, indent) => [`${countSpaces(indent)}- ${key}: ${stringify(valueOld, indent)}`, `${countSpaces(indent)}+ ${key}: ${stringify(value, indent)}`],
    deleted: ({ key, valueOld }, indent) => `${countSpaces(indent)}- ${key}: ${stringify(valueOld, indent)}`,
    added: ({ key, value }, indent) => `${countSpaces(indent)}+ ${key}: ${stringify(value, indent)}`,
    children: ({ key, children }, indent, fn) => `${countSpaces(indent)}  ${key}: ${['{', fn(children, indent + 1), `${countSpaces(indent)}  }`].join(separator)}`,
  };

  return propertyAction[data.state];
};

export default (coll) => {
  const render = (arr, indent) => arr
    .map((data) => {
      const state = getPropertyAction(data);
      return state(data, indent, render);
    })
    .flat()
    .join(separator);
  return `{${separator}${render(coll, 1)}${separator}}`;
};
