import { Platform, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { BLACK, BUTTON_BACKGROUND, GREEN, GREY, LIGHTGREY, LINE_COLOR, PAGE_BACKGROUND, PRIMARY_COLOR, SELECTED_OUTER_COLOR, WHITE } from '../../../theme/Colors';
import { FontName, FontSize } from '../../../theme/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PAGE_BACKGROUND,
    paddingBottom: wp(55)
  },
  renderItem: {
    borderRadius: hp(1),
    backgroundColor: WHITE,
    padding: hp(2),
    shadowColor: BLACK,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1
  },
  profileView: {
    flexDirection: 'row',

  },
  profileImage: {
    width: wp(11),
    height: wp(11),
    borderRadius: 100 / 2,
  },
  userInfoStyle: {
    width: '50%',
    flex: 1,
  },
  titleText: {
    marginLeft: hp(2),
    fontSize: FontSize(14),
    fontFamily: FontName.Gordita_Medium,

  },
  designationText: {
    marginLeft: hp(2),
    fontSize: FontSize(13),
    fontFamily: FontName.Gordita_Regular,
    color: '#00000060',
    marginTop: Platform.OS == 'ios' ? 3 : 0

  },
  statusText: {
    marginLeft: hp(2),
    fontSize: FontSize(14),
    fontFamily: FontName.Gordita_Regular,
  },
  fromTOView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp(4)
  },
  fromToText: {
    fontSize: FontSize(13),
    color: '#00000060',
    fontFamily: FontName.Gordita_Regular,
    flex: 1
  },
  fromview: {},
  dateTimeText: {
    fontSize: FontSize(13),
    marginTop: hp(0.5),
  },
  descText: {
    fontSize: FontSize(14),
    fontFamily: FontName.Gordita_Medium
  },
  reasonText: {
    color: PRIMARY_COLOR,
    marginTop: hp(1),
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: LINE_COLOR,
    marginVertical: hp(1),
    marginTop: wp(4)
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonStyle: {
    width: '40%',
    height: 40,

  },
  rejectButton: {
    backgroundColor: WHITE,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1.5
  },
  aproveButton: {
    backgroundColor: BUTTON_BACKGROUND,
  },
  hourText: {
    fontSize: FontSize(12),
    color: '#00000060',
    fontFamily: FontName.Geo_Auto_Regular

  },
  buttonTextStyle: {
    fontSize: FontSize(13),
    fontFamily: FontName.Gordita_Medium
  },
  norecordFoundStyle: {
    height: hp(80),
    marginHorizontal: wp(30),
    justifyContent: 'center',
    flex: 1,
  },





  approvalCountTextStyle: {
    fontSize: FontSize(14),
    fontFamily: FontName.Gorditas_Bold,
    color: PRIMARY_COLOR,
    justifyContent: 'flex-start'
  },
  approvalTypeContainer: {
    marginStart: wp(2),
    borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    borderWidth: 1,
    borderColor: LIGHTGREY,
  },
  indicatorStyle: {
    borderRadius: 100,
    height: wp(3),
    width: wp(3),
    backgroundColor: SELECTED_OUTER_COLOR,
    position: 'absolute',
    right: -2,
    top: -4
  }






  , container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1: {
    width: 200,
    height: 50,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text1: {
    color: 'white',
  },
  button1: {
    padding: 10,
    backgroundColor: 'red',
    marginTop: 20,
  },

  RequestTypeStyle: {
    fontSize: FontSize(13),
    color: '#00000060',
    fontFamily: FontName.Gordita_Regular
  }

});
