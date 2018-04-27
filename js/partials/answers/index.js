import renderAnswerControls from './controls';

const answersLengthToImageSize = {
  1: `width='705' height='455'`,
  2: `width='468' height='458'`,
  3: `width='304' height='455'`
};

export default (answers = []) => answers.map((q, i) => {
  i += 1;

  return `<div class='game__option ${q.isSelected ? `game__option--selected` : ``}'>
      <img src=${q.img} alt='Option ${i}' ${answersLengthToImageSize[answers.length]}>
      ${answers.length < 3 ? renderAnswerControls(i) : ``}
    </div>`;
}).join(``);

// ${(`isSelected` in q) ? `` : renderAnswerControls(i)}
