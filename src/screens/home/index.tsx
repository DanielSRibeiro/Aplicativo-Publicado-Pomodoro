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
import {homeLocales} from './locales/homeLocales';

export default function Home() {
  const {
    isPlaying,
    duration,
    key,
    onComplete,
    onPressNext,
    onPressFocus,
    steps,
    onPressReset,
    setRemainingTime,
    focusButtonText,
    focusDescription,
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
                return (
                  <>
                    <Text style={styles.textNumberSessions}>
                      {focusDescription}
                    </Text>
                    <Text style={styles.textTime}>
                      {homeLocales.getFormatTime(remainingTime)}
                    </Text>
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
                  <Text>{homeLocales.buttonNext}</Text>
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
            <Text style={styles.buttonText}>{homeLocales.buttonReset}</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
