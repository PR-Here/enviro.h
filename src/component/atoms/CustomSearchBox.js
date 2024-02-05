import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SEARCH } from '../../utils/AssetsImages';
import { BLACK, GREY, LIGHTGREY, SILVER, WHITE } from '../../theme/Colors';
import { FontName, FontSize } from '../../theme/Fonts';
import Search from '../../../assets/images/SVG/search.svg';
import { useFocusEffect } from '@react-navigation/native';

const CustomSearchBox = ({ clear, onPress, placeholder = "Search" }) => {
  const [searchedText, setSearchedText] = useState('')

  //const [search, setSearch] = useState(''); // state to store the search query
  useEffect(() => {
    // create a timeout function that will set the search state to the text input value after 1 second
    const timeoutId = setTimeout(() => {
      onPress(searchedText);
    }, 200);

    // return a cleanup function that will clear the timeout if the text input value changes before the timeout expires
    return () => clearTimeout(timeoutId);
  }, [searchedText]); // only run the effect when the text input value changes

  // handle the text input change and set the text state to the new value
  const handleChangeText = (newText) => {
    setSearchedText(newText);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (clear == true) setSearchedText('');
    }, [clear])
  );

  return (
    <View style={styles.textInputContainer}>
      <TextInput value={searchedText} style={styles.textInput} placeholderTextColor={SILVER} placeholder={placeholder} onChangeText={handleChangeText}
        autoCorrect={false} keyboardType='visible-password'
      />
      <TouchableOpacity onPress={() => {

      }}>
        {/* <View style={styles.textInputInnerContainer}> */}
        <Search width={35} height={35} />
        {/* </View> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    borderRadius: hp(7),
    borderColor: LIGHTGREY,
    borderWidth: 2,
    backgroundColor: WHITE,
    height: hp(6),
    paddingStart: hp(2),
    paddingEnd: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0),
    marginHorizontal: wp(4)
  },
  textInput: {
    justifyContent: 'flex-start',
    flex: 1,
    height: hp(6),
    fontSize: FontSize(15),
    fontFamily: FontName.Gordita_Medium,
    color: BLACK

  },
  textInputInnerContainer: {
    borderRadius: 20,
    backgroundColor: LIGHTGREY,
    height: hp(4),
    width: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default CustomSearchBox;