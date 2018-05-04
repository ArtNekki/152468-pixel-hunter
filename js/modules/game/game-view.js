import AbstractView from '../../abstract-view';
import {QuestionType} from '../../settings';
import renderAnswers from '../../partials/answers';
import renderStats from '../../partials/stats';

const REQUIRED_ANSWERS_COUNT = 2;

// Сопоставление количества картинок и типа контейнера
const ContentType = {
  [QuestionType.GUESS_ONE]: `game__content--wide`,
  [QuestionType.FIND]: `game__content--triple`
};

export default class GameView extends AbstractView {
  constructor({answers, question}) {
    super();
    this._answers = answers;
    this._question = question;
  }

  get template() {
    const {type, title} = this._question;

    return `
        <div class='game'>
            <p class='game__task'>${title}</p>
            <form class='game__content ${ContentType[type] || ``}'>
              ${renderAnswers(this._question)}
            </form>
            <div class='stats'>
              ${renderStats(this._answers)}
            </div>
          </div>`;
  }

  _getCheckedControls(controls) {
    return controls.filter(((control) => {
      return control.checked;
    }));
  }

  bind() {
    const {type: questionType, answers: questionAnswers} = this._question;

    const content = this.element.querySelector(`.game__content`);
    const radioButtons = Array.from(content.querySelectorAll(`[type='radio']`));

    content.addEventListener(`mousedown`, (e) => {

      const option = e.target.closest(`.game__option`);

      if (option.querySelector(`.game__answer`)) {
        return false;
      }

      let correctAnswer;

      if (option.classList.contains(`game__option--selected`)) {
        correctAnswer = true;
      } else {
        correctAnswer = false;
      }

      this.onAnswer(correctAnswer);
      return correctAnswer;
    });

    content.addEventListener(`change`, () => {
      const checkedAnswerControls = this._getCheckedControls(radioButtons);

      if (!checkedAnswerControls.length || ((questionType === QuestionType.GUESS_TWO)
          && checkedAnswerControls.length !== REQUIRED_ANSWERS_COUNT)) {
        return;
      }

      const correctAnswer = questionAnswers.every((answer, i) => {
        return answer.type === checkedAnswerControls[i].value;
      });

      this.onAnswer(correctAnswer);
    });
  }

  onAnswer() {

  }
}
