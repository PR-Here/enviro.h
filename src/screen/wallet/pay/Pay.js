//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { BLACK, PRIMARY_COLOR, WHITE } from '../../../theme/Colors';
import Header from '../../../component/header/Header';
import AppString from '../../../utils/AppString';
import { FontName, FontSize } from '../../../theme/Fonts';
import Car from '../../../../assets/images/SVG/WalletIcons/car.svg'
import Ruppes from '../../../../assets/images/SVG/WalletIcons/rupee.svg'
import NavString from '../../../utils/NavString';
import CustomText from '../../../component/atoms/CustomText';


// create a component
const Pay = ({ navigation }) => {
    const [title, setTitle] = useState("1500");

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Header title={AppString.PAY} />
                <View style={{alignItems: 'center', justifyContent: 'center', marginTop: moderateScale(70) }}>
                    <Car width={100} height={100} />
                    <Text style={{ fontSize: 20, marginTop: moderateScale(15), fontFamily: FontName.Gordita_Medium, fontWeight: '500', color: PRIMARY_COLOR }}>Car</Text>
                    <Text style={{ fontSize: 14, marginTop: moderateScale(5), fontFamily: FontName.Gordita_Regular, fontWeight: '400', color: PRIMARY_COLOR }}>+91 8746739208</Text>

                    <View style={[styles.subInnerView]}>
                        <Ruppes width={50} height={50} style={{ marginTop: 1, alignItems: 'center', marginHorizontal: 'center', justifyContent: 'center' }} />
                        <CustomText children={"1500"} style={{marginTop: 0}} fontSize={FontSize(45)} />
                    </View>

                    <TouchableOpacity
                        style={{
                            borderRadius: 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: BLACK,
                            height: moderateScale(36),
                            width: moderateScale(128),
                            marginTop: moderateScale(41)
                        }}
                        //navigation.navigate(NavString.PAYMENT_OTP)
                        onPress={() => (navigation.navigate(NavString.PAYMENT_OTP))}>
                        <Text style={{ color: WHITE, fontSize: FontSize(14), fontFamily: FontName.Gordita_Medium, fontWeight: '400' }}>Pay Now</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </Pressable>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: WHITE,
    },
    subInnerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 0,
        fontFamily: FontName.Gordita_Medium,
        lineHeight: 22,
        fontSize: FontSize(40),
        justifyContent: 'center',
        marginTop: 15,
    },
});

//make this component available to the app
export default Pay;
