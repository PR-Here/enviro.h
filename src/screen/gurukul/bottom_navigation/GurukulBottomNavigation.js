import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import { useSelector } from 'react-redux';
import NavString from '../../../utils/NavString';
import CategoriesDetails from '../CategoriesDetails';
import GurukulBottomBar from './GurukulBottomBar';
import GurukulStack from './GurukulStack';
import { SafeAreaView } from 'react-native';
import { WHITE } from '../../../theme/Colors';
import AllCourses from '../AllCourses';
import Categories from '../Categories';

const GurukulTab = createBottomTabNavigator();
const GurukulStackMain = createNativeStackNavigator();

const GurukulBottomNavigation = ({ navigation }) => {
    const tabBarState = useSelector((state) => state.tabBar.hideTabBar)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
            <GurukulTab.Navigator
                initialRouteName={NavString.GURUKUL_STACK}
                screenOptions={
                    {
                        headerShown: false,
                        tabBarStyle: {
                            animate: true,
                            resetAnimation: true
                        }
                    }}
                tabBar={props => !tabBarState ? <GurukulBottomBar {...props} /> : <></>}>

                <GurukulTab.Screen name={NavString.GURUKUL_STACK} component={GurukulStack} options={{ headerShown: false }} />
                <GurukulTab.Screen name={NavString.ALL_COURSES} component={AllCourses} options={{ headerShown: false }} />
                <GurukulTab.Screen name={NavString.MARKETING_LEADERSHIP} component={Categories} options={{ headerShown: false }} />
            </GurukulTab.Navigator>
        </SafeAreaView>
    );
};


export default GurukulBottomNavigation;
