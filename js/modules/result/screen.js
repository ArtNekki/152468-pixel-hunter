import ResultView from './view';

export default class ResultScreen {
  constructor(data) {
    this._view = new ResultView(data);
  }

  get element() {
    return this._view.element;
  }
}
