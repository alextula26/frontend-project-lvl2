import yaml from 'js-yaml';
import ini from 'ini';

const getFormat = (content, ext) => {
  const format = {
    json: JSON.parse,
    yml: yaml.load,
    ini: ini.parse,
  };
  return format[ext](content);
};

export default (content, ext) => getFormat(content, ext);
