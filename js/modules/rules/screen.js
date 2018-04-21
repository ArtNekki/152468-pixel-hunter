import {changeView} from '../../util';
import RulesView from './view';
import Application from '../../Application';

export default () => {
  const rulesView = new RulesView();

  changeView(rulesView.element);

  rulesView.goNext = (name) => {
    Application.showGame(name);
  };
};
