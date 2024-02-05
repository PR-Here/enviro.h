import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { BLACK, GREY, WHITE } from '../../theme/Colors';
import BadgeComponent from '../../component/atoms/BadgeComponent';
import { useNavigation } from '@react-navigation/native';
import NavString from '../../utils/NavString';
import Bell from '../../../assets/images/SVG/bellNew.svg';
import { useDispatch, useSelector } from 'react-redux';
import AGLLOGO from '../../../assets/images/SVG/agl_logo.svg'
import { PLACEHOLDER } from '../../utils/AssetsImages';
import { SvgFromUri } from 'react-native-svg';
import { userProfileData } from '../../redux/slices/AuthSlice';

const BannerHeader = ({ notificationCount }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const loginUserData = useSelector((state) => state?.auth?.profileImage);
  const LoginAppLOGO = useSelector((state) => state?.auth?.appLogo);

  const handleBellClick = () => {
    navigation.navigate(NavString.HOME_NOTIFICATION, { notificationCount: notificationCount });
  };

  const handleProfileClick = () => {
    dispatch(userProfileData(null))
    navigation.push(NavString.MY_PROFILE, { loginRole: 'loginUser' })
    // navigation.navigate(NavString.MY_PROFILE);
  };
  return (
    <View style={styles.container}>
      {/* Logo*/}
      <SvgFromUri
        width={60} height={60}
        uri={LoginAppLOGO ? LoginAppLOGO : AGLLOGO}
      />

      <View style={styles.separatorBottom} />
      {/* Menu Icon */}
      <TouchableOpacity style={styles.imageStyle} onPress={handleProfileClick}>
        <Image source={(loginUserData != "" && loginUserData != undefined) ? { uri: loginUserData } : PLACEHOLDER} style={styles.profileImage} />
      </TouchableOpacity>
      <View style={styles.viewStyle}>
        {/* Search Icon */}
        {/**   <TouchableOpacity
          onPress={handleSearchClick}
          style={styles.searchButton}
        >
         <View style={[styles.filterView, { padding: 0 }]}>
            <Search width={42} height={42} />
          </View>
        </TouchableOpacity>*/}
        {/* Bell Icon */}
        <TouchableOpacity onPress={handleBellClick}>
          {notificationCount ? <BadgeComponent text={notificationCount} /> : <View />}
          <Bell width={42} height={42} style={notificationCount ? {} : {}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(10),
    width: widthPercentageToDP(100),
    backgroundColor: WHITE,
  },
  viewStyle: {
    position: 'absolute',
    right: heightPercentageToDP(0),
    top: Platform.OS == 'android' ? '35%' : '35%',
    transform: [{ translateY: -12 }],
    height: widthPercentageToDP(10),
    width: heightPercentageToDP(10),
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  searchButton: {
    position: 'absolute',
    right: heightPercentageToDP(2),
    transform: [{ translateY: -7 }],
    height: widthPercentageToDP(10),
    width: heightPercentageToDP(8),
    marginEnd: 35
  },
  filterView: {
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 8,
    marginEnd: 12
  },
  imageStyle: {
    width: 42,
    height: 42,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: GREY,
    justifyContent: 'center',
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 100,
    alignSelf: 'center',
  },
  separatorBottom: {
    backgroundColor: GREY,
    width: 1,
    height: Platform.OS == 'android' ? '50%' : '48%',
    marginHorizontal: hp(0.6),
  },
});

export default BannerHeader;
