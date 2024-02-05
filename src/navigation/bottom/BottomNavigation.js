import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  ComingSoon,
  CompanyPolicy
} from '../../screen';
import ProjectConnectsDetails from '../../screen/connect.h/ProjectConnectsDetails';
import NavString from '../../utils/NavString';
import HomeStack from '../stack/HomeStack';
import HubStackHome from '../stack/HubStack/HubStackHome';
import KolaChatStack from '../stack/KolaChatStack';
import BottomBar from './BottomBar';
import ConnectHStack from '../stack/ConnectHStack';
import ProjectMStack from '../stack/ProjectMStack';
import { SafeAreaView, View } from 'react-native';
import { WHITE } from '../../theme/Colors';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const tabBarState = useSelector((state) => state.tabBar.hideTabBar)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <Tab.Navigator
        screenOptions={
          {
            headerShown: false,
            tabBarStyle: {
              animate: true,
              resetAnimation: true
            }
          }}
        initialRouteName={NavString.HOME_STACK}
        //tabBar={props => !tabBarState ? <BottomBar {...props} /> : <></>} // tab bar autohide funtionality
        tabBar={props => <BottomBar {...props} />} // always visible tab bar

      >
        <Tab.Screen name={NavString.HOME_STACK} component={HomeStack}
        />
        {/** PLEASE ORIGINAL SCRREN NAME BELOW
        CURRENTLY SCREEN USE ONLY ROLLOUT PROCESS */}
        {/** ProjectMStack*/}
        <Tab.Screen name={NavString.COMPANY_POLICY} component={ComingSoon} />
        <Tab.Screen name={NavString.NEWS_BANNER} component={KolaChatStack} />
        {/** PLEASE ORIGINAL SCRREN NAME BELOW
        CURRENTLY SCREEN USE ONLY ROLLOUT PROCESS */}
        {/**ConnectHStack */}
        <Tab.Screen name={NavString.SUPPORT} component={ComingSoon} />
        {/** PLEASE ORIGINAL SCRREN NAME BELOW
        CURRENTLY SCREEN USE ONLY ROLLOUT PROCESS */}
        {/**  HubStackHome*/}
        <Tab.Screen name={NavString.HUB_STACK} component={HubStackHome} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomNavigation;
