import json from './json.js';
import tree from './tree.js';
import plain from './plain.js';

const getFormatter = (data, type) => {
  const formatters = {
    json,
    tree,
    plain,
  };

  return formatters[type](data);
};

export default (data, type) => getFormatter(data, type);
