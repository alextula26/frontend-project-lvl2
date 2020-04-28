const separator = '\n';

const stringify = (data) => (
  data
);

const getPropertyAction = (data) => {
  const propertyAction = {
    changed: (keys, { value, valueOld }) => `Property '${keys.join('.')}' was changed from ${stringify(valueOld)} to ${stringify(value)}`,
    deleted: (keys) => `Property '${keys.join('.')}' was deleted`,
    added: (keys, { value }) => `Property '${keys.join('.')}' was added with value: ${stringify(value)}`,
    children: (keys, { children }, fn) => fn(children, keys),
  };
  return propertyAction[data.state];
};

export default (coll) => {
  const render = (arr, acc) => arr
    .filter(({ state }) => state !== 'unchanged')
    .map((data) => {
      const state = getPropertyAction(data);
      const keys = [...acc, data.key];
      return state(keys, data, render);
    })
    .flat()
    .join(separator);
  return render(coll, []);
};
