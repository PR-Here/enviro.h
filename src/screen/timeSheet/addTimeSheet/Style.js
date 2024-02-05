import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { BLACK, BUTTON_BACKGROUND, ET_Fill_COLOR, E_BORDER_COLOR, GREY, INACTIVE_COLOR, LIGHTWHITE, LIGHT_RED_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR_ORANGE, WHITE } from "../../../theme/Colors";
import { FontName, FontSize } from '../../../theme/Fonts';

export const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthPercentageToDP(5),
    height: hp(8),
    backgroundColor: PRIMARY_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -15 }],
    width: 30,
    height: 30,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE
  },
  spacer: {
    height: 10,
  },
  radioGroupStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginEnd: 40,
  },
  radioButtonStyle: { flexDirection: 'row', alignItems: 'center' },
  radioTextStyle: {
    color: BLACK,
    fontFamily: FontName.Gordita_Regular,
    fontSize: FontSize(13),
    alignSelf: 'center',
    
  },
  rowStyle: {
    padding: 0,
    borderBottomColor: BLACK,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  rowImageStyle: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },

  viewRowStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderColor: GREY,
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    backgroundColor: WHITE,
  },
  viewTextImageStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    // justifyContent: 'center',
    marginStart: 5,
    fontSize: FontSize(13),
    // alignItems: 'center',
    color: SECONDARY_COLOR,
    fontFamily: FontName.Gordita_Regular,
    lineHeight: 20,
  },
  textTStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginStart: 5,
    fontSize: FontSize(13),
    alignItems: 'center',
    color: ET_Fill_COLOR,
    fontFamily: FontName.Gordita_Medium,
  },
  viewTextStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    padding: 12,
    borderColor: GREY,
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    backgroundColor: E_BORDER_COLOR,

  },
  buttonStyle: {
    borderRadius: 8,
    backgroundColor: BUTTON_BACKGROUND,
    marginTop: 10,
    fontFamily: FontName.Gorditas_Bold,
    fontSize: FontSize(16),
    width: widthPercentageToDP(95),
    height: hp(6)
  },
  inputTextStyle: {
    borderWidth: 0,
    marginTop: -8,
    lineHeight: 18,
    color: PRIMARY_COLOR,
    fontFamily: FontName.Gordita_Regular,
    alignItems: 'center',
    textAlignVertical: 'top',
    height: 'auto',
    minHeight: 65,
    maxHeight: 80,
    width: widthPercentageToDP(86)
  },
  viewTextDesStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    padding: 12,
    borderColor: GREY,
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    marginBottom: 10, backgroundColor: WHITE
  },
  buttonDeleteStyle: {
    borderRadius: 4,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    backgroundColor: WHITE,
    marginTop: 5,
    width: widthPercentageToDP(95),
    height: hp(6)
  },
  textCancelColor: {
    color: BLACK,
    alignItems: 'center',
    fontFamily: FontName.Gorditas_Bold,
    fontSize: FontSize(16),
  },
  bottomView: {
    width: widthPercentageToDP(100),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    marginBottom: 2,
  },
  imageStyle: { width: 70, height: 70, resizeMode: "contain", margin: 10 },
  dropdown: {
    height: heightPercentageToDP(6),
    width: '50%',
    borderColor: '#D9D9D9',
    borderWidth: heightPercentageToDP(0.12),
    borderRadius: heightPercentageToDP(0.8),
    paddingHorizontal: heightPercentageToDP(1),
  },
  icon: {
    width: widthPercentageToDP(6),
    height: widthPercentageToDP(6),
    marginRight: 5,
    tintColor: BUTTON_BACKGROUND
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: FontSize(16),
    color: INACTIVE_COLOR
  },
  selectedTextStyle: {
    fontSize: FontSize(16),
    color: BLACK
  },
  iconStyle: {
    width: widthPercentageToDP(6),
    height: widthPercentageToDP(6),
  },
  inputSearchStyle: {
    height: widthPercentageToDP(8),
    fontSize: FontSize(16),
    color: BLACK
  },
  presentViewStyle: { borderWidth: 1, borderColor: BLACK, marginTop: 10, backgroundColor: LIGHTWHITE, borderRadius: 8 },
  presentSubViewStyle: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: LIGHTWHITE, height: 35, alignSelf: 'center', width: '100%', alignItems: 'center', padding: 5, borderRadius: 8 }
});