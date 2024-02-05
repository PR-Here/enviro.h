import { View, TouchableOpacity, PermissionsAndroid, Alert, Linking, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import NotificationHeader from '../../../component/header/NotificationHeader';
import AppString from '../../../utils/AppString';
import AlertDialog from '../../../component/atoms/AlertDialog';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CustomText from '../../../component/atoms/CustomText';
import TabTopNavigation from '../../../navigation/topTabBar/profileTopTabBar/TabTopNavigation';
import { styles } from './Style';
import UserProfile from '../userProfileComponent/UserProfile';
import NavString from '../../../utils/NavString';
import { useSelector, useDispatch } from 'react-redux';
import useApiEffect from '../../../hooks/useApiEffect';
import { UPDATE_PROFILE_IMAGE } from '../../../services/ApiEndPoint';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ShowToast, capitalizeFirstLetter, createFormData } from '../../../utils/Constant';
import AppLoader from '../../../utils/AppLoader';
import { clickOnIsEditProfile, updateProfileImage } from '../../../redux/slices/AuthSlice';
import CustomImage from '../../../component/atoms/CustomImage';
import { onTabBarSroll } from '../../../redux/slices/TabBarSlice';
import EditImage from '../../../../assets/images/SVG/edit_camera.svg'
import UserProfileModal from '../../../component/modal/ProfileImageModal';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';


const ProfileHome = ({ navigation, route }) => {
  const { loginRole, userId } = route.params;
  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const { makeApiRequest, loading } = useApiEffect()
  const loginUserData = useSelector((state) => state?.auth?.profileData);
  const initialIsEdit = useSelector((state) => state?.auth?.clickOnIsEditProfile);
  const [isEdit, setIsEdit] = useState(initialIsEdit);
  const [uri, setUri] = useState('');
  const userName = loginUserData && loginUserData?.first_name + " " + loginUserData?.last_name;
  const companyAddress = loginUserData?.Location?.location_name
  const Designation = loginUserData?.Designation?.designation_name;
  const [loader, setLoader] = useState(false);
  const [showProfilePopup, setShowProfilePoup] = useState(false);
  const [tabName, setSelectedtTabName] = useState('Professional Info')


  useFocusEffect(
    React.useCallback(() => {
      const DataLoading = () => {
        setLoader(true)
        setTimeout(() => {
          setLoader(false)
        }, 1000)
      }
      if (tabName !== 'Experience') DataLoading()
      return () => {
      };
    }, [tabName])
  );

  useEffect(() => {
    // Update the isEdit state whenever the value in the Redux store changes
    setIsEdit(initialIsEdit);
  }, [initialIsEdit]);

  useEffect(() => {
    dispatch(clickOnIsEditProfile(false))
  }, [])


  // useEffect(() => {
  //   const backAction = () => {
  //     if (navigation.isFocused()) {
  //       handleBackPress()
  //     }
  //     return true
  //   }
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  //   return () => backHandler.remove()
  // }, [])

  const handleActionPress = () => {
    setIsEdit(!isEdit);
    dispatch(clickOnIsEditProfile(!isEdit))
    dispatch(onTabBarSroll(true)) // hiding the bottom tab bar on edit
  };

  const handleBackPress = () => {
    if (isEdit) {
      setIsEdit(!isEdit)
      dispatch(clickOnIsEditProfile(!isEdit))
    } else {
      navigation?.goBack()
    }
  }

  // API CALL PROFILE IMAGE
  async function PROFILE_IMAGE_API(imgUrl) {
    const formData = createFormData('profile', imgUrl);
    // try {
    const apiData = await makeApiRequest({ url: UPDATE_PROFILE_IMAGE, method: 'POST', data: formData, isImageUpload: true });
    if (apiData?.status == true) {
      ShowToast(`${apiData?.message}`)
      setUri(apiData?.data?.profile_image)
      dispatch(updateProfileImage(apiData?.data?.profile_image))
    } else {
      ShowToast(`${apiData?.error?.message}`)
    }
    // } catch (error) {
    //   console.log("PROFILE API ERROR CATCH: ", error)
    // }
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Enviro App Camera Permission',
          message:
            'Enviro App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted) {
        onUpdateImagePress();
      } else if (granted == 'never_ask_again') {
        Alert.alert("Permission Denied", "Camera permission is denied. Please enable from device setting", [{
          text: 'Enbale',
          onPress: () => Linking.openSettings()
        }])
      }
    } catch (err) {
      console.log("-- ", err);
    }
  };

  // Profile Image Popup
  const handleProfilePopupClose = () => {
    setShowProfilePoup(false)
  }

  // GET ACTIVE TAB NAME FOR SHOW LOADER WHEN TAB CHANGED
  const getSelectedTabId = (tabName) => {
    setSelectedtTabName(tabName)
  }

  const onUpdateImagePress = () =>
    AlertDialog('Select Image', 'Please Select Type', [
      {
        onPress: () => {
          launchImageLibrary(
            {
              mediaType: 'photo'
            },
            response => {
              if (response?.didCancel) {
                return;
              }
              PROFILE_IMAGE_API(response)
              // if (response.assets && response.assets[0]?.fileSize) {
              //   if (response.assets[0]?.fileSize.size > 1024 * 1024) {
              //     console.log("File with maximum size of 1MB is allowed");
              //     return false;
              //   }

            },
          );
        },
        label: 'Pick From Gallery',
      },
      {
        onPress: () => {
          launchCamera(
            {
              selectionLimit: 0,
              mediaType: 'photo',
            },
            response => {
              if (response?.errorCode == 'others') {
                ShowToast("Camera permission denied. Please enable from device setting.")
              }
              if (response?.didCancel) {
                return;
              }
              PROFILE_IMAGE_API(response)
            },

          );
        },
        label: AppString.CAPTURE_FROM_CAMERA,
      }
    ]);


  return (
    <View style={styles.container}>
      <NotificationHeader
        actionText={isEdit || loginRole != "loginUser" ? '' : 'Edit'}
        headerText={isEdit ? NavString.EDIT_PROFILE : loginRole == "loginUser" ? NavString.MY_PROFILE : NavString.VIEW_PROFILE}
        onActionPress={handleActionPress}
        isEditable={isEdit || loginRole != "loginUser" ? true : false}
        handleBackPress={handleBackPress}
      />
      <TouchableOpacity style={styles.viewImageStyle} activeOpacity={0.9} onPress={() => {
        if (!isEdit) setShowProfilePoup(true)
        else requestCameraPermission();
      }}>
        <CustomImage imageUrl={uri == '' ? loginUserData?.profile_image : uri} />
        {isEdit ? (
          <TouchableOpacity
            style={styles.editImageTouchable}
            onPress={requestCameraPermission}>
            <EditImage width={30} height={30} />
          </TouchableOpacity>
        ) : (
          null
        )}
      </TouchableOpacity>
      <View style={[styles.viewTextStyle, {
        marginTop: isEdit ? hp(-4) : hp(2)
      }]}>
        <CustomText style={styles.title} children={capitalizeFirstLetter(userName)} />
        <CustomText style={styles.title} children={capitalizeFirstLetter(Designation)} />
        <CustomText style={styles.userLocation} children={capitalizeFirstLetter(companyAddress)} />
      </View>

      {loginRole != 'hr' ? null : (
        <CustomText
          children={AppString.PROFESSIONAL_INFO}
          style={styles.personaInfoTitle}
        />
      )}

      {/* CHANGE HERE IF USER CLICK ON EDIT BUTTON */}
      {loginRole == 'hr' ? (
        <UserProfile userId={userId} />
      ) : (
        <TabTopNavigation getSelectedTabId={getSelectedTabId} isEdit={isEdit} loginRole={loginRole} userId={userId} />
      )}

      {/* Profile Popup */}
      {showProfilePopup && <UserProfileModal isVisible={showProfilePopup}
        onClose={handleProfilePopupClose}
        imageUri={uri == '' ?
          loginUserData?.profile_image : uri} />}

      <AppLoader isLoading={loader} />
    </View>
  );
};

export default ProfileHome;
