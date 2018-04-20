import {changeView} from '../../util';
import ResultView from './view';

export default (state) => {
  const resultView = new ResultView(state);

  changeView(resultView.element);
};
