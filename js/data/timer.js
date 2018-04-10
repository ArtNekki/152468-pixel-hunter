export class Timer {
  constructor(time) {

    if (typeof time !== `number` || !isFinite(time)) {
      throw new Error(`Параметр 'time' должен быть числом`);
    }

    if (time <= 0) {
      throw new Error(`Параметр 'time' должен быть больше нуля`);
    }

    this._time = time;
  }

  tick() {
    if (this._time > 0) {
      this._time--;
    }

    if (this._time === 0) {
      return `Время вышло`;
    }

    return this._time;
  }
}

const timer = (time) => {
  if (typeof time !== `number` || !isFinite(time)) {
    throw new Error(`Параметр 'time' должен быть числом`);
  }

  if (time <= 0) {
    throw new Error(`Параметр 'time' должен быть больше нуля`);
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
