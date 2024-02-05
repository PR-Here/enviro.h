import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './Style';
import MeetingHomeHeader from '../../../component/header/MeetingHeader';
import AppString, { JOINED_SINCE } from '../../../utils/AppString';
import CustomText from '../../../component/atoms/CustomText';
import {
  CALENDER_ICON,
  CHAIR,
  CLOCK,
  DELETE,
  DOCUMENT,
} from '../../../utils/AssetsImages';
import TaskModal from '../../../component/modal/TaskModal';
import { useDispatch } from 'react-redux';
import NavString from '../../../utils/NavString';
import useApiEffect from '../../../hooks/useApiEffect';
import { BOOKED_ROOM_LIST, DELETE_ROOM } from '../../../services/ApiEndPoint';
import moment from 'moment';
import Delete from '../../../../assets/images/SVG/delete.svg';
import Building from '../../../../assets/images/SVG/building.svg';
import Clock from '../../../../assets/images/SVG/clock.svg';
import Capacity from '../../../../assets/images/SVG/capacity.svg';
import Calendar from '../../../../assets/images/SVG/calendar_days.svg'
import AppLoader from '../../../utils/AppLoader';
import { ShowToast, convertTimeToUTC } from '../../../utils/Constant';


const MeetingRoomList = ({ navigation }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { makeApiRequest, loading } = useApiEffect()

  const [roomList, setRoomList] = useState([]);
  const [bottomLoading, setBottomLoading] = useState(false)
  const [bookRoomId, setBookRoomId] = useState()
  const [isDelete, setIsDelete] = useState(false)


  const handleDeletePopup = () => {
    DELETE_ROOM_API()
    setShowDeletePopup(false);
  };
  const handleDeleteClick = (roomId) => {
    setBookRoomId(roomId)
    setShowDeletePopup(true);
  };

  const dispatch = useDispatch()

  const handleBack = () => {
    navigation.navigate(NavString.MEETING_HOME, { update: isDelete })
  }


  useEffect(() => {
    GET_BOOK_ROOMLIST_API()
  }, [])

  const onScroll = (e) => {
    const hideTabBar = onScrollHandler(e)
    dispatch(onTabBarSroll(hideTabBar))
  }
  //Booked Room List API
  async function GET_BOOK_ROOMLIST_API() {
    setBottomLoading(true)

    const apiData = await makeApiRequest({ url: BOOKED_ROOM_LIST, method: 'GET', isToken: true });
    if (apiData?.status == true) {
      setRoomList(apiData?.data)

    } else {
      setBottomLoading(false)
    }
  }

  //Delete Room API
  async function DELETE_ROOM_API() {
    setBottomLoading(true)

    const apiData = await makeApiRequest({ url: DELETE_ROOM, method: 'POST', isToken: true, data: { book_room_id: bookRoomId, status: 0 } });
    if (apiData?.status == true) {
      const updatedRoomList = roomList.filter((room) => room.book_room_id !== bookRoomId);
      setIsDelete(true)
      setRoomList(updatedRoomList);
      ShowToast(`${apiData?.message}`)
    } else {
      setBottomLoading(false)
    }
  }

  const RoomItem = ({ item }) => {


    const name = item?.Meetingroom?.Meetingroomfloor
    const bookedDate = moment(item?.bookedfrom, 'yyyy-MM-DDTHH:mm:ss').format('Do MMM YYYY')
    const bookedTime = convertTimeToUTC(moment(item?.bookedfrom, 'yyyy-MM-DDTHH:mm:ss').format('HH:mm:ss'))
    let bookedUntil = convertTimeToUTC(moment(item?.bookedto, 'yyyy-MM-DDTHH:mm:ss').format('HH:mm:ss'))

    const startTime = new Date(item.bookedfrom);
    const endTime = new Date(item.bookedto);

    // Calculate the time difference in milliseconds
    const timeDifference = endTime - startTime;

    // If the time difference is less than one hour (3600 * 1000 milliseconds)
    if (timeDifference < 3600 * 1000) {
      // Convert milliseconds to minutes
      let minutesDifference = Math.round(timeDifference / (60 * 1000));
      if (minutesDifference < 0) {
        minutesDifference = 0
      }
      item.timeDifference = `${minutesDifference} min`;
    } else {
      // Convert milliseconds to hours
      let hoursDifference = Math.round(timeDifference / (3600 * 1000));
      if (hoursDifference < 0) {
        hoursDifference = 0
      }
      item.timeDifference = `${hoursDifference} Hr`;
      item.timeDifference = item.all_day == 1 ? 'All day' : item.timeDifference
      bookedUntil = item.all_day == 1 ? 'All day' : bookedUntil
    }

    return (
      <TouchableOpacity style={styles.renderItemView}
        onPress={() => navigation.navigate(NavString.BOOK_ROOM, { data: item })}
      >
        {/* TITLE VIEW */}
        <View style={styles.titleView}>
          <CustomText style={styles.titleText} children={item?.meeting_title} />

          <TouchableOpacity onPress={() => handleDeleteClick(item.book_room_id)}>
            <Delete />
          </TouchableOpacity>
        </View>
        {/* DESC VIEW */}
        <View style={styles.descView}>
          <Building height={20} width={20} />

          <CustomText style={styles.descText} children={`${name?.BuildingModel?.building_name}, ${name?.floor_name}, ${item?.Meetingroom?.meeting_room_name}`} />
        </View>
        {/* LINE */}
        <View style={styles.line}></View>
        {/* DATE VIEW */}

        <View style={styles.dateTimeView}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Calendar height={20} width={20} />
            <CustomText style={styles.date} children={'Date'} />
          </View>
          <CustomText style={styles.dateText} children={`${bookedDate}`} />
        </View>

        {/* TIME VIEW */}
        <View style={styles.dateTimeView}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Clock height={20} width={20} />
            <CustomText style={styles.date} children={'Time & Duration'} />
          </View>
          {/* <CustomText style={styles.dateText} children={`${bookedTime} ${' - ' + item.timeDifference}`} /> */}
          <CustomText style={styles.dateText} children={`${bookedTime} ${' - ' + bookedUntil}`} />


        </View>
        {/* CAPACITY VIEW */}
        <View style={styles.dateTimeView}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Capacity height={20} width={20} />
            <CustomText style={styles.date} children={'Capacity'} />
          </View>
          <CustomText style={styles.dateText} children={`${item?.Meetingroom?.no_of_seats} ${item?.Meetingroom?.no_of_seats == 1 ? 'Seat' : 'Seats'}`} />
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.conatiner}>
      <MeetingHomeHeader headerText={`${AppString.MEETING_ROOMS} (${roomList?.length})`} onPress={handleBack} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={roomList}
        renderItem={({ item }) => <RoomItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ flexGrow: 1 }}

        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '70%' }}>
            <CustomText children={'No Record Found'} />
          </View>
        }
      />
      <TaskModal
        onPress={handleDeletePopup}
        text="Are you sure you want to cancel this room?"
        isVisible={showDeletePopup}
        onCancel={() => setShowDeletePopup(false)}
        type={AppString.DELETE}
      />
      < AppLoader isLoading={loading} />
    </SafeAreaView>
  );
}


export default MeetingRoomList;