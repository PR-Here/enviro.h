/* top tab navigator for community hub */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NavString from '../../utils/NavString';
import { AllEventsScreen, ComingSoon, CommunitiesScreen, EventHomeScreen } from '../../screen';
import { WHITE } from '../../theme/Colors';
import HubTopTab from './HubTopTab';

const Tab = createMaterialTopTabNavigator();

function HubTabs({ navigation }) {
  return (

    <Tab.Navigator
      // top tab bar styling
      style={{
        backgroundColor: WHITE
      }}
      screenOptions={{
        swipeEnabled: false
      }}
      // screenOptions={{
      //   tabBarActiveTintColor: WHITE,
      //   tabBarInactiveTintColor: GREY,
      //   tabBarStyle: styles.tabBarStyle,
      //   tabBarLabelStyle: styles.tabBarLabelStyle,
      //   tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
      //   //tabBarIndicatorContainerStyle: { margin: 5 }
      // }}
      tabBar={() => {
        return <HubTopTab />
      }}
      initialRouteName={NavString.MY_PROFILE}
    >
      <Tab.Screen name={NavString.ALL_EVENTS} component={AllEventsScreen} options={{ title: 'All' }} initialParams={'All'} />
      {/**CommunitiesScreen*/}
      <Tab.Screen name={NavString.COMMUNITIES} component={ComingSoon} options={{ title: 'Communities' }} />
      <Tab.Screen name={NavString.EVENT_HOME_SCREEN} component={EventHomeScreen} options={{ title: 'Events' }} />
    </Tab.Navigator>

  );
}

export default HubTabs

