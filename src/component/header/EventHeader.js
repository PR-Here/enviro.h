import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../theme/Fonts';
import CustomText from '../atoms/CustomText';
import { BLACK, BLUE, GREY, LIGHTGREY, WHITE } from '../../theme/Colors';
import { useNavigation } from '@react-navigation/native';
import BellIcon from '../../../assets/images/SVG/bell.svg'
import SearchIcon from '../../../assets/images/SVG/search.svg'
import Search from '../../../assets/images/SVG/search.svg';
import Bell from '../../../assets/images/SVG/bellNew.svg';
import BACK from '../../../assets/images/SVG/backArrowNew.svg';

const EventHeader = ({ headerText, style, onNotif, onSearch }) => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={[styles.headerContainer, style]}>
            <TouchableOpacity onPress={handleBackPress} style={styles.headerContent}>
                <BACK />
                <CustomText style={styles.headerText} children={headerText} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={onNotif} >
                    <Bell width={42} height={42} />
                </TouchableOpacity>
                <View style={{ width: 10 }} />
                <TouchableOpacity onPress={onSearch} >
                    <Search width={42} height={42} />
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
        paddingVertical: heightPercentageToDP(1),
        //paddingHorizontal: heightPercentageToDP(2),
        height: heightPercentageToDP(10),
        backgroundColor: WHITE,
        borderBottomWidth: 1,
        marginHorizontal: 10,
        borderColor: LIGHTGREY
    },
    actionButton: {
        padding: heightPercentageToDP(1),
    },
    actionText: {
        fontSize: FontSize(12),
        color: BLUE,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: FontSize(20),
        fontFamily: FontName.Gorditas_Bold,
        fontWeight: 'bold',
        marginLeft: heightPercentageToDP(1.5)
    },
    searchIcon: {
        height: 31.2,
        width: 31.2,
        tintColor: BLACK
    },
    bellIcon: {
        height: 26,
        width: 22,
        tintColor: BLACK,
    },
    actionIconContainer: {
        height: 42,
        width: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: heightPercentageToDP(0.1),
        borderColor: LIGHTGREY,
        borderRadius: heightPercentageToDP(0.7),
        marginLeft: heightPercentageToDP(1),
        backgroundColor: WHITE
    }
});

export default EventHeader;
