import {ANSWER_TIME, ANSWERS_COUNT, SUCCESS, FAIL} from '../../data/game-score';

const getStatItem = ({isCorrect, time} = {}) => {
  let status = `unknown`;

  if (isCorrect === SUCCESS) {
    status = `correct`;

    if (time < ANSWER_TIME.fast) {
      status = `fast`;
    } else if (time > ANSWER_TIME.slow) {
      status = `slow`;
    }

  } else if (isCorrect === FAIL) {
    status = `wrong`;
  }

  return `<li class='stats__result stats__result--${status}'></li>`;
};

export default (answers = []) => {
  return [...answers, ...(new Array(ANSWERS_COUNT - answers.length))].map(getStatItem).join(``);
};
