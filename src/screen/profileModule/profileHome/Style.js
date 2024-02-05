import { BLACK, GREY, LIGHTGREY, TERNARY_COLOR, WHITE } from '../../../theme/Colors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../../theme/Fonts';

const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE
  },
  subContainer: {
  },
  circularImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: GREY
  },
  smallImage: {
    width: 30,
    height: 30,
  },
  viewTextStyle: {
    width: widthPercentageToDP(99),
    alignItems: 'center',
    alignSelf: 'center',
  },
  personaInfoTitle: {
    fontSize: 16,
    color: BLACK,
    alignSelf: 'center',
    fontFamily: FontName.Gorditas_Bold
  },
  title: {
    fontSize: FontSize(14),
    fontWeight: "400",
    color: BLACK,
    textTransform: 'capitalize',
    fontFamily: FontName.Gordita_Medium,
    lineHeight: 21
  },
  viewImageStyle: {
    alignSelf: 'center',
    marginTop: heightPercentageToDP(1)
  },
  editImageTouchable: {
    top: -50,
    left: 70,
    padding: 8,
  },
  userLocation: {
    fontSize: FontSize(14),
    fontWeight: 'normal',
    color: TERNARY_COLOR,
    textTransform: 'capitalize',
    fontFamily: FontName.Gordita_Regular,
    lineHeight: 21
  },
});
