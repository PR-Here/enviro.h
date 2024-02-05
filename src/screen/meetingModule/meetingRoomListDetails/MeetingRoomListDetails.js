import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  View
} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import CustomText from '../../../component/atoms/CustomText';
import MeetingHomeHeader from '../../../component/header/MeetingHeader';
import AddTask from '../../../component/molecules/AddTask';
import AddTaskHeader from '../../../component/molecules/AddTaskHeader';
import MeetingTopTab from '../../../component/molecules/MeetingTopTab';
import useApiEffect from '../../../hooks/useApiEffect';
import { CREATE_MEETING } from '../../../services/ApiEndPoint';
import {
  GREY,
  GREY_TRANS,
  TIMESHEET_ITEM_HEADER, WHITE
} from '../../../theme/Colors';
import AppLoader from '../../../utils/AppLoader';
import AppString from '../../../utils/AppString';
import { getTimeAgo } from '../../../utils/Constant';
import { styles } from './Style';

import AudioListen from '../../../../assets/images/SVG/audio_listen.svg';
import Building from '../../../../assets/images/SVG/building.svg';
import Calendar from '../../../../assets/images/SVG/calendar_days.svg';
import Capacity from '../../../../assets/images/SVG/capacity.svg';
import Clock from '../../../../assets/images/SVG/clock.svg';
import Delete from '../../../../assets/images/SVG/delete.svg';
import Search from '../../../../assets/images/SVG/search.svg';
import CustomTextInput from '../../../component/atoms/CustomTextInput';
import { FontName, FontSize } from '../../../theme/Fonts';
import BlankSpace from '../../../component/atoms/BlankSpace';

//let transData = []
const MeetingRoomListDetails = ({ navigation, route }) => {

  var editData = route?.params?.item
  const meetEventId = editData?.eventId;
  const meetingId = editData == editData?.schedule_meeting_id


  //console.log('editData-->', editData);
  const [date, setDate] = useState(moment(editData?.bookedfrom.replace(".000Z", "")).format('Do MMM YYYY'))
  const [time, setTime] = useState(moment(editData?.bookedfrom.replace(".000Z", "")).format('h:mm A'))
  const [duration, setDuration] = useState(getTimeAgo(moment(editData?.bookedfrom.replace(".000Z", "")), moment(editData?.bookedto.replace(".000Z", ""))))
  const [noOfSeats, setNoOfSeats] = useState('')
  const [address, setAddress] = useState('')
  const [location, setAddressLocation] = useState('')
  const [index, setIndex] = useState(0)
  const [transcriptData, setTranscriptData] = useState([])

  const { makeApiRequest, loading } = useApiEffect()

  const MYTASK = [
    // {
    //   task: 'Change Creative Color Scheme',
    // },
    // {
    //   task: 'Change Creative Color Scheme',
    // },
    // {
    //   task: 'Change Creative Color Scheme',
    // },
    // {
    //   task: 'Change Creative Color Scheme',
    // },
  ];

  const handleDeletePopup = () => {
    setShowDeletePopup(false);
  };
  const handleDeleteClick = () => {

  };
  useEffect(() => {
    let id = editData?.schedule_meeting_id
    MeetingDetailsAPI(id)
  }, [])


  {/* Get Meeting Details API */ }
  async function MeetingDetailsAPI(id) {
    const apiData = await makeApiRequest({ url: CREATE_MEETING + '/' + id + '?bookedfrom=' + editData?.bookedfrom, method: 'GET', isToken: true });
    //console.log('apiData=>', JSON.stringify(apiData));
    if (apiData.status) {
      const data = apiData.data
      const Meetingroom = data.meeting.MeetingRoomBooked.Meetingroom
      setNoOfSeats(`${Meetingroom.no_of_seats} seats`)
      setAddress(`${Meetingroom.Meetingroomfloor.BuildingModel.building_name}, ${Meetingroom.Meetingroomfloor.floor_name}`)
      setAddressLocation(`${Meetingroom.Meetingroomfloor.BuildingModel.Location.location_name} Office`)

      const transcripts = data.transcripts
      //transData = transcripts.sentences
      setTranscriptData(transcripts.sentences)
    }
  }

  const renderItem = () => {
    return (
      <View style={styles.renderItemView}>
        {/* TITLE VIEW */}
        <View style={styles.titleView}>
          <CustomText
            style={styles.titleText}
            children={editData?.meeting_title}
          />
        </View>
        {/* DESC VIEW */}
        <View style={styles.descView}>
          <Building height={20} width={20} />
          <View style={{ flex: 1 }}>
            <CustomText
              style={[styles.descText, { color: '#000000' }]}
              children={`Meeting ${address}`}
            />
            <CustomText
              style={[styles.descText, { color: '#00000060' }]}
              children={`${location}`}
            />
          </View>
        </View>
        {/* LINE */}
        <View style={styles.line}></View>
        {/* DATE VIEW */}
        <View style={styles.dateTimeView}>
          <Calendar height={20} width={20} />
          <CustomText style={styles.date} children={'Date'} />
          <CustomText style={styles.dateText} children={date} />
        </View>
        {/* TIME VIEW */}
        <View style={styles.dateTimeView}>
          <Clock height={20} width={20} />
          <CustomText style={styles.date} children={'Time'} />
          <CustomText style={styles.dateText} children={`${time} - ${duration.replace('ago', '')}`} />
        </View>
        {/* CAPACITY VIEW */}
        <View style={styles.dateTimeView}>
          <Capacity height={20} width={20} />
          <CustomText style={styles.date} children={'Capacity'} />
          <CustomText style={styles.dateText} children={noOfSeats} />
        </View>
      </View>
    );
  };


  const TranscriptItem = (item) => {
    return (
      <View style={{
        backgroundColor: WHITE,
        marginVertical: 1, padding: 10, borderBottomStartRadius: 5, borderBottomEndRadius: 5,
        borderBottomColor: GREY_TRANS
      }}>
        <View style={{ flexDirection: 'row' }}>
          <CustomText style={styles.transcriptsUser} children={item.speaker_name} />
          <CustomText style={styles.transcriptsTime} children={`${item.start_time}`} />
        </View>
        <CustomText style={styles.transcriptsDesc} children={item.text} />
      </View>
    )
  }

  return (
    <View style={[styles.container]}>
      <MeetingHomeHeader headerText={`${AppString.MEETING}`} />
      <View style={{ marginTop: heightPercentageToDP(1) }} />
      <View>{renderItem()}</View>
      <View style={{ marginTop: heightPercentageToDP(1) }} />
      <MeetingTopTab
        getIndex={(index) => {
          //console.log('index------------------->', index, transData);
          setIndex(index)
        }}
      />
      <View style={{ marginTop: heightPercentageToDP(1) }} />
      <View
        style={{
          margin: heightPercentageToDP(1),
          borderRadius: heightPercentageToDP(0.4),
          backgroundColor: WHITE,
          elevation: 5,
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
        }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 7,
          paddingVertical: 6
        }}>
          <View style={{
            flex: 1, flexDirection: 'row',
            alignItems: 'center', paddingHorizontal: 2, marginEnd: 10, borderRadius: 30, backgroundColor: GREY_TRANS
          }}>
            <Search height={35} width={35} />
            <CustomTextInput style={{ flex: 1, borderRadius: 0, borderColor: 'transparent' }} />
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <AudioListen height={18} width={18} />
            <CustomText style={{ marginLeft: 5, fontFamily: FontName.Gordita_Regular, fontSize: FontSize(12) }} >Listen Audio</CustomText>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{
          flex: 1,
          marginHorizontal: heightPercentageToDP(1),
          borderRadius: heightPercentageToDP(0.4),
          backgroundColor: TIMESHEET_ITEM_HEADER,
          elevation: 5,
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
        }}
        >
          <AddTaskHeader />
          {index == 2 ? <View style={{
            flex: 1,
          }}>
            <FlatList
              data={transcriptData}
              renderItem={({ item }) => TranscriptItem(item)}
              ListEmptyComponent={
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: heightPercentageToDP(20) }}>
                  <CustomText children={'No Record Found'} style={{ fontSize: 12, color: GREY }} />
                </View>
              }
            />
          </View> : <FlatList
            data={MYTASK}
            renderItem={({ item }) => {
              return <AddTask label={item?.task} />;
            }}
            ListEmptyComponent={
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: heightPercentageToDP(20) }}>
                <CustomText children={'No Record Found'} style={{ fontSize: 12, color: GREY }} />
              </View>
            }
          />}
        </View>
      </View>
      <AppLoader isLoading={loading} />
    </View>
  );
}

export default MeetingRoomListDetails;