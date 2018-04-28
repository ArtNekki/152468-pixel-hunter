import HeaderView from './view';
import Application from '../../Application';

export default (state) => {
  const headerView = new HeaderView(state);

  headerView.goBack = () => {
    if (!state) {
      Application.start();
      return;
    }

    const back = window.confirm(`Хотите вернуться на экран приветствия? Все ваши ответы будут потеряны`);

    if (back) {
      Application.start();
    }
  };

  return headerView;
};
