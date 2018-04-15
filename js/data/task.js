export const INITIAL_GAME = {
  task: {},
  tasks: [],
  answers: [],
  lives: 3
};

export const canContinue = ({lives, answers}) => {
  return (lives > -1) && answers.length < 10;
};

export const die = (game) => {
  const lives = game.lives - 1;

  return Object.assign({}, game, {
    lives
  });
};
