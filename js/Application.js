import {changeView, crossFadeScreen} from './util';
import IntroScreen from './modules/intro/intro-screen';
import GreetingScreen from './modules/greeting/greeting-screen';
import RulesScreen from './modules/rules/rules-screen';
import GameScreen from './modules/game/game-screen';
import ResultScreen from './modules/result/result-screen';
import ErrorScreen from './modules/error/error-screen';
import LoadScreen from './modules/load/load-screen';
import Loader from './loader';

let gameData;
export default class Application {

  static async start() {
    const greetingScreen = new GreetingScreen();

    if (!gameData) {
      const introScreen = new IntroScreen();
      const runCrossFade = crossFadeScreen({outElement: introScreen.element, inElement: greetingScreen.element, duration: 2});

      try {
        gameData = await Loader.loadData();
        runCrossFade();
      } catch (e) {
        Application.showError(e);
      }
    } else {
      changeView(greetingScreen.element);
    }
  }

  static async finish({state, player}) {
    Application.showResultPreloader(`${player}, подожите. Ваш результат загружается!`);

    try {
      await Loader.saveResults(state, player);
      const result = await Loader.loadResults(player);
      Application.showResult(result, player);
    } catch (error) {
      Application.showError(error);
    }
  }

  static showRules() {
    const rulesScreen = new RulesScreen();
    changeView(rulesScreen.element);
  }

  static showGame(playerName) {
    const data = gameData;

    const gameScreen = new GameScreen({data, playerName});
    gameScreen.startGame();
    changeView(gameScreen.element);
  }

  static showResultPreloader(text) {
    const loadScreen = new LoadScreen(text);
    changeView(loadScreen.element);
  }

  static showResult(result, player) {
    const resultScreen = new ResultScreen({result, player});
    changeView(resultScreen.element);
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    changeView(errorScreen.element);
  }
}
