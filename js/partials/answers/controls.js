import {AnswerType} from '../../settings';

const answerTypeToAnswerName = {
  [AnswerType.PHOTO]: `Фото`,
  [AnswerType.PAINT]: `Рисунок`
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
