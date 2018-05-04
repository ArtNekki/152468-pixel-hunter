import AbstractView from '../../abstract-view';
import ResultTableView from './result-table-view';
import {Life} from '../../settings';

const resultToTitle = {
  [true]: `Победа!`,
  [false]: `Поражение.`
};

export default class ResultView extends AbstractView {
  constructor({player, result}) {
    super();
    this._player = player;
    this._results = result.reverse();
  }

  get template() {
    return `<div class='result'>
              <h1>${resultToTitle[this._isWin()]}</h1>
              ${this._renderResultTables()}
            </div>`;
  }

  _isWin() {
    const wrongAnswers = this._results[0].answers.filter((answer) => {
      return !answer.isCorrect;
    });

    return wrongAnswers.length <= Life.COUNT;
  }

  _renderResultTables() {
    let resultTables = ``;

    this._results.forEach((result, i) => {
      resultTables += new ResultTableView(result, i).template;
    });

    return resultTables;
  }
}
