import {changeView} from '../../util';
import RulesView from './view';
import startGame from '../game/screen';

export default () => {
  const rulesView = new RulesView();

  changeView(rulesView.element);

  rulesView.goNext = () => {
    startGame();
  };
};
