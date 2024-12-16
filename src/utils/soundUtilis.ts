import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export const playSound = () => {
  var sound = new Sound('beep.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      return;
    }
    sound.play();
  });
};
