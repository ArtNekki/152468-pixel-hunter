import {isNumber} from '../is';

export const createTimer = (time) => {
  if (!isNumber(time)) {
    throw new Error(`Параметр 'time' должен быть числом`);
  }

  if (time < 0) {
    throw new Error(`Параметр 'time' должен не должен быть < 0`);
  }

  return {
    time,
    tick() {
      if (this.time > 0) {
        this.time--;
      }

      if (this.time === 0) {
        return `Время вышло`;
      }

      return this.time;
    }
  };
};
