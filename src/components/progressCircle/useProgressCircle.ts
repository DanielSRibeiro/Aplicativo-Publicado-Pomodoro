import { useEffect } from "react";
import {
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const useProgressCircle = () => {
  const radius = 45;
  const circumference = radius * Math.PI * 2;
  const duration = 60000;
  const strokeOffset = useSharedValue(circumference);

  const percentage = useDerivedValue(() => {
    const number = ((circumference - strokeOffset.value) / circumference) * 100;
    return withTiming(number, { duration: duration });
  });

  const strokeColor = useDerivedValue(() => {
    return interpolateColor(
      percentage.value,
      [0, 50, 100],
      ["#9E4784", "#66347F", "#37306B"]
    );
  });

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: duration }),
      stroke: strokeColor.value,
    };
  });

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentage.value)} %`,
      defaultValue: `0`,
    };
  });

  useEffect(() => {
    strokeOffset.value = 0;
  }, []);

  return {
    animatedTextProps,
    animatedCircleProps,
    circumference,
  };
};
