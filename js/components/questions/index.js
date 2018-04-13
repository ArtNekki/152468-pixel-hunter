const IMG_SIZE = {
  1: `width='705' height='455'`,
  2: `width='468' height='458'`,
  3: `width='304' height='455'`
};

export default (data) => data.map((question, i) =>
  `<div class='game__option'>
      <img src=${question.img} alt='Option ${i}' ${IMG_SIZE[data.length]}>
      <label class='game__answer game__answer--photo'>
        <input name='question1' type='radio' value='photo'>
        <span>Фото</span>
      </label>
      <label class='game__answer ${data.length === 1 ? `game__answer--wide` : ``} game__answer--paint'>
        <input name='question1' type='radio' value='paint'>
        <span>Рисунок</span>
      </label>
    </div>`
).join(``);
