import {assert} from 'chai';
import {answer, answers} from './mock';
import {LIFE, calculateAnswerPoints, calculateTotalGamePoints} from './game';

describe(`функция calculateAnswerPoints: проверка параметров`, () => {
  it(`Параметр 'answer' должен быть обьектом`, () => {
    assert.throws(() => calculateAnswerPoints([]));
    assert.throws(() => calculateAnswerPoints(1));
    assert.throws(() => calculateAnswerPoints(`[]`));
    assert.throws(() => calculateAnswerPoints(null));
    assert.throws(() => calculateAnswerPoints(true));
  });

  it(`У параметра 'answer' должны быть свойства 'success' и 'time'`, () => {
    assert.doesNotThrow(() => calculateAnswerPoints({success: true, time: 0}));
  });

  it(`Значение answer.success должно быть true или false, значение time должно быть числом`, () => {
    assert.doesNotThrow(() => calculateAnswerPoints({success: true, time: 0}));
  });
});

describe(`Функция calculateAnswerPoints: подсчет количества очков в конкретном ответе`, () => {
  it(`При медленной скорости ответа`, () => {
    assert.equal(50, calculateAnswerPoints(answer.slow));
  });

  it(`При нормальной скорости ответа`, () => {
    assert.equal(100, calculateAnswerPoints(answer.normal));
  });

  it(`При быстрой скорости ответа`, () => {
    assert.equal(150, calculateAnswerPoints(answer.fast));
  });

  it(`При неверном ответе`, () => {
    assert.equal(0, calculateAnswerPoints(answer.failed));
  });
});

describe(`Функция calculateTotalGamePoints: проверка параметров`, () => {
  it(`Параметр 'answers' должен быть массивом`, () => {
    assert.throws(() => calculateTotalGamePoints({}, LIFE.full));
    assert.throws(() => calculateTotalGamePoints(`{}`, LIFE.full));
    assert.throws(() => calculateTotalGamePoints(1, LIFE.full));
    assert.throws(() => calculateTotalGamePoints(true, LIFE.full));
  });

  it(`Должно возращаться -1, если количество ответов меньше 10`, () => {
    const arr = answers.normal.slice();
    arr.length = 9;

    assert.equal(-1, calculateTotalGamePoints(arr, LIFE.full));
  });

  it(`Параметр 'lives' должен быть указан как число`, () => {
    assert.throws(() => calculateTotalGamePoints(answers.normal, `1`));
    assert.throws(() => calculateTotalGamePoints(answers.normal, true));
    assert.throws(() => calculateTotalGamePoints(answers.normal, {}));
    assert.throws(() => calculateTotalGamePoints(answers.normal, []));
    assert.throws(() => calculateTotalGamePoints(answers.normal, null));
  });

  it(`Должно быть указано количество жизней от 0 до 3, иначе ошибка`, () => {
    assert.throws(() => calculateTotalGamePoints(answers.normal, -1));
    assert.throws(() => calculateTotalGamePoints(answers.normal, 4));
  });
});

describe(`Функция calculateTotalGamePoints: подсчет общего количества очков, с учетом количества жизней`, () => {
  it(`При медленной скорости ответов`, () => {
    assert.equal(650, calculateTotalGamePoints(answers.slow, LIFE.full));
    assert.equal(600, calculateTotalGamePoints(answers.slow, LIFE.normal));
    assert.equal(550, calculateTotalGamePoints(answers.slow, LIFE.minimum));
    assert.equal(500, calculateTotalGamePoints(answers.slow, LIFE.none));
  });

  it(`При нормальной скорости ответов`, () => {
    assert.equal(1150, calculateTotalGamePoints(answers.normal, LIFE.full));
    assert.equal(1100, calculateTotalGamePoints(answers.normal, LIFE.normal));
    assert.equal(1050, calculateTotalGamePoints(answers.normal, LIFE.minimum));
    assert.equal(1000, calculateTotalGamePoints(answers.normal, LIFE.none));
  });

  it(`При быстрой скорости ответов`, () => {
    assert.equal(1650, calculateTotalGamePoints(answers.fast, LIFE.full));
    assert.equal(1600, calculateTotalGamePoints(answers.fast, LIFE.normal));
    assert.equal(1550, calculateTotalGamePoints(answers.fast, LIFE.minimum));
    assert.equal(1500, calculateTotalGamePoints(answers.fast, LIFE.none));
  });
});
