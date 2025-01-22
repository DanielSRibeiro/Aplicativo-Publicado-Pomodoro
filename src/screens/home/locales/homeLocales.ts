import {PomoFocus} from '../../../store/pomodoro/types';

export const homeLocales = {
  buttonNext: 'Next',
  buttonReset: 'Reset',
  getFormatTime: (remainingTime: number): string => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutesString}:${secondsString}`;
  },
  pause: 'Pause',
  goBackText: 'Goback to Focus',
  getPomodoroSession: (pomodoroSession: number) =>
    `Pomodoro #${pomodoroSession}`,

  sessionMessages: (pomoFocus: PomoFocus) => {
    return {
      [PomoFocus.FOCUS]: "Time to focus! Let's get things done.",
      [PomoFocus.BREAK]: 'Focus session complete! Time for a break.',
      [PomoFocus.LONG_BREAK]: 'Time for a long break! Unwind and refresh.',
    }[pomoFocus];
  },
};
