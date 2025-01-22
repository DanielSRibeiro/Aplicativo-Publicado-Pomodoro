import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  bottomButton: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerbuttons: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: 48,
    marginVertical: 32,
    marginHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    justifyContent: 'center',
  },
  textNumberSessions: {
    fontSize: 16,
    color: colors.whiteColor,
  },
  textTime: {
    fontSize: 64,
    color: colors.whiteColor,
  },
  steps: {
    width: 35,
    height: 35,
    marginHorizontal: 4,
    borderRadius: 50,
  },
  darkColor: {
    backgroundColor: colors.darkPrimaryColor,
  },
  whiteColor: {
    backgroundColor: colors.whiteColor,
  },
});
