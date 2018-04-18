import {changeView} from '../../util';
import GreetingView from './view';
import showRules from '../rules/screen';

export default () => {
  const greetingView = new GreetingView();

  changeView(greetingView.element);

  greetingView.goNext = () => {
    showRules();
  };
};
