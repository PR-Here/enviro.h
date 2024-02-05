//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BLACK, WHITE } from '../../theme/Colors';
import { FontName, FontSize } from '../../theme/Fonts';
import AppLogo from '../../../assets/images/SVG/app_logo.svg';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

// create a component
const ComingSoon = () => {
    return (
        <View style={styles.container}>
            <AppLogo width={widthPercentageToDP(40)} height={heightPercentageToDP(25)} style={styles.imgStyle} />
            <Text style={styles.labelStyle}>Coming Soon...</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WHITE,
    },
    labelStyle: {
        fontSize: FontSize(24),
        color: BLACK,
        fontFamily: FontName.Gorditas_Bold
    },
    imgStyle: {
        resizeMode: 'stretch',
        marginTop: -60,
    },
});

//make this component available to the app
export default ComingSoon;
