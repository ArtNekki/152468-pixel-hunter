import HeaderView from './view';
import showIntro from '../intro/screen';

export default (state) => {
  console.log(state);
  const headerView = new HeaderView(state);

  headerView.goBack = () => {
    if (!state) {
      showIntro();
      return;
    }

    const back = window.confirm(`Хотите вернуться на экран приветствия? Все ваши ответы будут потеряны`);

    if (back) {
      showIntro();
    }
  };

  return headerView;
};
