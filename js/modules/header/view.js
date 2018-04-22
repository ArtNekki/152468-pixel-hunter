import AbstractView from '../../abstract-view';
import {Time, Life} from '../../data/game-params';

const drawHeart = (full) => {
  return `<img src='img/heart__${full ? `full` : `empty`}.svg' class='game__heart' alt='Life' width='32' height='32'>`;
};

const renderLives = (lives) => {
  return `${new Array(Life.count - lives).fill(drawHeart(false)).join(``)}
          ${lives >= 0 ? new Array(lives).fill(drawHeart(true)).join(``) : ``}`;
};

const renderContentWithData = ({timer, lives}) => {
  return `<h1 class='game__timer'>${timer}</h1>
          <div class='game__lives'>
            ${renderLives(lives)}
          </div>`;
};

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<header class='header'>
              <div class='header__back'>
                <button class='back'>
                  <img src='img/arrow_left.svg' width='45' height='45' alt='Back'>
                  <img src='img/logo_small.svg' width='101' height='44'>
                </button>
              </div>
              ${this.state ? renderContentWithData(this.state) : ``}
            </header>`;
  }

  changeTime(time) {
    if (time <= Time.critical) {
      this.timer.classList.add(`game__timer--critical`);
    } else {
      this.timer.classList.remove(`game__timer--critical`);
    }

    this.timer.textContent = time;
  }

  changeLives(lives) {
    this.lives.innerHTML = renderLives(lives);
  }

  goBack() {

  }

  bind() {
    this.timer = this.element.querySelector(`.game__timer`);
    this.lives = this.element.querySelector(`.game__lives`);
    const backButton = this.element.querySelector(`.back`);

    backButton.addEventListener(`click`, () => {
      this.goBack();
    });
  }
}
