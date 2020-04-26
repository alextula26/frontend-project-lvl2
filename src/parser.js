import yaml from 'js-yaml';
import ini from 'ini';

const getFormat = (str, ext) => {
  const format = {
    json: JSON.parse,
    yml: yaml.load,
    ini: ini.parse,
  };
  return format[ext](str);
};

export default (str, ext) => getFormat(str, ext);
