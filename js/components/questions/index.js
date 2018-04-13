import renderAnswerControls from '../answers/index';

const IMG_SIZE = {
  1: `width='705' height='455'`,
  2: `width='468' height='458'`,
  3: `width='304' height='455'`
};

export default (questions) => questions.map((q, i = i + 1) => {
  i += 1;

  return `<div class='game__option'>
      <img src=${q.img} alt='Option ${i}' ${IMG_SIZE[questions.length]}>
      ${(`isSelected` in q) ? `` : renderAnswerControls(i)}
    </div>`;
}).join(``);
