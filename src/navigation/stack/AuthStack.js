/*eslint-disable*/
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScanCode, Onboarding, StoriesView, EventStories, Login, LunchingScreen } from '../../screen';
import NavString from '../../utils/NavString';
import InitialLoading from '../../screen/initialLoading/InitialLoading';

const Stack = createNativeStackNavigator();

const AuthStack = () => {

  return (
    <Stack.Navigator
      initialRouteName={NavString.INITIALLOADING}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={NavString.INITIALLOADING} component={InitialLoading} />
      <Stack.Screen name={NavString.LUNCHINGSCREEN} component={LunchingScreen} />
      <Stack.Screen name={NavString.LOGIN} component={Login} />
      <Stack.Screen name={NavString.SCAN_CODE} component={ScanCode} />
      <Stack.Screen name={NavString.ONBOARDING} component={Onboarding} />
      <Stack.Screen name={NavString.STORIESVIEW} component={StoriesView} />
      <Stack.Screen name={NavString.EVENTSTORIES} component={EventStories} />
    </Stack.Navigator>
  );
};

export default AuthStack;
