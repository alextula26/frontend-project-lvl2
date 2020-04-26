import json from './json.js';
import recursion from './recursion.js';

const getFormater = (data, type) => {
  const formater = {
    recursion,
    json,
  };

  return formater[type](data);
};

export default (data, type) => getFormater(data, type);
