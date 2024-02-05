import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../theme/Fonts';
import CustomText from '../../component/atoms/CustomText';
import { INACTIVE_COLOR, LIGHTGREY, PRIMARY_COLOR, WHITE } from '../../theme/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppString from '../../utils/AppString';
import PGExpandView from './PGExpandView/PGExpandView';

const PGCustomTabBar = ({ navigation, item }) => {
    // Create an object to store grouped data
    const tabs = [
        { id: "Requested", label: AppString.REQUESTED },
        { id: "Past Booking", label: AppString.PAST_BOOKING },
        { id: "Saved Draft", label: AppString.SAVED_DRAFT },

    ];

    const [activeTab, setActiveTab] = useState("Requested");

    const handleTabChange = tabId => {
        setActiveTab(tabId)
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabBarContainer}>
                {tabs?.map(tab => (
                    <TouchableOpacity
                        key={tab.id}
                        style={[
                            styles.tabButton,
                            tab.id === activeTab ? styles.activeTab : null,
                        ]}
                        onPress={() => handleTabChange(tab.id)}>
                        <CustomText
                            style={[
                                styles.tabText,
                                tab?.id === activeTab ? styles.activeTextColor : null,
                            ]}
                            children={tab.label}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={[styles.separatorBottom, { marginTop: 1 }]} />
            {activeTab === "Requested" && (
                <PGExpandView item={item} activeTab={activeTab} />
            )}
            {activeTab === "Past Booking" && (
                <PGExpandView navigation={navigation} item={item} activeTab={activeTab} />
            )}
            {activeTab === "Saved Draft" && (
                <PGExpandView item={item} activeTab={activeTab} />
            )}
        </View>

    );
};


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    tabBarContainer: {
        flexDirection: 'row',
        paddingVertical: hp(0),
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },
    tabButton: {
        paddingVertical: hp(1),
        paddingHorizontal: hp(3),
        height: hp(6),
        justifyContent: 'center',
        borderRadius: hp(1),
        backgroundColor: WHITE,
        fontFamily: FontName.Gordita_Medium
    },
    activeTab: {
        borderBottomColor: PRIMARY_COLOR,
        borderBottomWidth: 2,
        borderBottomStartRadius: 1,
        borderBottomEndRadius: 1
    },
    activeTextColor: {
        color: PRIMARY_COLOR,
        fontFamily: FontName.Gorditas_Bold
    },
    tabText: {
        color: INACTIVE_COLOR,
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Medium
    },
    content: {
        fontSize: FontSize(15),
        textAlign: 'center',
        marginTop: hp(2),
    },
    separatorBottom: {
        height: 1,
        backgroundColor: LIGHTGREY,
        marginTop: 0,
    },
});
export default PGCustomTabBar;

