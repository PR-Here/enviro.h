//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard } from 'react-native';
import Header from '../../../component/header/Header';
import AppString from '../../../utils/AppString';
import WalletIcon from '../../../../assets/images/SVG/WalletIcons/wallet.svg'
import Ruppes from '../../../../assets/images/SVG/WalletIcons/rupee.svg'
import CustomText from '../../../component/atoms/CustomText';
import { FontName, FontSize } from '../../../theme/Fonts';
import { BACKGROUND_COLOR_DASHBOARD, BLACK, LIGHTWHITE, PRIMARY_COLOR } from '../../../theme/Colors';
import { moderateScale } from 'react-native-size-matters';
import { ShowToast } from '../../../utils/Constant';
import OTPInput from './OTPInput';
import NavString from '../../../utils/NavString';

// create a component
const PaymentOtp = ({ navigation }) => {
    const maximumCodeLength = 4;
    const [otpCode, setOTPCode] = useState('');
    const [isPinReady, setIsPinReady] = useState(false);

    useEffect(() => {
        if (otpCode.length == maximumCodeLength) {
            navigation.navigate(NavString.SUCESS_PAY)
            Keyboard.dismiss();
        }
    });

    const verifyOtp = () => {
        ShowToast("")
        // if (otpCode.length != maximumCodeLength) {
        //     ShowToast('Please enter OTP.');
        // } else {
        //     otpAPI();
        //     // navigation.navigate(NavString.DETAIL)
        // }
    };

    return (
        <View style={styles.container}>
            <Header title={AppString.PAY} />
            <View style={{
                marginHorizontal: moderateScale(14), height: moderateScale(57),
                justifyContent: 'center',
                borderRadius: 8
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: moderateScale(0) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <WalletIcon width={30} height={30} style={{ marginEnd: 10 }} />
                        <Text style={{ color: BLACK, fontSize: 16, fontFamily: FontName.Gordita_Medium, fontWeight: '500' }}>Total Wallet Balance</Text>
                    </View>
                    <View style={[styles.subInnerView, { marginTop: -3 }]}>
                        <Ruppes width={20} height={20} style={{ marginTop: 2, alignItems: 'center', marginHorizontal: 'center', justifyContent: 'center' }} />
                        <CustomText children={"1500"} style={[styles.textStyle, { fontFamily: FontName.Gordita_Medium, fontWeight: '500' }]} fontSize={FontSize(16)} />
                    </View>
                </View>
            </View>

            <View style={{ marginTop: moderateScale(10), flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, backgroundColor: LIGHTWHITE, padding: 10, width: "95%", margin: 10 }}>
                    <View>
                        <CustomText children={"To:"} style={styles.cellTextStyle} fontSize={FontSize(14)} />
                        <CustomText children={"Sending: "} style={[styles.cellTextStyle, { marginTop: 5 }]} fontSize={FontSize(14)} />
                    </View>
                    <View>
                        <CustomText children={" McDonald’s"} style={styles.cellTextStyle} fontSize={FontSize(14)} />
                        <View style={styles.cellSubInnerView}>
                            <Ruppes width={20} height={20} style={{ marginTop: 3, alignItems: 'center', marginHorizontal: 'center', justifyContent: 'center' }} />
                            <CustomText children={"1400"} style={styles.cellTextAmountStyle} fontSize={FontSize(14)} />
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <CustomText children={"Enter 4-Digit PIN"} style={styles.textValidateStyle} fontSize={FontSize(16)} />
                <Pressable style={styles.otpStyle} onPress={Keyboard.dismiss}>
                    <View>
                        <OTPInput
                            code={otpCode}
                            setCode={setOTPCode}
                            maximumLength={maximumCodeLength}
                            setIsPinReady={setIsPinReady}
                        />
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR_DASHBOARD
    }, subInnerView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: -15
    }, cellSubInnerView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 0
    }, cellTextAmountStyle: {
        color: PRIMARY_COLOR,
        fontFamily: FontName.Gorditas_Bold,
        fontWeight: '400',
        marginStart: 2,
    }, cellTextTimeStyle: {
        color: BLACK,
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '400',
        marginStart: 2,
    }, cellTextStyle: {
        color: BLACK,
        fontFamily: FontName.Gordita_Medium,
        fontWeight: '500',
        marginStart: 2,
    }, otpStyle: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }, textValidateStyle: {
        color: BLACK,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 40,
        fontWeight: '500',
        fontFamily: FontName.Gordita_Medium
    }
});

//make this component available to the app
export default PaymentOtp;
