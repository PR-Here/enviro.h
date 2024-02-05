import React, { useEffect, useState } from 'react';
import {
    View,
    SectionList
} from 'react-native';
import { styles } from './Style';
import CustomText from '../../../component/atoms/CustomText';
import { GREEN, RED } from '../../../theme/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RightArrow from '../../../../assets/images/SVG/right_arrow_small'
import { GET_APPLIED_LIST } from '../../../services/ApiEndPoint';

import useApiEffect from '../../../hooks/useApiEffect';
import AppLoader from '../../../utils/AppLoader';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { onScrollHandler } from '../../../utils/Constant';
import { onTabBarSroll } from '../../../redux/slices/TabBarSlice';



const MyLeaveTab = ({ tabItemOnPress, Selectedtype, setDefaultHandleTab, navigation, selectedFilterData }) => {

    const [listData, setListData] = useState([])
    const [type, setType] = useState(Selectedtype)
    const { makeApiRequest, loading } = useApiEffect()
    const dispatch = useDispatch()

    const onScroll = (e) => {
        const hideTabBar = onScrollHandler(e, navigation)
        dispatch(onTabBarSroll(hideTabBar))
    }
    useFocusEffect(
        React.useCallback(() => {
            // This code will run when the screen gains focus
            async function GET_LEAVE_REQUESTS_LIST() {
                const type = Selectedtype
                let body = {}
                const selectedLeaveTypeId = selectedFilterData?.typeId == undefined ? {} : { selectedLeaveTypeId: selectedFilterData?.typeId }
                const selectedApprovalType = selectedFilterData?.approvalstatus == undefined ? {} : { selectedApprovalType: selectedFilterData?.approvalstatus }
                const selectedLeaveSlotId = selectedFilterData?.subTypeId == undefined ? {} : { selectedLeaveSlotId: selectedFilterData?.subTypeId }
                const startDate = selectedFilterData?.startDate == undefined || selectedFilterData?.startDate == '' ? {} : { startDate: moment(selectedFilterData?.startDate).format('YYYY-MM-DD') }
                const endDate = selectedFilterData?.endDate == undefined || selectedFilterData?.endDate == '' ? {} : { endDate: moment(selectedFilterData?.endDate).format('YYYY-MM-DD') }
                if (type == "my-leave") {
                    body = {
                        type: Selectedtype,
                        ...selectedLeaveTypeId,
                        ...selectedApprovalType,
                        ...selectedLeaveSlotId,
                        ...startDate,
                        ...endDate
                    }
                } else {
                    body = {
                        type: Selectedtype

                    }
                }
                const apiData = await makeApiRequest({ url: GET_APPLIED_LIST, method: 'POST', data: body, isToken: true, showProgress: false });
                if (apiData?.status == true) {
                    console.log('data===>', apiData?.data)
                    setListData(filterListData(apiData?.data))
                } else {
                    console.log("PROFILE API ERROR: ", apiData)
                }
            }

            GET_LEAVE_REQUESTS_LIST()

            return () => {
                // This cleanup function will run when the screen loses focus
            };
        }, [Selectedtype, setDefaultHandleTab])
    );



    {/* Leave Listing type data Object Conversion */ }
    const filterListData = (list) => {
        let leaveRequestData = []
        let Data = []
        let i = 1;

        list?.map(item => {
            let leaveTypeName = ''
            let isHalfDay = false
            leaveTypeName = item?.LeaveTypeModel?.leave_type_name
            let totalDaysAbsence = 0

            item?.UserAppliedLeavesDates?.map(leaves => {
                if (leaves?.deducted === "0.5") {
                    isHalfDay = true
                }

            })

            item?.UserAppliedLeavesDates?.map(leaves => {
                totalDaysAbsence += parseFloat(leaves?.deducted)
            })






            Data.push({
                leave_id: item?.leave_id,
                leave_type_id: item?.leave_type_id,
                no_of_days: item?.no_of_days,
                reason: item?.reason,
                cancelReason: item?.cancel_reason,
                from_date: item?.from_date,
                is_half_day: isHalfDay,
                to_date: item?.to_date,
                status: item?.status,
                startTime: item?.s_start_time,
                endTime: item?.s_end_time,
                leaveTypeName: leaveTypeName,
                totalDaysAbsence: totalDaysAbsence,
                appliedOnDate: moment(item?.createdAt).format('YYYY-MM-DD'),
                UserAppliedLeavesDates: item?.UserAppliedLeavesDates
            })
            i++;
        })


        if (Data.length != 0) {
            leaveRequestData?.push({
                data: Data
            })
        }

        return leaveRequestData

    }

    const LeaveTypeListItem = ({ item, index }) => {
        return (

            <TouchableOpacity onPress={() => {

                tabItemOnPress(item)
            }} activeOpacity={0.7}>
                <View style={[styles.listItemContainer, { borderTopLeftRadius: index == 0 ? 5 : 0, borderTopRightRadius: index == 0 ? 5 : 0 }]}>

                    <View >

                        <CustomText children={moment(item?.from_date).format('DD MMM YY')} style={styles.dashboardDataDateText} />
                        <CustomText children={moment(item?.to_date).format('DD MMM YY')} style={styles.dashboardDataDate1Text} />

                    </View>

                    <View style={styles.dashboardDataReasonDayStatusContainer}>
                        <View style={styles.dashboardDataReasonStatusContainer}>
                            <CustomText children={item?.reason?.trim()} style={styles.dashboardDataReasonText} numberOflines={1} />
                            <CustomText children={item?.status == 0 ? 'Saved' : item?.status == 1 ? 'Awaiting' : item?.status == 2 ? 'Approved' : item?.status == 3 ? 'Rejected' : 'Cancelled'} style={[styles.dashboardDataStatusText, { color: item?.status == 2 ? GREEN : item?.status == 3 ? RED : item?.status == 4 ? RED : '#E3B231' }]} />
                        </View>


                        <View style={styles.dashboardDataDayContainer}>
                            <CustomText children={item?.totalDaysAbsence > 1 ? item?.totalDaysAbsence + ' days absence' : item?.totalDaysAbsence + ' day absence'} style={styles.dashboardDataDayText} />
                            <RightArrow />
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        )
    }


    return (

        <View style={{ flex: 1, backgroundColor: '#FAFCFD', marginHorizontal: widthPercentageToDP(2), paddingBottom: heightPercentageToDP(0) }}>

            <SectionList
                onScroll={onScroll}
                showsVerticalScrollIndicator={false}
                sections={listData}
                keyExtractor={(item, index) => item + index}
                stickySectionHeadersEnabled={false}
                bounces={false}
                renderItem={({ item, index }) => (

                    <LeaveTypeListItem item={item} index={index} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <CustomText children={title} style={styles.sectionHeaderStyle} />
                )}
                ListEmptyComponent={
                    <View style={{ height: heightPercentageToDP(30), marginHorizontal: widthPercentageToDP(30), flexDirection: 'column', justifyContent: 'center' }}>
                        <CustomText children={'No leaves found'} style={{ alignSelf: 'center' }} />
                    </View>
                }
                ListFooterComponent={
                    <View style={{ height: heightPercentageToDP(12) }}>

                    </View>
                }


            />
            <AppLoader isLoading={loading} />

        </View>

    )

}

export default MyLeaveTab;