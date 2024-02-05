/* stack screens we get on clicking community hub icon from bottom nav */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HubTabs from '../../top/HubTabs';
import NavString, { EVENT_POLL_SCREEN } from '../../../utils/NavString';
import MeetingHomeHeader from '../../../component/header/MeetingHeader';
import { CommunitiesScreen, EventDetailsScreen, EventHomeScreen, EventPollScreen, EventPresenterScreen } from '../../../screen';
import { Header } from '@react-navigation/stack';
import EventHeader from '../../../component/header/EventHeader';
import { useSelector } from 'react-redux';
import { WHITE } from '../../../theme/Colors';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

const HubStackHome = () => {

  const hubStackState = useSelector((state) => state.event)

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <Stack.Navigator screenOptions={{
        header: () => { return <EventHeader headerText={hubStackState.screenName} /> },
      }}>
        <Stack.Screen name={NavString.HUB_TABS} component={HubTabs} />
        <Stack.Screen name={NavString.EVENT_POLL_SCREEN} component={EventPollScreen} />
        <Stack.Screen name={NavString.EVENT_PRESENTER_SCREEN} component={EventPresenterScreen} />
        <Stack.Screen name={NavString.EVENT_DETAILS_SCREEN} component={EventDetailsScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default HubStackHome;
