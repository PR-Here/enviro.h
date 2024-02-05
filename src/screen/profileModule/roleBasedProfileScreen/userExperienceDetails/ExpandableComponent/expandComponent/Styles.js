import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { BLACK, WHITE, LIGHTGREY, GREY, RED, PRIMARY_COLOR } from '../../../../../../theme/Colors';
import { FontName, FontSize } from '../../../../../../theme/Fonts';

const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: LIGHTGREY,
    margin: 7,
    borderRadius: 10,
    padding: 5,
  },
  subContain: {
    backgroundColor: RED
  },

  header: {
    backgroundColor: WHITE,
    padding: 5,
    // elevation: 1,
    // borderRadius: 10,
    marginTop: 1,
    // shadowColor: BLACK,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 1,
  },
  viewRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  headerText: {
    fontSize: FontSize(14),
    fontFamily: FontName.Gordita_Medium,
    color: PRIMARY_COLOR
  },
  caldIcon: {
    height: 10,
    width: 15,
    tintColor: BLACK,
    alignSelf: 'center'
  },
  viewStyle: {
    padding: 5,
    borderRadius: 10,
    marginEnd: 5,
    marginStart: 5,
    marginTop: 10,
    backgroundColor: WHITE,
  },
  title: {
    fontSize: 16,
    fontWeight: "normal",
    color: BLACK,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "normal",
    color: GREY,
    marginTop: 10,
  },
  subDateTitle: {
    fontWeight: "normal",
    color: GREY,
    marginTop: 10,
    backgroundColor: WHITE,
    width: widthPercentageToDP(35),
    fontSize: FontSize(15),
    height: heightPercentageToDP(6),
  },
  viewDateBottomStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    height: heightPercentageToDP(10),
    width: widthPercentageToDP(99),
    marginStart: 10,
    marginEnd: 10,
  },
  viewColumStyle: {
    height: heightPercentageToDP(10),
    width: widthPercentageToDP(50),
    padding: 2,
  },
  imageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignSelf: 'center'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: widthPercentageToDP(90),
  },
  separatorStartDate: {
    height: 0.5,
    backgroundColor: '#808080',
    width: widthPercentageToDP(40),
  },
  viewEndColumStyle: {
    height: heightPercentageToDP(10),
    marginStart: 5,
    width: widthPercentageToDP(50),
    padding: 2,
  },
  viewStartDateStyle: {
    flexDirection: 'row',
    paddingBottom: 0,
  },
  addExperienceStyle: {
    fontSize: FontSize(16),
    color: PRIMARY_COLOR,
    margin: 15,
  },
  caldUpIcon: {
    height: 20,
    width: 20,
    tintColor: BLACK,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
});
