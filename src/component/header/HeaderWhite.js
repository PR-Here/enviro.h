import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../theme/Fonts';
import { BLACK, LIGHT_BLUE, WHITE } from '../../theme/Colors';
import CustomText from '../atoms/CustomText';
import BACK_ARROW from '../../../assets/images/SVGWhite/back_white_arrow.svg'
const HeaderWhite = ({ title, rightText, onPress, isEdit }) => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBackPress} style={styles.headerContent}>
                <BACK_ARROW />
                <CustomText style={styles.title}>{title}</CustomText>
            </TouchableOpacity>
            {
                !isEdit ? <Text style={styles.rightText} onPress={onPress}>{rightText}</Text> : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: hp(8),
    },
    headerContent: {
        marginLeft: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    title: {
        fontSize: FontSize(16),
        color: WHITE,
        marginLeft: 0,
        paddingTop: 0,
        fontFamily: FontName.Gorditas_Bold,
        marginTop: Platform.OS == 'ios' ? 3 : 0,
    },
    rightText: {
        fontSize: 16,
        color: LIGHT_BLUE,
        marginRight: 15,
        fontWeight: '700',
        fontFamily: FontName.Gorditas_Bold,
    },
});

export default HeaderWhite;
