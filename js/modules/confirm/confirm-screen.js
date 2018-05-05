import ConfirmView from './confirm-view';

export default class ConfirmScreen {
  constructor(text) {
    this._view = new ConfirmView(text);
    this._view.onOk = this.onOk.bind(this);
    this._view.onCancel = this.onCancel.bind(this);
    this._element = this._view.element;
    document.body.appendChild(this._element);
  }

  onOk() {
    this.isOk();
    this.onCancel();
  }

  onCancel() {
    document.body.removeChild(this._element);
  }

  isOk() {

  }
}
