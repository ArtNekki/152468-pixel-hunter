import {changeView} from './util';
import renderIntro from './components/intro';
import './data/game.js';

document.addEventListener(`DOMContentLoaded`, () => {
  // Показываем первый экран, как только DOM загружен
  changeView(renderIntro());

  // Если в разметке есть кнопка, для возврата назад, то при нажатии на нее
  // возвращаемся на первый экран
  document.addEventListener(`click`, (e) => {
    const goHomeButton = e.target.closest(`.back`);

    if (!goHomeButton) {
      return;
    }

    changeView(renderIntro());
  });
});
