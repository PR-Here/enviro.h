import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../../theme/Fonts';
import { BLACK, GREY, LIGHTGREY, PRIMARY_COLOR, WHITE } from '../../../theme/Colors';

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
    margin: 20,
    alignContent: 'flex-start',
    justifyContent: 'space-around',
    fontSize: 20,
    color: BLACK,
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
    fontWeight: 'normal',
    color: BLACK,
  },
  separatorBottom: {
    height: 0.5,
    backgroundColor: '#808080',
    marginTop: 5,

  },
  viewDateBottomStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    marginTop: heightPercentageToDP(2),
    marginRight: heightPercentageToDP(1)
  },
  viewColomStyle: {
    height: heightPercentageToDP(10),
    width: widthPercentageToDP(40),
  },
  viewStartDateStyle: {
    flexDirection: 'row',
    marginTop: heightPercentageToDP(0.5)
  },
  startDateButton: {
    backgroundColor: WHITE,
    width: widthPercentageToDP(40),
    fontSize: FontSize(12),
    height: heightPercentageToDP(6),
    backgroundColor: WHITE,
    borderColor: WHITE,
    borderWidth: 0,
    marginTop: 8,
    alignSelf: 'center'
  },
  imageStyle: {
    marginTop: 5,
    height: 20,
    width: 20,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: widthPercentageToDP(100),
    marginTop: 0
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
  dateText: {
    fontSize: FontSize(13),
    width: widthPercentageToDP(35),
    marginTop: heightPercentageToDP(0.5),
    fontFamily: FontName.Geo_Auto_Regular
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
  textInputStyle:{
    backgroundColor: WHITE,
    borderColor: WHITE,
    borderWidth: 0,
    marginStart: 0,
    lineHeight: 20,
    fontSize: FontSize(16),
    marginTop: Platform.OS == 'ios' ? 2 :0
  }
});
