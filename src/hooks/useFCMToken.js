import React, { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { useSelector } from 'react-redux';
import useApiEffect from './useApiEffect';
import { REFRESH_TOKEN_API } from '../services/ApiEndPoint';


const useFCMToken = () => {
  const [fcmToken, setFCMToken] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  //const { makeApiRequest, load } = useApiEffect()

  let savedToken = useSelector(state => state?.fcm?.token);


  // console.log('saved token---->', savedToken);
  // useEffect(() => {
  //   const requestUserPermission = async () => {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //     setPermissionStatus(enabled);
  //     // setLoading(false); // Set loading to false after permission request is completed

  //     if (enabled && savedToken === null) {
  //       console.log('Authorization status:', authStatus);
  //       getFcmToken();
  //     } else {
  //       setFCMToken(savedToken);
  //     }
  //   };

  //   const getFcmToken = async () => {
  //     const fcmToken = await messaging().getToken();
  //     console.log('FCM Token use FCM Token:', fcmToken);
  //     setFCMToken(fcmToken);
  //   };

  //   requestUserPermission();

  //   const unsubscribeOnTokenRefresh = messaging().onTokenRefresh((newToken) => {
  //     console.log('FCM Token Refreshed:', newToken);
  //     setFCMToken(newToken);
  //     // Handle the refreshed token, e.g., send it to your server
  //   });

  //   return () => {
  //     unsubscribeOnTokenRefresh();
  //   };
  // }, []);


  useEffect(() => {
    const checkPermission = async () => {
      const status = await messaging().hasPermission();
      setPermissionStatus(status);
      setLoading(false);
    };
    checkPermission();
  }, []);

  useEffect(() => {
    const getFCMToken = async () => {
      if (permissionStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        try {
          // await messaging().registerDeviceForRemoteMessages();
          //console.log('successfully register', await messaging().isDeviceRegisteredForRemoteMessages());
          const token = await messaging().getToken();
          console.log('token ', token);
          setFCMToken(token);
        } catch (error) {
          console.log('errror', error)
        }
      } else {
        console.log('error ');
      }
    };

    if (!loading && savedToken === null) {
      getFCMToken();
    } else {
      setFCMToken(savedToken);
    }

    const unsubscribeOnTokenRefresh = messaging().onTokenRefresh((newToken) => {
      console.log('FCM Token Refreshed:', newToken);
      setFCMToken(newToken);
      // REFRESH_TOKEN(newToken)
      // Handle the refreshed token, e.g., send it to your server
    });

    return () => {
      unsubscribeOnTokenRefresh();
    };

  }, [permissionStatus, loading]);

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      setPermissionStatus(messaging.AuthorizationStatus.AUTHORIZED);
    } catch (error) {
      setPermissionStatus(messaging.AuthorizationStatus.DENIED);
    } finally {
      setLoading(false); // Set loading to false after permission request is completed
    }
  };




  return {
    fcmToken,
    permissionStatus,
    requestPermission,
    loading,
  };
};

export default useFCMToken;
