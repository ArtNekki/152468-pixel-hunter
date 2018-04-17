export const createElement = (template = ``, tagName = `div`) => {
  const element = document.createElement(tagName);
  element.innerHTML = template;

  return element;
};

const container = document.querySelector(`#main`);

// Показывает экран в зависимости от переданного числа
export const changeView = (element) => {
  container.innerHTML = ``;
  container.append(element);
};

export const updateView = (parent, view) => {
  parent.innerHTML = ``;
  parent.append(view.element);
};
