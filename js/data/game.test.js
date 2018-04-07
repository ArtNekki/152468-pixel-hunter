import {assert} from 'chai';
import {answer, answers} from './mock';
import {LIFE, calculateAnswerScore, calculateTotalGameScore} from './game';

describe(`функция calculateAnswerScore: проверка параметров`, () => {
  it(`Параметр 'answer' должен быть обьектом`, () => {
    assert.throws(() => calculateAnswerScore([]));
    assert.throws(() => calculateAnswerScore(1));
    assert.throws(() => calculateAnswerScore(`[]`));
    assert.throws(() => calculateAnswerScore(null));
    assert.throws(() => calculateAnswerScore(true));
  });

  it(`У параметра 'answer' должны быть свойства 'success' и 'time'`, () => {
    assert.doesNotThrow(() => calculateAnswerScore({success: true, time: 0}));
  });

  it(`Значение answer.success должно быть true или false, значение time должно быть числом`, () => {
    assert.doesNotThrow(() => calculateAnswerScore({success: true, time: 0}));
  });
});

describe(`Функция calculateAnswerScore: подсчет количества очков в конкретном ответе`, () => {
  it(`При медленной скорости ответа`, () => {
    assert.equal(50, calculateAnswerScore(answer.slow));
  });

  it(`При нормальной скорости ответа`, () => {
    assert.equal(100, calculateAnswerScore(answer.normal));
  });

  it(`При быстрой скорости ответа`, () => {
    assert.equal(150, calculateAnswerScore(answer.fast));
  });

  it(`При неверном ответе`, () => {
    assert.equal(0, calculateAnswerScore(answer.failed));
  });
});

describe(`Функция calculateTotalGameScore: проверка параметров`, () => {
  it(`Параметр 'answers' должен быть массивом`, () => {
    assert.throws(() => calculateTotalGameScore({}, LIFE.max));
    assert.throws(() => calculateTotalGameScore(`{}`, LIFE.max));
    assert.throws(() => calculateTotalGameScore(1, LIFE.max));
    assert.throws(() => calculateTotalGameScore(true, LIFE.max));
  });

  it(`Должно возращаться -1, если количество ответов меньше 10`, () => {
    const arr = answers.normal.slice();
    arr.length = 9;

    assert.equal(-1, calculateTotalGameScore(arr, LIFE.max));
  });

  it(`Параметр 'lives' должен быть указан как число`, () => {
    assert.throws(() => calculateTotalGameScore(answers.normal, `1`));
    assert.throws(() => calculateTotalGameScore(answers.normal, true));
    assert.throws(() => calculateTotalGameScore(answers.normal, {}));
    assert.throws(() => calculateTotalGameScore(answers.normal, []));
    assert.throws(() => calculateTotalGameScore(answers.normal, null));
  });

  it(`Должно быть указано количество жизней от 0 до 3, иначе ошибка`, () => {
    assert.throws(() => calculateTotalGameScore(answers.normal, -1));
    assert.throws(() => calculateTotalGameScore(answers.normal, 4));
  });
});

describe(`Функция calculateTotalGameScore: подсчет общего количества очков, с учетом количества жизней`, () => {
  it(`При медленной скорости ответов`, () => {
    assert.equal(650, calculateTotalGameScore(answers.slow, LIFE.max));
    assert.equal(600, calculateTotalGameScore(answers.slow, LIFE.medium));
    assert.equal(550, calculateTotalGameScore(answers.slow, LIFE.min));
    assert.equal(500, calculateTotalGameScore(answers.slow, LIFE.none));
  });

  it(`При нормальной скорости ответов`, () => {
    assert.equal(1150, calculateTotalGameScore(answers.normal, LIFE.max));
    assert.equal(1100, calculateTotalGameScore(answers.normal, LIFE.medium));
    assert.equal(1050, calculateTotalGameScore(answers.normal, LIFE.min));
    assert.equal(1000, calculateTotalGameScore(answers.normal, LIFE.none));
  });

  it(`При быстрой скорости ответов`, () => {
    assert.equal(1650, calculateTotalGameScore(answers.fast, LIFE.max));
    assert.equal(1600, calculateTotalGameScore(answers.fast, LIFE.medium));
    assert.equal(1550, calculateTotalGameScore(answers.fast, LIFE.min));
    assert.equal(1500, calculateTotalGameScore(answers.fast, LIFE.none));
  });
});
