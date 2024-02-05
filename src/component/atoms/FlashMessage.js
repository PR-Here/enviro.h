import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Animated, View, StyleSheet} from 'react-native';
import CustomText from './CustomText';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {FontSize} from '../../theme/Fonts';
import {APPLOADER_COLOR} from '../../theme/Colors';

const FlashMessage = forwardRef(({message, duration = 3000}, ref) => {
  const [opacity] = useState(new Animated.Value(0));

  useImperativeHandle(ref, () => ({
    showMessage: msg => {
      showMessage(msg);
      setTimeout(() => {
        hideMessage();
      }, duration);
    },
  }));

  const showMessage = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideMessage = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <View style={styles.messageContainer}>
        <CustomText style={styles.messageText} children={message} />
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: heightPercentageToDP(5),
    alignItems: 'center',
    zIndex: 200,
    alignSelf: 'center',
    width: '100%',
  },
  messageContainer: {
    backgroundColor: APPLOADER_COLOR,
    padding: heightPercentageToDP(1.5),
    borderRadius: heightPercentageToDP(10),
  },
  messageText: {
    color: 'white',
    fontSize: FontSize(12),
  },
});

export default FlashMessage;
