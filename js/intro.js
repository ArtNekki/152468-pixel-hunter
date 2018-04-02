import {getElementFromTemplate, changeView} from './util';
import renderGreeting from './greeting';

const render = () => {
  // Генерируем Dom - элементы из шаблона
  const intro = getElementFromTemplate(
      `<div id='intro' class='intro'>
        <h1 class='intro__asterisk'>*</h1>
        <p class='intro__motto'><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>`);

  // Добавляем логику работы
  const goNextButton = intro.querySelector(`.intro__asterisk`);

  goNextButton.addEventListener(`click`, () => {
    changeView(renderGreeting());
  });

  // Возвращаем dom - элементы
  return intro;
};

export default render;
