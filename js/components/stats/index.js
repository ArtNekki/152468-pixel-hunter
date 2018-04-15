import {ANSWER_TIME, ANSWERS_COUNT, SUCCESS, FAIL} from '../../data/game-score';

const STATUS_STATE = {
  unknown: `unknown`,
  correct: `correct`,
  fast: `fast`,
  slow: `slow`,
  wrong: `wrong`
};

const getStatItem = ({isCorrect, time} = {}) => {
  let status = STATUS_STATE.unknown;

  if (isCorrect === SUCCESS) {
    status = STATUS_STATE.correct;

    if (time < ANSWER_TIME.fast) {
      status = STATUS_STATE.fast;
    } else if (time > ANSWER_TIME.slow) {
      status = STATUS_STATE.slow;
    }

  } else if (isCorrect === FAIL) {
    status = STATUS_STATE.wrong;
  }

  return `<li class='stats__result stats__result--${status}'></li>`;
};

export default (answers = []) => {
  return [...answers, ...(new Array(ANSWERS_COUNT - answers.length))].map(getStatItem).join(``);
};
