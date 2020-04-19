export default (str, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(str);
    case 'yml':
      return JSON.parse(str);
    default:
      return false;
  }
};
