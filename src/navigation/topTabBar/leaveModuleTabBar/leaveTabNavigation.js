import React, { useState, useEffect } from 'react';
import { styles } from './Style';
import { View, TouchableOpacity } from 'react-native';
import CustomText from '../../../component/atoms/CustomText';
import AppString from '../../../utils/AppString';
import MyLeaveTab from '../../../screen/leaveModule/leaveDashboard/MyLeaveTab';
import { useFocusEffect } from '@react-navigation/native';

const LeaveTabNavigation = ({ tabItemOnPress, setDefaultHandleTab, tabClick, selectedFilterData }) => {
    const tabs = [
        { id: 'My Leaves', label: AppString.MY_LEAVE },
        { id: 'Leave Request', label: AppString.LEAVE_REQUEST },
        { id: 'Saved Leaves', label: AppString.SAVED_LEAVE },
    ];
    const [activeTab, setActiveTab] = useState('My Leaves');

    useEffect(() => {
        handleDefaultTab()
    })

    const handleTabChange = tabId => {
        setActiveTab(tabId);
        {/* We are passing this function for set state defaultHandleTab to default value false */ }
        tabClick(tabId)
    };

    const handleDefaultTab = () => {

        if (setDefaultHandleTab) {
            {/* we are set first tab every time cancel request or submit request */ }
            setActiveTab('My Leaves');
        }

    }


    // Api Calling Here
    // AND SAVED ALL PROFILE RESPONCE INTO USER PROFILE DATA.



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
                                tab?.id === activeTab ? styles.activetabText : styles.tabText,
                                tab?.id === activeTab ? styles.activeTextColor : styles.InactiveTextColor,
                            ]}
                            children={tab.label}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            {activeTab === 'My Leaves' && (
                <MyLeaveTab tabItemOnPress={(item) => {
                    tabItemOnPress(item, 'myLeave')
                }} Selectedtype='my-leave' setDefaultHandleTab={setDefaultHandleTab} selectedFilterData={selectedFilterData} />

            )}
            {activeTab === 'Leave Request' && (
                <MyLeaveTab tabItemOnPress={(item) => {
                    tabItemOnPress(item, 'leaveRequest')
                }} Selectedtype={'leave-request'} />
            )}
            {activeTab === 'Saved Leaves' && (
                <MyLeaveTab tabItemOnPress={(item) => {
                    tabItemOnPress(item, 'savedleave')
                }} Selectedtype={'saved_leave'} />
            )}
        </View>
    );
};

export default LeaveTabNavigation;
