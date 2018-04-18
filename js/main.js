import {changeView} from './util';
import IntroView from './components/views/intro/index';

document.addEventListener(`DOMContentLoaded`, () => {
  const introView = new IntroView();
  changeView(introView.element);

  // Если в разметке есть кнопка, для возврата назад, то при нажатии на нее
  // возвращаемся на первый экран
  document.addEventListener(`click`, (e) => {
    const goHomeButton = e.target.closest(`.back`);

    if (!goHomeButton) {
      return;
    }

    changeView(introView.element);
  });
});
