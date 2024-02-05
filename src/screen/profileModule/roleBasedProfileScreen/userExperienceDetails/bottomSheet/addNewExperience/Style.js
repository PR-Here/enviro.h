import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../../../../../theme/Fonts';
import { BLACK, GREY, LIGHTGREY, PRIMARY_COLOR, WHITE } from '../../../../../../theme/Colors';

const { StyleSheet, Platform } = require('react-native');

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: widthPercentageToDP(100),
    backgroundColor: LIGHTGREY,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
  },
  bottomNavigationView: {
    backgroundColor: LIGHTGREY,
    width: widthPercentageToDP(100),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
  },
  viewMainBottomStyle: {
    flexDirection: 'column',
  },
  titleBottomTxtStyle: {
    marginTop: 38,
    marginLeft: 21,
    marginBottom: 10,
    alignContent: 'flex-start',
    justifyContent: 'space-around',
    fontSize: 16,
    fontWeight: '700',
    color: BLACK,
    fontFamily: FontName.Gordita_Regular,

  },
  viewBottomStyle: {
    padding: 5,
    marginTop: 5,
    marginStart: 10,
    backgroundColor: WHITE,
    width: widthPercentageToDP(95),
  },
  title: {
    fontSize: FontSize(14),
    fontWeight: '400',
    color: PRIMARY_COLOR,
    fontFamily: FontName.Gordita_Regular
  },
  separatorBottom: {
    marginTop: 33,
    height: 0.5,
    backgroundColor: '#808080',
  },
  viewDateBottomStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    margin: 5,
    height: heightPercentageToDP(10),
  },
  viewColomStyle: {
    height: heightPercentageToDP(10),
    width: widthPercentageToDP(45),
  },
  viewStartDateStyle: {
    paddingTop: Platform.OS == 'ios' ? 10 : 0,
    flexDirection: 'row',
    marginBottom: -55,

  },
  startDateButton: {
    backgroundColor: WHITE,
    width: widthPercentageToDP(40),
    fontSize: FontSize(12),
    height: heightPercentageToDP(6),
    fontFamily: FontName.Gordita_Regular,
    color: BLACK,
    marginTop: 8
  },
  imageStyle: {
    padding: 0,
    marginTop: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'baseline',
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(3),
  },

  modalCancelButton: {
    backgroundColor: WHITE,
    width: widthPercentageToDP(35),
    height: heightPercentageToDP(6),
    justifyContent: 'center',
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    alignSelf: 'center',
    borderRadius: 4,
  },
  textCancelColor: {
    color: PRIMARY_COLOR,
    alignItems: 'center',
    fontFamily: FontName.Gordita_Medium,
    fontSize: FontSize(14),
  },
  modalSaveButton: {
    backgroundColor: PRIMARY_COLOR,
    width: widthPercentageToDP(35),
    height: heightPercentageToDP(6),
    justifyContent: 'center',
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 4,
    marginEnd: 10,
  },
  textSaveColor: {
    color: WHITE,
    alignItems: 'center',
    fontFamily: FontName.Gordita_Medium,
    fontSize: FontSize(14),
  },
  addExperienceStyle: {
    fontSize: FontSize(16),
    color: PRIMARY_COLOR,
    margin: 15,
  },
  textInput: {
    fontFamily: FontName.Gordita_Regular,
    fontSize: FontSize(13),
    marginTop: Platform.OS == "ios" ? 10 : 0,
    marginBottom: Platform.OS == "ios" ? 10 : 0,
    lineHeight: 22,
    fontWeight: "400",
    // height:30,
  },
  header: {
    flexDirection: 'row',
    width: widthPercentageToDP(100),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: GREY,
    height: widthPercentageToDP(15),
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 20 : 0
  },
  DetailsTitle: {
    fontSize: FontSize(16),
    fontWeight: "500",
    color: PRIMARY_COLOR,
    fontFamily: FontName.Gordita_Medium
  },
  close: {
    tintColor: BLACK,
    position: 'absolute',
    right: 20,
    width: heightPercentageToDP(2.8),
    height: heightPercentageToDP(2.8),
    alignItems: 'center',
    justifyContent: 'center'
  },
});
