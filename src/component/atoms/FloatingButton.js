import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import { PRIMARY_COLOR } from '../../theme/Colors';
import Add from '../../../assets/images/SVG/add.svg';

const FloatingButton = ({onPress, image}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Add />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    backgroundColor: PRIMARY_COLOR, // Button background color
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1, // Add shadow on Android
    zIndex: 1, // Ensure the button is above other components
  },
});

export default FloatingButton;
