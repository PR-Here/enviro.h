import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR_SETTING, BLACK, PAGE_BACKGROUND, SILVER, WHITE } from '../../theme/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    marginStart: 5,
    marginEnd: 10,
    backgroundColor: PAGE_BACKGROUND
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(5),
    backgroundColor: WHITE,
  
  },
  iconStyle: {
    width: wp(12),
    height: hp(6),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  startViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',

  },
  endViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  separatorBottom: {
    height: 0.5,
    backgroundColor: SILVER,
    marginEnd: 8,
    marginStart: 8,
    // marginBottom: 5,
  },
  flatListView: {
    // backgroundColor: WHITE,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(20),
    borderRadius: hp(2),
    shadowColor: BLACK,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 }
  },
  backgroundFlatList: { backgroundColor: WHITE, marginTop: 10 }












  // flatListView: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   margin: 5,
  //   // backgroundColor: WHITE,
  //   elevation: 5,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: hp(20),
  //   borderRadius: hp(2),
  //   shadowColor: BLACK,
  //   shadowOpacity: 0.3,
  //   shadowOffset: { width: 0, height: 2 }
  // },
  // imageFlatlist: {
  //   width: wp(13),
  //   height: hp(7),
  //   alignSelf: 'center',
  //   resizeMode: 'contain',
  // },
  // ////////////////////////////////////////////
  // flatListViewHorizontal: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   margin: 5,
  //   // backgroundColor: LIGHTGREY,
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   height: hp(15),
  //   borderRadius: hp(2),
  // },





  // imageFlatListHorizontal: {
  //   width: wp(38),
  //   height: hp(12),
  //   alignSelf: 'center',
  //   resizeMode: 'contain',
  // },
  // viewHeaderStyle: {
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
  // bellButton: {
  //   position: 'absolute',
  //   right: hp(2),
  //   top: '50%',
  //   transform: [{ translateY: -12 }],
  // },
  // containerBH: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingHorizontal: wp(10),
  //   height: hp(8),
  //   backgroundColor: 'white',
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#ccc',
  // },
  // eventContainer: {
  //   width: wp(30),
  //   justifyContent: 'center',
  //   backgroundColor: WHITE,
  // },
  // eventGradient: {
  //   width: wp(30),
  //   height: hp(10),
  //   alignContent: 'center',
  //   justifyContent: 'center',
  //   borderRadius: 20,
  // },
  // gradientContainer: {
  //   flex: 1,
  //   backgroundColor: '#F5F5F5',
  //   margin: 3,
  //   padding: 3,
  //   borderRadius: 20,
  //   justifyContent: 'center',
  // },
  // eventImage: {
  //   flex: 1,
  //   width: '100%',
  // },
  // eventText: {
  //   fontSize: 15,
  //   fontWeight: 'normal',
  //   color: BLACK,
  //   alignSelf: 'center',
  // },
  // flatViewStyle: { flex: 1, marginBottom: hp(8) },
  // categoryName: {
  //   // padding: hp(0.2),
  //   textAlign: 'center',
  //   paddingStart: 5,
  //   paddingEnd: 5,
  //   paddingTop: 2,
  // },
  // separatorBottom: {
  //   height: 0.5,
  //   backgroundColor: '#808080',
  //   marginEnd: 8,
  //   marginStart: 8,
  //   marginBottom: 5,
  // },
  // imgBackground: {
  //   height: heightPercentageToDP(100),
  //   width: widthPercentageToDP(100),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});
