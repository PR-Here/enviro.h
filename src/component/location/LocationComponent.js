import React, { useEffect, useState } from 'react';
import { Platform, Alert, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Permissions from 'react-native-permissions';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AppString from '../../utils/AppString';
import { isMockingLocation, MockLocationDetectorErrorCode, MockLocationDetectorError } from 'react-native-mock-location-detector'



const LocationComponent = ({ onLocationChange, navigation }) => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const getMaxRetries = 3;


  useEffect(() => {
    getCurrentLocation();
  }, []);

  const alertPopup = () => {
    Alert.alert(
      AppString.LOCATION_PERMISSION,
      AppString.LOCATION_PERMISSION_DESC,
      [
        { text: AppString.CANCEL, style: 'cancel', onPress: () => navigation.goBack() },
        {
          text: AppString.ENABLE_PERMISSION,
          onPress: () => {
            navigation.goBack();
            // Check the platform to open specific settings
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
          },
        },
      ],
      { cancelable: false }
    );
  }


  const getCurrentLocation = async () => {
    try {
      const result = await Promise.race([
        request(
          Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        ),
        new Promise((_, reject) => setTimeout(() => reject('Location request timed out'), 7000)),
      ]);

      setPermissionStatus(result);
      onLocationChange(null);
      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            onLocationChange({ latitude, longitude, permissionStatus });
            setRetryCount(0); // Reset retry count on successful location retrieval
          },
          (error) => {
            onLocationChange("Failed");
            if (error?.message == 'No location provider available.') {
              Alert.alert('GPS Disabled',
                'To use this app, please enable GPS (location services) on your device. ' +
                'You can enable it in your device settings.', [
                { text: AppString.OK, style: 'cancel', onPress: () => navigation.goBack() },
              ]);
              return;
            }
            if (retryCount < getMaxRetries) {
              setRetryCount(retryCount + 1);
              setTimeout(getCurrentLocation, 1000); // Retry Fetch Location here
            } else {
              onLocationChange("Failed");
              console.log("Failed to retrieve location");
            }
          },
          { timeout: 60000, enableHighAccuracy: false } // Added enableHighAccuracy: false
        );
      } else if (result === RESULTS.DENIED) {
        alertPopup();
      } else if (result === RESULTS.BLOCKED) {
        alertPopup();
      } else if (result == RESULTS.UNAVAILABLE) {
        Alert.alert(AppString.LOCATION_UNAVALABLE);
      }
    } catch (error) {
      console.error(error);
      onLocationChange("Location_Failed_after_7_seconds");
    }
  };


  return null; // No UI elements to render
};

export default LocationComponent;
