import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {styles} from './styles';
import {useSettings} from './useSettings';
import {colors} from '../../utils/colors';
import InputStepper from '../../components/inputStepper';
import ButtonStepper from '../../components/buttonStepper';
import {settingsLocales} from './locales/settingsLocales';

export default function Settings() {
  const {
    inputStepperFocus,
    inputStepperBreak,
    inputStepperLongBreak,
    isEnabled,
    toggleSwitch,
    longBreakInterval,
    onPressSave,
  } = useSettings();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerSwitch}>
          <Text style={styles.text}>{settingsLocales.autoStart}</Text>
          <Switch
            style={styles.switch}
            trackColor={{
              false: colors.falseTaggeSwitch,
              true: colors.trueTaggeSwitch,
            }}
            thumbColor={colors.whiteColor}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <ScrollView style={styles.containerScroll}>
          <Text style={styles.title}>{settingsLocales.title}</Text>
          <Text style={styles.subtitle}>{settingsLocales.timeInMinute}</Text>
          <View style={styles.containerStepper}>
            <InputStepper {...inputStepperFocus} />
            <View style={styles.separator} />
            <InputStepper {...inputStepperBreak} />
            <View style={styles.separator} />
            <InputStepper {...inputStepperLongBreak} />
          </View>

          <View style={styles.containerStepper}>
            <Text style={styles.text}>{longBreakInterval.title}</Text>
            <View style={styles.input}>
              <Text>{String(longBreakInterval.time)}</Text>
              <ButtonStepper {...longBreakInterval} />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={onPressSave}>
            <Text style={styles.textButton}>{settingsLocales.buttonText}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
