import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { APPLOADER_COLOR, WHITE } from '../theme/Colors';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AppLoader = ({ isLoading }) => {
  const [showLoader, setShowLoader] = useState(isLoading);

  return (
    <>
      {isLoading && (
        <View style={styles.container}>

          {/**  
          <LottieView
            source={require('../../assets/anim/anim.json')}
            autoPlay
            loop
            style={styles.lottie}
          />*/}
          
          <Image
            source={require("../../assets/images/GIF/loading.gif")}
            style={styles.imageStyle} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', //Commented as suggested by QA & Designer
  },
  lottie: {
    width: wp(40),
    height: hp(40),
  },
  imageStyle: { width: 100, height: 100, resizeMode: "contain" }
});

export default AppLoader;
