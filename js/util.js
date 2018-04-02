export const getElementFromTemplate = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.children[0].content || element.children[0];
};

const container = document.body.querySelector(`#main`);

// Показывает экран в зависимости от переданного числа
export const changeView = (element) => {
  container.innerHTML = ``;
  container.appendChild(element);
};
