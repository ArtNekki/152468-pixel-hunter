export const isObject = (value) => {
  return !(value instanceof Array) && (typeof value === `object`);
};

export const isNumber = (value) => {
  return (typeof value) === `number` && isFinite(value);
};
