import { Platform, StyleSheet } from 'react-native';
import { FontName, FontSize } from '../../../theme/Fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  BLACK,
  BLUE,
  DELETE_BACK,
  GREY,
  LIGHTWHITE,
  LINE_COLOR,
  PRIMARY_COLOR,
  SELECTED_OUTER_COLOR,
  TERNARY_COLOR,
} from '../../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: hp(3),
    marginTop: hp(1),
  },
  itemView: {
    marginTop: hp(1),
    justifyContent: 'center',

  },
  every_item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  header: {
    fontSize: FontSize(14),
    fontFamily: FontName.Gordita_Medium,
    color: GREY
  },
  notificationImageView: {
    backgroundColor: LIGHTWHITE,
    borderRadius: 100 / 2,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  notification_Image: {
    width: 18, height: 18,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: hp(-0.4)
  },
  badge: {
    width: 12,
    height: 12,
    backgroundColor: SELECTED_OUTER_COLOR,
    position: 'absolute',
    top: 0,
    right: +5,
    borderRadius: 100 / 2,
    opacity: 1,
  },
  titleText: {
    fontSize: FontSize(12),
    fontFamily: FontName.Gordita_Medium,
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    lineHeight: 17
  },
  inActiveTitle: {
    color: TERNARY_COLOR,
    fontFamily: FontName.Gordita_Medium,
  },
  descText: {
    color: PRIMARY_COLOR,
    fontSize: FontSize(12),
    fontFamily: FontName.Gordita_Regular,
  },
  titleView: {
    marginLeft: hp(2),
    width: hp(30),
    justifyContent: 'center',
  },
  timeText: {
    fontSize: FontSize(8),
    color: GREY,
    width: wp(80),
    marginTop: Platform.OS == 'android' ? hp(0.8) : hp(1)
  },
  line: {
    height: 1,
    backgroundColor: LINE_COLOR,
    width: wp(100),
    marginVertical: hp(0.7),
  },
  AproveButtonView: {
    height: hp(4),
    justifyContent: 'flex-start',
    width: wp(40),
  },
  AproveButton: {
    marginTop: 5,
    width: wp(40),
    height: hp(4),
    alignSelf: 'flex-start',
    backgroundColor: PRIMARY_COLOR,
  },
  NoYesButtonView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: wp(90),
    marginTop: 5,
  },
  NoButton: {
    marginTop: 5,
    width: wp(30),
    height: hp(4),
    backgroundColor: GREY,
  },
  YesButton: {
    marginTop: 5,
    width: wp(30),
    height: hp(4),
    marginLeft: hp(2),
    backgroundColor: PRIMARY_COLOR,
  },
  deleteBox: {
    alignItems: 'center',
    width: wp(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',

  },
  deleteBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  starRedButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  starImage: {
    position: 'absolute',
    right: 0,
    bottom:10
  }
});
