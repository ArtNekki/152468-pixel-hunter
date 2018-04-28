import {AnswerType} from '../../data/game-params';

const answerTypeToAnswerName = {
  [AnswerType.photo]: `Фото`,
  [AnswerType.paint]: `Рисунок`
};

const answers = Object.values(AnswerType);

export default (index) => {
  return answers.map((it) => {
    return `<label class="game__answer game__answer--${it}">
      <input name="question${index}" type="radio" value="${it}">
      <span>${answerTypeToAnswerName[it]}</span>
    </label>`;
  }).join(``);
};
