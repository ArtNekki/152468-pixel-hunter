import {AnswerTime, GAME_ROUNDS_COUNT} from '../../settings';

const StatusState = {
  UNKNOWN: `unknown`,
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`
};

const getStatItem = ({isCorrect, time} = {}) => {
  let status = StatusState.UNKNOWN;

  if (isCorrect) {
    status = StatusState.CORRECT;

    if (time < AnswerTime.FAST) {
      status = StatusState.FAST;
    } else if (time > AnswerTime.SLOW) {
      status = StatusState.SLOW;
    }

  } else if (isCorrect === false) {
    status = StatusState.WRONG;
  }

  return `<li class='stats__result stats__result--${status}'></li>`;
};

export default (answers = []) => {
  return [...answers, ...(new Array(GAME_ROUNDS_COUNT - answers.length))].map(getStatItem).join(``);
};
