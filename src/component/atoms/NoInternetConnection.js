import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AppString from '../../utils/AppString';
import CustomText from '../../component/atoms/CustomText';
import InternetImage from '../../../assets/images/SVG/interent.svg'
import { FontName, FontSize } from '../../theme/Fonts';
import CustomButton from '../../component/atoms/CustomButton';
import { ShowToast } from '../../utils/Constant';
import { BLACK, WHITE } from '../../theme/Colors';

export default function NoInternetConnection() {

    const openNetworkSettings = () => {
        ShowToast('Please connect your device with Mobile or Wifi Network')
    }

    return (
        <View style={styles.view}>
            <InternetImage />
            <CustomText style={styles.connectLostText} children={AppString.Connection_Lost} />
            <CustomText style={styles.connectLosDesctText} children={AppString.INTERNET_CONNECTION} />
            {/* Check Connection Button */}
            <CustomButton onPress={openNetworkSettings} textStyle={styles.buttonText} style={styles.checkButton} title={AppString.Check_Connection} />
        </View>
    )
}


const styles = StyleSheet.create({
    view: {
        backgroundColor: WHITE,
        height: '100%', justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    connectLostText: {
        textAlign: 'center', color: BLACK, lineHeight: 25,
        marginTop: 50, fontSize: FontSize(20)
    },
    connectLosDesctText: {
        textAlign: 'center', color: BLACK, lineHeight: 22, marginTop: 20,
        fontFamily: FontName.Gordita_Regular, fontWeight: '400'
        , width: 200, fontSize: FontSize(13)
    },
    checkButton: {
        marginTop: 50,
        borderRadius: 4,
        position: 'absolute',
        bottom: 20
    },
    buttonText: {
        fontSize: FontSize(15),
        color: WHITE,
        fontFamily: FontName.Gordita_Medium,

    }
})
