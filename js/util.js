const container = document.querySelector(`#main`);

export const changeView = (element) => {
  container.innerHTML = ``;
  container.appendChild(element);
};

export const createElement = (template = ``, tagName = `div`) => {
  const element = document.createElement(tagName);
  element.innerHTML = template;

  return element.children[0];
};

export const crossFadeScreen = ({outElement, inElement, duration}) => {
  outElement = outElement;
  inElement = inElement;

  outElement.style.position = `absolute`;
  inElement.style.display = `none`;

  const fragment = document.createDocumentFragment();
  fragment.appendChild(outElement);
  fragment.appendChild(inElement);
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
