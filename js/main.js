import {changeView} from './util';
import intro from './intro';

document.addEventListener(`DOMContentLoaded`, () => {
  changeView(intro);

  document.addEventListener(`click`, (e) => {
    const goHomeButton = e.target.closest(`.back`);

    if (!goHomeButton) {
      return;
    }

    changeView(intro);
  });
});
