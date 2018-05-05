import ConfirmView from './confirm-view';

export default class ConfirmScreen {
  constructor(text) {
    this._view = new ConfirmView(text);
    this._view.onOk = this._onOk.bind(this);
    this._view.onCancel = this._onCancel.bind(this);
    this._element = this._view.element;
    document.body.appendChild(this._element);
  }

  _onOk() {
    this.isOk();
    this._close();
  }

  _onCancel() {
    this._close();
  }

  _close() {
    document.body.removeChild(this._element);
  }

  isOk() {

  }
}
