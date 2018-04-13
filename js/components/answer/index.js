export default (i) =>
  `<label class="game__answer game__answer--photo">
    <input name="question${i}" type="radio" value="photo">
    <span>Фото</span>
  </label>
  <label class="game__answer game__answer--paint">
    <input name="question${i}" type="radio" value="paint">
    <span>Рисунок</span>
  </label>`;
