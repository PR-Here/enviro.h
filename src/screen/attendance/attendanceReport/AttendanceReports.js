import {
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { styles } from './AttendanceReportStyle';
import React, { useEffect, useState } from 'react';
import Header from '../../../component/header/Header';
import AppString from '../../../utils/AppString';
import CustomText from '../../../component/atoms/CustomText';
import { FontName, FontSize } from '../../../theme/Fonts';
import { BLACK, ORANGE, WHITE } from '../../../theme/Colors';
import Filter from '../filterScreen/Filter';
import FilterImage from '../../../../assets/images/SVG/filter.svg'
import { useSelector } from 'react-redux';
import useApiEffect from '../../../hooks/useApiEffect';
import { ATTENDANCE_LIST } from '../../../services/ApiEndPoint';
import AppLoader from '../../../utils/AppLoader';
import moment from 'moment';
import { convertTimeToUTC } from '../../../utils/Constant';
import { useIsFocused } from '@react-navigation/native';

const AttendanceReports = () => {
    const [isFilterSheetVisible, setIsFilterSheettVisible] = useState(false);
    const [data, setData] = useState([]);
    const loginUserData = useSelector((state) => state?.auth?.loginUser);
    const { makeApiRequest, loading } = useApiEffect()
    const [totalHour, setTotalHour] = useState()
    const [avgHour, setAvgHour] = useState()
    const isFocused = useIsFocused()

    const detailsData = [
        {
            id: 1,
            titleShort: 'WFH: Work from home',
        },
        {
            id: 2,
            titleShort: 'WFO: Work from office',
        },
        {
            id: 3,
            titleShort: 'WO: Week Off',
        },
        {
            id: 4,
            titleShort: 'CM: Client meeting',
        },
    ]

    const handleBottomNavigationPopup = (item) => {
        setIsFilterSheettVisible(false);
        const type = item?.type === 'WFO' ? 1 : item?.type === 'CM' ? 2 : item?.type === 'WFH' ? 3 : item?.type === 'PH' ? 4 : item?.type === 'WO' ? 5 : item?.type === 'Leave' ? 6 : 0
        ATTENDANCE_LIST_API(item?.days, type, item.startDate == '' ? '' : moment(item?.startDate, "DD-MM-YYYY").format("YYYY-MM-DD"), item.endDate == '' ? '' : moment(item.endDate, "DD-MM-YYYY").format("YYYY-MM-DD"))
    }

    useEffect(() => {
        if (isFocused)
            ATTENDANCE_LIST_API()
    }, [isFocused])

    async function ATTENDANCE_LIST_API(day = '', type = 0, sDate = '', eDate = '') {

        const apiData = await makeApiRequest({
            url: ATTENDANCE_LIST, method: 'POST', isToken: true, data: {
                'days': day.toLocaleLowerCase(),
                'action': type,
                'start_date': sDate,
                'end_date': eDate
            }
        });
        if (apiData?.status == true) {
            const flatListData = Object.entries(apiData?.data.result).map(([date, items]) => ({
                date,
                data: items
            }));
            setTotalHour(apiData?.data?.totalHour)
            setAvgHour(apiData?.data?.avg_total_hour)

            setData([...flatListData].sort((a, b) => new Date(b.date) - new Date(a.date)));
            // console.log('-------->', JSON.stringify(apiData));
        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    const ViewRowComponent = ({ title, subTitle, fontSize, style, subStyle, subFontSize }) => {
        return (
            <View style={styles.viewRowStyle}>
                <CustomText children={title} fontSize={fontSize} style={style} numberOflines={1} />
                <CustomText children={subTitle} fontSize={subFontSize} style={subStyle} numberOflines={1} />
            </View>
        )
    }

    // Short Leave to full Name View Style
    const RenderDetailsItem = (reportDetails) => {
        return (
            <View style={styles.viewDetailsStyle}>
                <CustomText children={reportDetails?.item?.titleShort} style={styles.textShortStyle} fontSize={FontSize(13)} />
            </View>
        )
    }

    const parsedTime = moment(totalHour, 'HH:mm:ss');

    return (
        <SafeAreaView style={styles.container}>
            <Header title={AppString.ATTENDANCE_REPORT} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.viewHeaderStyle}>
                    <CustomText children={`${loginUserData?.first_name} ${loginUserData?.last_name} `} fontSize={FontSize(15)} style={{ color: BLACK, fontFamily: FontName.Gordita_Medium, marginTop: 3 }} />
                    <CustomText children={`Emp ID: ${loginUserData?.employee_code}`} fontSize={FontSize(12)} style={{ color: BLACK, fontFamily: FontName.Gordita_Regular, marginTop: 8 }} />
                    <ViewRowComponent title={`Department: ${loginUserData?.Department?.department_name}`} subTitle={`Total Hrs: ${totalHour == null ? '00:00:00' : totalHour}`} fontSize={FontSize(12)} style={{ color: BLACK, fontFamily: FontName.Gordita_Regular, marginTop: 5, flex: 1 }} subStyle={{ color: ORANGE, marginTop: 5 }} subFontSize={FontSize(10)} />
                    <ViewRowComponent title={`Location: ${loginUserData?.Location?.location_name}`} subTitle={`Avg. Wrk Hrs : ${avgHour == null ? '00:00:00' : avgHour}`} fontSize={FontSize(12)} style={{ color: BLACK, flex: 1, fontFamily: FontName.Gordita_Regular, marginTop: 5, marginBottom: 5 }} subStyle={{ color: ORANGE, marginTop: 5, marginBottom: 5 }} subFontSize={FontSize(10)} />
                </View>

                <View style={styles.viewTextFilterStyle}>
                    <CustomText children={"Reports"} style={{}} fontSize={FontSize(16)} />
                    <TouchableOpacity onPress={() => setIsFilterSheettVisible(true)}>
                        <FilterImage width={24} height={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.viewFlatStyle}>
                    <View style={styles.firstViewStyle}>
                        <CustomText children={"Date"} style={[styles.textStyle, { color: WHITE }]} fontSize={FontSize(13)} />
                        <View style={styles.lineStyle} />
                        <CustomText children={"Check in"} style={[styles.textStyle, { color: WHITE }]} fontSize={FontSize(13)} />
                        <View style={styles.lineStyle} />
                        <CustomText children={"Check Out"} style={[styles.textStyle, { color: WHITE }]} fontSize={FontSize(13)} />
                        <View style={styles.lineStyle} />
                        <CustomText children={"Types"} style={[styles.textStyle, { color: WHITE }]} fontSize={FontSize(13)} />
                        <View style={styles.lineStyle} />
                        <CustomText children={"Hours"} style={[styles.textStyle, { color: WHITE }]} fontSize={FontSize(13)} />
                        <View style={styles.lineStyle} />
                        <CustomText children={"Weekly Hours"} style={[styles.textStyle, { color: WHITE }]} fontSize={FontSize(13)} />
                    </View>
                    <View style={styles.verticleLine} />
                    <View style={styles.verticleLine} />

                    <FlatList
                        data={data}
                        numColumns={1}
                        horizontal
                        nestedScrollEnabled
                        keyExtractor={(item) => item.date}
                        renderItem={({ item }) => (

                            <View style={styles.flatViewStyle}>

                                <CustomText children={moment(item.date).format('DD/MM/YY')} style={styles.textStyle} fontSize={FontSize(13)} />
                                <View style={styles.lineStyle} />
                                <FlatList
                                    scrollEnabled={false}
                                    data={item.data}
                                    renderItem={({ item }) =>
                                        <ReportData item={item} />
                                    }
                                />
                            </View>
                        )}
                    />

                </View>

                <FlatList
                    numColumns={2}
                    data={detailsData}
                    renderItem={(reportDetails) => RenderDetailsItem(reportDetails)}
                    nestedScrollEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(reportDetails, index) => {
                        return reportDetails.id;
                    }}
                    showsVerticalScrollIndicator={false}
                />

                <Filter visible={isFilterSheetVisible} onCancel={() => setIsFilterSheettVisible(false)} onApply={handleBottomNavigationPopup} />
                <AppLoader isLoading={loading} />
            </ScrollView>
        </SafeAreaView>
    )
}

const ReportData = ({ item }) => {

    var hourRequired = item?.total_hr != null && parseInt(item?.total_hr.split(":")[0])

    const currentDate = moment().format('YYYY-MM-DD');

    const startTime = moment(`${currentDate} ${item?.user_applied_regurlazation?.s_start_time}`);
    const endTime = moment(`${currentDate} ${item?.user_applied_regurlazation?.s_end_time}`);

    const differenceInHours = endTime?.diff(startTime, 'hours');

    console.log(`Time difference in minutes: ${differenceInHours}`);

    return (
        <View>
            <CustomText children={item?.punching_in == null ? '--' : convertTimeToUTC(item?.punching_in)} style={styles.textStyle} fontSize={FontSize(13)} />
            <View style={styles.lineStyle} />
            <CustomText children={item.punching_out == null ? '--' : convertTimeToUTC(item?.punching_out)} style={styles.textStyle} fontSize={FontSize(13)} />
            <View style={styles.lineStyle} />
            {item?.action == 6 ?
                <View style={{ backgroundColor: item?.user_applied_leave?.status == 1 ? '#F4E0E0' : item?.user_applied_regurlazation?.leave_type_id == 0 && item?.user_applied_regurlazation?.status == 2 ? '#E0F4E0' : '#D2D2D2', marginHorizontal: 10 }}>
                    {
                        differenceInHours > 4 && differenceInHours < 8 && item?.user_applied_regurlazation?.status == 2 ?
                            <CustomText children={'HD'} style={styles.textStyle} fontSize={FontSize(13)} />
                            :
                            differenceInHours >= 8 && item?.user_applied_regurlazation?.status == 2 ?
                                <CustomText children={'P'} style={styles.textStyle} fontSize={FontSize(13)} />
                                :
                                item?.user_applied_leave?.status == 1 ?
                                    <CustomText children={'A/LWP'} style={styles.textStyle} fontSize={FontSize(13)} />
                                    :
                                    item?.user_applied_regurlazation?.leave_type_id == 0 && item?.user_applied_regurlazation?.status == 2 ?
                                        <CustomText children={'P'} style={styles.textStyle} fontSize={FontSize(13)} />
                                        :
                                        <CustomText children={item?.user_applied_leave?.leave_type_id == 1 ? 'SL' : item?.user_applied_leave?.leave_type_id == 2 ? 'EL' : item?.user_applied_leave?.leave_type_id == 3 ? 'CL' : item?.user_applied_leave?.leave_type_id == 4 ? 'OPL' : item?.user_applied_leave?.leave_type_id == 5 ? 'WFH' : item?.user_applied_leave?.leave_type_id == 6 ? 'COF' : item?.user_applied_leave?.leave_type_id == 7 ? 'SHL' : item?.user_applied_leave?.leave_type_id == 8 ? 'OH' : item?.user_applied_leave?.leave_type_id == 9 ? 'ML' : item?.user_applied_leave?.leave_type_id == 10 ? 'PL' : 'A/LWP'} style={styles.textStyle} fontSize={FontSize(13)} />
                    }
                </View>
                : item?.action == 3 ?
                    <View style={{ backgroundColor: item?.user_applied_leave?.leave_type_id == 7 && item?.user_applied_leave?.status == 2 && hourRequired >= 8 ? '#E0E3F4' : item?.user_applied_leave?.leave_type_id == 7 && item?.user_applied_leave?.status == 2 && item.total_hr !== null && (hourRequired <= 8 || hourRequired >= 4) ? '#E0EAF4' : item?.user_applied_leave?.leave_type_id == 7 && item?.user_applied_leave?.status == 2 && (hourRequired < 4 || item.total_hr === null) ? '#F4E0E0' : '#F4E0E0', marginHorizontal: 10 }}>
                        {
                            item?.user_applied_leave?.leave_type_id == 7 && item?.user_applied_leave?.status == 2 && hourRequired >= 8 ?
                                <CustomText children={'SHL'} style={styles.textStyle} fontSize={FontSize(13)} />
                                :
                                item?.user_applied_leave?.leave_type_id == 7 && item?.user_applied_leave?.status == 2 && item.total_hr !== null && (hourRequired <= 8 || hourRequired >= 4) ?
                                    <CustomText children={'HD'} style={styles.textStyle} fontSize={FontSize(13)} />
                                    :
                                    item?.user_applied_leave?.leave_type_id == 7 && item?.user_applied_leave?.status == 2 && (hourRequired < 4 || item.total_hr === null) ?
                                        <CustomText children={'A/LWP'} style={styles.textStyle} fontSize={FontSize(13)} />
                                        : null
                        }
                    </View>

                    :
                    <View style={{ backgroundColor: item?.action == 1 ? '#E0F4E0' : item?.action == 2 ? '#E0F4F4' : item?.action == 3 ? '#E0E3F4' : item?.action == 4 ? '#E0EAF4' : item?.action == 5 ? '#E0EAF4' : item?.action == 6 ? '#d2d2d2' : '#F4E0E0', marginHorizontal: 10 }}>
                        <CustomText children={item?.action == 0 ? 'A/LWP' : item?.action == 1 ? 'P' : item?.action == 2 ? 'HD' : item?.action == 3 ? 'SHL' : item?.action == 4 ? 'PH' : item?.action == 5 ? 'WO' : item?.action == 6 ? 'L' : 'LWP'} style={styles.textStyle} fontSize={FontSize(13)} />
                    </View>
            }

            <View style={styles.lineStyle} />
            <CustomText children={item?.total_hr} style={styles.textStyle} fontSize={FontSize(13)} />
            <View style={styles.lineStyle} />
            <CustomText children={item?.week_hr == null ? '--' : item?.week_hr} style={styles.textStyle} fontSize={FontSize(13)} />
        </View>
    )
}

export default AttendanceReports;