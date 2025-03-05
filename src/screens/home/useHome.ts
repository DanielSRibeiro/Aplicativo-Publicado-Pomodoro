import {useCallback, useEffect, useMemo, useState} from 'react';
import {OnComplete} from 'react-native-countdown-circle-timer';
import {useDispatch, useSelector} from 'react-redux';
import {pomodoroAction, RootState} from './../../store/pomodoro';
import {PomoFocus} from '../../store/pomodoro/types';
import {AppState, AppStateStatus} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {playSound} from '../../utils/soundUtilis';
import {homeLocales} from './locales/homeLocales';
import {settingsLocales} from '../settings/locales/settingsLocales';
import {
  onDisplayNotification,
  requestUserPermission,
} from '../../utils/notificationUtilis';

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

  const focusButtonText = isPlaying
    ? homeLocales.pause
    : homeLocales.goBackText;

  const durations = useMemo(
    () => ({
      [PomoFocus.FOCUS]: pomodoro.pomodoroTime,
      [PomoFocus.BREAK]: pomodoro.breakTime,
      [PomoFocus.LONG_BREAK]: pomodoro.longBreakTime,
    }),
    [pomodoro],
  );

  const focusDescription = useMemo(
    () => ({
      [PomoFocus.FOCUS]: homeLocales.getPomodoroSession(pomodoroSession),
      [PomoFocus.BREAK]: settingsLocales.breakText,
      [PomoFocus.LONG_BREAK]: settingsLocales.longBreakText,
    }),
    [pomodoroSession],
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

  const startBackgroundSync = useCallback(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      if (
        !focusLocal ||
        !pomodoroSessionLocal ||
        (!pomodoro.IsAutoStart && !isFisrt)
      ) {
        return;
      }
      i++;

      if (isFisrt && i < remainingTime) {
        return;
      }
      if (!isFisrt && i < durations[focusLocal]) {
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
      if (!isFisrt) {
        dispatch(pomodoroAction.updatePomodoroSession(pomodoroSessionLocal));
        dispatch(pomodoroAction.setFocus(focusLocal));
      }
      onDisplayNotification(homeLocales.sessionMessages(focusLocal));
      isFisrt = false;
    }, 1000);
  }, [
    pomodoro.IsAutoStart,
    pomodoro.amountOfLongBreak,
    remainingTime,
    durations,
    dispatch,
  ]);

  useEffect(() => {
    requestUserPermission();
    try {
      const handleAppStateChange = async (nextAppState: AppStateStatus) => {
        if (nextAppState === 'background' && isPlaying) {
          focusLocal = focus;
          pomodoroSessionLocal = pomodoroSession;
          isFisrt = true;
          startBackgroundSync();
        } else if (nextAppState === 'active') {
          stopBackgroundSync();
        }
      };

      const subscription = AppState.addEventListener(
        'change',
        handleAppStateChange,
      );

      return () => {
        subscription.remove();
      };
    } catch (error) {
      console.error('Erro:', error);
    }
  }, [dispatch, focus, isPlaying, pomodoroSession, startBackgroundSync]);

  const stopBackgroundSync = () => {
    BackgroundTimer.stopBackgroundTimer();
  };

  return {
    isPlaying,
    duration,
    key,
    setKey,
    onComplete,
    onPressNext,
    onPressFocus,
    steps,
    onPressReset,
    setRemainingTime,
    focusButtonText,
    focusDescription: focusDescription[focus],
  };
};
