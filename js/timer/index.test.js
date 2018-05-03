import {assert} from 'chai';
import createTimer from './index';

describe(`Функция создания таймера`, () => {

  it(`Должен выбрасывать ошибку, если параметр 'time' не число`, () => {
    assert.throws(() => createTimer(``));
  });

  it(`Должен выбрасывать ошибку, если параметр 'time' < 0`, () => {
    assert.throws(() => createTimer(-6));
  });

  it(`Возвращает обьект`, () => {
    assert.isObject(createTimer(30));
  });

  it(`Возвращамый обьект содержить параметр 'tick', значение которого функция`, () => {
    const timer = createTimer(30);
    assert.property(timer, `tick`);
    assert.isFunction(timer.tick);
  });
});

describe(`Проверка работы таймера`, () => {
  it(`Должен вернуть обьект при каждом вызове метода 'tick'`, () => {
    assert.isObject(createTimer(30).tick());
  });

  it(`Возвращаемый обьект содержит параметр 'done' с булевым значением`, () => {
    const timer = createTimer(30);
    assert.property(timer.tick(), `done`);
    assert.isBoolean(timer.tick().done);
  });

  it(`Возвращаемый обьект содержит параметр 'time' c числовым значением`, () => {
    const timer = createTimer(30);
    assert.property(timer.tick(), `time`);
    assert.isNumber(timer.tick().time);
  });

  it(`Каждый вызов метода tick, уменьшает время на 1`, () => {
    const timer = createTimer(30);
    assert.equal(timer.tick().time, 29);
    assert.equal(timer.tick().time, 28);
  });

  it(`Если время таймера > 0, параметр 'done' === false`, () => {
    assert.equal(createTimer(30).tick().done, false);
  });

  it(`Если время таймера === 0, параметр 'done' === true`, () => {
    assert.equal(createTimer(0).tick().done, true);
  });
});
