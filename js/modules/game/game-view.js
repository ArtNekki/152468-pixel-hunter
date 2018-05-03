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
  constructor(state) {
    super();
    this._state = state;
  }

  get template() {
    const {answers, question} = this._state;
    const {type, title} = question;

    return `
        <div class='game'>
            <p class='game__task'>${title}</p>
            <form class='game__content ${ContentType[type] || ``}'>
              ${renderAnswers(question)}
            </form>
            <div class='stats'>
              ${renderStats(answers)}
            </div>
          </div>`;
  }

  _getCheckedControls(answers) {
    return answers.filter(((answer) => {
      return answer.checked;
    }));
  }

  bind() {
    const {type, answers: questionAnswers} = this._state.question;

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

      if (!checkedAnswerControls.length || ((type === QuestionType.GUESS_TWO)
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
