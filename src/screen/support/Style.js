import { StyleSheet } from 'react-native';
import { LIGHT_ORANGE, WHITE } from '../../theme/Colors';
import { FontName, FontSize } from '../../theme/Fonts';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  imageStyle: {
    marginTop: heightPercentageToDP(5),
    marginBottom: heightPercentageToDP(10),
  },
  imgStyle: {
    width: widthPercentageToDP(85),
    height: heightPercentageToDP(10),
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  viewText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: heightPercentageToDP(1),
  },
  viewS: {
    flexDirection: 'column',
    flex: 1,
    padding: heightPercentageToDP(1),
  },
  iconStyle: {
    width: widthPercentageToDP(10),
    height: heightPercentageToDP(3),
    justifyContent: 'space-around',
    resizeMode: 'contain',
    alignContent: 'center',
  },
  emailPhoneText: {
    fontSize: FontSize(14),

  },
  viewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercentageToDP(100),
    textAlign: 'center',
    fontFamily: FontName.Gordita_Regular,
    marginTop: 0
  },
  emailStyle: { backgroundColor: LIGHT_ORANGE, borderRadius: 100 / 2, padding: 10, marginTop: 10 }
});
