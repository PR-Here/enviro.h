import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomButton from '../../../component/atoms/CustomButton';
import CustomText from '../../../component/atoms/CustomText';
import { BLACK, BUTTON_BACKGROUND, GREY, LIGHTWHITE } from '../../../theme/Colors';
import TaskModal from '../../../component/modal/TaskModal';
import AppString from '../../../utils/AppString';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { DELETE, HISTORY, ISOLATION, STAR } from '../../../utils/AssetsImages';
import useApiEffect from '../../../hooks/useApiEffect';
import AppLoader from '../../../utils/AppLoader';
import { NOTIFICATION_LIST, NOTIFICATION_LIST_WORK, STARRED_NOTIFICATION } from '../../../services/ApiEndPoint';
import { useSelector } from 'react-redux';
import CenteredText from '../../../component/atoms/CenteredText';
import Birthday from '../../../../assets/images/SVG/birthday.svg';
import FillStar from '../../../../assets/images/SVG/Fill_Star.svg';
import CHECK_NOTIFICATION from '../../../../assets/images/SVG/check_noti.svg';
import { styles } from './Style';
import { ShowToast, convertTimeToUTC, showUTCToLocal } from '../../../utils/Constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native-paper';

const StarRedNotification = ({ navigation }) => {
  const { makeApiRequest, loading } = useApiEffect()
  const [data, setData] = useState([
  ])
  const [taskModalVisisble, setTaskModalVisible] = useState(false);
  const accessToken = useSelector((state) => state?.authToken?.accessToken);

  const [page, setPage] = useState(1);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [maxResource, setMaxResource] = useState(0);
  const [startMark, setstartMark] = useState(false);

  const handleTaskModal = () => {
    setTaskModalVisible(false);
  };

  const handleAproveClick = () => {
    setTaskModalVisible(true);
  };

  const handleNoClick = () => {
    setTaskModalVisible(true);
  };

  const handleYesClick = () => {
    setTaskModalVisible(true);
  };

  const handleDeleteClick = () => { };
  const handleStarRedClick = () => { };

  useEffect(() => {
    getNotificationList();
  }, [page, startMark])
  // NOTIFICATION LIST API
  const getNotificationList = async () => {
    const apiData = await makeApiRequest({ url: `${NOTIFICATION_LIST_WORK}?type=${2}&page=${page}`, method: 'GET', isToken: true, });

    console.log(apiData?.data);
    setData(previousData => {
      const newAppointments = [...previousData, ...apiData?.data?.notification_detail];
      const uniqueAppointments = Array.from(
        new Set(newAppointments.map(JSON.stringify)),
      ).map(JSON.parse);
      return uniqueAppointments;
    });
    setMaxResource(apiData.data?.total_count);
    setBottomLoading(false);
    setstartMark(false)
  }

  // StarRed and notificaition notification api called
  const starRedNotificationCalled = async (id = "", status = 1, starredId = "", index) => {
    const apiData = await makeApiRequest({
      url: STARRED_NOTIFICATION, method: 'POST', isToken: true, showProgress: false,
      data: { notification_id: id, status: status, star: starredId }//1 for delete 0 for star
    })

    if (apiData?.data != undefined)
      if (apiData?.status == true) {
        updateValue(starredId, index)
      }
  }
  const updateValue = (newValue, index) => {
    const filteredArray = data.filter((item, i) => i !== index);
    setData(filteredArray)
  };


  const handleStarClick = (item, index) => {
    //console.log("click");
    // FIRST IS NOTIFICATION ID,
    // SECOND IS BT DEFAULT 1 IF DONT WANT DELETE
    // THIRD IS WANT TO STARRED OR NOT 0 REMOVE
    starRedNotificationCalled(item?.id, 1, item?.is_start == 1 ? 0 : 1, index)
  }

  return (
    <SafeAreaView style={styles.container}>
      {data?.length != 0 ? null : <CenteredText text={AppString.NO_NOTIFICATION_FOUND} />}
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => {
          return item?.is_start == 1 ?
            <>
              <View style={[styles.line, { backgroundColor: 'transparent' }]}></View>
              <View style={styles.itemView}>
                <View style={styles.every_item}>
                  {/* NOTIFICATION IMAGE */}
                  <View style={[styles.notificationImageView, {
                    backgroundColor: item.type == 'NHistory' ? "#F4F4F4" : LIGHTWHITE
                  }]}>

                    <CHECK_NOTIFICATION />

                    {/* ROUNDED UNREAD BADGE */}
                    {
                      item.type == 'NHistory' &&
                      <View style={styles.badge}></View>
                    }
                  </View>
                  <View style={styles.titleView}>
                    <Text>
                      {/* TITLE BLACK AND BOLD */}
                      <Text
                        style={[
                          styles.titleText,
                          item?.isRead ? styles.inActiveTitle : null,
                        ]}>
                        {item?.message}{' '}
                      </Text>
                      {/* DESC */}
                      <Text style={[styles.descText, {
                        color: item.type == 'NHistory' ? BLACK : GREY
                      }]}>{item?.desc}</Text>
                    </Text>
                    {/* TIME TEXT */}
                    <CustomText style={styles.timeText} children={showUTCToLocal(item?.createdAt)} />
                    {/* Button Condition manege here, Show aur Hide */}
                    {item?.type == 'History' ? (
                      // Aprove Button
                      <View style={styles.AproveButtonView}>
                        <CustomButton
                          onPress={handleAproveClick}
                          title={AppString.APPROVE}
                          style={styles.AproveButton}
                        />
                      </View>
                    ) : item?.type == 'Yesterday' ? (
                      // No and Yes Button
                      <View style={styles.NoYesButtonView}>
                        {/* No Button */}
                        <CustomButton
                          onPress={handleNoClick}
                          title={AppString.NO}
                          style={styles.NoButton}
                        />
                        {/* Yes Button */}
                        <CustomButton
                          onPress={handleYesClick}
                          title={AppString.YES}
                          style={styles.YesButton}
                        />
                      </View>
                    ) : null}
                    <View style={styles.line}></View>
                  </View>
                  {/* STAR IMAGE CLICK */}
                  <TouchableOpacity style={styles.starImage} onPress={() => handleStarClick(item, index)}>
                    {item?.is_start == 1 ? <FillStar /> : null}
                  </TouchableOpacity>
                </View>

              </View>
            </> : <></>
        }}
      // onEndReached={() => {

      //   if (!bottomLoading) {
      //     if (data?.length < maxResource) {
      //       console.warn("inside", !bottomLoading);
      //       setBottomLoading(true);
      //       setPage(page + 1);
      //     }
      //   }
      // }}
      // onEndReachedThreshold={0.1} // Adjust this threshold as needed
      // ListFooterComponent={
      //   <View style={{ height: widthPercentageToDP(5) }}>
      //     {bottomLoading && (
      //       <ActivityIndicator
      //         style={{ color: BUTTON_BACKGROUND, marginBottom: 10 }}
      //       />
      //     )}
      //   </View>
      // }
      />
      <TaskModal isVisible={taskModalVisisble} onPress={handleTaskModal} />
      <AppLoader isLoading={loading} />
    </SafeAreaView>
  );
};

export default StarRedNotification;