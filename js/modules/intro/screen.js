import {changeView} from '../../util';
import showGreeting from '../greeting/screen';
import IntroView from './view';

export default () => {
  const introView = new IntroView();
  changeView(introView.element);

  introView.goNext = () => {
    showGreeting();
  };
};
