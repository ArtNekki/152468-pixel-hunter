// Определяет является ли параметр обьектом
const isObject = (obj) => {
  return !(obj instanceof Array) && (typeof obj === `object`);
};

// Бонус за оставшуюся жизнь
const LIFE_BONUS = 50;

// Количество очков за ответ
export const ANSWER_POINT = {
  default: 100,
  add: 50
};

// Количество ответов
export const ANSWERS_AMOUNT = 10;

// Варианты скорости ответов в миллисекундах
export const ANSWER_SPEED = {
  slow: 20000,
  normal: 11000,
  fast: 9999
};

// Количество жизней
export const LIFE = {
  max: 3,
  medium: 2,
  min: 1,
  none: 0
};

export const calculateAnswerScore = (answer) => {
  if (!isObject(answer)) {
    throw new Error(`Параметр 'answer' должен быть обьектом`);
  }

  if (!(`success` in answer)) {
    throw new Error(`У параметра answer отсутстувует свойство 'success'`);
  }

  if (!(`time` in answer)) {
    throw new Error(`У параметра answer отсутстувует свойство 'time'`);
  }

  if ((typeof answer.success) !== `boolean`) {
    throw new Error(`свойство answer.success должно быть true или false`);
  }

  if ((typeof answer.time) !== `number`) {
    throw new Error(`свойство answer.time должно быть числом`);
  }

  let score = 0;

  if (answer.success === false) {
    return score;
  }

  score = ANSWER_POINT.default;

  if (answer.time <= ANSWER_SPEED.fast) {
    score += ANSWER_POINT.add;
  }

  if (answer.time >= ANSWER_SPEED.slow) {
    score -= ANSWER_POINT.add;
  }

  return score;
};

export const calculateTotalGameScore = (answers, lives) => {
  if (!Array.isArray(answers)) {
    throw new Error(`Параметр 'answers' должен быть массивом`);
  }

  if (answers.length < ANSWERS_AMOUNT) {
    return -1;
  }

  if (typeof lives !== `number` || !isFinite(lives)) {
    throw new Error(`Параметр 'lives' должен быть числом`);
  }

  if (lives < LIFE.none || lives > LIFE.max) {
    throw new Error(`Переданное количество жизней должно быть от 0 до 3`);
  }

  const answersScore = answers.reduce((sum, current) => {
    return sum + calculateAnswerScore(current);
  }, 0);

  return answersScore + lives * LIFE_BONUS;
};

export class Timer {
  constructor(time) {
    // if (typeof time !== `number` || !isFinite(time)) {
    //   throw new Error(`Параметр 'time' должен быть числом`);
    // }
    //
    // if (time <= 0) {
    //   throw new Error(`Параметр 'time' должен быть больше нуля`);
    // }


    this._time = time;
    this._step = 1000;
    // this._createElement();
  }

  run() {
    return new Promise((resolve) => {
      this._timerId = setInterval(() => {
        if (!this._tick()) {
          this.stop();
          resolve(`time is out`);
        }

      }, this._step);
    });
  }

  stop() {
    clearInterval(this._timerId);
  }

  _tick() {
    // this._updateElement();
    return this._time--;
  }

  // _createElement() {
  //   this._el = document.createElement(`div`);
  //   document.body.appendChild(this._el);
  // }
  //
  // _updateElement() {
  //   this._el.innerHTML = this._time;
  // }
}
