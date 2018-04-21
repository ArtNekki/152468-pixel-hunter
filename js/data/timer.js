export default (time) => {
  if (!Number.isFinite(time)) {
    throw new Error(`Параметр 'time' должен быть числом`);
  }

  if (time < 0) {
    throw new Error(`Параметр 'time' не должен быть < 0`);
  }

  return {
    tick() {
      if (time > 0) {
        time--;
      }

      const result = {
        done: false,
        time
      };

      if (time === 0) {
        result.done = true;
      }

      return result;
    }
  };
};
