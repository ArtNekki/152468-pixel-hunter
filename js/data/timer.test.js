import {assert} from 'chai';
import {createTimer} from './timer';

describe(`Проверка параметров таймера`, () => {

  it(`Должен выбрасывать ошибку, если параметр 'time' не число`, () => {
    assert.throws(() => createTimer(``));
  });

  it(`Должен выбрасывать ошибку, если параметр 'time' < 0`, () => {
    assert.throws(() => createTimer(-6));
  });

});

describe(`Проверка работы таймера`, () => {
  it(`Создает таймер с заданным количеством секунд`, () => {
    assert.equal(createTimer(30).time, 30);
  });

  it(`Уменьшает заданное время с каждым тиком`, () => {
    const timer = createTimer(30);
    assert.equal(timer.tick(), 29);
    assert.equal(timer.tick(), 28);
  });

  it(`Возвращает сообщение 'Время вышло', когда time === 0`, () => {
    const timer = createTimer(1);
    assert.equal(timer.tick(), `Время вышло`);
  });

});
