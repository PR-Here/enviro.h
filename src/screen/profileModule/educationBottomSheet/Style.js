import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../../theme/Fonts';
import { BLACK, GREY, LIGHTGREY, PRIMARY_COLOR, WHITE } from '../../../theme/Colors';

const { StyleSheet } = require('react-native');

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
    fontFamily: FontName.Gordita_Medium

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
    height: heightPercentageToDP(10),
    marginHorizontal: heightPercentageToDP(1),
    marginTop: heightPercentageToDP(1)
  },
  viewColomStyle: {
    height: heightPercentageToDP(10),
    width: widthPercentageToDP(45),

  },
  viewStartDateStyle: {
    flexDirection: 'row',
  },
  startDateButton: {
    backgroundColor: WHITE,
    width: widthPercentageToDP(40),
    fontSize: FontSize(12),
    height: heightPercentageToDP(6),
  },
  imageStyle: {
    marginTop: 5,
    marginBottom:5,
    height: 25,
    width: 25,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(0),
  },
  cancelButton: {
    backgroundColor: GREY,
    width: widthPercentageToDP(35),
    fontSize: FontSize(12),
    height: heightPercentageToDP(5),
    marginEnd: 5,
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: PRIMARY_COLOR,
    width: widthPercentageToDP(35),
    fontSize: FontSize(12),
    height: heightPercentageToDP(5),
    justifyContent: 'center',
    marginStart: 5,
  },
  addExperienceStyle: {
    fontSize: FontSize(16),
    color: PRIMARY_COLOR,
    margin: 15,
  },
  dateText: {
    fontSize: FontSize(13),
    color: BLACK,
    width: widthPercentageToDP(40),
    marginTop: heightPercentageToDP(1),
    fontFamily: FontName.Geo_Auto_Regular
  },
  endDateText: {
    fontSize: FontSize(13),
    color: BLACK,
    width: widthPercentageToDP(35),
    marginTop: heightPercentageToDP(1),
    fontFamily: FontName.Geo_Auto_Regular
  },
  textInput: {
    backgroundColor: WHITE,
    borderColor: WHITE,
    borderWidth: 0,
    marginStart: 0,
    fontFamily: FontName.Gordita_Regular,
    lineHeight: 20,
    fontSize: FontSize(16),
    marginTop: Platform.OS == 'ios' ? 2 :0
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
});
