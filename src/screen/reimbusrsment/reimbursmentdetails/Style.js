import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  GREY, BLACK, TEXT_COLOR_GREY, LINE_SEPARATOR, PAGE_BACKGROUND,
  TIMESHEET_ITEM_HEADER, WHITE, BUTTON_BACKGROUND, LIGHT_BLUE
} from "../../../theme/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PAGE_BACKGROUND
  },
  timeSheetVIewStyle: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
    marginTop: 15,
  },
  headerItemStyle: { flexDirection: 'row', flex: 1, alignItems: 'center' },
  headerItemImageStyle: {
    marginLeft: 10, color: BLACK,
    fontWeight: '500', fontSize: 14
  },
  bottomViewStyle: {
    flexDirection: 'row',
    marginTop: 8,
    marginStart: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: WHITE,
    padding: 10,
    elevation: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 }
  },
  buttonStyle: {
    alignItems: 'center', paddingLeft: 20, paddingRight: 20, paddingTop: 10,
    paddingBottom: 10, borderRadius: 10, backgroundColor: BUTTON_BACKGROUND,
    flexDirection: 'row'
  },
  buttonSubmitStyle: { color: WHITE, fontSize: 16, fontWeight: '700', marginLeft: 5 },
  addTimeButtonSheetStyle: {
    padding: 20, borderRadius: 100,
    alignSelf: 'flex-end', backgroundColor: LIGHT_BLUE,
    // position: 'absolute',
    elevation: 5,
    marginEnd: 10,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 }
    // bottom: 50, right: 5
  },
  itemViewStyle: {
    borderTopColor: LINE_SEPARATOR, borderTopWidth: 1, backgroundColor: WHITE,
    padding: 15, flexDirection: 'row', flex: 1, alignItems: 'center'
  },
  timeSheetHeader: {
    flexDirection: 'row',
    padding: 15,
    borderTopLeftRadius: 10, borderTopRightRadius: 10,
    backgroundColor: TIMESHEET_ITEM_HEADER, elevation: 3
  },
  taskTextStyle: { color: TEXT_COLOR_GREY, fontWeight: '300', fontSize: 13, flex: 1 },
  timeTextStyle: { color: TEXT_COLOR_GREY, fontWeight: '300', fontSize: 13, flex: 0.65 },
  totalHourTextStyle: { color: BLACK, fontWeight: '500', fontSize: 15 },
  totalHourStyle: { fontWeight: '500', fontSize: 15, color: TEXT_COLOR_GREY }



});
