import {useCallback, useEffect, useMemo, useState} from 'react';
import {OnComplete} from 'react-native-countdown-circle-timer';
import {useDispatch, useSelector} from 'react-redux';
import {pomodoroAction, RootState} from './../../store/pomodoro';
import {PomoFocus} from '../../store/pomodoro/types';
// import {playSoundAndVibrate} from '../../utils/soundUtilis';
// import {Audio} from 'expo-av';

export const useHome = () => {
  const dispatch = useDispatch();

  const {focus, pomodoro} = useSelector((state: RootState) => state.pomodoro);
  const pomodoroSession = pomodoro.pomodoroSession;

  const [finish, setIsFinish] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  //   const [sound, setSound] = useState<Audio.Sound>();
  const [key, setKey] = useState(0);

  const durations = useMemo(
    () => ({
      [PomoFocus.FOCUS]: pomodoro.pomodoroTime,
      [PomoFocus.BREAK]: pomodoro.breakTime,
      [PomoFocus.LONG_BREAK]: pomodoro.longBreakTime,
    }),
    [pomodoro],
  );

  const steps = useMemo(() => {
    return Array.from({length: pomodoro.amountOfLongBreak}, (_, i) => ({
      id: i + 1,
      isCompleted: i < pomodoroSession - 1,
    }));
  }, [pomodoroSession, pomodoro.amountOfLongBreak]);

  const nextStep = useCallback(() => {
    let pomoFocus = PomoFocus.FOCUS;
    let newSession = pomodoroSession;

    if (
      pomodoroSession >= pomodoro.amountOfLongBreak &&
      focus != PomoFocus.BREAK
    ) {
      newSession = 1;
      pomoFocus = PomoFocus.LONG_BREAK;
    } else if (focus === PomoFocus.FOCUS) {
      newSession++;
      pomoFocus = PomoFocus.BREAK;
    }

    dispatch(pomodoroAction.updatePomodoroSession(newSession));
    dispatch(pomodoroAction.setFocus(pomoFocus));
  }, [dispatch, focus, pomodoro.amountOfLongBreak, pomodoroSession]);

  useEffect(() => {
    setDuration(durations[focus]);
    if (finish) {
      //   playSoundAndVibrate('beep', setSound);
      setIsFinish(false);
      setIsPlaying(pomodoro.IsAutoStart);
    }
  }, [durations, finish, focus, pomodoro.IsAutoStart]);

  //   useEffect(() => {
  //     return () => {
  //       sound?.unloadAsync();
  //     };
  //   }, [sound]);

  const onComplete = useCallback((): OnComplete => {
    setIsFinish(true);
    nextStep();
    return {shouldRepeat: true};
  }, [nextStep]);

  const onPressFocus = () => setIsPlaying(prev => !prev);

  const onPressNext = useCallback(() => {
    setKey(prevKey => prevKey + 1);
    setIsFinish(true);
    nextStep();
  }, [nextStep]);

  const onPressReset = () => {
    setKey(prevKey => prevKey + 1);
    setIsFinish(true);
    dispatch(pomodoroAction.updatePomodoroSession(1));
    dispatch(pomodoroAction.setFocus(PomoFocus.FOCUS));
  };

  const isFocus = useMemo(() => focus === PomoFocus.FOCUS, [focus]);

  return {
    isPlaying,
    duration,
    pomodoroSession,
    key,
    setKey,
    onComplete,
    onPressNext,
    onPressFocus,
    isFocus,
    steps,
    onPressReset,
  };
};
