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
};
