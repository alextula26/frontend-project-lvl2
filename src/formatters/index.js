import json from './json.js';
import tree from './tree.js';
import plain from './plain.js';

const getFormat = (data, type) => {
  const format = {
    json,
    tree,
    plain,
  };

  return format[type](data);
};

export default (data, type) => getFormat(data, type);
