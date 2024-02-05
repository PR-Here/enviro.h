import React, { useEffect, useState } from 'react';
import { styles } from './Style';
import { View, TouchableOpacity } from 'react-native';
import CustomText from '../../../component/atoms/CustomText';
import AppString from '../../../utils/AppString';
import { CheckInOffice, CheckInClient, CheckInWFH } from '../../../screen';
import { WHITE } from '../../../theme/Colors';
import { useSelector } from 'react-redux';



const CheckInTopTabBar = ({ handleClientAndWfhTabClick, punchinData, punching_type, currentaddress }) => {
    const getSelectedTabId = useSelector((state) => state?.punchInTab?.selectedTab);
    const tabs = [
        { id: 'office', label: AppString.OFFICE },
        { id: 'onsite', label: AppString.ONSITE },
        { id: 'wfh', label: AppString.WFH },
    ];
    const [activeTab, setActiveTab] = useState(getSelectedTabId == 'Office' ? 'office' : getSelectedTabId == 'On-site' ? "onsite" : getSelectedTabId == 'WFH' ? 'wfh' : 'office');


    const handleTabChange = tabId => {
        setActiveTab(tabId);
    };

    // console.log("getSelectedTabId======== ", getSelectedTabId);

    useEffect(() => {
        const sendDirectSelectedTabFromLocalStorage = () => {
            if (getSelectedTabId != null)
                handleClientAndWfhTabClick(getSelectedTabId == 'Office' ? AppString.OFFICE :
                    getSelectedTabId == 'On-site' ? AppString.ONSITE :
                        getSelectedTabId == 'WFH' ? 'wfh' : AppString.WFH)
        }
        sendDirectSelectedTabFromLocalStorage()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.tabBarContainer}>
                {tabs?.map(tab => (
                    <TouchableOpacity
                        activeOpacity={activeTab == tab.id ? 1 : 0.4}
                        key={tab.id}
                        style={[
                            styles.tabButton,
                            tab?.id === activeTab ? styles.activeTextColor : null,
                        ]}
                        onPress={() => {
                            if (activeTab !== tab.id) {
                                handleTabChange(tab.id)
                                handleClientAndWfhTabClick(tab.label)
                            }
                        }}>
                        <CustomText
                            style={[
                                styles.tabText,
                                tab?.id === activeTab ? { color: WHITE } : null,

                            ]}
                            children={tab.label}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            {activeTab === 'office' && (
                <CheckInOffice punchinData={punching_type == 1 ? punchinData?.data : null}
                    currentaddress={currentaddress} />
            )}

            {activeTab === 'onsite' && (
                <CheckInClient punchinData={punching_type == 2 ? punchinData?.data : null}
                    currentaddress={currentaddress} />
            )}

            {activeTab === 'wfh' && (
                <CheckInWFH punchinData={punching_type == 3 ? punchinData?.data : null}
                    currentaddress={currentaddress} />
            )}
        </View>
    );
};

export default CheckInTopTabBar;
