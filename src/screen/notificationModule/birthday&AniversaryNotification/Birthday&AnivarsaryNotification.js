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
import { BLACK, BUTTON_BACKGROUND } from '../../../theme/Colors';
import TaskModal from '../../../component/modal/TaskModal';
import AppString from '../../../utils/AppString';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { DELETE, STAR } from '../../../utils/AssetsImages';
import useApiEffect from '../../../hooks/useApiEffect';
import AppLoader from '../../../utils/AppLoader';
import { NOTIFICATION_LIST, NOTIFICATION_LIST_WORK } from '../../../services/ApiEndPoint';
import { useSelector } from 'react-redux';
import CenteredText from '../../../component/atoms/CenteredText';
import Birthday from '../../../../assets/images/SVG/birthday.svg';
import Anniversary from '../../../../assets/images/SVG/anniversary.svg';
import { styles } from './Style';
import Star from '../../../../assets/images/SVG/star.svg';
import Delete from '../../../../assets/images/SVG/delete.svg';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native-paper';
import { convertTimeString } from '../../../utils/Constant';

const BirthdayNotification = ({ navigation }) => {
  const { makeApiRequest, loading } = useApiEffect()
  const [data, setData] = useState([])
  const [taskModalVisisble, setTaskModalVisible] = useState(false);
  const accessToken = useSelector((state) => state?.authToken?.accessToken);
  const [page, setPage] = useState(1);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [maxResource, setMaxResource] = useState(0);
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

  useEffect(() => {
    // const getNotificationList = async () => {
    //   const apiData = await makeApiRequest({ url: NOTIFICATION_LIST, method: 'POST', isToken: true });
    //   setData(apiData?.data)
    // }
    getNotificationList();
  }, [page])


  // Notification listing api
  const getNotificationList = async () => {
    // console.log("PageCalling---", page);
    const body = {
      page: page,
      limit: 10,
    };

    const apiData = await makeApiRequest({ url: `${NOTIFICATION_LIST_WORK}?type=${3}&page=${page}`, method: 'GET', isToken: true, });
    // setData(apiData?.data)
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


  return (
    <SafeAreaView style={styles.container}>
      {data[0]?.notification_type == 0 || data[0]?.notification_type == 1 ? null : <CenteredText text={AppString.NO_NOTIFICATION_FOUND} />}
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return item?.notification_type == 0 || item?.notification_type == 1 ? <>
            <View style={[styles.line, { backgroundColor: 'transparent' }]}></View>
            <View style={styles.itemView}>
              <View style={styles.every_item}>
                {/* NOTIFICATION IMAGE */}
                <View style={styles.notificationImageView}>
                  {item?.notification_type == 0 ? <Birthday width={25} height={25} /> : <Anniversary width={25} height={25} />}
                  {/* ROUNDED UNREAD BADGE */}
                  <View style={styles.badge}></View>
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
            </View>
          </> : <></>
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
      <TaskModal isVisible={taskModalVisisble} onPress={handleTaskModal} />
      <AppLoader isLoading={loading} />
    </SafeAreaView>
  );
};

export default BirthdayNotification;
