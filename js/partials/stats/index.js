import {AnswerTime, GAME_ROUNDS_COUNT} from '../../settings';

const StatusState = {
  unknown: `unknown`,
  correct: `correct`,
  fast: `fast`,
  slow: `slow`,
  wrong: `wrong`
};

const getStatItem = ({isCorrect, time} = {}) => {
  let status = StatusState.unknown;

  if (isCorrect) {
    status = StatusState.correct;

    if (time < AnswerTime.FAST) {
      status = StatusState.fast;
    } else if (time > AnswerTime.SLOW) {
      status = StatusState.slow;
    }

  } else if (isCorrect === false) {
    status = StatusState.wrong;
  }

  return `<li class='stats__result stats__result--${status}'></li>`;
};

export default (answers = []) => {
  return [...answers, ...(new Array(GAME_ROUNDS_COUNT - answers.length))].map(getStatItem).join(``);
};
