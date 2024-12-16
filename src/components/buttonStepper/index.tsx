import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {IInputStepper} from '../../screens/home/types';
import {styles} from './styles';

export default function ButtonStepper({
  increaseTime,
  decreaseTime,
}: IInputStepper) {
  return (
    <View>
      <TouchableOpacity onPress={increaseTime}>
        <Text style={styles.buttonText}>▲</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={decreaseTime}>
        <Text style={styles.buttonText}>▼</Text>
      </TouchableOpacity>
    </View>
  );
}
