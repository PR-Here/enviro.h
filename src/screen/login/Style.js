import { StyleSheet } from 'react-native';
import { PAGE_BACKGROUND, RED, WHITE, BUTTON_BACKGROUND, QR_BACKGROUND, TEXT_COLOR_GREY, BLACK } from '../../theme/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../theme/Fonts';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  view: {
    alignItems: 'center',
  },
  logoImage: {
    marginTop: hp(8),
    margin: 20,
    width: 100,
    height: 50
  },
  qrImage: {
    width: 100,
    height: 100,
    margin: 20,
  },
  topRightImageStyle: { alignSelf: 'flex-end', position: 'absolute', right: -15 },
  qrViewStyle: {
    marginTop: hp(6), backgroundColor: QR_BACKGROUND, padding: 20, borderRadius: 100
  },
  scanQrTextStyle: { fontSize: 20, paddingTop: 20, fontFamily: FontName.Gorditas_Bold },
  scanQrMsgStyle: {
    paddingTop: hp(2),
    paddingLeft: 50,
    textAlign: 'center',
    paddingRight: 50,
    fontSize: 14,
    color: TEXT_COLOR_GREY,
    fontFamily: FontName.Gordita_Regular,
    lineHeight: 20
  },
  buttonTextStyle: {
    fontSize: FontSize(13),
    color: WHITE,
    fontFamily: FontName.Gorditas_Bold,
    lineHeight:22

  },
  scanButtonStyle: {
    marginTop: hp(10),
    backgroundColor: BUTTON_BACKGROUND,
    borderRadius: 100, width: wp(45),
  },
});