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
    marginVertical: 32,
    marginHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 10,
  },
  textNumberSessions: {
    fontSize: 16,
    color: colors.whiteColor,
  },
  textTime: {
    fontSize: 64,
    color: colors.whiteColor,
  },
});
