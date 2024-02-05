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
    marginVertical: heightPercentageToDP(4),
    alignContent: 'flex-start',
    justifyContent: 'space-around',
    fontSize: FontSize(16),
    fontFamily: FontName.Gorditas_Bold,
    marginHorizontal: heightPercentageToDP(2)
  },
  viewBottomStyle: {
    padding: 5,
    margin: 5,
    marginStart: 10,
    backgroundColor: WHITE,
    width: widthPercentageToDP(95),
  },
  title: {
    fontSize: FontSize(15),
    color: BLACK,
    fontFamily: FontName.Gordita_Medium
  },
  separatorBottom: {
    height: 0.5,
    backgroundColor: '#808080',
    marginTop: Platform.OS == 'android' ? -5 : heightPercentageToDP(0.5),
  },
  viewDateBottomStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    margin: 5,
    height: heightPercentageToDP(10),
  },
  viewColomStyle: {
    height: heightPercentageToDP(5),
    width: widthPercentageToDP(45),
    marginTop: heightPercentageToDP(2),
  },
  viewStartDateStyle: {
    flexDirection: 'row',
  },
  startDateButton: {
    backgroundColor: WHITE,
    width: widthPercentageToDP(40),
    fontSize: FontSize(12),
    color: BLACK,
    fontFamily: FontName.Gordita_Regular,
    marginTop: 5,
    paddingTop: Platform.OS == 'android' ? 1 : 4
  },
  textInput: {
    width: '100%',
    borderWidth: 0,
    fontFamily: FontName.Gordita_Regular,
    lineHeight: 22,
    fontSize: FontSize(13),
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
    marginBottom: heightPercentageToDP(2),
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
  header: {
    flexDirection: 'row',
    width: widthPercentageToDP(100),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: GREY,
    height: widthPercentageToDP(15),
    justifyContent: 'center'
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
