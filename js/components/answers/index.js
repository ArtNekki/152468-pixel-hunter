const ANSWER_NAME = {
  'photo': `Фото`,
  'paint': `Рисунок`
};

const answers = [`photo`, `paint`];

export default (index) => answers.map((it) =>
  `<label class="game__answer game__answer--${it}">
    <input name="question${index}" type="radio" value="${it}">
    <span>${ANSWER_NAME[it]}</span>
  </label>`).join(``);
