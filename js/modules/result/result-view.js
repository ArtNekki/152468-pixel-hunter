import AbstractView from '../../abstract-view';
import ResultTableView from './result-table-view';
import {Life} from '../../settings';

const resultToTitle = {
  [true]: `Победа`,
  [false]: `Поражение`
};

export default class ResultView extends AbstractView {
  constructor({player, result}) {
    super();
    this._player = player;
    this._result = result.reverse();
  }

  get template() {
    return `<div class='result'>
              <h1>${resultToTitle[this._isWin()]}</h1>
              ${this._renderResultTables()}
            </div>`;
  }

  get wrongAnswers() {
    return this._result[0].answers.filter((answer) => {
      return !answer.isCorrect;
    });
  }

  _isWin() {
    return this.wrongAnswers.length <= Life.COUNT;
  }

  _renderResultTables() {
    let resultTables = ``;

    for (const result of this._result) {
      resultTables += new ResultTableView(result).template;
    }

    return resultTables;
  }
}
