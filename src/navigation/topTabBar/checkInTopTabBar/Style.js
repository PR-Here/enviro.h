import { StyleSheet } from 'react-native';
import { FontName, FontSize } from '../../../theme/Fonts';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BUTTON_BACKGROUND, INACTIVE_COLOR, WHITE } from '../../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: WHITE,
    bottom: 0
  },
  tabBarContainer: {
    flexDirection: 'row',
    paddingVertical: hp(1),
    width: '100%',
    justifyContent: 'space-around',
    marginTop: hp(1),
  },
  tabButton: {
    paddingHorizontal: hp(4),
    height: hp(4.5),
    borderRadius: hp(1),
    marginLeft: hp(1),
    borderWidth: 1,
    borderColor: '#D9D9D9',
    justifyContent: 'center'
  },
  activeTab: {
    borderBottomColor: BUTTON_BACKGROUND,
    borderBottomWidth: 1,
  },
  activeTextColor: {
    backgroundColor: BUTTON_BACKGROUND,
    color: WHITE
  },
  tabText: {
    fontSize: FontSize(12),
    fontFamily: FontName.Gordita_Regular,
  },
  content: {
    fontSize: FontSize(15),
    textAlign: 'center',
    marginTop: hp(2),
  },
});
