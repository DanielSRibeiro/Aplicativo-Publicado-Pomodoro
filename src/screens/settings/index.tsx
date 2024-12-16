import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {styles} from './styles';
import {useSettings} from './useSettings';
import {colors} from '../../utils/colors';
import InputStepper from '../../components/inputStepper';
import ButtonStepper from '../../components/buttonStepper';

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
          <Text style={styles.text}>Auto Start</Text>
          <Switch
            trackColor={{
              false: colors.falseTaggeSwitch,
              true: colors.trueTaggeSwitch,
            }}
            thumbColor={colors.whiteColor}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <ScrollView style={{margin: 16}}>
          <Text style={styles.title}>Timer Control</Text>
          <Text style={styles.subtitle}>Time in minutes</Text>
          <View style={styles.containerStepper}>
            <InputStepper {...inputStepperFocus} />
            <View style={{marginHorizontal: 8}} />
            <InputStepper {...inputStepperBreak} />
            <View style={{marginHorizontal: 8}} />
            <InputStepper {...inputStepperLongBreak} />
          </View>

          <View style={styles.containerStepper}>
            <Text style={styles.text}>{longBreakInterval.title}</Text>
            <View style={styles.input}>
              <TextInput
                keyboardType="numeric"
                value={String(longBreakInterval.time)}
                disableFullscreenUI
              />
              <ButtonStepper {...longBreakInterval} />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={onPressSave}>
            <Text style={styles.textButton}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
