import 'babel-polyfill';
import 'whatwg-fetch';
import Application from './Application';

document.addEventListener(`DOMContentLoaded`, () => {
  Application.start();
});
