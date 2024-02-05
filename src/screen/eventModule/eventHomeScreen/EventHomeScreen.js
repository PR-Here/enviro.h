import * as React from "react";
import { SafeAreaView, FlatList, ActivityIndicator, View } from 'react-native'
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { onScrollHandler } from "../../../utils/Constant";
import { onTabBarSroll } from "../../../redux/slices/TabBarSlice";
import useApiEffect from "../../../hooks/useApiEffect";
import { FETCH_EVENTS, } from "../../../services/ApiEndPoint";
import { fetchEvents, hubScreens, setAnsType, setEventDetails } from "../../../redux/slices/EventSlice";
import CustomText from "../../../component/atoms/CustomText";
import { useFocusEffect } from '@react-navigation/native';
import AssetsImages from "../../../utils/AssetsImages";
import { heightPercentageToDP } from "react-native-responsive-screen";
import EventPresenterScreen from "../eventPresenterScreen/EventPresenterScreen";
import NavString from "../../../utils/NavString";

function EventHomeScreen({ navigation }) {

  const dispatch = useDispatch()
  const eventState = useSelector((state) => state.event) // accessing redux state for event module
  const { makeApiRequest, loading } = useApiEffect() // hook call for api effects


  // fetching events list from events api
  const apiReq = async () => {
    const response = await makeApiRequest({ url: FETCH_EVENTS, method: 'GET', isToken: true })
    if (response.status) {
      dispatch(fetchEvents(response))
    }
  }

  React.useEffect(() => {
    apiReq()
  }, [])

  // setting screens title
  useFocusEffect(
    React.useCallback(() => {
      dispatch(hubScreens('Recent Events'));
    }, [])
  );

  // hiding tab bar on scroll
  const onScroll = (e) => {
    const hideTabBar = onScrollHandler(e)
    dispatch(onTabBarSroll(hideTabBar))
  }



  const renderItem = ({ item, index }) => {
    //console.log('file', item.attachment)
    return (
      <View style={{ alignItems: 'center' }}>
        <EventPresenterScreen cover={item?.image.length > 0 ? { 'uri': item?.image } : AssetsImages.WORKSHOP}
          title={item?.title}
          date={item?.start_date}
          startTime={item?.start_time}
          endTime={item?.end_time ? item?.end_time : '00:00 PM'}
          sections={item?.EventQuestions}
          presenList={item?.EventModules}
          participation_type={item?.participation_type}
          description={item?.description}
          file={item?.attachment}
        />
      </View>
    )
  }

  return (
    loading ?
      <SafeAreaView style={styles.conatiner}>
        <ActivityIndicator />
      </SafeAreaView>
      :
      <SafeAreaView style={styles.conatiner}>
        {
          eventState?.list ?
            <FlatList
              onScroll={e => onScroll(e)}
              data={eventState?.list}
              renderItem={renderItem}
            //ListFooterComponent={() => <View style={styles.footer} />}
            />
            :
            <CustomText>{'No Data Available'}</CustomText>
        }


      </SafeAreaView>
  );
}

export default EventHomeScreen
