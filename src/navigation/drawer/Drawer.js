import {createDrawerNavigator} from '@react-navigation/drawer';
import {Attendance, Dashboard, TimeSheet} from '../../screen';
import NavString from '../../utils/NavString';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import CustomDrawerContent from './CustomDrawerContent';
import {WHITE} from '../../theme/Colors';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: WHITE,
          width: widthPercentageToDP(70),
        },
        drawerLabelStyle: {color: 'red'},
      }}
      initialRouteName={NavString.DASHBOARD}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={'Dashboard'}
        component={Dashboard}
        options={{drawerLabel: 'Home'}}
      />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
