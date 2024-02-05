import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { FontSize } from '../../theme/Fonts';
import CustomText from './CustomText';
import { SELECTED_OUTER_COLOR, WHITE } from '../../theme/Colors';

const BadgeComponent = ({ text, style, color = WHITE }) => {
  return (
    <View style={[styles.container, style]}>
      <CustomText children={text} style={[styles.text, { color }]} />
    </View>
  );
};

const borderRadiusValue = 100; // Adjust as needed

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadiusValue,
    paddingHorizontal: 8,
    elevation: 5,
    backgroundColor: SELECTED_OUTER_COLOR,
    alignSelf: 'flex-end',
    zIndex: 1,
    paddingVertical: Platform.OS === 'ios' ? 7 : 4,
    position: 'absolute',
  },
  text: {
    color: WHITE,
    fontSize: FontSize(8),
    textAlign: 'center',
    fontWeight: '500',
    alignSelf: 'center',

  },
});

export default BadgeComponent;
