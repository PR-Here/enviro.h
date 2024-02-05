
import { StyleSheet } from 'react-native';
import { FontName, FontSize } from '../../../theme/Fonts';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { INACTIVE_COLOR, LIGHTGREY, PRIMARY_COLOR, WHITE } from '../../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  tabBarContainer: {
    flexDirection: 'row',
    paddingVertical: hp(0),
    alignItems: 'center',
    justifyContent: 'space-evenly',

  },
  tabButton: {
    paddingVertical: hp(1),
    paddingHorizontal: hp(3),
    height: hp(6),
    justifyContent: 'center',
    borderRadius: hp(1),
    backgroundColor: WHITE,
    fontFamily: FontName.Gordita_Medium
  },
  activeTab: {
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 2,
    borderBottomStartRadius: 1,
    borderBottomEndRadius: 1
  },
  activeTextColor: {
    color: PRIMARY_COLOR,
    fontFamily: FontName.Gorditas_Bold
  },
  tabText: {
    color: INACTIVE_COLOR,
    fontSize: FontSize(14),
    fontFamily: FontName.Gordita_Medium
  },
  content: {
    fontSize: FontSize(15),
    textAlign: 'center',
    marginTop: hp(2),
  },
  separatorBottom: {
    height: 1,
    backgroundColor: LIGHTGREY,
    marginTop: 0,
  },
});
