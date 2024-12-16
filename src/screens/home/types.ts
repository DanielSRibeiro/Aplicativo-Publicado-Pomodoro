export interface IInputStepper {
  title: string;
  time: number;
  increaseTime: () => void;
  decreaseTime: () => void;
}

export interface IStepsInterval {
  id: number;
  isCompleted: boolean;
}
