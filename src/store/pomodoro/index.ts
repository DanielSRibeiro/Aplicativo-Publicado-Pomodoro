import {createSlice} from '@reduxjs/toolkit';
import {store} from '..';
import {InitialState, PomoFocus} from './types';

const initialState: InitialState = {
  pomodoro: {
    pomodoroTime: 1500,
    breakTime: 300,
    longBreakTime: 900,
    amountOfLongBreak: 4,
    IsAutoStart: true,
    pomodoroSession: 1,
  },
  focus: PomoFocus.FOCUS,
};

const pomodoroSlice = createSlice({
  initialState,
  name: 'pomodoro',
  reducers: {
    setPomodoro: (state, action) => {
      return {
        ...state,
        pomodoro: action.payload,
      };
    },
    setFocus: (state, action) => {
      return {
        ...state,
        focus: action.payload,
      };
    },
    updatePomodoroSession: (state, action) => {
      return {
        ...state,
        pomodoro: {
          ...state.pomodoro,
          pomodoroSession: action.payload,
        },
      };
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const pomodoroAction = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
