import {changeView, crossFadeScreen} from './util';
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
    const greetingScreen = new GreetingScreen();
    const introScreen = new IntroScreen();

    if (!taskData) {
      const startCrossFade = crossFadeScreen({outElement: introScreen.element, inElement: greetingScreen.element, duration: 2});

      Loader.loadData()
          .then((data) => {
            taskData = data;
            startCrossFade();
          })
          .catch((error) => {
            Application.showError(error);
          });
    } else {
      Application.showGreeting(taskData);
    }
  }

  static finish({state, player}) {
    Application.showResultPreloader(`${player}, подожите. Ваш результат загружается!`);
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

  static showGreeting() {
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

  static showResultPreloader(text) {
    const loadScreen = new LoadScreen(text);
    changeView(loadScreen.element);
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    changeView(errorScreen.element);
  }
}
