// Тип заданий
export const TaskType = {
  GUESS_TWO: `game-1`,
  GUESS_ONE: `game-2`,
  FIND: `game-3`
};

// Сопоставляем тип задания и заголовок названия
const taskTypeToTaskTitle = {
  [TaskType.GUESS_TWO]: `Угадайте для каждого изображения фото или рисунок?`,
  [TaskType.GUESS_ONE]: `Угадайте для каждого изображения фото или рисунок?`,
  [TaskType.FIND]: `Угадайте для каждого изображения фото или рисунок?`,
};

// Структура заданий
export const TASKS = [
  {
    type: TaskType.GUESS_TWO,
    title: taskTypeToTaskTitle[TaskType.GUESS_TWO],
    questions: [
      {
        type: `photo`,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      },
      {
        type: `paint`,
        img: `https://k42.kn3.net/CF42609C8.jpg`
      }
    ]
  },
  {
    type: TaskType.GUESS_ONE,
    title: taskTypeToTaskTitle[TaskType.GUESS_ONE],
    questions: [
      {
        type: `photo`,
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
      }
    ]
  },
  {
    type: TaskType.FIND,
    title: taskTypeToTaskTitle[TaskType.FIND],
    questions: [
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/DKR1HtB.jpg`,
      },
      {
        type: `paint`,
        isSelected: true,
        img: `https://k32.kn3.net/5C7060EC5.jpg`
      },
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]
  },
  {
    type: TaskType.GUESS_TWO,
    title: taskTypeToTaskTitle[TaskType.GUESS_TWO],
    questions: [
      {
        type: `photo`,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      },
      {
        type: `paint`,
        img: `https://k42.kn3.net/CF42609C8.jpg`
      }
    ]
  },
  {
    type: TaskType.GUESS_ONE,
    title: taskTypeToTaskTitle[TaskType.GUESS_ONE],
    questions: [
      {
        type: `photo`,
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
      }
    ]
  },
  {
    type: TaskType.FIND,
    title: taskTypeToTaskTitle[TaskType.FIND],
    questions: [
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/DKR1HtB.jpg`,
      },
      {
        type: `paint`,
        isSelected: true,
        img: `https://k32.kn3.net/5C7060EC5.jpg`
      },
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]
  },
  {
    type: TaskType.GUESS_TWO,
    title: taskTypeToTaskTitle[TaskType.GUESS_TWO],
    questions: [
      {
        type: `photo`,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      },
      {
        type: `paint`,
        img: `https://k42.kn3.net/CF42609C8.jpg`
      }
    ]
  },
  {
    type: TaskType.GUESS_TWO,
    title: taskTypeToTaskTitle[TaskType.GUESS_TWO],
    questions: [
      {
        type: `photo`,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      },
      {
        type: `paint`,
        img: `https://k42.kn3.net/CF42609C8.jpg`
      }
    ]
  },
  {
    type: TaskType.GUESS_ONE,
    title: taskTypeToTaskTitle[TaskType.GUESS_ONE],
    questions: [
      {
        type: `photo`,
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
      }
    ]
  },
  {
    type: TaskType.FIND,
    title: taskTypeToTaskTitle[TaskType.FIND],
    questions: [
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/DKR1HtB.jpg`,
      },
      {
        type: `paint`,
        isSelected: true,
        img: `https://k32.kn3.net/5C7060EC5.jpg`
      },
      {
        type: `photo`,
        isSelected: false,
        img: `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]
  }
];
