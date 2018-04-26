import AbstractView from '../../abstract-view';
import {TaskType} from '../../data/structure';
import renderQuestions from '../../partials/questions/index';
import renderStats from '../../partials/stats/index';

const REQUIRED_ANSWERS_COUNT = 2;

// Сопоставление количества картинок и типа контейнера
const ContentType = {
  [TaskType.GUESS_ONE]: `game__content--wide`,
  [TaskType.FIND]: `game__content--triple`
};

export default class GameView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  get template() {
    const {answers, task} = this._state;
    const {type, title, questions} = task;

    return `
        <div class='game'>
            <p class='game__task'>${title}</p>
            <form class='game__content ${ContentType[type] || ``}'>
              ${renderQuestions(questions)}
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

  onAnswer() {

  }

  bind() {
    const {type, questions} = this._state.task;

    const content = this.element.querySelector(`.game__content`);
    const radioButtons = Array.from(content.querySelectorAll(`[type='radio']`));

    content.addEventListener(`click`, (e) => {

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

      if (!checkedAnswerControls.length || ((type === TaskType.GUESS_TWO)
          && checkedAnswerControls.length !== REQUIRED_ANSWERS_COUNT)) {
        return;
      }

      const correctAnswer = questions.every((question, i) => {
        return question.type === checkedAnswerControls[i].value;
      });

      this.onAnswer(correctAnswer);
    });
  }
}
