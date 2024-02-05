import { StyleSheet } from 'react-native';
import { WHITE, QR_BACKGROUND, TEXT_COLOR_GREY, LINE_COLOR } from '../../../theme/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../../theme/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',

  },
  noti_header: { backgroundColor: 'rgba(0, 0, 0, 0.7)', marginTop: 0 },
  scrollView: {
    flexGrow: 1
  },
  qrViewStyle: {
    marginTop: hp(6), backgroundColor: QR_BACKGROUND, padding: 20, borderRadius: 100
  },

  scanQrTextStyle: {
    paddingTop: 10, paddingBottom: 5,
    textAlign: 'center',
    color: WHITE,
    fontFamily: FontName.Gorditas_Bold,
    fontSize: FontSize(18),
    fontWeight: '800',


  },
  scanQrMsgStyle: {
    textAlign: 'center',
    fontSize: FontSize(12),
    fontWeight: '400',
    lineHeight: 14,
    color: TEXT_COLOR_GREY,
    marginTop: hp(1),
    color: WHITE
  },

  qrImage: {
    alignSelf: 'center',
    width: '70%',
    height: '70%',
    justifyContent: 'center',
    elevation: 5,
    marginTop: hp(3)
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: LINE_COLOR,
    marginTop: hp(4)
  },
  distanceText: {
    textAlign: 'center',
    marginTop: hp(2),
    fontSize: FontSize(13),
    color: TEXT_COLOR_GREY,
    fontWeight: '400',
    fontFamily: FontName.Gordita_Regular,
    lineHeight: 20
  },
  bottomStyle: {
    backgroundColor: WHITE,
    borderRadius: 0,
    elevation: 1,
    bottom: 0,
    position: 'absolute',
    width: wp(100),
    paddingBottom: 20,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: LINE_COLOR,
    marginTop: hp(2)
  },
  qrImageView: {
    width: '100%',
    alignSelf: 'center',
    height: '80%'
  },
  imageView: {
    // alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    height: '60%'
  },
  qrScannerTopBottomViewStyle: { flex: 0, height: 0 },
  viewOverlayStyle: {
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  
  scanQrCodetext: {
    color: WHITE,
    textAlign: 'center',
    alignSelf: 'center',
    paddingTop: 20,
    fontFamily: FontName.Gorditas_Bold,
    fontSize: FontSize(18),
    fontWeight: '800',
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading:{
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', 
  }


});