/* top tab navigator for community hub */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NavString from '../../../utils/NavString';
import { BLACK, GREY, WHITE } from '../../../theme/Colors';
import styles from './styles';
import Plane from '../../../../assets/images/SVG/plane.svg'
import Train from '../../../../assets/images/SVG/train-front.svg'
import Bus from '../../../../assets/images/SVG/bus-front.svg'
import Cab from '../../../../assets/images/SVG/car-taxi-front.svg'
import { BusBookingScreen, CabBookingScreen, FlightBookingScreen, TrainBookingScreen } from '../../../screen';
import { View } from 'react-native';
import CustomButton from '../../../component/atoms/CustomButton';
import NotificationHeader from '../../../component/header/NotificationHeader';


const Tab = createMaterialTopTabNavigator();

function BookingRequestTab({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <NotificationHeader
                style={{ height: 70 }}
                headerText={'Booking Request'}
                handleBackPress={() => { navigation.goBack() }}
                // onActionPress={handleActionPress}
                isShowWalletIcon={false} />

            <Tab.Navigator
                // top tab bar styling
                style={{
                    backgroundColor: WHITE,
                }}
                screenOptions={{
                    tabBarActiveTintColor: BLACK,
                    tabBarInactiveTintColor: WHITE,
                    tabBarStyle: styles.tabBarStyle,
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
                    tabBarItemStyle: { flexDirection: 'row' }
                }}
            >
                <Tab.Screen
                    name={NavString.FLIGHT_BOOKING}
                    component={FlightBookingScreen}
                    options={{
                        tabBarIcon: ({ focused }) => <Plane style={{ color: focused ? 'black' : 'white' }} height={15} width={15} />,
                    }}
                />
                <Tab.Screen
                    name={NavString.TRAIN_BOOKING}
                    component={TrainBookingScreen}
                    options={{
                        tabBarIcon: ({ focused }) => <Train style={{ color: focused ? 'black' : 'white' }} />,
                    }}
                />
                <Tab.Screen
                    name={NavString.BUS_BOOKING}
                    component={BusBookingScreen}
                    options={{
                        tabBarIcon: ({ focused }) => <Bus style={{ color: focused ? 'black' : 'white' }} />,

                    }}
                />
                <Tab.Screen
                    name={NavString.CAB_BOOKING}
                    component={CabBookingScreen}
                    options={{
                        tabBarIcon: ({ focused }) => <Cab style={{ color: focused ? 'black' : 'white' }} />,

                    }}
                />

            </Tab.Navigator>
        </View>

    );
}

export default BookingRequestTab

