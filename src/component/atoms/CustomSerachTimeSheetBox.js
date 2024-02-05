import React from 'react';
import { TextInput, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BLACK, LIGHTGREY, WHITE } from '../../theme/Colors';
import { FontSize } from '../../theme/Fonts';
import CustomTextInput from './CustomTextInput';
import Search from '../../../assets/images/SVG/search.svg';



const CustomSearchTimeSheetBox = ({ placeholder = "Search", onPress }) => {
   return (
      <View style={[styles.textInputContainer]}>
         <CustomTextInput style={[styles.textInput]} placeholder={placeholder} onChangeText={(text) => onPress(text)} />

         <TouchableOpacity onPress={() => onPress}>
            {/* <View style={styles.textInputInnerContainer}> */}
            <Search  width={35} height={35} />
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
      marginHorizontal: wp(6)
   },
   textInput: {
      justifyContent: 'flex-start',
      flex: 1,
      height: hp(6),
      fontSize: FontSize(16),
      color: BLACK,
      borderWidth: 0,
      alignSelf:'center'
   },
   textInputInnerContainer: {
      borderRadius: 100,
      backgroundColor: LIGHTGREY,
      height: hp(4),
      width: wp(8),
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      
   },
});


export default CustomSearchTimeSheetBox;