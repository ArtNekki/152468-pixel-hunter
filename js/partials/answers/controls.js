import {AnswerType} from '../../settings';

const answerTypeToControlName = {
  [AnswerType.PHOTO]: `Фото`,
  [AnswerType.PAINT]: `Рисунок`
};

const controls = Object.values(AnswerType);

export default (index) => {
  return controls.map((it) => {
    return `<label class='game__answer game__answer--${it}'>
      <input name='question${index}' type='radio' value='${it}'>
      <span>${answerTypeToControlName[it]}</span>
    </label>`;
  }).join(``);
};
