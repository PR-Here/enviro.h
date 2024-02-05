import React, { useState } from 'react';
import { styles } from './Style';
import { View, TouchableOpacity } from 'react-native';
import ProfessionalInfo from '../../../screen/profileModule/roleBasedProfileScreen/professionalsUserDetail/ProfessionalUserDetails';
import CustomText from '../../../component/atoms/CustomText';
import AppString from '../../../utils/AppString';
import { ProfessionalManagerDetail, UserExperienceDetails } from '../../../screen';
import ManagerExperienceDetail from '../../../screen/profileModule/roleBasedProfileScreen/managerExperience/ManagerExperienceDetail';
import { PRIMARY_COLOR } from '../../../theme/Colors';

const ProfileTopTab = ({ isEdit, loginRole, userId, getSelectedTabId }) => {
  const tabs = [
    { id: 'Professional Info', label: AppString.PROFESSIONAL_INFO },
    { id: 'Experience', label: AppString.EXPERIENCE },
  ];
  const [activeTab, setActiveTab] = useState('Professional Info');

  const handleTabChange = tabId => {
    setActiveTab(tabId);
    getSelectedTabId(tabId)
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
      <View style={[styles.separatorBottom, { marginTop: -0 }]} />
      {activeTab === 'Professional Info' && (
        isEdit ? <ProfessionalInfo /> : <ProfessionalManagerDetail userId={userId} loginRole={loginRole} />

      )}
      {activeTab === 'Experience' && (
        isEdit ? <UserExperienceDetails /> : <ManagerExperienceDetail />
      )}
    </View>
  );
};

export default ProfileTopTab;
