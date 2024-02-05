import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../theme/Fonts';
import { BLUE, GREY_LIGHT, LIGHTWHITE, WHITE } from '../../theme/Colors';
import { useNavigation } from '@react-navigation/native';
import Notification from '../../../assets/images/SVG/notification.svg';
import AssetsImages from '../../utils/AssetsImages';
import FilterBg from '../../../assets/images/SVG/filterwithwhitebg.svg';
import BACK_ARROW from '../../../assets/images/SVG/backArrowNew.svg'
import CustomText from '../../component/atoms/CustomText';
import Bookmark from '../../../assets/images/SVG/Blackbookmark.svg'
import ShareIcon from '../../../assets/images/SVG/blackShare.svg'

const GurukulHeader = ({ headerText, onFilter, icon, onPress, onNotificatinClick, onFilterClick }) => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        if (onPress == undefined) {
            navigation.goBack();
        } else {
            onPress()
        }
    };

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleBackPress} style={styles.headerContent}>
                <BACK_ARROW />
                <CustomText style={styles.headerText} children={headerText} />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={onFilterClick} style={{ marginRight: 20 }} >
                    <ShareIcon height={18} width={18} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onNotificatinClick} >
                    <Bookmark />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp(1),
        paddingHorizontal: hp(2),
        height: hp(8),
        alignItems: 'center'
    },
    actionButton: {
        padding: hp(1),
    },
    actionText: {
        fontSize: FontSize(12),
        color: BLUE,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backIcon: {
        marginRight: hp(1)
    },
    headerText: {
        fontSize: FontSize(16),
        fontFamily: FontName.Gorditas_Bold,
        fontWeight: 'bold',
        marginLeft: wp(1),
        marginTop: Platform.OS == 'ios' ? 3 : 0,
        alignSelf: 'center',
    },
    filterIconStyle: {
        paddingHorizontal: wp(3),
        paddingVertical: wp(3),
        borderRadius: wp(100),
        alignSelf: 'center',
        backgroundColor: LIGHTWHITE
    }
});

export default GurukulHeader;
