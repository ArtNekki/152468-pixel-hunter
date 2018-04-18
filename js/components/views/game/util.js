// Возвращает массив элементов, которые были выбраны
export const getCheckedControls = (answers) => {
  return answers.filter(((answer) => {
    return answer.checked;
  }));
};
