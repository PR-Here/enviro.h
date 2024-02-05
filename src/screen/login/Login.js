import React, { useState } from 'react';
import { AppState, Image, PermissionsAndroid, Platform, View } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import HapticFeedback from 'react-native-haptic-feedback';
import LinearGradient from 'react-native-linear-gradient';
import { PERMISSIONS, RESULTS, openSettings, request } from 'react-native-permissions';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import AppLogo from '../../../assets/images/SVG/app_logo.svg';
import Four_SQUARE from '../../../assets/images/SVG/four_square.svg';
import CustomButton from '../../component/atoms/CustomButton';
import CustomText from '../../component/atoms/CustomText';
import AppLockModal from '../../component/modal/AppLockModal';
import { ORANGE } from '../../theme/Colors';
import AppLoader from '../../utils/AppLoader';
import AppString from '../../utils/AppString';
import AssetsImages from '../../utils/AssetsImages';
import { handleStackNavigation } from '../../utils/Constant';
import NavString from '../../utils/NavString';
import { styles } from './Style';


const Login = ({ navigation }) => {

  const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

  const [appState, setAppState] = useState(AppState.currentState);
  const [isAppLock, setIsAppLock] = useState(false);


  const requestCameraPermission = async () => {
    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      if (result === RESULTS.GRANTED) {
        navigation.navigate(NavString.SCAN_CODE);
      } else {
        openAppSettings()
      }
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Enviro App Camera Permission',
          message:
            'Enviro App needs access to your camera to scan QR code for login',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate(NavString.SCAN_CODE);
      } else {
        openAppSettings()
      }
    }

  };

  const openAppSettings = () => {
    openSettings().catch(() => console.log('Cannot open settings'));
  };



  const handleLoginClick = values => {
    requestCameraPermission();

    const options = {
      enableVibrateFallback: true, // fallback to vibration if haptic feedback is not supported
      ignoreAndroidSystemSettings: false,
    };

    // // Trigger haptic feedback
    HapticFeedback.trigger('impactLight', options);
  };

  const launchLockScreen = () => {
    rnBiometrics.simplePrompt({ promptMessage: 'Confirm Identity' })
      .then((resultObject) => {
        const { success } = resultObject
        if (success) {
          //setIsAppLock(false)
          navigateToHome()
        } else {
          console.log('user cancelled biometric prompt')
          // if (Platform.OS == 'ios') {
          //   checkBiometrics()
          // } else {
          //   BackHandler.exitApp()
          // }
          setIsAppLock(true)
        }
      })
    // .catch((error) => {
    //   console.log('biometrics failed', error)
    //   // if (Platform.OS == 'ios') {
    //   //   checkBiometrics()
    //   // } else {
    //   //   BackHandler.exitApp()
    //   // }
    //   //setIsAppLock(true)
    // })
  }

  const checkBiometrics = () => {
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject
        //console.log('available =>', available, biometryType)
        if (available && biometryType === BiometryTypes.FaceID) {
          launchLockScreen()
        } else if (available && biometryType === BiometryTypes.TouchID) {
          launchLockScreen()
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          launchLockScreen()
        } else {
          navigateToHome()
        }
      })
  }

  // CHECK LOGIN SESSION HERE
  let isLogged = useSelector(state => state?.auth?.isLoggedIn);
  if (isLogged && !isAppLock) {
    checkBiometrics()
  }

  const navigateToHome = () => {
    setTimeout(() => {
      //console.log("navigate to home");
      handleStackNavigation(NavString.BOTTOM_NAVIGATION, navigation);
    }, 100);
  }

  return (
    <View style={styles.container}>

      {isLogged ?
        isAppLock ? <View /> : <AppLoader isLoading={isLogged} />
        :
        <LinearGradient
          colors={['#C2E7FF10', '#FFF', '#FFF', '#C2E7FF50']}
          style={{ width: '100%', height: '100%' }}>
          <View style={styles.view}>
            <Image
              style={styles.topRightImageStyle}
              source={AssetsImages.LOGIN_PAGE_TOP_IMAGE}
            />
            <AppLogo width={150} height={80} marginTop={heightPercentageToDP(12)} />
            {/* <Image style={styles.logoImage} source={AssetsImages.LOGO_AGL} /> */}
            <View style={styles.qrViewStyle}>
              <Image style={styles.qrImage} source={AssetsImages.QR_IMAGE} />
              <View
                style={{
                  position: 'absolute',
                  top: 110,
                  left: -12,
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderRadius: 100,
                  backgroundColor: ORANGE,
                }}>
                <Image source={AssetsImages.PHONE} />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 140,
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 100,
                  backgroundColor: ORANGE,
                }}>
                <Four_SQUARE width={15} height={15} />
              </View>
            </View>
            <CustomText
              children={AppString.SCAN_QR_CODE}
              style={styles.scanQrTextStyle}
            />
            <CustomText
              children={AppString.SCAN_QR_MSG}
              style={styles.scanQrMsgStyle}
            />
            <CustomButton
              title={AppString.SCAN_CODE}
              textStyle={styles.buttonTextStyle}
              style={styles.scanButtonStyle}
              onPress={handleLoginClick}
            />
          </View>
        </LinearGradient>}


      <AppLockModal
        message='Enviro App Locked'
        buttonText='Unlock Now'
        visible={isAppLock}
        onDone={() => {
          setIsAppLock(false)
        }
        }
      />
    </View>
  );
};

export default Login;