import AbstractView from '../../abstract-view';
import {changeView} from '../../util';
import renderGreeting from '../greeting/index';

export default class IntroView extends AbstractView {
  get template() {
    return `<div id='intro' class='intro'>
              <h1 class='intro__asterisk'>*</h1>
              <p class='intro__motto'><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
            </div>`;
  }

  onNextClick() {

  }

  bind() {
    this.element.querySelector(`.intro__asterisk`).addEventListener(`click`, () => {
      this.onNextClick();
    });
  }
}
