import IntroScreen from './modules/intro/screen';
import GreetingScreen from './modules/greeting/screen';
import RulesScreen from './modules/rules/screen';
import GameScreen from './modules/game/screen';
import ResultScreen from './modules/result/screen';
import GameModel from './data/game-model';
import FooterView from './modules/footer/view';

const container = document.querySelector(`#main`);
let footer;

export const changeView = (element) => {
  if (!footer) {
    footer = new FooterView().element;
  }

  container.innerHTML = ``;
  container.append(element);

  if (!container.parentNode.contains(footer)) {
    container.after(footer);
  }
};

export default class Application {
  static showIntro() {
    const introScreen = new IntroScreen();
    changeView(introScreen.element);
  }

  static showGreeting() {
    const greetingScreen = new GreetingScreen();
    changeView(greetingScreen.element);
  }

  static showRules() {
    const rulesScreen = new RulesScreen();
    changeView(rulesScreen.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(playerName));
    changeView(gameScreen.element);
    gameScreen.startGame();
  }

  static showResult(data) {
    const resultScreen = new ResultScreen(data);
    changeView(resultScreen.element);
  }
}
