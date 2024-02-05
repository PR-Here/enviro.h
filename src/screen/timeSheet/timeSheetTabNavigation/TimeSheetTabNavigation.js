//import liraries
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppString from '../../../utils/AppString';
import CustomText from '../../../component/atoms/CustomText';
import TimeSheetList from '../timeSheetList/TimeSheetList';
import { styles } from './TimeSheetTabNavigationStyle';
import Header from '../../../component/header/Header';
import MonthTimeSheet from '../monthTimeSheet/MonthTimeSheet';

// create a component
const TimeSheetTabNavigation = () => {
    // Create an object to store grouped data
    const tabs = [
        { id: "weekly", label: AppString.WEEKLY },
        { id: "monthly", label: AppString.MONTHLY },
    ];
    const [activeTab, setActiveTab] = useState("weekly");

    const handleTabChange = tabId => {
        setActiveTab(tabId)
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Header title={AppString.TIMESHEET} />
            </View>
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
            {activeTab === "weekly" && (
                <TimeSheetList  />
            )}
            {activeTab === "monthly" && (
                <MonthTimeSheet />
            )}
        </View>
    );
};

//make this component available to the app
export default TimeSheetTabNavigation;
