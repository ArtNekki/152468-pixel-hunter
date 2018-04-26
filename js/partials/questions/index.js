import renderAnswerControls from '../answers/index';

const questionsLengthToImageSize = {
  1: `width='705' height='455'`,
  2: `width='468' height='458'`,
  3: `width='304' height='455'`
};

export default (questions = []) => questions.map((q, i) => {
  i += 1;

  return `<div class='game__option ${q.isSelected ? `game__option--selected` : ``}'>
      <img src=${q.img} alt='Option ${i}' ${questionsLengthToImageSize[questions.length]}>
      ${(`isSelected` in q) ? `` : renderAnswerControls(i)}
    </div>`;
}).join(``);
