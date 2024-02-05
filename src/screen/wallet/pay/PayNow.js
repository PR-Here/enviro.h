//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Keyboard } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import HeaderCompo from '../../../component/HeaderCompo';
import { BLACK, WHITE } from '../../../theme/AppColor';
import { moderateScale } from 'react-native-size-matters';
import AddharPNG from '../../../../assets/image/addharPNG.png'

// create a component
const PayNow = () => {
    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <HeaderCompo />
                <View style={{
                    backgroundColor: WHITE, marginHorizontal: moderateScale(14), height: moderateScale(57),
                    justifyContent: 'center',
                    borderRadius: 8
                }} >
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: moderateScale(15)
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={AddharPNG} style={{
                                height: moderateScale(24),
                                width: moderateScale(24),
                                marginRight: 10


                            }} />
                            <Text style={{ color: BLACK, fontSize: 20 }}>Total Wallet Balance</Text>
                        </View>
                        <Text style={{ color: BLACK, fontSize: 20 }}>1500</Text>
                    </View>
                </View>

                <View style={{
                    backgroundColor: WHITE, height: moderateScale(57),
                    justifyContent: 'center',
                    borderRadius: 8,
                    marginTop: moderateScale(13)
                }} >
                    <View style={{
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: moderateScale(26),
                            marginBottom: moderateScale(5)
                        }}>

                            <Text style={{ color: BLACK, fontSize: 15 }}>To:</Text>
                            <Text style={{ color: BLACK, fontSize: 15 }}>McDonald’s</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', marginHorizontal: moderateScale(26),
                        }}>
                            <Text style={{ color: BLACK, fontSize: 15 }}>Sending:</Text>
                            <Text style={{
                                color: BLACK, fontSize: 15,
                                marginRight: moderateScale(45)

                            }}>1500</Text>
                        </View>
                    </View>
                </View>

                <Text style={{ marginTop: moderateScale(41), alignItems: 'center' }}>Enter 4-Digit PIN</Text>

            </View>
        </Pressable>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

//make this component available to the app
export default PayNow;
