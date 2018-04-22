import GameScreen from './modules/game/screen';
import GameModel from './data/game-model';
import renderResult from './modules/result/screen';
import {changeView} from './util';

export default class Application {
  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(playerName));
    gameScreen.startGame();
    changeView(gameScreen.element);
  }

  static showResult(state) {
    renderResult(state);
  }
}
