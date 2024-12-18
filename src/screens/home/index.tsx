import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {styles} from './styles';
import {useHome} from './useHome';
import {useHeaderHeight} from '@react-navigation/elements';
import {IStepsInterval} from './types';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function Home() {
  const {
    isPlaying,
    duration,
    pomodoroSession,
    key,
    onComplete,
    onPressNext,
    onPressFocus,
    isFocus,
    steps,
    onPressReset,
    setRemainingTime,
    focusButtonText,
  } = useHome();

  const headerHeight = useHeaderHeight();
  const renderItem = ({item}: ListRenderItemInfo<IStepsInterval>) => {
    return (
      <View
        style={[
          styles.steps,
          item.isCompleted ? styles.darkColor : styles.whiteColor,
        ]}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.safeArea, {paddingTop: headerHeight}]}>
        <View style={styles.content}>
          <View style={styles.container}>
            <CountdownCircleTimer
              key={key}
              isPlaying={isPlaying}
              size={360}
              duration={duration}
              strokeWidth={10}
              trailStrokeWidth={2}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[1500, 900, 300, 0]}
              onComplete={onComplete}
              onUpdate={setRemainingTime}>
              {({remainingTime}) => {
                const minutes = Math.floor(remainingTime / 60);
                const seconds = remainingTime % 60;
                const minutesString =
                  minutes < 10 ? `0${minutes}` : `${minutes}`;
                const secondsString =
                  seconds < 10 ? `0${seconds}` : `${seconds}`;

                return (
                  <>
                    {isFocus && (
                      <Text
                        style={
                          styles.textNumberSessions
                        }>{`Pomodoro #${pomodoroSession}`}</Text>
                    )}
                    <Text
                      style={
                        styles.textTime
                      }>{`${minutesString}:${secondsString}`}</Text>
                  </>
                );
              }}
            </CountdownCircleTimer>
            <View style={styles.containerbuttons}>
              <TouchableOpacity style={styles.button} onPress={onPressFocus}>
                <Text>{focusButtonText}</Text>
              </TouchableOpacity>
              {isPlaying && (
                <TouchableOpacity style={styles.button} onPress={onPressNext}>
                  <Text>Next</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View>
            <FlatList
              horizontal
              keyExtractor={item => item.id.toString()}
              data={steps}
              renderItem={renderItem}
            />
          </View>
        </View>
        {isPlaying && (
          <TouchableOpacity style={styles.bottomButton} onPress={onPressReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
