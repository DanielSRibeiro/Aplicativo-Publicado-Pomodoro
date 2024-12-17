import React from 'react';
import {Text, TextInput, View} from 'react-native';
import ButtonStepper from '../buttonStepper';
import {IInputStepper} from '../../screens/home/types';
import {styles} from './styles';

export default function InputStepper(inputType: IInputStepper) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{inputType.title}</Text>
      <View style={styles.input}>
        <TextInput
          keyboardType="numeric"
          value={String(inputType.time)}
          disableFullscreenUI
        />
        <ButtonStepper {...inputType} />
      </View>
    </View>
  );
}
