/*eslint-disable*/

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFCMToken from '../../hooks/useFCMToken';
import { setToken } from '../../redux/slices/FcmSlice';
import GurukulBottomNavigation from '../../screen/gurukul/bottom_navigation/GurukulBottomNavigation';
import NavString from '../../utils/NavString';
import BottomNavigation from '../bottom/BottomNavigation';
import AuthStack from './AuthStack';
import NavigationService from '../../component/atoms/NavigationService';
import analytics, { getAnalytics } from '@react-native-firebase/analytics';
import { calculateAge } from '../../utils/Constant';

const Stack = createNativeStackNavigator();

const MainStack = () => {

  // We are saving Fcm token here in Redux store.
  const dispatch = useDispatch();
  const { fcmToken, permissionStatus, requestPermission, loading } = useFCMToken();

  useEffect(() => {
    requestPermission();
    if (loading) {
      return; // If Loading in progress,skip further logic
    }
    console.log("FCM TOKEN : ", fcmToken);
    if (fcmToken != null)
      dispatch(setToken(fcmToken));
  }, [fcmToken, permissionStatus, loading, requestPermission, dispatch]);

  const initialState = {
    // Define your initial navigation state here
    // For example, you can set initial route names or other state properties
    routes: [
      { name: NavString.AUTH_STACK }, // Set the initial route
    ],
  };

  return (
    <NavigationContainer initialState={initialState}
      ref={(navigatorRef) => NavigationService.setTopLevelNavigator(navigatorRef)}>
      <Stack.Navigator
        initialRouteName={NavString.AUTH_STACK}
        screenOptions={{
          headerShown: false,
        }}>
        {/** AuthStack */}
        <Stack.Screen name={NavString.AUTH_STACK} component={AuthStack} />
        <Stack.Screen name={NavString.BOTTOM_NAVIGATION} component={BottomNavigation} />
        <Stack.Screen name={NavString.GURUKU_BOTTOM_NNAVIGATION} component={GurukulBottomNavigation} />

      </Stack.Navigator>
      <CurrentScreenNameObserver />
    </NavigationContainer>

  );
};
/**
 * ScreenView register on firebase console
 * @returns 
 */
const CurrentScreenNameObserver = () => {

  let loginUser = useSelector(state => state?.auth?.loginUser);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const currentRoute = navigation.getCurrentRoute();
      if (currentRoute) {
        //console.log('Current Screen Name:', currentRoute.name);
        updateOnFirebase(currentRoute)
      }
    });

    return unsubscribe;
  }, [navigation]);


  const updateOnFirebase = async (currentRoute) => {
    await getAnalytics().logScreenView({
      screen_name: currentRoute.name,
      screen_class: currentRoute.name,
    });
    // await analytics().logEvent('Enviro_Basket', {
    //   content_type: currentRoute.name,
    //   item_id: currentRoute.name,
    // })

    if (loginUser != null) {
      try {
        await analytics().logEvent('Screen_Basket', {
          content_type: currentRoute.name,
          item_id: currentRoute.name,
          id: loginUser?.user_id,
          // item: 'Enviro',
          // description: 'Enviro App',
          age: calculateAge(`${loginUser?.date_of_birth}`),
          locationId: `${loginUser?.location_id}`
        })
        // console.log('update on firebase:', calculateAge(`${loginUser?.date_of_birth}`));
      } catch (error) {
        console.error('Error logging custom event:', error);
      }
    }


    // await analytics().setCurrentScreen(currentRoute.name, currentRoute.name);
    // console.log('setCurrentScreen on firebase:', currentRoute.name);

  }

  return null;
};

export default MainStack;