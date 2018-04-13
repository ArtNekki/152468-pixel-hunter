import renderAnswer from '../answer/index';

const IMG_SIZE = {
  1: `width='705' height='455'`,
  2: `width='468' height='458'`,
  3: `width='304' height='455'`
};

export default ({questions, answers}) => questions.map((q, i) =>
  `<div class='game__option'>
      <img src=${q.img} alt='Option ${i + 1}' ${IMG_SIZE[questions.length]}>
      ${answers ? renderAnswer(answers[i], i) : ``}
    </div>`
).join(``);
