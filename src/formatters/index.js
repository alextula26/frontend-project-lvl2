import json from './json.js';
import tree from './tree.js';
import plain from './plain.js';

const getFormater = (data, type) => {
  const formater = {
    json,
    tree,
    plain,
  };

  return formater[type](data);
};

export default (data, type) => getFormater(data, type);
