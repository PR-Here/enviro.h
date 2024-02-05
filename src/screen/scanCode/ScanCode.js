import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { styles } from './Style';
import {
  CAMERA_SCAN_VIEW,
  CLOSE,
} from './../../utils/AssetsImages';
import CustomText from '../../component/atoms/CustomText';
import NavString from '../../utils/NavString';
import AppLoader from '../../utils/AppLoader';
import { loginSuccess, userProfileData, updateProfileImage, appLogoImage } from '../../redux/slices/AuthSlice';
import { HEADERS, LOGIN } from '../../services/ApiEndPoint';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setDbCall, setRefrestToken } from '../../redux/slices/TokenSlice';
import { ShowToast, handleStackNavigation } from '../../utils/Constant';
import useApiEffect from '../../hooks/useApiEffect';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';


const ScanCode = ({ navigation }) => {
  const { makeApiRequest, loading } = useApiEffect()
  const dispatch = useDispatch();

  const fcmToken = useSelector((state) => state?.fcm?.token)
  handleCloseClick = () => {
    navigation.goBack();
  };

  const onSuccess = async (e) => {
    const devicetype = Platform.OS == 'ios' ? 2 : 1
    const uniqueId = await DeviceInfo.getUniqueId()
    //console.log('getUniqueId', uniqueId);
    var payload = {
      token: e?.data,
      device_id: uniqueId,
      device_type: devicetype,
      device_token: fcmToken
    }
    console.log('payload ==> ' + JSON.stringify(payload));
    const apiData = await makeApiRequest({
      url: LOGIN, method: 'POST', isToken: false, data: payload
    })
    // console.log("object apiData", apiData)
    if (apiData != undefined) {
      if (apiData?.status == true) {
        dispatch(setDbCall(apiData?.data?.Dbcall))
        dispatch(userProfileData(apiData?.data?.data))
        dispatch(updateProfileImage(apiData?.data?.data?.profile_image))
        dispatch(loginSuccess(apiData?.data?.data))
        dispatch(setAccessToken(apiData?.data?.jwtToken))
        dispatch(setRefrestToken(apiData?.data?.jwtRefreshToken))
        dispatch(appLogoImage(apiData?.data?.logo))
      } else {
        //console.log(apiData);
        ShowToast(`${apiData?.message}`)
      }
    } else {
      ShowToast('Something went wrong')
    }
    handleStackNavigation(NavString.LOGIN, navigation)

  };


  return (
    <View style={{ flex: 1 }}>
      <QRCodeScanner
        showMarker={true}
        cameraStyle={{ height: '100%' }}
        topViewStyle={styles.qrScannerTopBottomViewStyle}
        bottomViewStyle={styles.qrScannerTopBottomViewStyle}
        onRead={onSuccess}
        customMarker={<Image source={CAMERA_SCAN_VIEW} />}
        flashMode={RNCamera.Constants.FlashMode.auto}
        vibrate
      />
      <View style={styles.viewOverlayStyle}>
        <CustomText style={styles.scanCodeTextStyle}>Scan QR Code</CustomText>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 0.4 }}>
          <CustomText style={styles.scanCodeMsgTextStyle}>
            Scan the code on site or on your device to check in
          </CustomText>
          <TouchableOpacity onPress={handleCloseClick}>
            <View style={styles.closeButtonStyle}>
              <Image source={CLOSE} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <AppLoader isLoading={loading} />
    </View>
  );
};

export default ScanCode;
