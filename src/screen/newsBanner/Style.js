import {StyleSheet} from 'react-native';
import {BLACK, GREEN, GREY, LIGHTGREY, WHITE} from '../../theme/Colors';
import {FontName, FontSize} from '../../theme/Fonts';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  listHead: {
    width: widthPercentageToDP(10),
    height: heightPercentageToDP(1),
    // height: moderateScale(8)
  },
  listFoot: {
    width: widthPercentageToDP(10),
    height: heightPercentageToDP(3),
  },
  mainCardView: {
    height: heightPercentageToDP(9),
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: WHITE,
    borderRadius: 15,
    shadowColor: GREY,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: heightPercentageToDP(6),
    width: widthPercentageToDP(12),
    borderRadius: 25,
    backgroundColor: GREY,
    borderColor: GREEN,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewImageText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: heightPercentageToDP(3),
    height: heightPercentageToDP(8),
    width: widthPercentageToDP(8),
  },
  textStyle: {
    fontSize: 14,
    color: BLACK,
    fontWeight: 'bold',
    fontFamily: FontName.Geo_Auto_Bold,
    textTransform: 'capitalize',
  },
  viewTextStyle: {
    marginTop: 4,
    borderWidth: 0,
    width: widthPercentageToDP(85),
  },
  subTextStyle: {
    color: GREY,
    fontSize: 12,
  },
  viewMarginStyle: {
    marginLeft: 12,
  },
});
