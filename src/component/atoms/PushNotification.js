// LocalNotification.js
import React, { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { Linking, Alert, Platform } from 'react-native';
import { checkNotifications, requestNotifications } from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux';
import { setReceivedNotification } from '../../redux/slices/NotificationSlice';
import { ShowToast } from '../../utils/Constant';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import NavString from '../../utils/NavString';
import NavigationService from './NavigationService';
import moment from 'moment';

var dispatch = null;

const LocalNotification = () => {
  dispatch = useDispatch();
  const checkAndRequestNotificationPermission = async () => {
    try {
      const { status } = await checkNotifications();

      if (status === 'blocked') {
        showAlert("Permission Blocked", "To enable notifications, go to Settings > Notifications and enable the app.");
      } else if (status === 'denied') {
        showAlert("Permission Blocked", "To enable notifications, go to Settings > Notifications and enable the app.");
      } else if (status === 'granted') {
        // ShowToast("Notification is enabled.");
      } else {
        const requestResult = await requestNotifications(['alert', 'sound', 'badge']);
        if (requestResult.status === 'granted') {
          // Permission granted after the request
        } else if (requestResult.status === 'blocked') {
          Alert.alert(
            'Permission Blocked',
            'To enable notifications, go to Settings > Notifications and enable the app.'
          );
        } else {
          Alert.alert('Permission Denied', 'You need to enable notifications to receive them.');
        }
      }
    } catch (error) {
      console.error('Error checking or requesting notification permission:', error);
    }
  };

  const showAlert = (title, msg) => {
    Alert.alert(
      title,
      msg,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Enable', onPress: () => Linking.openSettings() },
      ],
      { cancelable: false }
    );
  };


  useEffect(() => {
    // CHECK NOTIFICATION PERMISSION
    checkAndRequestNotificationPermission();
    // OneSignal.initialize(AppString.ONE_SIGNAL_APP_KEY);
    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    // OneSignal.Notifications.requestPermission(true);

    // console.log("token=============",OneSignal.getPermissionSubscriptionState().getSubscriptionStatus().getPushToken());


    // For One Signal Foreground Notification
    // OneSignal.setNotificationOpenedHandler(openedEvent => {
    //   console.log("OneSignal: notification opened:", openedEvent);
    //   const { action, notification } = openedEvent;
    // });

    // Handling received notifications (including foreground)
    // OneSignal.setNotificationReceivedHandler(notification => {
    //   console.log("OneSignal: notification received:", notification);
    //   // Handle the received notification as needed
    // });


    const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
      // DISPATCH PUSH NOTIFICATION FOR REFRESH THE PUNCH-IN SCREEN
      dispatch(setReceivedNotification(remoteMessage))
    });

    return () => {
      unsubscribeOnMessage();
    };


  }, []);

  // SHOW PUSH NOTIFICATION IN ANDROID DEVICE
  const showNotification = (remoteMessage) => {
    PushNotification.createChannel(
      {
        channelId: "local-channel", // (required)
        channelName: "Enviro Push", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    //PushNotification.cancelAllLocalNotifications();
    PushNotification.localNotification({
      channelId: "local-channel",
      title: remoteMessage?.data?.title,
      message: remoteMessage?.data?.body,
      bigText: remoteMessage?.data?.body,
      data: remoteMessage,
      id: "1",
      vibrate: true,
      soundName: "default",
      playSound: true,
    });
  };

  return null;
};

export default LocalNotification;


// FOR OPEN SCREEN AFTER CLICK ON PUSH NOTIFICATION
PushNotification.configure({
  onNotification: function (notification) {
    //WHEN USER CLICK ON PUSH NOTIFICATION
    if (notification.userInteraction) {
      //console.log("userInteraction==== ", notification);

      var flag = ""
      if (Platform.OS === 'ios') {
        flag = notification?.data?.flag
      } else {
        flag = notification?.data?.data?.flag
      }
      // Navigate to screen and replace it if already exists
      if (flag == 'Leave Approval' || flag == 'Attendance Regularization Approval') {
        NavigationService.navigate(NavString.RM_LEAVE_REQUEST)
      } else if (flag == 'Leave Rejected' || flag == 'Leave Approved') {
        NavigationService.navigate(NavString.LEAVE_DASHBOARD)
      } else if (flag == 'Attendance Regularization Rejected') {
        NavigationService.navigate(NavString.ATTENDANCE_REGULARIZATION)
      } else if (flag == 'Attendance Regularization Approval') {
        NavigationService.navigate(NavString.ATTENDANCE_REGULARIZATION)
      } else if (flag == 'Meeting') {
        NavigationService.navigate(NavString.MEETING_HOME)
      } else {
        NavigationService.navigate(NavString.DASHBOARD)
      }
    } else {
      //console.log("Notification received without user interaction ->", notification);
      //   // DISPATCH PUSH NOTIFICATION FOR REFRESH THE PUNCH-IN SCREEN
      const userPushInfo =
      {
        flag: notification?.data?.flag,
      }; /// Only For IOS

      if (notification.foreground) {
        dispatch(setReceivedNotification(notification))
      }
      if (Platform.OS == "ios") {
        PushNotificationIOS.addNotificationRequest({

          id: JSON.stringify(moment().format()),
          body: notification?.data?.body,
          title: notification?.data?.title,
          userInfo: userPushInfo,
          sound: "default",
        });
      } else {
        PushNotification.createChannel(
          {
            channelId: "local-channel", // (required)
            channelName: "Enviro Push", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
          },
          (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
        PushNotification.cancelAllLocalNotifications();
        PushNotification.localNotification({
          channelId: "local-channel",
          title: notification?.data?.title,
          message: notification?.data?.body,
          bigText: notification?.data?.body,
          data: notification,
          id: "1",
          vibrate: true,
          soundName: "default",
          playSound: true,
        });
      }
    }
  },
  onRegistrationError: function (err) {
    console.error("onRegistrationError= ", err.message, err);
  },
})