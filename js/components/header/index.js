const drawHeart = (full) => `<img src='img/heart__${full ? `full` : `empty`}.svg' class='game__heart' alt='Life' width='32' height='32'>`;

const renderContentWithData = (data) =>
  `<h1 class='game__timer'>NN</h1>
  <div class='game__lives'>
    ${drawHeart(data.lives > 2)}
    ${drawHeart(data.lives > 1)}
    ${drawHeart(data.lives > 0)}
  </div>`;

export default (data) =>
  `<header class='header'>
    <div class='header__back'>
      <button class='back'>
        <img src='img/arrow_left.svg' width='45' height='45' alt='Back'>
        <img src='img/logo_small.svg' width='101' height='44'>
      </button>
    </div>
    ${data ? renderContentWithData(data) : ``}
  </header>`;
