import React, { useState, useEffect } from 'react';
import Geocoder from 'react-native-geocoding';
import AppString from '../../utils/AppString';

Geocoder.init(AppString.MAP_KEY); // Replace with your API key

const AddressComponent = ({ latitude, longitude, onAddressFetched }) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    getAddressFromLatLng(latitude, longitude);
  }, [latitude, longitude]);

  const getAddressFromLatLng = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const formattedAddress = response.results[0].formatted_address;
      setAddress(formattedAddress);
      onAddressFetched(formattedAddress); // Call the callback with the address
    } catch (error) {
      console.error(error);
    }
  };

  return null; // Component doesn't render anything directly
};

export default AddressComponent;
