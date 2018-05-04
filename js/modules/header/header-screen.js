import HeaderView from './header-view';
import ConfirmScreen from '../confirm/confirm-screen';
import Application from '../../Application';

export default class HeaderScreen {
  constructor(data, stopTimer) {
    this._data = data;
    this._view = new HeaderView(data);
    this._view.goBack = this._goBack.bind(this);
    this._stopTimer = stopTimer;
  }

  get element() {
    return this._view.element;
  }

  get view() {
    return this._view;
  }

  _goBack() {
    if (!this._data) {
      Application.start();
      return;
    }

    const confirm = new ConfirmScreen(`Хотите вернуться на экран приветствия? Все ваши ответы будут потеряны!`);
    confirm.isOk = () => {
      this._stopTimer();
      Application.start();
    };
  }
}
