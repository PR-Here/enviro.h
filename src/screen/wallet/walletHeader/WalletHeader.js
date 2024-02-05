import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {
    heightPercentageToDP,
    heightPercentageToDP as hp,
    widthPercentageToDP,
} from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../../theme/Fonts';
import { BLACK, LIGHTWHITE, WHITE } from '../../../theme/Colors';

import { useNavigation } from '@react-navigation/native';

import { ShowToast } from '../../../utils/Constant';
import Upload from '../../../../assets/images/SVG/WalletIcons/upload_gray.svg'
import Delete from '../../../../assets/images/SVG/WalletIcons/delete_gray.svg'
import BACK_ARROW from '../../../../assets/images/SVG/backArrowNew.svg'
import CustomText from '../../../component/atoms/CustomText';


const WalletHeader = ({ title, rightText, onPress, isEdit }) => {
    const navigation = useNavigation();
    const handleBellClick = () => {
        // navigation.navigate(NavString.HOME_NOTIFICATION);
        ShowToast("under Process")
    };

    const handleSearchClick = () => {
        ShowToast("under Process")
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={handleBackPress} style={styles.headerContent}>
                <BACK_ARROW width={18} height={18} style={{ marginLeft: 0 }} />
                <CustomText style={styles.title}>{title}</CustomText>
            </TouchableOpacity>

            {/* Menu Icon */}
            <View style={styles.viewStyle}>
                {/* Search Icon */}
                <TouchableOpacity
                    onPress={handleSearchClick}
                    style={styles.searchButton}
                >
                    <View style={[styles.filterView, { padding: 0 }]}>
                        <Delete width={35} height={35} />
                    </View>
                </TouchableOpacity>
                {/* Bell Icon */}
                {/* <View style={styles.bellView}> */}
                <TouchableOpacity onPress={handleBellClick} >
                    <Upload width={35} height={35} />

                </TouchableOpacity>
            </View >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: widthPercentageToDP(10),
        height: hp(8),
        width: widthPercentageToDP(100),
        backgroundColor: WHITE
    },
    headerContent: {
        marginLeft: -20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 0
    },
    title: {
        fontSize: FontSize(18),
        color: BLACK,
        paddingTop: 0,
        marginLeft: 3,
        fontWeight: '700',
        fontFamily: FontName.Gorditas_Bold,
        marginTop: -4
    },
    backButton: {
        position: 'absolute',
        left: heightPercentageToDP(0),
        top: '5%',
        transform: [{ translateY: -12 }],
        width: widthPercentageToDP(19),
        height: heightPercentageToDP(5),
        padding: 2,
        resizeMode: 'contain'
    },
    viewStyle: {
        position: 'absolute',
        right: heightPercentageToDP(0),
        top: Platform.OS == 'android' ? '33%' : '40%',
        transform: [{ translateY: -12 }],
        height: widthPercentageToDP(10),
        width: heightPercentageToDP(10),
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    bellButton: {
        position: 'absolute',
        right: heightPercentageToDP(2),
        top: '0%',
        height: widthPercentageToDP(10),
        width: heightPercentageToDP(3),
    },
    searchButton: {
        position: 'absolute',
        right: heightPercentageToDP(2),
        // top: '5%',
        transform: [{ translateY: -7 }],
        height: widthPercentageToDP(10),
        width: heightPercentageToDP(8),
        marginEnd: 35
    },
    iconStyle: {
        position: 'absolute',
        left: heightPercentageToDP(0),
        top: '50%',
        transform: [{ translateY: -12 }],
        width: widthPercentageToDP(7),
        height: heightPercentageToDP(3.5),
        resizeMode: 'contain',
    },
    filterView: {
        // backgroundColor: LIGHTWHITE,
        borderRadius: 100,
        alignSelf: 'center',
        // paddingStart: 6,
        // paddingEnd: 6,
        // paddingTop: 7,
        // paddingBottom: 7,
        marginTop: 8,
        marginEnd: 12
    },
    bellView: {
        backgroundColor: LIGHTWHITE,
        borderRadius: 26,
        marginStart: 20,
        alignSelf: 'center',
        paddingHorizontal: 6,
        paddingVertical: Platform.OS == 'android' ? 6 : 6,
    },
    imageStyle: {
        width: 45,
        height: 45,
        borderRadius: 100,
        marginStart: -20,
        alignItems: 'baseline',

    }
});

export default WalletHeader;
