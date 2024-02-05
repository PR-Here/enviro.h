import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './Style';
import NotificationHeader from '../../../component/header/NotificationHeader';
import AppString from '../../../utils/AppString';
import CustomText from '../../../component/atoms/CustomText';
import {
  BirthdayNotification, ConnectHNotification, CommunityNotification
  , WorkNotification, AllNotification, HrdNotification, StarRedNotification
} from '../..';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NOTIFICATION_LIST_WORK } from '../../../services/ApiEndPoint';
import useApiEffect from '../../../hooks/useApiEffect';
import BadgeComponent from '../../../component/atoms/BadgeComponent';
import { SELECTED_OUTER_COLOR } from '../../../theme/Colors';


const NotificationHome = ({ navigation, route }) => {
  let notificationCount = route?.params?.notificationCount
  // console.warn('notificationCount--->', notificationCount);
  const tabs = [
    { id: 'all', label: AppString.ALL },
    { id: 'starRed', label: AppString.STARRED },
    { id: 'birthday', label: AppString.BIRTHDAY },
    { id: 'work', label: AppString.WORK },
    { id: 'hrd', label: AppString.HRD },
    { id: 'connectH', label: AppString.CONNECT_H },
    { id: 'community', label: AppString.COMMUNITY },
  ];

  const [birthdayCount, setBirthdayCount] = useState(0)
  const [workstarcount, setWorkStarCount] = useState(0)
  const { makeApiRequest, loading } = useApiEffect()
  const [activeTab, setActiveTab] = useState(notificationCount == 0 ? 'birthday' : 'all');

  const handleTabChange = tabId => {
    setActiveTab(tabId);
  };
  // 
  const handleActionPress = () => {
    //console.log('Action pressed');
  };

  useEffect(() => {
    getNotificationList();
  }, [])


  // Notification listing api
  const getNotificationList = async () => {
    const apiData = await makeApiRequest({ url: `${NOTIFICATION_LIST_WORK}?type=${1}`, method: 'GET', isToken: true });
    // setData(apiData?.data)
    setBirthdayCount(apiData?.data?.birthday_count)
    setWorkStarCount(apiData?.data?.work_count)
  }


  return (
    <SafeAreaView style={styles.container}>
      <NotificationHeader
        headerText={AppString.NOTIFICATION}
        actionText={''}
        onActionPress={handleActionPress}
        handleBackPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView enableOnAndroid horizontal
        contentContainerStyle={styles.scrollView} style={styles.tabBarContainer}
        showsHorizontalScrollIndicator={false}>
        {tabs?.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              tab.id === activeTab ? styles.activeTab : null,
            ]}
            onPress={() => handleTabChange(tab.id)}>

            {
              tab.id === 'work' && workstarcount != 0 ? <BadgeComponent text={2} style={{ top: 0, }} /> : null
            }
            {
              tab.id === 'birthday' && birthdayCount != 0 ? <BadgeComponent text={2} style={{ top: 0, }} /> : null
            }
            <CustomText
              style={[
                styles.tabText,
                tab?.id == activeTab ? styles.activeTextColor : null,
              ]}
              children={tab.label}
            />
            {/* <BadgeComponent text={2} /> */}


          </TouchableOpacity>
        ))}
      </KeyboardAwareScrollView>
      {activeTab === 'all' && <AllNotification />}
      {activeTab === 'starRed' && <StarRedNotification />}
      {activeTab === 'birthday' && <BirthdayNotification />}
      {activeTab === 'work' && <WorkNotification />}
      {activeTab === 'hrd' && <HrdNotification />}
      {activeTab === 'connectH' && <ConnectHNotification />}
      {activeTab === 'community' && <CommunityNotification />}
    </SafeAreaView>
  );
};

export default NotificationHome;
