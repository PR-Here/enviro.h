import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import CustomText from '../../component/atoms/CustomText';
import { FontName, FontSize } from '../../theme/Fonts';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import PGExpandView from './PGExpandView/PGExpandView';


import ArrowImg from '../../../assets/images/SVG/PlanGo/arrow.svg';
import PGCustomTabBar from './PGCustomTabBar';
import NavString from '../../utils/NavString';

const PGExpandibleList = ({ navigation, route, data, sectionTitle }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const rotationValue = useRef(new Animated.Value(0)).current;

    const toggleCollapse = () => {
        if (sectionTitle == 'My Bookings') {
            return
        }
        setIsCollapsed(!isCollapsed);
        const toValue = isCollapsed ? 1 : 0;
        Animated.timing(rotationValue, {
            toValue,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    };

    const Request = () => {
        navigation.navigate(NavString.BOOKING_REQUEST_TAB)
        // ShowToast("Working here")
    }

    const rotateIcon = rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    return (
        <View>
            {sectionTitle == "Request Booking" ?
                <TouchableOpacity onPress={() => Request()}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <CustomText
                            children={sectionTitle}
                            style={{
                                marginStart: 10, marginTop: 20, marginBottom: 8, fontSize: 16, fontFamily: FontName.Gordita_Medium,
                            }} />
                        <ArrowImg style={{ marginStart: 10, marginTop: 20, marginBottom: 8, }} />
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={toggleCollapse}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <CustomText
                            children={sectionTitle}
                            style={{
                                marginStart: 10, marginTop: 20, marginBottom: 8, fontSize: 16, fontFamily: FontName.Gordita_Medium,
                            }} />
                        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
                            <ArrowImg style={{ marginStart: 10, marginTop: 20, marginBottom: 8, }} />

                        </Animated.View>
                    </View>
                </TouchableOpacity>}
            <Collapsible collapsed={isCollapsed}>

                {data.map((item, index) => (
                    <View key={index}>
                        {sectionTitle == 'My Bookings'
                            ? <PGCustomTabBar navigation={navigation} item={item} />
                            : sectionTitle == "Request Booking" ? <View /> :
                                <PGExpandView item={item} />}
                    </View>
                ))}

            </Collapsible>
        </View>
    );
};

export default PGExpandibleList;

export const styles = StyleSheet.create({
    dateSectionStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: hp(5),
    },

    columnStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: hp(3),
    },


});