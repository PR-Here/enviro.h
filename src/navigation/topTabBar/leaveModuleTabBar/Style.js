import { StyleSheet } from 'react-native';
import { FontName, FontSize } from '../../../theme/Fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { BLACK, BUTTON_BACKGROUND, INACTIVE_COLOR, PRIMARY_COLOR, WHITE } from '../../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  tabBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: hp(1),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: 1
  },

  tabButton: {
    paddingVertical: hp(1),
    height: hp(6),
    justifyContent: 'center',
    borderRadius: hp(1),
    marginLeft: hp(1),
  },
  activeTab: {
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 2
  },
  activeTextColor: {
    color: PRIMARY_COLOR,
  },
  tabText: {
    color: 'black',
    fontSize: FontSize(14),
    fontFamily: FontName.Gordita_Regular
  },
  content: {
    fontSize: FontSize(15),
    textAlign: 'center',
    marginTop: hp(2),
  },
  InactiveTextColor: {
    color: INACTIVE_COLOR,
  },
  activetabText: {
    color: 'black',
    fontSize: FontSize(14),
    fontFamily: FontName.Gordita_Medium
  }
});
