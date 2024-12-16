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
import {TouchableOpacity} from 'react-native';
import Settings from '../screens/settings';
import {Icon} from 'react-native-elements';

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
              onPress={() => {
                navigation.navigate(Route.Settings);
              }}>
              <Icon name="settings" size={25} color={colors.whiteColor} />
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
