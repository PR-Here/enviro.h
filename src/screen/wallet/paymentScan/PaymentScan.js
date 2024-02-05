//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Platform, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import {
    CAMERA_SCAN_VIEW,
    CLOSE,
} from '../../../utils/AssetsImages';
import CustomText from '../../../component/atoms/CustomText';
import { FontSize } from '../../../theme/Fonts';
import { TIMESHEET_ITEM_HEADER, WHITE } from '../../../theme/Colors';
import { ShowToast } from '../../../utils/Constant';
import { styles } from './Style';
import Header from '../../../component/header/Header';
import NavString from '../../../utils/NavString';
import HeaderWhite from '../../../component/header/HeaderWhite';

// create a component
const PaymentScan = ({ navigation }) => {

    handleCloseClick = () => {
        // navigation.goBack();
        navigation.navigate(NavString.PAY)
    };

    const onSuccess = async (e) => {
        ShowToast("")
    };

    return (
        <View style={{ flex: 1 }}>
            <QRCodeScanner
                showMarker={true}
                cameraStyle={{ height: '100%' }}
                topViewStyle={styles.qrScannerTopBottomViewStyle}
                bottomViewStyle={styles.qrScannerTopBottomViewStyle}
                onRead={onSuccess}
                customMarker={<Image source={CAMERA_SCAN_VIEW} />}
                flashMode={RNCamera.Constants.FlashMode.auto}
                vibrate
            />
            <View style={styles.viewOverlayStyle}>
                <HeaderWhite title={""} />
                <CustomText style={styles.scanCodeTextStyle}>Scan QR Code</CustomText>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 0.4 }}>
                    <CustomText style={styles.scanCodeMsgTextStyle}>
                        Scan the code on site or on your device to check in
                    </CustomText>
                    <TouchableOpacity onPress={handleCloseClick}>
                        <View style={styles.closeButtonStyle}>
                            <Image source={CLOSE} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

//make this component available to the app
export default PaymentScan;
