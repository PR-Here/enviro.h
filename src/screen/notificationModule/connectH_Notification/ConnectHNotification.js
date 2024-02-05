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
import { BLACK, GREY, LIGHTWHITE } from '../../../theme/Colors';
import TaskModal from '../../../component/modal/TaskModal';
import AppString from '../../../utils/AppString';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { DELETE, HISTORY, ISOLATION, STAR } from '../../../utils/AssetsImages';
import useApiEffect from '../../../hooks/useApiEffect';
import AppLoader from '../../../utils/AppLoader';
import { NOTIFICATION_LIST } from '../../../services/ApiEndPoint';
import { useSelector } from 'react-redux';
import CenteredText from '../../../component/atoms/CenteredText';
import Birthday from '../../../../assets/images/SVG/birthday.svg';
import Anniversary from '../../../../assets/images/SVG/anniversary.svg';
import { styles } from './Style';

const ConnectHNotification = ({ navigation }) => {
  const { makeApiRequest, loading } = useApiEffect()
  const [data, setData] = useState([
  ])
  const [taskModalVisisble, setTaskModalVisible] = useState(false);
  const accessToken = useSelector((state) => state?.authToken?.accessToken);

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

  // Swiper Button
  const rightSwipe = () => {
    return (
      <View
        onPress={() => console.log('delete click')}
        activeOpacity={0.6}
        style={styles.deleteBox}>
        <View style={styles.deleteBtnView}>
          {/* StarRed Buttuon */}
          <TouchableOpacity
            onPress={handleStarRedClick}
            style={styles.starRedButton}>
            <Image tintColor={BLACK} resizeMode="contain" source={STAR} />
          </TouchableOpacity>
          {/* Delete Button */}
          <TouchableOpacity
            onPress={handleDeleteClick}
            style={styles.starRedButton}>
            <Image tintColor={BLACK} resizeMode="contain" source={DELETE} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const getNotificationList = async () => {
      const apiData = await makeApiRequest({ url: NOTIFICATION_LIST, method: 'POST', isToken: true });
      // setData(apiData?.data)
    }
    getNotificationList();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {data[0]?.notification_type !== 7 ? <CenteredText text={AppString.NO_NOTIFICATION_FOUND} /> : null}
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return item?.notification_type == 7 ?
            <Swipeable
              key={item?.id}
              onSwipeableOpen={e => console.log(e)}
              renderRightActions={rightSwipe}>
              <View style={[styles.line, { backgroundColor: 'transparent' }]}></View>
              <TouchableOpacity style={styles.itemView}>
                <View style={styles.every_item}>
                  {/* NOTIFICATION IMAGE */}
                  <View style={[styles.notificationImageView, {
                    backgroundColor: item.type == 'NHistory' ? "#F4F4F4" : LIGHTWHITE
                  }]}>
                    <Image style={styles.notification_Image} source={item?.image} />
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
                        color: item.type == 'NHistory' ? BLACK : GREY,

                      }]}>{item?.desc}</Text>
                    </Text>
                    {/* TIME TEXT */}
                    <CustomText style={styles.timeText} children={item?.time} />
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
            </Swipeable> : <></>
        }}
      />
      <TaskModal isVisible={taskModalVisisble} onPress={handleTaskModal} />
      <AppLoader isLoading={loading} />
    </SafeAreaView>
  );
};

export default ConnectHNotification;
