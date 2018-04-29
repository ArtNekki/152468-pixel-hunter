import AbstractView from '../../abstract-view';
import {Time, Life} from '../../settings';

const drawHeart = (full) => {
  return `<img src='img/heart__${full ? `full` : `empty`}.svg' class='game__heart' alt='Life' width='32' height='32'>`;
};

const renderLives = (lives) => {
  return `${new Array(Life.count - lives).fill(drawHeart(false)).join(``)}
          ${new Array(lives).fill(drawHeart(true)).join(``)}`;
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
    this._state = state;
  }

  get template() {
    return `<header class='header'>
              <div class='header__back'>
                <button class='back'>
                  <img src='img/arrow_left.svg' width='45' height='45' alt='Back'>
                  <img src='img/logo_small.svg' width='101' height='44'>
                </button>
              </div>
              ${this._state ? renderContentWithData(this._state) : ``}
            </header>`;
  }

  changeTime({time}) {
    if (time <= Time.critical) {
      this._timer.classList.add(`game__timer--critical`);
    } else {
      this._timer.classList.remove(`game__timer--critical`);
    }

    this._timer.textContent = time;
  }

  changeLives({lives}) {
    this._lives.innerHTML = renderLives(lives);
  }

  goBack() {

  }

  bind() {
    const {element} = this;

    this._timer = element.querySelector(`.game__timer`);
    this._lives = element.querySelector(`.game__lives`);
    const backButton = element.querySelector(`.back`);

    backButton.addEventListener(`click`, () => {
      this.goBack();
    });
  }
}
