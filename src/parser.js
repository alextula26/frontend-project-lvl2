import yaml from 'js-yaml';
import ini from 'ini';

export default (str, ext) => {
  const format = {
    json: JSON.parse,
    yml: yaml.load,
    ini: ini.parse,
  };

  return format[ext](str);
};
