import { Platform, StyleSheet } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../../theme/Fonts';
import { BLACK, GREEN, GREY, TIMESHEET_ITEM_HEADER, LINE_COLOR, WHITE } from '../../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewHeaderStyle: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: GREY,
    margin: 10,
    padding: 10,
  },
  viewRowStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  viewFlatStyle: {
    flexDirection: 'row',
    margin: 10,
    borderWidth: 1,
    borderColor: GREY,
    borderRadius: 6,
    padding: 0,
    height: 'auto',
  },
  firstViewStyle: {
    width: 140,
    backgroundColor: LINE_COLOR,
    margin: 0,
    backgroundColor: BLACK,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6
  },
  lineStyle: {
    borderWidth: 0.3,
    borderColor: GREY,
    height: 1,
    marginVertical: 5,
  },
  verticleLine: {
    height: 'auto',
    width: 1,
    backgroundColor: GREY,
  },
  flatViewStyle: {
    borderColor: GREY,
    width: widthPercentageToDP(38),
    borderStartWidth: 0.4,
    borderRightWidth: 1

  },
  textStyle: {
    marginStart: 8,
    padding: 15,
    alignSelf: 'center',
    fontFamily: FontName.Gordita_Regular
  },
  viewTextFilterStyle: {
    marginEnd: 15,
    marginStart: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  iconStyle: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  viewDetailsStyle: { flexDirection: 'row', flexWrap: 'wrap', marginStart: 12 },
  textShortStyle: {
    paddingVertical: 1,
    fontFamily: FontName.Gordita_Medium,
    fontWeight: '500',
    fontSize: FontSize(13),
    marginBottom: 10
  },

});