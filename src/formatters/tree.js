import _ from 'lodash';

const separator = '\n';
const spaces = 2;
const tabs = 4;
const countSpaces = (indent) => ((indent > 1) ? ' '.repeat(spaces ** indent + spaces) : ' '.repeat(spaces));
const countTabs = (indent) => ' '.repeat(tabs * indent);

const stringify = (value, indent) => {
  if (!_.isObject(value)) {
    return _.identity(value);
  }

  const result = _.keys(value)
    .map((key) => `${countTabs(indent)}${' '.repeat(4)}${key}: ${value[key]}`);
  return `{${separator}${result.join(separator)}${separator}${countTabs(indent)}}`;
};

const getDiffToString = (sign, key, value, indent) => `${countSpaces(indent)}${sign} ${key}: ${stringify(value, indent)}`;

const getPropertyAction = ({ state }) => {
  const propertyAction = {
    unchanged: ({ key, value }, indent) => getDiffToString(' ', key, value, indent),
    changed: ({ key, value, valueOld }, indent) => [getDiffToString('-', key, valueOld, indent), getDiffToString('+', key, value, indent)],
    deleted: ({ key, valueOld }, indent) => getDiffToString('-', key, valueOld, indent),
    added: ({ key, value }, indent) => getDiffToString('+', key, value, indent),
    children: ({ key, children }, indent, fn) => `${countSpaces(indent)}  ${key}: ${['{', fn(children, indent + 1), `${countSpaces(indent)}  }`].join(separator)}`,
  };

  return propertyAction[state];
};

export default (tree) => {
  const render = (data, indent) => data
    .map((node) => {
      const state = getPropertyAction(node);
      return state(node, indent, render);
    })
    .flat()
    .join(separator);
  return `{${separator}${render(tree, 1)}${separator}}`;
};
