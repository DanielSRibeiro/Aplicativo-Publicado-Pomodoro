import React from "react";
import { TextInput, View } from "react-native";
import Animated from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";
import { colors } from "../../utils/colors";
import { useProgressCircle } from "./useProgressCircle";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

export default function ProgressCircle() {
  const { animatedTextProps, animatedCircleProps, circumference } =
    useProgressCircle();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AnimatedText
        style={{
          color: "#37306B",
          fontSize: 24,
          fontWeight: "bold",
          position: "absolute",
        }}
        animatedProps={animatedTextProps}
      />
      <Svg height="80%" width="80%" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke={colors.whiteColor}
          strokeWidth="2"
          fill="transparent"
        />
        <AnimatedCircle
          animatedProps={animatedCircleProps}
          cx="50"
          cy="50"
          r="45"
          strokeDasharray={`${circumference}`}
          strokeWidth="2"
          fill="transparent"
        />
      </Svg>
    </View>
  );
}
