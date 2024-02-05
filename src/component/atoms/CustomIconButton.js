import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { FontName, FontSize } from '../../theme/Fonts';
import { BLACK, WHITE } from '../../theme/Colors';
import Add from '../../../assets/images/SVG/add-copy.svg'

const CustomIconButton = ({ title, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Add style={{ color: BLACK }} fill={BLACK} />
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: WHITE,
        borderRadius: hp(1),
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: BLACK
    },
    buttonText: {
        color: BLACK,
        fontSize: FontSize(13),
        fontFamily: FontName.Geo_Auto_Regular,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontWeight: '500',
        fontSize: 16,
        marginLeft: 10
    },
});

export default CustomIconButton;
