//import liraries
import React, { useState, useLayoutEffect } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import useApiEffect from '../../../hooks/useApiEffect';
import { styles } from './MonthTimeSheetStyle';
import CustomText from '../../../component/atoms/CustomText';
import AssetsImages from '../../../utils/AssetsImages';
import FloatingButton from '../../../component/atoms/FloatingButton';
import NavString from '../../../utils/NavString';
import { GREY, PRIMARY_COLOR, RED, TEXT_COLOR_ORANGE } from '../../../theme/Colors';
import { LIST_TIME_SHEET } from '../../../services/ApiEndPoint';
import moment from 'moment';
import BlueClock from '../../../../assets/images/SVG/blueClock.svg';
import { onTabBarSroll } from '../../../redux/slices/TabBarSlice';
import AppLoader from '../../../utils/AppLoader';
import RightArrow from '../../../../assets/images/SVG/right_arrow.svg';

// create a component
const MonthTimeSheet = () => {
    const { makeApiRequest, loading } = useApiEffect()
    const [timeSheetList, setTimeSheetList] = useState([]);
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const navigation = useNavigation()

    // Create an object to store grouped data
    const groupedData = {};
    //Handle when page loads
    useLayoutEffect(() => {
        LIST_TIME_SHEET_API(data = { date: "monthly" })
        dispatch(onTabBarSroll(true))
        // setIsAddFilter(null)
    }, [navigation, isFocused])

    {/** Using Apis Method to fetch timesheet list*/ }
    async function LIST_TIME_SHEET_API(data) {
        const apiData = await makeApiRequest({ url: LIST_TIME_SHEET, method: 'POST', isToken: true, data: data });
        if (apiData?.status == true) {
            // Group the data by the "date" field
            apiData?.data.forEach((item) => {
                const date = item.date;
                if (!groupedData[date]) {
                    groupedData[date] = [];
                }
                groupedData[date].push(item);
            });

            // Convert the grouped data object into an array of objects
            const groupedDataArray = Object.entries(groupedData).map(([date, items]) => ({
                date,
                data: items,
            }));

            setTimeSheetList(groupedDataArray)
        } else {
            console.log("List Timesheet API ERROR: ", apiData)
        }
    }

    {/** handle navigation to Current Screen to Add TIme Sheet Screen */ }
    const handleAddButtonPress = () => {
        navigation.navigate(NavString.ADD_TIMESHEET);
    };

    {/**Handle Edit Api Method */ }
    const handleEdit = (selectedItem) => {
        navigation.navigate(NavString.ADD_TIMESHEET,
            selectedItem);
    }

    //Handle the cell data here using API data of timesheet list
    const RenderWeekList = (item) => {
        let timeSheetDate = moment(item?.date)
        const day = moment(item?.date).format('DD')
        let today = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(timeSheetDate);
        const month = moment(item?.date).format('MMM').toUpperCase()

        let timesheetData = item.data
        return (
            <View style={styles.renderItemView}>
                {item != null ? <>
                    <View style={styles.firstViewStyle}>
                        <CustomText style={styles.dayText} children={day} />
                        <CustomText style={styles.todayText} children={today.toUpperCase()} />
                        <CustomText style={styles.dateText} children={month} />
                    </View>
                    <FlatList
                        data={timesheetData}
                        style={styles.innerFlatListStyle}
                        renderItem={({ item }) => RenderDataList(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </>
                    : <>
                        <CustomText children={"Data Not Found"} style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} /></>}
            </View >
        )
    }

    {/** view render data set for flatlist */ }
    const RenderDataList = (item) => {
        var titleName = item?.Task?.task_name
        let type = item.timesheet_type
        var fontColor = GREY
        //Handle the condition here for leave and idle timesheet update.
        if (type == 2) {
            titleName = 'Leave'
            fontColor = RED
        } else if (type == 3) {
            titleName = 'Idle'
            fontColor = RED
        }

        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => handleEdit(item)}>
                <View style={styles.secondViewStyle}>
                    <View style={styles.viewDesStyle}>
                        <View style={styles.viewDesDetailsStyle}>
                            <CustomText style={[styles.titleText, { color: fontColor }]} children={titleName} />
                            <CustomText style={styles.middleText} children={item?.Project?.project_name} />
                        </View>
                        <View style={styles.viewtimeDetailsStyle}>
                            <RightArrow />
                        </View>
                    </View>
                    <View style={styles.viewDesStyle}>
                        <View style={styles.viewDesDetailsStyle}>
                            <CustomText style={[styles.discText, { textAlign: 'justify', color: GREY }]} children={item.description} />
                        </View>
                        <View style={styles.viewtimeDetailsStyle}>
                            <BlueClock style={{}} />
                            <CustomText style={[styles.timeText, { color: TEXT_COLOR_ORANGE }]} children={item.duration + ' H'} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container} >
            <FlatList
                data={timeSheetList}
                style={styles.flatList}
                renderItem={({ item }) => RenderWeekList(item)}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                    <View style={styles.viewNoFound}>
                        <CustomText children={'No Record Found'} style={styles.textNoFound} />
                    </View>
                }
            />
            {/** Add Button to Create New Timesheet */}

            <FloatingButton
                onPress={handleAddButtonPress}
                image={AssetsImages.PLUS}
                style={{ backgroundColor: PRIMARY_COLOR }}
            />
            <AppLoader isLoading={loading} />
        </View>
    );
};

//make this component available to the app
export default MonthTimeSheet;
