import { StyleSheet } from 'react-native';
import { FontSize } from '../../../theme/Fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { BACKGROUND_COLOR_DASHBOARD, BLACK, LIGHTGREY, WHITE } from '../../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR_DASHBOARD,
  },
  tabBarContainer: {
    marginHorizontal: hp(1),
    maxHeight: 50,
    marginTop: hp(2)
  },
  tabButton: {
    paddingVertical: hp(1),
    paddingHorizontal: hp(3),
    height: hp(5.4),
    justifyContent: 'center',
    borderRadius: hp(1),
    backgroundColor: WHITE,
    marginHorizontal: hp(1),
    elevation: 5,
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 1
  },

  activeTab: {
    backgroundColor: BLACK,
  },
  activeTextColor: {
    color: WHITE,
  },
  tabText: {
    color: 'black',
    fontSize: FontSize(14),
  },
  content: {
    fontSize: FontSize(15),
    textAlign: 'center',
    marginTop: hp(2),
  },
  scrollView: {
    maxHeight: 50,
  }
});
