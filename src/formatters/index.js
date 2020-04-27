import json from './json.js';
import recursion from './recursion.js';
import plain from './plain.js';

const getFormater = (data, type) => {
  const formater = {
    json,
    recursion,
    plain,
  };

  return formater[type](data);
};

export default (data, type) => getFormater(data, type);
