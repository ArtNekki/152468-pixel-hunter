const answerTypeToAnswerName = {
  'photo': `Фото`,
  'paint': `Рисунок`
};

const answers = [`photo`, `paint`];

export default (index) => {
  return answers.map((it) =>
    `<label class="game__answer game__answer--${it}">
      <input name="question${index}" type="radio" value="${it}">
      <span>${answerTypeToAnswerName[it]}</span>
    </label>`).join(``);
};
