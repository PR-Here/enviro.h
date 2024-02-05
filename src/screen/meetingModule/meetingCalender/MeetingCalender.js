import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DROPDOWNARROW from '../../../../assets/images/SVG/downarrow.svg';
import CustomText from '../../../component/atoms/CustomText';
import useApiEffect from '../../../hooks/useApiEffect';
import { MEETING_VIEW_ALL } from '../../../services/ApiEndPoint';
import { BLACK, GREY, WHITE } from '../../../theme/Colors';
import { FontName, FontSize } from '../../../theme/Fonts';
import AppString from '../../../utils/AppString';
import CalenderListItem from '../meetingCalenderList/CalenderListItem';
import MeetingDayFilterModel from './MeetingDayFilterModel';
import { styles } from './Style';
import { useIsFocused } from '@react-navigation/native';


const MeetingCalender = ({ onPress, onNavigate }) => {

    const { makeApiRequest, loading } = useApiEffect()


    const [isDayFilter, setIsDayFilter] = useState(false)
    const [dayFilter, setDayFilter] = useState("7 Days")


    const [fromDate, setFromDate] = useState(moment().format('yyyy-MM-D'))
    const [toDate, setToDate] = useState(moment().add(7, 'days').format('yyyy-MM-D'))

    const [meetingData, setMeetingData] = useState([])

    const [filterData, setFilterData] = useState([])


    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused)
            MeetingViewAll()
    }, [toDate, isFocused])


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
        if (type == 'Today') {
            setFromDate(moment().format('yyyy-MM-D'))
            return moment().format('yyyy-MM-D')
        } else if (type == 'Tomorrow') {
            setFromDate(moment().add(1, 'days').format('yyyy-MM-D'))
            return moment().add(1, 'days').format('yyyy-MM-D')
        } else if (type == '7 Days') {
            setFromDate(moment().format('yyyy-MM-D'))
            return moment().add(7, 'days').format('yyyy-MM-D')
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


    return (
        <View style={styles.calenderView}>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15,
            }}>
                <TouchableOpacity onPress={() => {
                    setIsDayFilter(true)
                }} style={{
                    height: hp(5),
                    minWidth: '22%',
                    marginHorizontal: 10,
                    borderColor: '#D9D9D9',
                    borderRadius: 5,
                    borderWidth: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: wp(2),
                    paddingVertical: wp(1.2),

                }}>
                    <CustomText children={dayFilter} style={{ fontSize: FontSize(12), marginEnd: 10 }} />
                    <DROPDOWNARROW height={15} width={15} />

                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} onPress={onNavigate}>
                    <CustomText
                        style={[{ color: BLACK, marginEnd: 10, fontSize: FontSize(13) }]}
                        children={AppString.VIEW_ALL}
                    />
                </TouchableOpacity>

            </View>

            <FlatList
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
                data={filterData}
                renderItem={({ item }) => <CalenderListItem data={item} onPress={(item) => {
                    onPress(item)
                }} />}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: hp(20) }}>
                        <CustomText children={`No meeting schedule ${dayFilter}`} style={{ fontSize: 12, color: GREY }} />
                    </View>
                }
            />

            <MeetingDayFilterModel
                visible={isDayFilter}
                selectedPosition={dayFilter}
                onDone={(item, index) => {
                    setIsDayFilter(false)
                    if (item?.key != null) {
                        setDayFilter(item?.key)
                        setToDate(getFilterDate(fromDate, item?.key))
                    }
                }
                }
            />

        </View>

    )
}

export default MeetingCalender;

const theme = {
    //color: WHITE,
    // palette: {
    //     primary: {
    //         main: CALENDAR_EVENT_COLOR,
    //     }
    // },
    typography: {
        //Date style
        xl: {
            fontSize: 14,
            fontFamily: FontName.Gordita_Medium,
            color: WHITE
        },
        //Week Day style
        xs: {
            fontSize: 13,
            fontFamily: FontName.Gordita_Medium,
            color: WHITE
        },
        //Meeting title
        sm: {
            fontSize: 11,
            fontFamily: FontName.Gordita_Regular,
        },
    }
    // ,
    // eventCellOverlappings: [{
    //     main: '#EDEDED'
    // },
    // {
    //     main: '#E1F5E8'
    // },
    // {
    //     main: '#DBE6FE'
    // }]

}