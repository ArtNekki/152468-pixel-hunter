import {changeView} from './util';
import IntroView from './components/intro/index';
import GreetingView from './components/greeting/index';
import RulesView from './components/rules/index';

let introView;
let greetingView;
let rulesView;
let gameView;
let resultView;

document.addEventListener(`DOMContentLoaded`, () => {
  introView = new IntroView();
  changeView(introView.element);

  introView.onNextClick = () => {
    greetingView = new GreetingView();
    changeView(greetingView.element);

    greetingView.onNextClick = () => {
      rulesView = new RulesView();
      changeView(rulesView.element);
    };
  };
});

// Если в разметке есть кнопка, для возврата назад, то при нажатии на нее
// возвращаемся на первый экран
// document.addEventListener(`click`, (e) => {
//   const goHomeButton = e.target.closest(`.back`);
//
//   if (!goHomeButton) {
//     return;
//   }
//
//   changeView(renderIntro());
// });
