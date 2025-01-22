import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.whiteColor,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.whiteColor,
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    color: colors.whiteColor,
    fontSize: 16,
  },
  containerSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  containerStepper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    width: 100,
    paddingHorizontal: 8,
    backgroundColor: colors.lightPrimaryColor,
  },
  button: {
    marginVertical: 32,
    marginHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 14,
    borderRadius: 25,
  },
  textButton: {
    fontSize: 18,
  },
  switch: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  separator: {
    marginHorizontal: 8,
  },
  containerScroll: {
    margin: 16,
  },
});
