export const createElement = (template = ``, tagName = `template`) => {
  const element = document.createElement(tagName);
  element.innerHTML = template;

  return element.content || element;
};

export const isObject = (value) => {
  return (typeof value === `object`) && !Array.isArray(value);
};
