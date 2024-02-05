import { StyleSheet } from 'react-native';

import { FontName, FontSize } from '../../theme/Fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { BLACK, BUTTON_BACKGROUND, WHITE } from '../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  tabBarContainer: {
    flexDirection: 'row',
    // paddingHorizontal: hp(1),
    // alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: 1,
    // marginHorizontal: wp(4),

  },
  tabButton: {
    paddingVertical: hp(1),
    height: hp(6),
    justifyContent: 'center',
    borderRadius: hp(1),
    flex: 1
    // marginLeft: hp(1),
  },
  activeTab: {
    borderBottomColor: BUTTON_BACKGROUND,
    borderBottomWidth: 2,



  },
  activeTextColor: {
    color: BUTTON_BACKGROUND,
    fontSize: 14,
    fontWeight: '700',
    FontName: FontName.Gordita_Medium

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
});
