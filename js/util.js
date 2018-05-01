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

export const formatDate = (ms) => {
  const date = new Date(ms);
  return date.toLocaleString(`ru`);
};

export const crossFadeScreen = ({outElement, inElement, duration}) => {
  outElement = outElement.children[0];
  inElement = inElement.children[0];

  outElement.style.position = `absolute`;
  inElement.style.display = `none`;

  const fragment = document.createDocumentFragment();
  fragment.append(outElement);
  fragment.append(inElement);
  changeView(fragment);

  return () => {

    outElement.style.animationName = `fadeOut`;
    outElement.style.animationDuration = `${duration}s`;

    inElement.style.animationName = `fadeIn`;
    inElement.style.animationDuration = `${duration}s`;
    inElement.style.display = ``;

    outElement.addEventListener(`animationend`, () => {
      outElement.style.position = ``;
      inElement.style.position = ``;
      outElement.remove();
    });
  };
};
