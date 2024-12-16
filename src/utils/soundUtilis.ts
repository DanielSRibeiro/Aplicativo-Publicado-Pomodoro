// import * as Haptics from "expo-haptics";
// import { Audio } from "expo-av";

// type SoundFiles = {
//   [key: string]: any;
// };
// const soundFiles: SoundFiles = {
//   beep: require("./../../assets/beep.mp3"),
// };

// export async function playSoundAndVibrate(soundFileKey: "beep", setSound: any) {
//   Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//   await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
//   const { sound } = await Audio.Sound.createAsync(soundFiles[soundFileKey]);
//   setSound(sound);
//   await sound.playAsync();
// }
