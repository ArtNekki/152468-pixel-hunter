import renderAnswerControls from './controls';
import {AnswerType, TaskType} from '../../settings';

const getSearchableElement = (answers) => {
  const paint = answers.filter((answer) => {
    return answer.type === AnswerType.PAINT;
  });

  return paint.length === 1 ? AnswerType.PAINT : AnswerType.PHOTO;
};

export default ({type: taskType, answers}) => {

  return answers.map((answer, i) => {
    i += 1;

    return `<div class='game__option ${(taskType === TaskType.FIND) && (answer.type === getSearchableElement(answers)) ? `game__option--selected` : ``}'>
        <img src=${answer.image.url} alt='Option ${i}'  width=${answer.image.width} height=${answer.image.height} type=${answer.type} />
        ${(taskType !== TaskType.FIND) ? renderAnswerControls(i) : ``}
      </div>`;
  }).join(``);
};
