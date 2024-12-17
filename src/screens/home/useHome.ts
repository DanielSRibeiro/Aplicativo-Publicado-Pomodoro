import {useCallback, useEffect, useMemo, useState} from 'react';
import {OnComplete} from 'react-native-countdown-circle-timer';
import {useDispatch, useSelector} from 'react-redux';
import {pomodoroAction, RootState} from './../../store/pomodoro';
import {PomoFocus} from '../../store/pomodoro/types';
import {AppState, AppStateStatus} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {playSound} from '../../utils/soundUtilis';

let i = 0;
let focusLocal: PomoFocus | undefined;
let pomodoroSessionLocal: number | undefined;
let isFisrt = false;

export const useHome = () => {
  const dispatch = useDispatch();

  const {focus, pomodoro} = useSelector((state: RootState) => state.pomodoro);
  const pomodoroSession = pomodoro.pomodoroSession;

  const [finish, setIsFinish] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [key, setKey] = useState(0);

  const focusButtonText = isPlaying ? 'Pause' : 'Goback to Focus';

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
      focus !== PomoFocus.BREAK
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
      playSound();
      setIsFinish(false);
      setIsPlaying(pomodoro.IsAutoStart);
    }
  }, [durations, finish, focus, pomodoro.IsAutoStart]);

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

  const startBackgroundSync = useCallback(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      i++;

      if (isFisrt && i < remainingTime) {
        return;
      }
      isFisrt = false;
      if (i < durations[focusLocal]) {
        return;
      }

      let pomoFocus = PomoFocus.FOCUS;
      let newSession = pomodoroSessionLocal;

      if (
        newSession >= pomodoro.amountOfLongBreak &&
        focusLocal !== PomoFocus.BREAK
      ) {
        newSession = 1;
        pomoFocus = PomoFocus.LONG_BREAK;
      } else if (focusLocal === PomoFocus.FOCUS) {
        newSession++;
        pomoFocus = PomoFocus.BREAK;
      }
      focusLocal = pomoFocus;
      pomodoroSessionLocal = newSession;
      i = 0;
      playSound();
    }, 1000);
  }, [remainingTime, durations, pomodoro.amountOfLongBreak]);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' && isPlaying) {
        focusLocal = focus;
        pomodoroSessionLocal = pomodoroSession;
        isFisrt = true;
        startBackgroundSync();
      } else if (nextAppState === 'active') {
        stopBackgroundSync();
        dispatch(pomodoroAction.updatePomodoroSession(pomodoroSessionLocal));
        dispatch(pomodoroAction.setFocus(focusLocal));
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [dispatch, focus, isPlaying, pomodoroSession, startBackgroundSync]);

  const stopBackgroundSync = () => {
    BackgroundTimer.stopBackgroundTimer();
  };

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
    setRemainingTime,
    focusButtonText,
  };
};
