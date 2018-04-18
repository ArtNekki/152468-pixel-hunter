import HeaderView from './view';
import showIntro from '../intro/screen';

export default (state) => {
  const headerView = new HeaderView(state);

  headerView.goBack = () => {
    showIntro();
  };

  return headerView.element;
};
