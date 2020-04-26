import json from './json.js';
import recursion from './recursion.js';

const formater = (data, type) => {
  const format = {
    recursion,
    json,
  };

  return format[type](data);
};

export default formater;
