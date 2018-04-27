import {changeView} from './util';
import IntroScreen from './modules/intro/screen';
import GreetingScreen from './modules/greeting/screen';
import RulesScreen from './modules/rules/screen';
import GameScreen from './modules/game/screen';
import ResultScreen from './modules/result/screen';
import ErrorScreen from './modules/error/screen';
import Loader from './loader';

let taskData;
export default class Application {

  static start() {
    Application.showIntro();
    Loader.loadData()
        .then(Application.showGreeting)
        .catch((error) => {
          Application.showError(error);
        });
  }

  static showIntro() {
    const introScreen = new IntroScreen();
    changeView(introScreen.element);
  }

  static showGreeting(data) {
    taskData = data;
    const greetingScreen = new GreetingScreen();
    changeView(greetingScreen.element);
  }

  static showRules() {
    const rulesScreen = new RulesScreen();
    changeView(rulesScreen.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen({taskData, playerName});
    gameScreen.startGame();
    changeView(gameScreen.element);
  }

  static showResult(data) {
    const resultScreen = new ResultScreen(data);
    changeView(resultScreen.element);
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    changeView(errorScreen.element);
  }
}
