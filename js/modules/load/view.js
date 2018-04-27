import AbstractView from '../../abstract-view';

export default class LoadView extends AbstractView {
  constructor(player) {
    super();
    this._player = player;
  }

  get template() {
    return `<div class='load'>
      <p class='load__text'>${this._player}, подожите. Ваши данные загружаются!</p>
    </div>`;
  }
}
