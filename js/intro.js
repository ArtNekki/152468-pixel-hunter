import {getElementFromTemplate, changeView} from './util';
import greeting from './greeting';

const intro = getElementFromTemplate(
    `<div id='intro' class='intro'>
      <h1 class='intro__asterisk'>*</h1>
      <p class='intro__motto'><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>`);

const goNextButton = intro.querySelector(`.intro__asterisk`);

goNextButton.addEventListener(`click`, () => {
  changeView(greeting);
});

export default intro;
