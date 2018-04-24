export const createElement = (template = ``, tagName = `template`) => {
  const element = document.createElement(tagName);
  element.innerHTML = template;

  return element.content || element;
};
