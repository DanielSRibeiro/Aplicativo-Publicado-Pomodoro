export interface IPomodoro {
  pomodoroTime: number;
  breakTime: number;
  longBreakTime: number;
  amountOfLongBreak: number;
  IsAutoStart: boolean;
  pomodoroSession: number;
}

export interface InitialState {
  pomodoro: IPomodoro;
  focus: PomoFocus;
}

export enum PomoFocus {
  FOCUS = 'focus',
  BREAK = 'break',
  LONG_BREAK = 'long_break',
}
