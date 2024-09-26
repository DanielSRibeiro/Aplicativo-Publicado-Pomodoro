import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Route } from "../screens/types";
import Home from "../screens/home";
import Settings from "../screens/settings";
import { RootStackParamList } from "./types";
import { screenOptions } from "./utils";
import { Icon } from "react-native-elements";
import { colors } from "../utils/colors";
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackRoutes() {
  const { Navigator, Screen } = Stack;
  return (
    <Navigator
      initialRouteName={Route.Home}
      screenOptions={{ ...screenOptions }}
    >
      <Screen
        name={Route.Home}
        component={Home}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Route.Settings);
              }}
            >
              <Icon name="settings" size={25} color={colors.whiteColor} />
            </TouchableOpacity>
          ),
        })}
      />
      <Screen name={Route.Settings} component={Settings} />
    </Navigator>
  );
}
