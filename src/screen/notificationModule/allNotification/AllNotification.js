import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { styles } from './Style';
import CustomButton from '../../../component/atoms/CustomButton';
import CustomText from '../../../component/atoms/CustomText';
import { BLACK, BUTTON_BACKGROUND } from '../../../theme/Colors';
import TaskModal from '../../../component/modal/TaskModal';
import AppString from '../../../utils/AppString';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { DELETE, STAR } from '../../../utils/AssetsImages';
import useApiEffect from '../../../hooks/useApiEffect';
import AppLoader from '../../../utils/AppLoader';
import { useSelector } from 'react-redux';
import CenteredText from '../../../component/atoms/CenteredText';
import Birthday from '../../../../assets/images/SVG/birthday.svg';
import Anniversary from '../../../../assets/images/SVG/anniversary.svg';
import CHECK_NOTIFICATION from '../../../../assets/images/SVG/check_noti.svg';
import Star from '../../../../assets/images/SVG/star.svg';
import Delete from '../../../../assets/images/SVG/delete.svg';
import FillStar from '../../../../assets/images/SVG/Fill_Star.svg';
import { NOTIFICATION_LIST, NOTIFICATION_LIST_WORK, STARRED_NOTIFICATION } from '../../../services/ApiEndPoint';
import { ShowToast, convertTimeString, convertTimeToUTC, showUTCToLocal } from '../../../utils/Constant';
import { ActivityIndicator } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Page from '../../../component/intro/page';

const AllNotification = ({ navigation, route }) => {
  const badgeCount = route?.params?.badgeCount
  const { makeApiRequest, loading } = useApiEffect()
  const [deletePopup, setDeletePopup] = useState(false);
  const [notificationid, setNotiId] = useState(null)
  const [data, setData] = useState([])
  const [openSwipeableIndex, setOpenSwipeableIndex] = useState(null);
  const swipeableRef = useRef(null);
  const [page, setPage] = useState(1);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [maxResource, setMaxResource] = useState(0);
  const [notificationClickIndex, setNotificationClickIndex] = useState(null)



  const closeSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
      setOpenSwipeableIndex(null);
    }
  };

  const handleTaskModal = () => {
    setDeletePopup(false);
  };

  const handleAproveClick = () => {
    setDeletePopup(true);
  };

  const handleNoClick = () => {
    setDeletePopup(true);
  };

  const handleYesClick = () => {
    setDeletePopup(true);
  };

  // Call After click on Delete Button Icon
  const handleDeleteClick = (status = 0) => {
    setDeletePopup(false)
    starRedNotificationCalled(notificationid, status, 0, notificationClickIndex)
  };
  const handleStarRedClick = () => { };

  // Notification listing api
  const getNotificationList = async () => {
    const apiData = await makeApiRequest({ url: `${NOTIFICATION_LIST_WORK}?type=${1}&page=${page}`, method: 'GET', isToken: true, });
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
  }

  useEffect(() => {
    getNotificationList();
  }, [page])

  // StarRed and notificaition notification api called
  // IF WANT TO DELETE THEN STATUS 0 AND STAR 0 
  // IF WANT STARRED THEN STATUS 1 AND STAR 0 OR 1
  const starRedNotificationCalled = async (id = "", status = 1, starredId = null, index) => {
    const apiData = await makeApiRequest({
      url: STARRED_NOTIFICATION, method: 'POST', isToken: true, showProgress: false,
      data: { notification_id: id, status: status, star: starredId }//1 for delete 0 for star
    })


    if (apiData?.data != undefined)
      if (apiData?.status == true) {
        ShowToast(`${apiData?.message}`)
        closeSwipeable();
        updateValue(starredId, index)
      }
  }

  // update index after click on star icon
  const updateValue = (newValue, index) => {
    var newObject = [...data];
    newObject[index].is_start = newValue;
    setData(newObject);
    closeSwipeable();
  };


  // HIGH ORDER FUNCTION
  const createRightSwipe = (item, index) => {
    return () => rightSwipe(item, index);
  };

  // Swiper Button
  const rightSwipe = (item, index) => {

    return (
      <View
        activeOpacity={0.6}
        style={styles.deleteBox}>
        <View style={styles.deleteBtnView}>
          {/* StarRed Buttuon */}
          <TouchableOpacity
            onPress={() => {
              starRedNotificationCalled(item?.id, 1, item?.is_start == 1 ? 0 : 1, index)
            }}
            style={styles.starRedButton}>
            {item?.is_start ? <FillStar /> :
              <Star />}
          </TouchableOpacity>
          {/* Delete Button */}
          <TouchableOpacity
            onPress={() => {
              setNotiId(item?.id)
              setDeletePopup(true)
              setNotificationClickIndex(index)
            }}
            style={styles.starRedButton}>
            <Delete />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {data?.length == 0 ? <CenteredText text={AppString.NO_NOTIFICATION_FOUND} /> : null}
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => {

          return <Swipeable
            key={item?.id}
            onSwipeableOpen={e => console.log(e)}
            renderRightActions={createRightSwipe(item, index)}>

            <View style={[styles.line, { backgroundColor: 'transparent' }]}></View>
            {/* <View style={{ backgroundColor: '#E5E4E2', borderRadius: 5 }}> */}
            <TouchableOpacity style={styles.itemView}>
              <View style={styles.every_item}>
                {/* NOTIFICATION IMAGE */}
                <View style={[styles.notificationImageView,]}>

                  {item?.notification_type == 0 ? <Birthday width={25} height={25} /> : < CHECK_NOTIFICATION width={25} height={25} />}
                  {/* ROUNDED UNREAD BADGE */}
                  {

                    item?.is_read === 0 ? <View style={styles.badge}></View> : null
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
                    <Text style={styles.descText}>{item?.desc}</Text>
                  </Text>
                  {/* TIME TEXT */}
                  <CustomText style={styles.timeText} children={convertTimeString(item?.createdAt)} />
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

              </View>
            </TouchableOpacity>
            {/* </View> */}
          </Swipeable>
        }}
        onEndReached={() => {

          if (!bottomLoading) {

            if (data?.length < maxResource) {

              setBottomLoading(true);
              setPage(page + 1);
            }
          }
        }}
        onEndReachedThreshold={0.1} // Adjust this threshold as needed
        ListFooterComponent={
          <View style={{ height: widthPercentageToDP(5) }}>
            {bottomLoading && (
              <ActivityIndicator
                style={{ color: BUTTON_BACKGROUND, marginBottom: 10 }}
              />
            )}
          </View>
        }
      />

      {/* DELETE POPUP */}
      <TaskModal isVisible={deletePopup} onPress={handleDeleteClick} onCancel={() => setDeletePopup(false)}
        text='Are you sure you want delete?' />
      <AppLoader isLoading={loading} />
    </SafeAreaView>
  );
};

export default AllNotification;
