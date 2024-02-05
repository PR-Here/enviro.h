//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import AppString from '../../../utils/AppString';
import Header from '../../../component/header/Header';
import Billfull from '../../../../assets/images/SVG/WalletIcons/bill_dummy_full.svg';
import { BLACK } from '../../../theme/Colors';
import WalletHeader from '../walletHeader/WalletHeader';

// create a component
const BillImage = () => {
    return (
        <View style={styles.container}>
        <WalletHeader title={AppString.BILLIMAGE}/>
            <Text style={{ color: 'red', marginBottom: moderateScale(8), marginLeft: moderateScale(11) }}>Error: Image uploaded was not clear</Text>
            <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                <Billfull width={420}/>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
});

//make this component available to the app
export default BillImage;
