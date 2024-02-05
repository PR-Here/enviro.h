import { useIsFocused } from "@react-navigation/native";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Calender from '../../../../assets/images/SVG/calendar_days.svg';
import CheckSquare from '../../../../assets/images/SVG/check-square.svg';
import RightArrow from '../../../../assets/images/SVG/chevron-down.svg';
import PlusWhite from '../../../../assets/images/SVG/plus_white.svg';
import Drawer from '../../../../assets/images/SVG/three-line.svg';
import {
  horizontalData
} from '../../../../assets/json/MeetingJson';
import BadgeComponent from '../../../component/atoms/BadgeComponent';
import CustomText from '../../../component/atoms/CustomText';
import MeetingHomeHeader from '../../../component/header/MeetingHeader';
import useApiEffect from '../../../hooks/useApiEffect';
import { googleMeetAccessToken } from "../../../redux/slices/GoogleMeetSlice";
import { onTabBarSroll } from '../../../redux/slices/TabBarSlice';
import { BOOKED_ROOM_LIST, CREATE_MEETING } from '../../../services/ApiEndPoint';
import { BLACK, GREY } from '../../../theme/Colors';
import AppLoader from '../../../utils/AppLoader';
import AppString from '../../../utils/AppString';
import AssetsImages from '../../../utils/AssetsImages';
import { formatDateTimeTodayYesterday, onScrollHandler } from '../../../utils/Constant';
import { handleGoogleSignIn, signOutGoogle } from "../../../utils/GoogleMeetConstant";
import NavString from '../../../utils/NavString';
import MeetingCalender from '../meetingCalender/MeetingCalender';
import MeetingModal from "../meetingCalender/MeetingModal";
import { styles } from './Style';


const MeetingHome = ({ navigation, route }) => {

  let googleMeetToken = useSelector(state => state?.googleMeet?.meetAccessToken);

  const dispatch = useDispatch()
  const [showCalender, setShowCalender] = useState(false)
  const { makeApiRequest, loading } = useApiEffect()

  const [meetingData, setMeetingData] = useState([])
  const [roomBookedData, setRoomBookedData] = useState([])
  const [previousData, setPreviousData] = useState([])

  const [bookedRoomCount, setBookedRoomCount] = useState(0)

  const [isMeetingSelect, setIsMeetingSelect] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState(null)


  const RRule = require('rrule').RRule;



  const handleMyBookRoomClick = (item) => {
    navigation.navigate(NavString.BOOK_ROOM, { data: item })
  }

  const handleMyMeetingClick = (item) => {
    navigation.navigate(NavString.ADD_SCHEDULE_MEETING, { item: item, isEdit: true })
  }

  const handleCreateClick = () => {
    navigation.navigate(NavString.ADD_SCHEDULE_MEETING)
  }

  const handleCalenderIconClick = () => {
    setShowCalender(!showCalender)

  }

  const handleViewAllClick = () => {
    navigation.push(NavString.MEETING_ROOM_LIST, {})
  }

  const handleMyMinutesViewAllClick = () => {
    ss
    navigation.push(NavString.CALENDER_MEETING_LIST)
  }

  const onScroll = (e) => {
    const hideTabBar = onScrollHandler(e)
    dispatch(onTabBarSroll(hideTabBar))
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused)
      fetchMeetingList()
  }, [isFocused])


  const fetchMeetingList = async () => {
    const apiData = await makeApiRequest({ url: CREATE_MEETING, method: 'GET', isToken: true });
    //console.log('fetchMeetingList =>', JSON.stringify(apiData));
    if (apiData?.status == true) {
      //var data = []
      // apiData?.data?.previousMeetingData?.map((meeting) => {
      //   // console.log('meeting------>', meeting);
      //   if (meeting?.occurence) {
      //     data.push(meeting)
      //   }
      // })
      // apiData?.data?.upcomingMeetingData?.map((meeting) => {
      //   //console.log('meeting------>', meeting);
      //   if (meeting?.occurence) {
      //     data.push(meeting)
      //   }
      // })
      setMeetingData(apiData?.data?.upcomingMeetingData)
      setPreviousData(apiData?.data?.previousMeetingData)
    }
    fetchBookedRoomList()
  }

  const fetchBookedRoomList = async () => {
    const apiData = await makeApiRequest({ url: BOOKED_ROOM_LIST, method: 'GET', isToken: true });
    // console.log('fetchBookedRoomList =>', JSON.stringify(apiData));
    if (apiData?.status == true) {
      setBookedRoomCount(apiData?.data.length)
      let data = []
      apiData?.data.map((item, index) => {
        if (index < 3) {
          data.push(item)
        }
      })
      setRoomBookedData(data)
    }
  }


  // SECOND LIST HORIZONTAL (OPTION)
  const renderItemHorizontal = ({ item }) => {
    return <TouchableOpacity activeOpacity={0.7} key={item?.id} style={[styles.horizontalItem,
    { backgroundColor: item?.color }]}
      onPress={() => {
        if (item?.title == 'Book Room') {
          navigation.navigate(NavString.BOOK_ROOM)
        } else if (item?.title == 'Schedule meeting') {
          navigation.navigate(NavString.ADD_SCHEDULE_MEETING)
        }
      }}
    >
      {item?.image}
      <CustomText style={[styles.horizontalTitle, { color: item?.textColor }]} children={item?.title} />
    </TouchableOpacity>
  };
  // FIRST LIST ITEM
  const renderItemMyMeeting = ({ item }) => {

    const people = JSON.parse(item?.guest)
    return <TouchableOpacity activeOpacity={0.7} key={item?.id} onPress={() => {
      setSelectedMeeting(item)
      setIsMeetingSelect(true)
      // handleMyMeetingClick(item)
    }}>
      <View style={styles.myMeetingItem}>
        <CustomText style={styles.meetingTitle} children={item?.meeting_title} />
        <CustomText style={styles.meetingTime} children={
          item?.occurence ? 'Today' :
            formatDateTimeTodayYesterday(item?.bookedfrom?.replace(".000Z", ""), 'DD MMM,')
        } />
        <View style={styles.imageMyMeetingView}>
          {people && people?.map((images, index) => {
            return index < 3 ? <Image resizeMode='cover' source={AssetsImages.DUMMY} style={[styles.userProfileImage]} /> : null
          })}
          <BadgeComponent text={`${people.length < 10 ? people.length : '+' + 9}`} color={BLACK} style={styles.badge} />
        </View>
        {/* RIGHT ARROW */}
        <RightArrow />
      </View>
      <View style={styles.line}></View>
    </TouchableOpacity>
  };

  ///Second List Item
  const renderItemMyBookedRoom = ({ item }) => {
    const people = item?.guest
    return <TouchableOpacity activeOpacity={0.7} key={item?.id} onPress={() => {
      handleMyBookRoomClick(item)
    }}>
      <View style={styles.myMeetingItem}>
        <CustomText style={styles.meetingTitle} children={item?.meeting_title} />
        <CustomText style={styles.meetingTime} children={formatDateTimeTodayYesterday(item?.bookedfrom, 'DD MMM,')} />
        <View style={styles.imageMyMeetingView}>
          {people && people?.map((images, index) => {
            return index < 3 ? <Image resizeMode='cover' source={AssetsImages.DUMMY} style={[styles.userProfileImage]} /> : null
          })}
          <BadgeComponent text={`${people.length < 10 ? people.length : '+' + 9}`} color={BLACK} style={styles.badge} />
        </View>
        {/* RIGHT ARROW */}
        <RightArrow />
      </View>
      <View style={styles.line}></View>
    </TouchableOpacity>
  };

  const renderItemMyMinutes = ({ item }) => (
    <TouchableOpacity activeOpacity={1} onPress={() => {
      //navigation.navigate(NavString.MEETING_LIST_DETAILS, { item: item })
    }}>
      <View style={[styles.myMeetingItem, styles.myMinutestItem]}>
        <CustomText style={[styles.myMinutesTitle, { color: '#D1D1D1' }]} children={item?.meeting_title} />
        <CustomText style={[styles.meetingTime, styles.myMinutesTime, { color: '#D1D1D1' }]} children={formatDateTimeTodayYesterday(item?.bookedfrom?.replace(".000Z", ""), 'DD MMM,')} />
        {/* RIGHT CHECKBOX */}
        <CheckSquare />
      </View>
      <View style={styles.line}></View>
    </TouchableOpacity>
  );


  // LIST ITEM ARE HERE
  const ListItems = () => {
    return (
      <View>
        {/* My Meeting List */}
        <FlatList
          style={styles.flatList}
          //nestedScrollEnabled={false}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
          renderItem={renderItemMyMeeting}
          keyExtractor={(item, index) => index.toString()}
          data={meetingData}
          ListEmptyComponent={
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: heightPercentageToDP(10) }}>
              <CustomText children={'No Record Found'} style={{ fontSize: 12, color: GREY }} />
            </View>
          }
        />

        {/* Meeting ROOM LIST */}
        <View style={styles.myMeetingHeader}>
          <CustomText
            style={styles.myMeetngText}
            children={`${AppString.MEETING_ROOMS} ${bookedRoomCount > 0 ? '(' + `${bookedRoomCount}` + ')' : ''}`}
          />
          <View style={styles.rightView}>
            <TouchableOpacity activeOpacity={0.7} onPress={handleViewAllClick}>
              <CustomText
                style={[styles.createText, { color: BLACK }]}
                children={AppString.VIEW_ALL}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          style={styles.flatList}
          showsVerticalScrollIndicator={true}
          renderItem={renderItemMyBookedRoom}
          //nestedScrollEnabled={false}
          nestedScrollEnabled={true}
          data={roomBookedData}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: heightPercentageToDP(10) }}>
              <CustomText children={'No Record Found'} style={{ fontSize: 12, color: GREY }} />
            </View>
          }
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MeetingHomeHeader headerText={AppString.MEETINGS}
        onPress={() => {
          if (showCalender) {
            setShowCalender(!showCalender)
          } else {
            navigation.goBack();
          }
          //navigation.goBack();
        }}
      />

      <KeyboardAwareScrollView
        enableAutomaticScroll
        enableOnAndroid
        showsVerticalScrollIndicator={false}
        onScroll={(e) => onScroll(e)}>
        <View style={styles.myMeetingHeader}>
          <CustomText
            style={styles.myMeetngText}
            children={AppString.MY_MEETING}
          />
          <View style={styles.rightView}>

            <TouchableOpacity activeOpacity={0.7} onPress={handleCalenderIconClick}>
              <View style={styles.iconBackground}>{showCalender ? <Drawer /> : <Calender />}</View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleCreateClick}
              style={styles.createView}>
              <PlusWhite />
              <CustomText
                style={styles.createText}
                children={AppString.CREATE}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* HERE WE ARE SHOWING CALENDER AND LIST ITEM BY CONDITION 
        IF SHOWCALENDER==TRUE? CALENDER : LIST ITEM */}
        {
          showCalender ? <MeetingCalender
            onPress={(item) => {
              setSelectedMeeting(item)
              setIsMeetingSelect(true)
              // handleMyMeetingClick(item)
            }}
            onNavigate={() => {
              navigation.push(NavString.CALENDER_MEETING_LIST, {})
            }}

          /> : <ListItems />
        }
        {/* LIST OPTION HORIZONTAL LIST */}
        {/* style={styles.horizontalListContainer} */}
        <View >
          <FlatList
            style={styles.horizontalFlatlist}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={horizontalData}
            renderItem={renderItemHorizontal}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {/* My Minutes List */}
        <View style={styles.verticalListContainer}>
          <View style={styles.myMeetingHeader}>
            {/* <CustomText
              style={styles.myMeetngText}
              children={AppString.MY_MINUTES}
            /> */}
            {/* <View style={styles.rightView}>
              <TouchableOpacity activeOpacity={0.7} onPress={handleMyMinutesViewAllClick}>
                <CustomText
                  style={[styles.createText, { color: BLACK }]}
                  children={AppString.VIEW_ALL}
                />
              </TouchableOpacity>
            </View> */}
          </View>
          {/* <FlatList
            style={styles.flatList}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            data={previousData}
            renderItem={renderItemMyMinutes}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: heightPercentageToDP(20) }}>
                <CustomText children={'No Record Found'} style={{ fontSize: 12, color: GREY }} />
              </View>
            }
          /> */}
        </View>
      </KeyboardAwareScrollView>
      < AppLoader isLoading={loading} />

      <MeetingModal
        isVisible={isMeetingSelect}
        data={selectedMeeting}
        onCancel={(item, index) => {
          setIsMeetingSelect(false)
        }}
        onPress={(item, index) => {
          setIsMeetingSelect(false)
          handleMyMeetingClick(item)
        }}
      />

    </View>
  );
};

export default MeetingHome;
