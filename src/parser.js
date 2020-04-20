import yaml from 'js-yaml';
import ini from 'ini';

export default (str, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(str);
    case 'yml':
      return yaml.load(str);
    case 'ini':
      return ini.parse(str);
    default:
      return JSON.parse(str);
  }
};
