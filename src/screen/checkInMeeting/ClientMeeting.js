import {SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import {styles} from './Style';
import MapView, {PROVIDER_GOOGLE, Callout, Marker} from 'react-native-maps';
import LocationComponent from '../../component/location/LocationComponent';
import Header from '../../component/header/Header';
import AppString from '../../utils/AppString';
import CustomText from '../../component/atoms/CustomText';
import {GREEN, RED} from '../../theme/Colors';
import AppLoader from '../../utils/AppLoader';
import FlashMessage from '../../component/atoms/FlashMessage';
import AddressComponent from '../../component/location/AddressComponent';

const ClientMeeting = ({navigation}) => {
  const [locationData, setLocationData] = useState(null);
  const [checkInText, setCheckInText] = useState(AppString.CHECK_IN);
  const [fetchedAddress, setFetchedAddress] = useState('');
  const [runningTimer, setRunningTimer] = useState(false);
  const mapRef = useRef(null);
  let flashMessageRef = useRef(null);

  // Get Conveeted Address from LAT and LNG
  const handleAddressFetched = address => {
    setFetchedAddress(address);
  };

  const showFlashMessage = () => {
    flashMessageRef.current.showMessage('This is a flash message!', 3000);
  };

  const handleStart = () => {
    setRunningTimer(true);
  };

  const handleStop = () => {
    setRunningTimer(false);
  };

  const handlePunchInClick = () => {
    if (checkInText === AppString.CHECK_IN) {
      handleStart();
      showFlashMessage();
      setCheckInText(AppString.CHECK_OUT);
    } else if (checkInText === AppString.CHECK_OUT) {
      handleStop();
      showFlashMessage();
      setCheckInText(AppString.CHECK_IN);
    }
  };

  const handleLocationChange = newLocation => {
    setLocationData(newLocation);
    if (mapRef.current) {
      const region = {
        latitude: newLocation?.latitude,
        longitude: newLocation?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      mapRef.current.animateCamera(
        {center: region, zoom: 14},
        {duration: 1500},
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={AppString.HRM} />
      {/* For getting Current Lat & Lng */}
      <LocationComponent
        onLocationChange={handleLocationChange}
        navigation={navigation}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        showsTraffic={false}
        scrollEnabled
        showsUserLocation
        initialRegion={{
          latitude: !locationData ? 0 : locationData?.latitude,
          longitude: !locationData ? 0 : locationData?.longitude,
          latitudeDelta: !locationData ? 60 : 0.0922,
          longitudeDelta: !locationData ? 60 : 0.0421,
        }}>
        {!locationData ? null : (
          <Marker
            title={fetchedAddress}
            coordinate={{
              latitude: locationData?.latitude,
              longitude: locationData?.longitude,
            }}
          />
        )}
      </MapView>
      {!locationData ? null : (
        <Callout style={styles.calloutContainer}>
          {/* Check-In and Check-Out Button */}
          <TouchableOpacity
            onPress={handlePunchInClick}
            style={[
              styles.checkInButton,
              {
                backgroundColor:
                  checkInText === AppString.CHECK_IN ? GREEN : RED,
              },
            ]}>
            <CustomText style={styles.timeText} children={checkInText} />
          </TouchableOpacity>
        </Callout>
      )}
      {/* Convert Latitude and Longitude into Address */}
      <AddressComponent
        latitude={!locationData ? 28.594014002221346 : locationData?.latitude}
        longitude={!locationData ? 77.32456601975038 : locationData?.longitude}
        onAddressFetched={handleAddressFetched}
      />
      <AppLoader isLoading={!locationData ? true : false} />
      <FlashMessage
        ref={flashMessageRef}
        message={
          checkInText !== AppString.CHECK_IN
            ? 'CHECK-IN SUCCESSFULLY'
            : 'CHECK-OUT SUCCESSFULLY'
        }
      />
    </SafeAreaView>
  );
};

export default ClientMeeting;
