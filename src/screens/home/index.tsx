import React from "react";
import ProgressCircle from "../../components/progressCircle";
import { View } from "react-native";
import { colors } from "../../utils/colors";

export default function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryColor }}>
      <ProgressCircle />
    </View>
  );
}
