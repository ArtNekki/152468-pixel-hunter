import ResultView from './result-view';
import HeaderScreen from '../header/header-screen';

export default class ResultScreen {
  constructor(data) {
    this._view = new ResultView(data);
  }

  get element() {
    const element = this._view.element;
    element.prepend(new HeaderScreen().element);
    return element;
  }
}
