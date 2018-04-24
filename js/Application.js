import IntroScreen from './modules/intro/screen';
import GreetingScreen from './modules/greeting/screen';
import RulesScreen from './modules/rules/screen';
import GameScreen from './modules/game/screen';
import ResultScreen from './modules/result/screen';

const container = document.querySelector(`#main`);

export const changeView = (element) => {
  container.innerHTML = ``;
  container.append(element);
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
    const gameScreen = new GameScreen(playerName);
    changeView(gameScreen.element);
    gameScreen.startGame();
  }

  static showResult(data) {
    const resultScreen = new ResultScreen(data);
    changeView(resultScreen.element);
  }
}
