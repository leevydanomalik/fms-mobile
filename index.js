/**
 * @format
 */

 import { AppRegistry } from 'react-native';
 import App from './App/Containers/App';
 import { name as appName } from './app.json';
 import { Text } from 'react-native'
 import { LogBox } from 'react-native';
 import messaging from '@react-native-firebase/messaging';
 import PushNotification from "react-native-push-notification";
 import { registerAppListener } from './App/Navigation/FcmListener';
 
 import codePush from 'react-native-code-push'
 
 let codePushOptions = {
     checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
     installMode: codePush.InstallMode.IMMEDIATE
 }
 codePush.allowRestart()
 let reApp = codePush(codePushOptions)(App)
 
 LogBox.ignoreAllLogs();
 
 Text.defaultProps = Text.defaultProps || {};
 Text.defaultProps.allowFontScaling = false;
 
 let click = false
 
 // bgMessaging = async (message: RemoteMessage) => {
 //     const notification = new firebase.notifications.Notification()
 //         .setNotificationId(new Date().getTime().toString())
 //         .setTitle(message.data.title)
 //         .setBody(message.data.body)
 //         .android.setChannelId('main-channel')
 //         .setData({
 //             key1: 'value1',
 //             key2: 'value2',
 //         });
 //     firebase.notifications().displayNotification(notification)
 //     return Promise.resolve()
 // }
 
 // bgActions = async (notificationOpen: NotificationOpen) => {
 //     let notificationId = notificationOpen.notification.notificationId
 //     firebase.notifications().removeDeliveredNotification(notificationId)
 // }
 
 PushNotification.configure({
     // (required) Called when a remote or local notification is opened or received
     // console.log("config")
     onNotification: function (notification) {
         console.log('LOCAL NOTIFICATION ==>', notification)
         if (notification.userInteraction) click = notification.userInteraction
         registerAppListener(notification, "notif", null);
         console.log("click", click)
     },
     popInitialNotification: true,
     requestPermissions: true
 })
 
 messaging().setBackgroundMessageHandler(async remoteMessage => {
     console.log('Message handled in the background!', remoteMessage);
     this.onDisplayNotification(remoteMessage)
 });
 
 onDisplayNotification = async (remoteMessage) => {
     PushNotification.createChannel(
         {
             channelId: "fms_channel", // (required)
             channelName: "My channel", // (required)
             channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
             soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
             importance: 4, // (optional) default: 4. Int value of the Android notification importance
             vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
         },
         (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
     );
 
     PushNotification.localNotification({
         autoCancel: true,
         channelId: "fms_channel",
         bigText: remoteMessage.data.body,
         subText: 'FCM Demo',
         title: remoteMessage.data.title,
         message: remoteMessage.data.body,
         vibrate: true,
         vibration: 300,
         playSound: true,
         soundName: 'default'
     })
 }
 
 AppRegistry.registerComponent(appName, () => reApp); 