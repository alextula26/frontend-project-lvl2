import yaml from 'js-yaml';

export default (str, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(str);
    case 'yml':
      console.log(format);
      return yaml.load(str);
    default:
      return false;
  }
};
