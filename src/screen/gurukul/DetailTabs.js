import React, { useState, useEffect } from 'react';
import { styles } from './Style';
import { View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen'
import CustomText from '../../../src/component/atoms/CustomText';
import AppString from '../../../src/utils/AppString'
import DetailTabList from './DetailTabList';

const DetailTabs = ({ tabItemOnPress, setDefaultHandleTab, tabClick }) => {
    const tabs = [
        { id: 'Transcript', label: AppString.Transcript },
        { id: 'Lesson', label: AppString.LESSON },

        // { id: 'Skill Covered', label: AppString.SKILL_COVERED },
    ];
    const [activeTab, setActiveTab] = useState('Transcript');

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
            setActiveTab('Transcript');
        }

    }


    // Api Calling Here
    // AND SAVED ALL PROFILE RESPONCE INTO USER PROFILE DATA.



    return (
        <View >
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: hp(1),
                alignItems: 'center',
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1
            }}>
                {tabs?.map(tab => (
                    <TouchableOpacity
                        key={tab.id}
                        style={[
                            {
                                paddingVertical: hp(1),
                                height: hp(6),
                                justifyContent: 'center',
                                borderRadius: hp(1),
                                marginLeft: hp(1),
                                paddingHorizontal: 20
                            },
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
            {activeTab === 'Transcript' && (

                <DetailTabList />
            )}
            {activeTab === 'Lesson' && (

                <DetailTabList />
            )}

        </View>
    );
};

export default DetailTabs;