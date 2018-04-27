const container = document.querySelector(`#main`);

export const changeView = (element) => {
  container.innerHTML = ``;
  container.append(element);
};

export const createElement = (template = ``, tagName = `template`) => {
  const element = document.createElement(tagName);
  element.innerHTML = template;

  return element.content || element;
};

export const isObject = (value) => {
  return (typeof value === `object`) && !Array.isArray(value);
};

export const formatDate = (ms) => {
  const date = new Date(ms);
  return date.toLocaleString(`ru`);
};
