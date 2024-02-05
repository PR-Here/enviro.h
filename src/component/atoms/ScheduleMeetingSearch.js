import React from 'react';
import { TextInput, StyleSheet, View, Image, Text, Platform } from 'react-native';
import { BLACK, LIGHT_GREY } from '../../theme/Colors';
import { FontName, FontSize } from '../../theme/Fonts';
import Search from '../../../assets/images/SVG/search.svg'

const ScheduleMeetingSearch = ({
  value,
  containerStyle,
  title,
  icon,
  onChangeText,
  placeholder,
  placeholderTextColor
}) => {
  return (
    <View style={containerStyle}>
      <Text style={styles.textTitleStyle}>{title}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textFieldStyle}
          placeholder={placeholder}
          placeholderTextColor={'#00000080'}
          value={value}
          onChangeText={onChangeText}
        />
        {placeholder === 'Search' ? (
          <View style={{ position: 'absolute', end: 5 }}>
            <Search width={35} height={35} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
  },
  textTitleStyle: {
    fontSize: FontSize(14),
    fontFamily: FontName.Gordita_Regular,
    fontWeight: '400',
    color: LIGHT_GREY,
  },
  textFieldStyle: {
    paddingVertical: 5,
    borderBottomColor: BLACK,
    borderBottomWidth: 0.5,
    fontSize: 16,
    fontFamily: FontName.Gordita_Regular,
    marginTop: Platform.OS == 'ios' ? 5 : 2
  },
  imageStyle: {
    height: 20,
    width: 20,
  },
});

export default ScheduleMeetingSearch;
