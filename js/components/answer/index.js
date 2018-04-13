const ANSWER_NAME = {
  'photo': `Фото`,
  'paint': `Рисунок`
};

export default (data, index) => data.map((type) =>
  `<label class='game__answer game__answer--${type}'>
    <input name='question${index + 1}' type='radio' value=${type}>
    <span>${ANSWER_NAME[type]}</span>
  </label>`).join(``);
