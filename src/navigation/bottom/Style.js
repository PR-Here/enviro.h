import {StyleSheet} from 'react-native';
import {FontSize} from '../../theme/Fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {BLACK, BUTTON_BACKGROUND, WHITE} from '../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  tabBarContainer: {
    flexDirection: 'row',
    paddingVertical: hp(1),
    marginHorizontal: hp(3),
    alignItems: 'center',
  },
  tabButton: {
    paddingVertical: hp(1),
    paddingHorizontal: hp(3),
    height: hp(6),
    justifyContent: 'center',
    borderRadius: hp(1),
    backgroundColor: WHITE,
    marginLeft: hp(1),
  },
  activeTab: {
    borderBottomColor: BUTTON_BACKGROUND,
    borderBottomWidth: 1,
  },
  activeTextColor: {
    color: BUTTON_BACKGROUND,
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
});