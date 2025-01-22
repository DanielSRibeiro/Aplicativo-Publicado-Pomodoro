/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {colors} from '../utils/colors';
import Home from '../screens/home';
import {Route} from '../screens/types';
import {screenOptions} from './utils';
import {useSelector} from 'react-redux';
import {RootState} from '../store/pomodoro';
import {PomoFocus} from '../store/pomodoro/types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Settings from '../screens/settings';
import {Icon} from '../assets/icons';
import SVG from 'react-native-svg-renderer';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackRoutes() {
  const {Navigator, Screen} = Stack;
  const focus = useSelector((state: RootState) => state.pomodoro.focus);
  const themeColors = {
    [PomoFocus.FOCUS]: colors.primaryColor,
    [PomoFocus.BREAK]: colors.primaryColorBlue,
    [PomoFocus.LONG_BREAK]: colors.primaryColorGreen,
  };
  return (
    <Navigator
      initialRouteName={Route.Home}
      screenOptions={{
        ...screenOptions,
        headerStyle: {
          backgroundColor: themeColors[focus],
        },
        contentStyle: {backgroundColor: themeColors[focus]},
      }}>
      <Screen
        name={Route.Home}
        component={Home}
        options={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity
              style={styles.button}
              accessibilityLabel="settings button"
              onPress={() => {
                navigation.navigate(Route.Settings);
              }}>
              <SVG svgXmlData={Icon.settings} height={25} width={25} />
            </TouchableOpacity>
          ),
          headerTransparent: true,
          title: '',
        })}
      />
      <Screen name={Route.Settings} component={Settings} />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
  },
});
