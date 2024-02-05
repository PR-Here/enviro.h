import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { FontName, FontSize } from '../../theme/Fonts';
import { BLACK, GREY, SILVER, TERNARY_COLOR, TEXT_COLOR_GREY } from '../../theme/Colors';

const CustomTextInput = ({ style, ...restProps }) => {

  const handleTextChange = (inputText) => {
    // Replace any non-alphanumeric characters with an empty string
    const sanitizedText = inputText.replace(/[^a-zA-Z0-9]/g, '');
  };


  return (
    <TextInput
      style={[styles.input, style]}
      {...restProps}
      placeholderTextColor={TERNARY_COLOR}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: GREY,
    borderWidth: 1,
    fontFamily: FontName.Gordita_Medium,
    fontSize: FontSize(13),
    color: BLACK,
    width: "100%",
    borderRadius: 5,

  },
});

export default CustomTextInput;
