import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { BG_Fill_COLOR, BLACK, BLUE, GREY, LIGHT_ORANGE, LIGHT_WHITE, PRIMARY_COLOR, T_BORDER_COLOR, VERY_LIGHT_ORANGE, WEEKDAY_COLOR, WHITE } from '../../../theme/Colors';
import { FontName, FontSize } from '../../../theme/Fonts';

const { StyleSheet, Platform } = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_Fill_COLOR,
  },
  flatList: {
    width: widthPercentageToDP(100),
    marginBottom: 0,
    marginTop: 0,
    marginStart: 5,
    marginEnd: 5
  },
  innerFlatListStyle: {
    width: widthPercentageToDP(100),
    marginBottom: 0,
    marginTop: 0,
    marginStart: 5,
    marginEnd: 5
  },
  renderItemView: {
    marginTop: hp(1),
    flex: 1,
    flexDirection: 'column'
  },
  firstViewStyle: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginStart: 5,
    marginEnd: 10,
    marginBottom: 5,
    flexDirection: 'row',
  },
  viewFirstCellStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginTop: 5
  },
  secondViewStyle: {
    borderWidth: 1,
    borderColor: T_BORDER_COLOR,
    backgroundColor: WHITE,
    borderRadius: 4,
    marginEnd: 15,
  },
  dayText: {
    color: WHITE,
    textAlign: 'center',
    fontSize: FontSize(16),
    fontFamily: FontName.Gordita_Medium,
    marginStart: 5,
    marginEnd: 10
  },
  todayText: {
    color: WHITE,
    textAlign: 'center',
    fontSize: FontSize(12),
    fontFamily: FontName.Gordita_Medium,
    marginEnd: 10,
  },
  dateText: {
    color: WHITE,
    textAlign: 'center',
    fontSize: FontSize(14),
    fontFamily: FontName.Gordita_Medium,
  },
  titleText: {
    paddingHorizontal: hp(0.5),
    paddingVertical: hp(0.2),
    textAlign: 'left',
    fontSize: FontSize(13),
    fontFamily: FontName.Gordita_Medium,
    color: WEEKDAY_COLOR,
    marginTop: Platform.OS == 'ios' ? 7 : 1,
    marginStart: 6
  },
  middleText: {
    textAlign: 'left',
    paddingHorizontal: hp(0.5),
    paddingVertical: hp(0.2),
    fontSize: FontSize(11),
    fontFamily: FontName.Gordita_Medium,
    color: WEEKDAY_COLOR,
    marginTop: Platform.OS == 'ios' ? 5 : 1,
    marginStart: 7

  },
  discText: {
    textAlign: 'left',
    paddingHorizontal: hp(0.5),
    paddingVertical: hp(0.2),
    fontSize: FontSize(11),
    fontFamily: FontName.Gordita_Regular,
    color: WEEKDAY_COLOR,
    marginTop: Platform.OS == 'ios' ? 5 : 1,
    marginBottom: 7,
    marginStart: 7,
    lineHeight: 19
  },

  viewDesStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  viewRightArrowDetailsStyle: {
    flex: 1,
    flexDirection: 'row',
    width: widthPercentageToDP(15),
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 3,
  },
  viewDesDetailsStyle: {
    width: widthPercentageToDP(58),
  },
  viewtimeDetailsStyle: {
    flex: 1,
    flexDirection: 'row',
    width: widthPercentageToDP(15),
    bottom: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 7
  },
  circularImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: BLUE,
  },
  filterView: {
    backgroundColor: LIGHT_WHITE,
    borderRadius: 22.5,
    borderWidth: 0.5,
    borderColor: GREY,
    marginEnd: 10,
    alignSelf: 'center',
    padding: 8,
    marginTop: 14
  },
  searchView: {
    flexDirection: 'row',
    width: wp(95),
    alignItems: 'center',
    backgroundColor: WHITE,
    alignSelf: 'center',
    borderRadius: hp(0.5),
    height: hp(4.5),
    borderWidth: hp(0.1),
    justifyContent: 'space-around',
    marginTop: hp(2),
    borderColor: GREY,
  },
  searchImage: {
    width: wp(7),
    height: hp(7),
    marginLeft: hp(1),
  },
  searchImageButton: {},
  cutSearchIcon: {
    width: wp(3),
    height: hp(3),
    paddingBottom: hp(1),
  },
  cutSearchIconButton: {},

  searchTextInput: {
    width: wp(70),
    borderWidth: 0,
    marginTop: 0,
    fontSize: FontSize(13),
  },
  timeText: {
    fontSize: FontSize(11),
    marginHorizontal: 5,
    fontFamily: FontName.Gordita_Medium,
  },
  descText: {
    fontSize: FontSize(14),
    marginLeft: hp(1),
    fontFamily: FontName.Geo_Light,
  },
  viewNoFound: { flex: 1, alignItems: 'center', justifyContent: 'center', height: hp(20) },
  textNoFound: { fontSize: 12, color: GREY },
});
