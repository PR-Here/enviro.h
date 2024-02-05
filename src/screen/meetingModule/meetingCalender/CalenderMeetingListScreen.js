import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    View
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomText from '../../../component/atoms/CustomText';
import MeetingHomeHeader from '../../../component/header/MeetingHeader';
import useApiEffect from '../../../hooks/useApiEffect';
import { MEETING_VIEW_ALL } from '../../../services/ApiEndPoint';
import { PAGE_BACKGROUND } from '../../../theme/Colors';
import AppLoader from '../../../utils/AppLoader';
import AppString from '../../../utils/AppString';
import NavString from '../../../utils/NavString';
import CalenderListItem from '../meetingCalenderList/CalenderListItem';
import MeetingModal from './MeetingModal';
import MeetingMonthDropdown from './MeetingMonthDropDown';


const CalenderMeetingListScreen = ({ navigation }) => {

    const { makeApiRequest, loading } = useApiEffect()

    const [isMeetingSelect, setIsMeetingSelect] = useState(false)
    const [selectedMeeting, setSelectedMeeting] = useState(null)

    const [meetingData, setMeetingData] = useState([])

    const [filterData, setFilterData] = useState([])

    const getNext12Months = () => {
        const currentDate = new Date();
        const next12Months = [];
        for (let i = 0; i < 12; i++) {
            const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
            next12Months.push({
                label: `${nextDate.toLocaleString('default', { month: 'short' })} - ${nextDate.getFullYear()}`,
                value: `${nextDate.toLocaleString('default', { month: 'short' })} - ${nextDate.getFullYear()}`,
                id: i
            });
        }

        return next12Months;
    };

    const getLastDateOfMonth = (year, month) => {
        const lastDate = new Date(year, month, 0)
        return `${year}-${month}-${lastDate.getDate()}`
    };

    const data12Month = getNext12Months()
    const [month, setMonth] = useState(data12Month[0])
    const [fromDate, setFromDate] = useState(`${moment().format('yyyy-MM')}-01`)
    const [toDate, setToDate] = useState(getLastDateOfMonth(parseInt(moment().format('yyyy')), parseInt(moment().format('MM'))))

    useEffect(() => {
        MeetingViewAll()
    }, [toDate])

    useEffect(() => {
        const groupMeetingByDate = meetingData?.reduce((acc, meeting) => {
            const { bookedfrom } = meeting;
            const group = acc.find((item) => {
                return moment(item?.date).format('D/MM/yyyy') === moment(bookedfrom).format('D/MM/yyyy')
            });
            if (!group) {
                acc.push({
                    date: bookedfrom,
                    data: [meeting],
                });
            } else {
                group.data.push(meeting);
            }
            return acc;
        }, []);
        // console.log('groupMeetingByDate ----------->', groupMeetingByDate);
        setFilterData(groupMeetingByDate)
    }, [meetingData])

    const getFilterDate = (date, type) => {
        if (type == 'Month') {
            setFromDate(date)
            return getLastDateOfMonth(parseInt(moment(date).format('yyyy')), parseInt(moment(date).format('MM')))
        }
    };

    //Booked Room List API
    async function MeetingViewAll() {
        const data = {
            start_date: fromDate,
            end_date: toDate
        }
        const apiData = await makeApiRequest({
            url: MEETING_VIEW_ALL, method: 'POST', isToken: true, data: data
        });
        //console.log('apiData ---------->', apiData?.data?.meetings);
        if (apiData?.status == true) {
            setMeetingData(apiData?.data?.meetings)
        }
    }

    const handleMyMeetingClick = (item) => {
        navigation.navigate(NavString.ADD_SCHEDULE_MEETING, { item: item, isEdit: true })
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: PAGE_BACKGROUND,
            paddingBottom: hp(2),
        }}>
            <MeetingHomeHeader headerText={`${AppString.CALENDAR_SCHEDULE}`} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <View style={{
                    paddingRight: wp(2),
                    flex: 1,
                    marginBottom: 20,
                    height: hp(5),
                }}>
                    <MeetingMonthDropdown selectedValue={month} data={data12Month} onSelection={(value) => {
                        setMonth(value)
                        var lastDate = getFilterDate(moment(value.label, 'MMM - yyyy').format('yyyy-MM-D'), 'Month')
                        setToDate(lastDate)
                    }} />
                </View>


            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filterData}
                renderItem={({ item }) => <CalenderListItem data={item} onPress={(item) => {
                    setSelectedMeeting(item)
                    setIsMeetingSelect(true)
                }} />}
                keyExtractor={item => item.id}
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '70%' }}>
                        <CustomText children={'No Record Found'} />
                    </View>
                }
            />
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

}

export default CalenderMeetingListScreen;
