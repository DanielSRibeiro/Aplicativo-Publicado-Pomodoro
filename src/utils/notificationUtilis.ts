import notifee, {AuthorizationStatus} from '@notifee/react-native';

export async function requestUserPermission() {
  try {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
    } else {
      console.log('User declined permissions');
    }
  } catch (error) {
    console.error('Erro ao chamar a permissão:', error);
  }
}
export async function onDisplayNotification(sessionMessages: string) {
  try {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      vibration: true,
      sound: 'beep',
    });
    await notifee.displayNotification({
      title: '<strong>Pomodoro Session Completed</strong>',
      body: sessionMessages,
      android: {
        channelId: 'default',
        pressAction: {
          id: 'default',
        },
      },
    });
  } catch (error) {
    console.error('Erro ao exibir notificação:', error);
  }
}
