import renderAnswerControls from './controls';
import {AnswerType, TaskType} from '../../settings';

const answersLengthToImageSize = {
  1: `width='705' height='455'`,
  2: `width='468' height='458'`,
  3: `width='304' height='455'`
};

const getSearchableElement = (answers) => {
  const paint = answers.filter((answer) => {
    return answer.type === AnswerType.paint;
  });

  return paint.length === 1 ? AnswerType.paint : AnswerType.photo;
};

export default ({type: taskType, answers}) => {
  return answers.map((answer, i) => {
    i += 1;

    return `<div class='game__option ${(taskType === TaskType.FIND) && (answer.type === getSearchableElement(answers)) ? `game__option--selected` : ``}'>
        <img src=${answer.img} alt='Option ${i}' ${answersLengthToImageSize[answers.length]} type=${answer.type} />
        ${(taskType !== TaskType.FIND) ? renderAnswerControls(i) : ``}
      </div>`;
  }).join(``);
};
