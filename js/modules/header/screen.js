import HeaderView from './view';
import Confirm from '../confirm/index';
import Application from '../../Application';

export default (state) => {
  const headerView = new HeaderView(state);

  headerView.goBack = () => {
    if (!state) {
      Application.start();
      return;
    }

    const confirm = new Confirm(`Хотите вернуться на экран приветствия? Все ваши ответы будут потеряны!`);
    confirm.isOk = () => {
      Application.start();
    };
  };

  return headerView;
};
