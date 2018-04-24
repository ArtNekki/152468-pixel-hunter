import ResultView from './view';
import headerView from '../header/screen';

export default class ResultScreen {
  constructor(data) {
    this._view = new ResultView(data);
  }

  get element() {
    const element = this._view.element;
    element.prepend(headerView().element);
    return element;
  }
}
