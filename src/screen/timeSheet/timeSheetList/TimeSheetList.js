import {
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { styles } from './Style';
import CustomText from '../../../component/atoms/CustomText';
import AssetsImages from '../../../utils/AssetsImages';
import FloatingButton from '../../../component/atoms/FloatingButton';
import NavString from '../../../utils/NavString';
import { GREY, PRIMARY_COLOR, TEXT_COLOR_ORANGE } from '../../../theme/Colors';
import useApiEffect from '../../../hooks/useApiEffect';
import { LIST_TIME_SHEET } from '../../../services/ApiEndPoint';
import moment from 'moment';
import BlueClock from '../../../../assets/images/SVG/blueClock.svg';
import Header from '../../../component/header/Header';
import AppString from '../../../utils/AppString';
import FilterBg from '../../../../assets/images/SVG/filter.svg';
import { useDispatch } from 'react-redux';
import { onTabBarSroll } from '../../../redux/slices/TabBarSlice';
import FilterTimeSheet from '../timeSheetFilter/FilterTimeSheet';
import AppLoader from '../../../utils/AppLoader';
import { useIsFocused } from "@react-navigation/native";
import RightArrow from '../../../../assets/images/SVG/right_arrow.svg';
import { ShowToast } from '../../../utils/Constant';

const TimeSheetList = ({ navigation }) => {
  const { makeApiRequest, loading } = useApiEffect()
  const [timeSheetList, setTimeSheetList] = useState([]);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isAddFilter, setIsAddFilter] = useState(null);
  const [isAddPaidFilter, setIsAddPaidFilter] = useState(null);
  const dispatch = useDispatch()
  const isFocused = useIsFocused();

  // Create an object to store grouped data
  const groupedData = {};
  //Handle when page loads
  useLayoutEffect(() => {
    LIST_TIME_SHEET_API(data = { "date": "weekly" })
    dispatch(onTabBarSroll(true))
    setIsAddFilter(null)
    setIsAddPaidFilter(null)
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
  {/** filter icon click to show bottomsheet */ }
  const onFliterPress = () => {
    setIsAddVisible(true)
  }

  {/**Handle Edit Api Method */ }
  const handleEdit = (selectedItem) => {
    if (selectedItem.week === 1) {
      navigation.navigate(NavString.ADD_TIMESHEET,
        selectedItem);
    } else {
      ShowToast('Editing the timesheet is not permitted beyond 14 days.')
    }

  }
  {/** filter icon click to hide bottomsheet and handle data accourding type and call List api reload data */ }
  const handleFilterApply = (selectedData, paidData) => {
    setIsAddFilter(selectedData)
    setIsAddPaidFilter(paidData)
    setIsAddVisible(false)
    let filterName = ""
    var filterType = paidData?.id ? paidData?.id : 0
    if (selectedData?.id === 3) {
      filterName = "lastmonth".toLowerCase();
    } else {
      filterName = selectedData?.name.toLowerCase();
    }
    const data = {
      date: filterName,
      billing_method: filterType
    }
    LIST_TIME_SHEET_API(data)
  }

  // handle Filter Close Function hide bootm sheet
  const handleFilterClose = () => {
    setIsAddVisible(false)
  }

  {/** view render data set for flatlist */ }
  const RenderDataList = (item) => {
    let titleName = item?.Client || item?.Client?.client_name ? item?.Client?.client_name.toUpperCase() : ""
    let titleProject = item?.Project || item?.Project?.project_name ? item?.Project?.project_name.toUpperCase() : ""
    let type = item.timesheet_type
    let fontColor = GREY
    //Handle the condition here for leave and idle timesheet update.
    if (type == 2) {
      titleName = 'Leave'.toUpperCase()
      // fontColor = RED
    } else if (type == 3) {
      titleName = 'Idle'.toUpperCase()
      // fontColor = BLUE
    }
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => handleEdit(item)}>
        <View style={styles.secondViewStyle}>
          <View style={styles.viewDesStyle}>
            <View style={styles.viewDesDetailsStyle}>
              <CustomText style={[styles.titleText, { color: fontColor }]} children={titleName} />
              <CustomText style={styles.middleText} children={titleProject} />
            </View>
            <View style={styles.viewRightArrowDetailsStyle}>
              <RightArrow />
            </View>
          </View>
          <View style={styles.viewDesStyle}>
            <View style={styles.viewDesDetailsStyle}>
              <CustomText style={[styles.discText, { textAlign: 'justify', color: GREY }]} children={item.description} />
            </View>
            <View style={styles.viewtimeDetailsStyle}>
              <BlueClock style={{ marginBottom: 2 }} />
              <CustomText style={[styles.timeText, { color: TEXT_COLOR_ORANGE }]} children={item.duration + ' H'} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  //Handle the cell data here using API data of timesheet list
  const RenderWeekList = (item) => {
    let timeSheetDate = moment(item?.date)
    const day = moment(item?.date).format('DD')
    let today = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(timeSheetDate);
    const month = moment(item?.date).format('MMMM')

    let timesheetData = item.data

    return (
      <View style={styles.renderItemView}>
        {item != null ? <>
          <View style={styles.firstViewStyle}>
            <View style={styles.viewFirstCellStyle}>
              <CustomText style={styles.dayText} children={day} />
              <CustomText style={styles.dateText} children={month} />
            </View>
            <CustomText style={styles.todayText} children={today.toUpperCase()} />
          </View>
          <FlatList
            data={timesheetData}
            style={styles.innerFlatListStyle}
            renderItem={({ item }) => RenderDataList(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </> : <CustomText children={"Data Not Found"} style={{
          alignItems: 'center',
          justifyContent: 'center'
        }} />}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Header title={AppString.TIMESHEET} />
        <TouchableOpacity onPress={onFliterPress}>
          <View style={styles.filterView}>
            <FilterBg width={20} height={20} />
          </View>
        </TouchableOpacity>
      </View>
      {/** Filter Bottomsheet */}
      {isAddVisible ? <FilterTimeSheet visible={isAddVisible} handleApply={handleFilterApply} handleFilterClose={handleFilterClose} /> : ''}
      {/** isAddFilter using days name show and sets isAddPaidFilter using name show paid value */}
      <CustomText children={isAddFilter?.name != null ? isAddFilter?.name : isAddPaidFilter?.name != null ? isAddPaidFilter?.name : AppString.WEEKLY} style={{ marginStart: 8 }} />

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

export default TimeSheetList;
