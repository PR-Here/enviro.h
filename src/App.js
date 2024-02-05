import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import LocalNotification from './component/atoms/PushNotification';
import MainStack from './navigation/stack/MainStack';
import useNetworkStatus from './hooks/useNetworkStatus';
import NoInternetConnection from './component/atoms/NoInternetConnection';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

// Initialize Firebase Analytics

if (!__DEV__) {
  // Initialize Crashlytics
  crashlytics().setCrashlyticsCollectionEnabled(true);
  // Initialize analytics
  analytics().setAnalyticsCollectionEnabled(true);
}

const App = () => {
  const isConnected = useNetworkStatus();

  // Splash screen
  useEffect(() => {
    SplashScreen.hide();
  }, []);


  useEffect(() => {
    //console.log("IsConnected---------------- ", isConnected);
  }, [isConnected]);


  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainStack />
          <LocalNotification />
        </PersistGate>
      </Provider>
      {/* CHECK INTERNET IS CONNECTED OR NOT */}
      {!isConnected && <NoInternetConnection />}
    </>
  );
};

export default App;



