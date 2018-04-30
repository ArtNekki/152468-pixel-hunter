import {changeView} from './util';
import IntroScreen from './modules/intro/screen';
import GreetingScreen from './modules/greeting/screen';
import RulesScreen from './modules/rules/screen';
import GameScreen from './modules/game/screen';
import ResultScreen from './modules/result/screen';
import ErrorScreen from './modules/error/screen';
import LoadScreen from './modules/load/screen';
import Loader from './loader';

let taskData;
export default class Application {

  static start() {
    if (!taskData) {
      Application.showIntro();
      Loader.loadData()
          .then(Application.showGreeting)
          .catch((error) => {
            Application.showError(error);
          });
    } else {
      Application.showGreeting(taskData);
    }
  }

  static finish({state, player}) {
    Application.showLoad(player);
    Loader.saveResults(state, player)
        .then(() => Loader.loadResults(player))
        .then((result) => {
          Application.showResult(result, player);
        })
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

  static showResult(result, player) {
    const resultScreen = new ResultScreen({result, player});
    changeView(resultScreen.element);
  }

  static showLoad(player) {
    const loadScreen = new LoadScreen(player);
    changeView(loadScreen.element);
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    changeView(errorScreen.element);
  }
}
