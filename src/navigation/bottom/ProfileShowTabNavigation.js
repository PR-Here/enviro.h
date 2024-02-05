import ProfessionalInfo from '../../screen/profileModule/professionalDetails/Professional';
import ExperienceDetails from '../../screen/profileModule/experienceDetails/ExpandableHome/ExperienceDetails';
import AppString from '../../utils/AppString';
import React, { useState } from 'react';
import { styles } from './Style';
import { View, TouchableOpacity } from 'react-native';
import CustomText from '../../component/atoms/CustomText';
import ProfileProfessionalShowDeatils from '../../screen/profileModule/profileShowHome/profileProfessionalShowDeatils/profileProfessionalShowDeatils';
import ProfileExperinceShowDetail from '../../screen/profileModule/profileShowHome/profileExperinceShowDetails/ProfileExperinceShowDetail';

const ProfileShowTabNavigation = () => {
    const tabs = [
      { id: 'Professional Info', label: AppString.PROFESSIONAL_INFO },
      { id: 'Experience Details', label: AppString.EXPERIENCE_DETAILS },
    ];
    const [activeTab, setActiveTab] = useState('Professional Info');
  
    const handleTabChange = tabId => {
      setActiveTab(tabId);
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
        {activeTab === 'Professional Info' && <ProfileProfessionalShowDeatils />}
        {activeTab === 'Experience Details' && <ProfileExperinceShowDetail />}
      </View>
    );
  };

export default ProfileShowTabNavigation