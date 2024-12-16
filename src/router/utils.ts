import {NativeStackNavigationOptions} from 'react-native-screens/lib/typescript/native-stack/types';
import {colors} from '../utils/colors';

export const screenOptions: Partial<NativeStackNavigationOptions> = {
  headerTintColor: colors.whiteColor,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerShown: true,
};
