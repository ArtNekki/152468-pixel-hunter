import renderAnswer from '../answer/index';

const IMG_SIZE = {
  1: `width='705' height='455'`,
  2: `width='468' height='458'`,
  3: `width='304' height='455'`
};

export default (questions) => questions.map((q, i = i + 1) => {
  i += 1;
console.log(questions);
  return `<div class='game__option'>
      <img src=${q.img} alt='Option ${i}' ${IMG_SIZE[questions.length]}>
      ${(`isSelected` in q) ? `` : renderAnswer(i)}
    </div>`;
}).join(``);
