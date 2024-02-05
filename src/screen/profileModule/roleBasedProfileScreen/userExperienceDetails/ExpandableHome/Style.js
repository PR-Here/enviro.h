import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { BLACK, GREY, WHITE, PRIMARY_COLOR, SELECTED_OUTER_COLOR } from '../../../../../theme/Colors';
import { FontName, FontSize } from '../../../../../theme/Fonts';

const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  viewStyle: {
    // borderWidth: 1,
    // borderColor: LIGHTGREY,
    padding: 5,
    borderRadius: 10,
    marginEnd: 10,
    marginStart: 10,
    marginTop: 5,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    backgroundColor: WHITE,
  },
  title: {
    fontSize: 16,
    fontWeight: 'normal',
    color: BLACK,
  },
  viewDateButton: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    width: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(3),
    padding: 5,
    height: heightPercentageToDP(10),
  },
  modalCancelButton: {
    backgroundColor: WHITE,
    width: widthPercentageToDP(40),
    fontSize: FontSize(12),
    height: 50,
    justifyContent: 'center',
    marginTop: 0,
    borderStartEndRadius: 5,
    borderTopRightRadius: 0,
    borderBottomEndRadius: 0,
  },
  modalSaveButton: {
    backgroundColor: WHITE,
    width: widthPercentageToDP(40),
    fontSize: FontSize(12),
    height: heightPercentageToDP(8),
    justifyContent: 'center',
    marginTop: 0,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
  },
  imageStyle: {
    padding: 0,
    marginTop: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'baseline',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: heightPercentageToDP(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopStartRadius: 20,
  },
  viewMainBottomStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  viewBottomStyle: {
    padding: 5,
    margin: 5,
    marginStart: 10,
    backgroundColor: WHITE,
    width: widthPercentageToDP(95),
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
  titleBottomTxtStyle: {
    margin: 20,
    alignContent: 'flex-start',
    justifyContent: 'space-around',
    fontSize: 20,
  },
  viewBottomDataStyle: {
    flexDirection: 'column',
  },

  viewStartDateStyle: {
    flexDirection: 'row',
    paddingBottom: 0,
    // width: '90%',
  },
  startDateButton: {
    backgroundColor: WHITE,
    width: widthPercentageToDP(40),
    fontSize: FontSize(12),
    height: heightPercentageToDP(6),
  },
  viewEndDateStyle: {
    flexDirection: 'row',
    paddingBottom: 0,
  },
  separatorBottom: {
    height: 0.5,
    backgroundColor: '#808080',
  },
  viewButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(1),
    marginBottom: heightPercentageToDP(4)
  },
  modalCancelButton: {
    backgroundColor: WHITE,
    width: widthPercentageToDP(95),
    height: heightPercentageToDP(6),
    justifyContent: 'center',
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: heightPercentageToDP(1)
  },
  textCancelColor: {
    color: PRIMARY_COLOR,
    alignItems: 'center',
    fontFamily: FontName.Gordita_Medium,
    fontSize: FontSize(14),
  },
  modalSaveButton: {
    backgroundColor: PRIMARY_COLOR,
    width: widthPercentageToDP(95),
    height: heightPercentageToDP(6),
    justifyContent: 'center',
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 4,
  },
  textSaveColor: {
    color: WHITE,
    alignItems: 'center',
    fontFamily: FontName.Gordita_Medium,
    fontSize: FontSize(14),
  },
  addExperienceStyle: {
    fontSize: FontSize(16),
    color: SELECTED_OUTER_COLOR,
    margin: 10,
    fontFamily: FontName.Gordita_Medium,
    fontWeight: "500"
  },
});
