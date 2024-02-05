import { Platform, StyleSheet } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { BACKGROUND_COLOR_DASHBOARD, BACKGROUND_COLOR_DASHBOARD_ICON, BLACK, GREY, PRIMARY_COLOR, RED, TERNARY_COLOR, WHITE } from '../../theme/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../theme/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: Platform.OS == 'ios' ? 2 : 0,
    marginStart: 5,
    marginEnd: 10,
    backgroundColor: BACKGROUND_COLOR_DASHBOARD,
  },

  imageFlatlist: {
    width: wp(13),
    height: hp(7),
    alignSelf: 'center',
    resizeMode: 'contain',
    tintColor: BLACK
  },
  flatListViewHorizontal: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    // backgroundColor: LIGHTGREY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(2),
  },
  imageFlatListHorizontal: {
    width: wp(38),
    height: hp(12),
    flex: 1,
    backgroundColor: 'blue',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  viewHeaderStyle: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bellButton: {
    position: 'absolute',
    right: hp(2),
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  containerBH: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(10),
    height: hp(8),
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventContainer: {
    width: wp(30),
    justifyContent: 'center',
    backgroundColor: WHITE,
  },
  eventGradient: {
    width: wp(30),
    height: hp(10),
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  gradientContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    margin: 3,
    padding: 3,
    borderRadius: 20,
    justifyContent: 'center',
  },
  eventImage: {
    flex: 1,
    width: '100%',
  },
  eventText: {
    fontSize: 15,
    fontWeight: 'normal',
    color: BLACK,
    alignSelf: 'center',
  },
  flatViewStyle: {
    flex: 1,
    //marginBottom: hp(8),
    marginEnd: hp(2),
    marginStart: hp(2),
    width: wp(100)
  },

  separatorBottom: {
    height: 0.2,
    backgroundColor: GREY,
    marginEnd: 8,
    marginStart: 8,
    marginBottom: 5,
    marginTop: 5
  },
  imgBackground: {
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventTitleStyle: {
    alignSelf: 'center',
    marginTop: hp(0.4),
    fontSize: FontSize(12),
    fontWeight: 'normal',
    fontFamily: FontName.Geo_Auto_Regular,
    textTransform: 'capitalize'
  },
  storyImageStyle:
  {
    height: hp(10),
    width: hp(10),
    borderRadius: wp(100),
  },
  storyContainerStyle: {
    width: hp(11),
    marginStart: wp(4),
    borderColor: PRIMARY_COLOR,
    alignItems: 'center'
  },

  avatarTextStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: FontSize(12),
    textTransform: 'capitalize',
    fontFamily: FontName.Gordita_Regular,
    marginTop: Platform.OS == 'ios' ? 5 : 0


  },

  headerTitle: { marginBottom: Platform.OS === 'ios' ? 10 : 0, fontSize: FontSize(16) },

  imageStyle: {
    width: 30,
    height: 30,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1
  },

  searchBackGround: { paddingBottom: 5, backgroundColor: WHITE },

  blurView: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 0,
    bottom: 0,
  },
  viewIntroStyle: { height: heightPercentageToDP(16), backgroundColor: WHITE, marginBottom: 10 },
  ///////////////////////////////////////////////


  viewStyle: {
    width: wp(25),
  },
  flatView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    width: wp(24),
  },
  imageStyle: {
    width: wp(14),
    height: hp(7),
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR_DASHBOARD_ICON,
    justifyContent: 'center',
    borderRadius: hp(2),
  },
  categoryName: {
    textAlign: 'center',
    fontFamily: FontName.Gordita_Regular,
    fontWeight: '500',
    fontSize: FontSize(12),
    lineHeight: 18,
    width: wp(25),
    marginTop: 7
  },
});