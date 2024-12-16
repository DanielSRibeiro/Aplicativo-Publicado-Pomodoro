import {useCallback, useState} from 'react';
import {IInputStepper} from '../home/types';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {pomodoroAction, RootState} from '../../store/pomodoro';

export const useSettings = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const pomodoro = useSelector((state: RootState) => state.pomodoro.pomodoro);
  const [isEnabled, setIsEnabled] = useState(pomodoro.IsAutoStart);
  const [pomodoroTime, setTimeFocus] = useState(pomodoro.pomodoroTime / 60);
  const [breakTime, setTimeBreak] = useState(pomodoro.breakTime / 60);
  const [longBreakTime, setTimeLongBreak] = useState(
    pomodoro.longBreakTime / 60,
  );
  const [amountOfLongBreak, setAmountOfLongBreak] = useState(
    pomodoro.amountOfLongBreak,
  );

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const increaseTimeFocus = () => setTimeFocus(pomodoroTime + 1);
  const decreaseTimeFocus = () => setTimeFocus(pomodoroTime - 1);

  const increaseTimeBreak = () => setTimeBreak(breakTime + 1);
  const decreaseTimeBreak = () => setTimeBreak(breakTime - 1);

  const increaseTimeLongBreak = () => setTimeLongBreak(longBreakTime + 1);
  const decreaseTimeLongBreak = () => setTimeLongBreak(longBreakTime - 1);

  const increaseAmountOfLongBreak = () =>
    setAmountOfLongBreak(amountOfLongBreak + 1);
  const decreaseAmountOfLongBreak = () =>
    setAmountOfLongBreak(amountOfLongBreak - 1);

  const inputStepperFocus: IInputStepper = {
    title: 'Pomodoro',
    time: pomodoroTime,
    increaseTime: increaseTimeFocus,
    decreaseTime: decreaseTimeFocus,
  };

  const inputStepperBreak: IInputStepper = {
    title: 'Break',
    time: breakTime,
    increaseTime: increaseTimeBreak,
    decreaseTime: decreaseTimeBreak,
  };

  const inputStepperLongBreak: IInputStepper = {
    title: 'Long Break',
    time: longBreakTime,
    increaseTime: increaseTimeLongBreak,
    decreaseTime: decreaseTimeLongBreak,
  };

  const longBreakInterval: IInputStepper = {
    title: 'Long Break interval',
    time: amountOfLongBreak,
    increaseTime: increaseAmountOfLongBreak,
    decreaseTime: decreaseAmountOfLongBreak,
  };

  const onPressSave = useCallback(() => {
    dispatch(
      pomodoroAction.setPomodoro({
        pomodoroTime: pomodoroTime * 60,
        breakTime: breakTime * 60,
        longBreakTime: longBreakTime * 60,
        amountOfLongBreak,
        IsAutoStart: isEnabled,
        pomodoroSession: 1,
      }),
    );
    navigation.goBack();
  }, [
    dispatch,
    pomodoroTime,
    breakTime,
    longBreakTime,
    amountOfLongBreak,
    isEnabled,
    navigation,
  ]);

  return {
    inputStepperFocus,
    inputStepperBreak,
    inputStepperLongBreak,
    longBreakInterval,
    isEnabled,
    toggleSwitch,
    onPressSave,
  };
};
