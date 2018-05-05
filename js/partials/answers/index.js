import renderAnswerControls from './controls';
import {AnswerType, QuestionType} from '../../settings';

const getSearchableElement = (answers) => {
  const paints = answers.filter((answer) => {
    return answer.type === AnswerType.PAINT;
  });

  return paints.length === 1 ? AnswerType.PAINT : AnswerType.PHOTO;
};

export default ({type: questionType, answers}) => {

  return answers.map((answer, i) => {
    const isSelected = (questionType === QuestionType.FIND) && (answer.type === getSearchableElement(answers));
    const isNotFindQuestionType = questionType !== QuestionType.FIND;

    // нумерация начинается с 1, поэтому добавляем +1
    i += 1;

    return `<div class='game__option ${isSelected ? `game__option--selected` : ``}'>
        <img src=${answer.image.url} alt='Option ${i}'  width=${answer.image.width} height=${answer.image.height} type=${answer.type} />
        ${isNotFindQuestionType ? renderAnswerControls(i) : ``}
      </div>`;
  }).join(``);
};
