import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Keyboard,
    Platform
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { styles } from './Style';
import CustomText from '../../../component/atoms/CustomText';
import { CLOCK, DOWN_ARROW, RIGHT_ARROW } from '../../../utils/AssetsImages';
import { BACKGROUND_COLOR, BACKGROUND_COLOR_LEAVE, BLACK, GREY, INACTIVE_COLOR, LIGHT_BLUE, SELECTED_INNER_COLOR, WHITE } from '../../../theme/Colors';
import CustomButton from '../../../component/atoms/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LeaveTypeModal from '../../../component/modal/LeaveTypeModal';
import LeaveBalanceModal from '../../../component/modal/LeaveBalanceModal';
import DropdownComponent from '../../../component/modal/DropDownComponent';
import useApiEffect from '../../../hooks/useApiEffect';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { GET_COMPANSATORY_TYPE_LIST, GET_LEAVE_BALANCE, GET_LEAVE_SLOT_TYPE, GET_LEAVE_TYPE, HOLIDAY_LIST, MANAGER_DETAILS, NEW_LEAVE_REQUEST } from '../../../services/ApiEndPoint';
import AppLoader from '../../../utils/AppLoader';
import { useDispatch, useSelector } from 'react-redux';
import AppString, { DAYS, HOURS } from '../../../utils/AppString';
import { ShowToast, capitalizeFirstLetter, convertLocalToUTC, convertTimeToUTC, getNoOfHours, showUTCToLocal } from '../../../utils/Constant';
import UserIcon from '../../../../assets/images/SVG/user_icon.svg'
import CalendarDaysIcon from '../../../../assets/images/SVG/calendar_days_icon.svg'
import CalendarClockBlue from '../../../../assets/images/SVG/calendar_clock_orange.svg'
import RIGHTARROWORANGE from '../../../../assets/images/SVG/right_arrow_orange.svg'
import CLOCKIMAGE from '../../../../assets/images/SVG/timesheetClock.svg';
import TRASHIMAGE from '../../../../assets/images/SVG/trash.svg';
import MapPinIcon from '../../../../assets/images/SVG/map_pin_icon.svg'
import DateSeprator from '../../../../assets/images/SVG/date_seprator.svg'
import AlignLeftIcon from '../../../../assets/images/SVG/align_left_icon.svg'
import { FontName } from '../../../theme/Fonts';
import CustomTextInput from '../../../component/atoms/CustomTextInput';
import TaskModal from '../../../component/modal/TaskModal';
import MeetingHomeHeader from '../../../component/header/MeetingHeader';
import { onTabBarSroll } from '../../../redux/slices/TabBarSlice';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

let selectedDate = ""
let selectedDay = ""
let selectedIndex = 0
let selectedType = -1

let fullDayTypeData = null

let SelectedComOffId = -1

let selectedOptionalLeave = null

const NewLeave = ({ navigation, route }) => {

    let editData = route?.params?.data
    let isEdit = route?.params?.isEdit

    const onChange = (text) => {
        if (/\n/.test(text) && Platform.OS === 'ios') {
            //call submit function here
            Keyboard.dismiss()
            return
        } else {
            //do something here
            setReason(text)
        }
    }


    {/* filter data In Case of Edit */ }
    const filterLeaveDataOnEdit = (list) => {

        let leaveList = []

        list?.map(item => {
            leaveList.push({
                id: item.id,
                date: moment(item?.leavedate).format('MMM, DD YYYY'),
                day: moment(item?.leavedate).format('dddd'),
                type: item?.LeaveTypeSlotsModel?.slot_name,
                selectedTypeId: item?.LeaveTypeSlotsModel?.id,
                deducted_leave: item?.LeaveTypeSlotsModel?.deducted_leave
            })

        })

        return leaveList
    }

    const [leavesTypes, setLeaveTypes] = useState([])
    const [opholidays, setOPHolidays] = useState([])
    const { makeApiRequest, loading } = useApiEffect()
    const [leaveTypeData, setLeaveTypeData] = useState([])
    const [leaveBalanceData, setLeaveBalanceData] = useState([])


    const [visible, setVisible] = useState(false); // toggle for filter
    const [lbVisible, setLBVisible] = useState(false); // toggle for filter
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showCompansatoryDate, setShowCompansatoryDate] = useState(false);
    const [reason, setReason] = useState(isEdit ? editData?.reason : '');
    const [cancelvisible, setCancelvisible] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false)
    const [showEndTime, setShowEndTime] = useState(false)


    // console.log('editData?.startTime---->', moment(convertTimeToUTC(editData?.startTime), 'HH:mm:ss'));
    // console.log('editData?.endTime--->', moment(convertTimeToUTC(editData?.endTime), 'HH:mm:ss'));
    // console.log('getNoOfHours --->', getNoOfHours(editData?.startTime, editData?.endTime));

    const [startDate, setStartDate] = useState(isEdit ? new Date(editData?.from_date) : new Date());
    const [endDate, setEndDate] = useState(isEdit ? new Date(editData?.to_date) : new Date());
    const [startTime, setStartTime] = useState(isEdit ? convertTimeToUTC(editData?.startTime) : null)
    const [endTime, setEndTime] = useState(isEdit ? convertTimeToUTC(editData?.endTime) : null)


    const [leaveData, setLeaveData] = useState(isEdit ? filterLeaveDataOnEdit(editData?.UserAppliedLeavesDates) : [])
    const [fullDayData, setFullDayData] = useState({})

    const [compansatoryLeaves, setCompansatoryLeaves] = useState([])

    const [noOfDays, setNoOfDays] = useState(isEdit ? editData?.no_of_days : 0)
    const [noOfHours, setNoOfHours] = useState(isEdit ? getNoOfHours(editData?.startTime, editData?.endTime) : 0)
    const [noOfMinutes, setNoOfMinutes] = useState(isEdit ? getNoOfHours(editData?.startTime, editData?.endTime) * 60 : 0)
    const [leaveType, setLeaveType] = useState(isEdit ? editData?.leave_type_id : -1)
    const [leaveTypeName, setLeaveTypeName] = useState(isEdit ? editData?.leaveTypeName : null)
    const [optionalHoliday, setOptionalHoliday] = useState(isEdit ? editData?.leaveTypeName : 'Optional Holiday')
    const loginUserData = useSelector((state) => state?.auth?.loginUser);
    const reportingManager = loginUserData?.reporting_manager

    const dispatch = useDispatch()
    const [managerDetails, setManagerDetails] = useState([])



    const toggleBottomNavigationViewCancel = () => {
        //Toggling the visibility state of the filter modal
        setCancelvisible(!cancelvisible);
    };


    useEffect(() => {
        dispatch(onTabBarSroll(true))
        async function GET_LEAVE_TYPES() {
            const apiData = await makeApiRequest({ url: GET_LEAVE_TYPE, method: 'GET', isToken: true, showProgress: true });
            if (apiData?.status == true) {
                console.log('leaveTypes===>', apiData?.data)
                setLeaveTypes(filterLeaveTypesData(apiData?.data))
                GET_LEAVE_TYPE_DATA()
            } else {
                console.log("PROFILE API ERROR: ", apiData)
            }
        }
        GET_LEAVE_TYPES()


        async function GET_LEAVE_BALANCES() {
            const apiData = await makeApiRequest({ url: GET_LEAVE_BALANCE, method: 'GET', isToken: true, showProgress: false });

            if (apiData?.status == true) {
                setLeaveBalanceData(apiData?.data)

            } else {
                console.log("PROFILE API ERROR: ", apiData)
            }
        }
        GET_LEAVE_BALANCES()





    }, [])




    useEffect(() => {
        ManagerDetails()
    }, [])

    async function ManagerDetails() {

        const apiData = await makeApiRequest({ url: MANAGER_DETAILS, method: 'GET', isToken: true });

        if (apiData?.status == true) {
            setManagerDetails(apiData?.data)
        }
    }




    {/* Leave type data Object Conversion */ }
    const filterLeaveTypesData = (list) => {
        let leaveData = []
        let i = 1;

        list?.type?.map(item => {
            if (isEdit && leaveType == 7) {
                if (item.leave_type_id == 7) {
                    leaveData.push({
                        label: item?.leave_type_name,
                        value: '' + i,
                        id: item?.leave_type_id
                    })
                    i++;
                }

            } else if (isEdit && leaveType != 7) {

                if (item.leave_type_id != 7 && item.leave_type_id != 6 && item.leave_type_id != 8) {
                    leaveData.push({
                        label: item?.leave_type_name,
                        value: '' + i,
                        id: item?.leave_type_id
                    })
                    i++;
                }

            } else {
                leaveData.push({
                    label: item?.leave_type_name,
                    value: '' + i,
                    id: item?.leave_type_id
                })
                i++;
            }


        })

        //console.log('helloData---->', leaveData);


        return leaveData

    }

    const filterCompansatoryLeaves = (list) => {
        let compansatoryData = []

        list?.map((item) => {
            compansatoryData.push({
                id: item?.id,
                date: moment(item?.date).format('MMM, DD YYYY'),
                day: moment(item?.date).format('dddd'),
                type: 'Select Date',
                isSelected: false

            })


        })

        return compansatoryData

    }


    {/* Leave slot type data Object Conversion */ }
    const filterLeaveSlotTypeData = (list) => {
        let leaveSlotData = []
        let i = 1;

        list?.map(item => {
            leaveSlotData.push({
                id: item?.id,
                name: item?.slot_name,
                from_time: item?.from_time,
                to_time: item?.to_time,
                deducted_leave: item?.deducted_leave
            })

            if (item?.slot_name == 'Full Day') {
                fullDayTypeData = {
                    type: item?.slot_name,
                    selectedTypeId: item?.id,
                    deducted_leave: item?.deducted_leave
                }

                if (!isEdit) {

                    if (new Date().getDay() != 6 && new Date().getDay() != 7) {
                        setLeaveData([{
                            ...fullDayTypeData,
                            id: 1,
                            date: moment(new Date()).format('MMM, DD YYYY'),
                            day: moment(new Date()).format('dddd'),
                        }])

                        setNoOfDays(1)

                    } else {
                        setNoOfDays(0)
                    }

                }

            }
            i++;
        })

        return leaveSlotData

    }


    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the filter modal
        setVisible(!visible);
    };

    const toggleBottomNavigationViewLB = () => {
        //Toggling the visibility state of the filter modal
        setLBVisible(!lbVisible);
    };

    const onEndDateChange = (selectedValue) => {
        // if (event?.type == 'dismissed') {
        //     setShowEndDate(!showEndDate);
        //     return
        // }
        setShowEndDate(!showEndDate);
        setEndDate(selectedValue);
        getLeaveList(startDate, selectedValue)
    };

    const onCompansatoryDateChange = (selectedValue) => {

        let currentDate = new Date(selectedValue)

        if (currentDate.getDay() == 6 && currentDate.getDay() == 0) {
            ShowToast('Please select date other than weekends.')

        } else {

            setShowCompansatoryDate(!showCompansatoryDate)
            let arrayCopy = [...compansatoryLeaves]
            arrayCopy[selectedIndex] = { ...arrayCopy[selectedIndex], type: selectedValue }

            setCompansatoryLeaves(arrayCopy)
        }

    };

    const getLeaveList = (startDate, endDate) => {

        const allLeaveData = [];

        let sCurrentData = new Date(startDate)


        let i = 0;
        while (moment(sCurrentData).format('YYYY-MM-DD') <= moment(new Date(endDate)).format('YYYY-MM-DD')) {

            console.log("leaveType==>", leaveType)

            if (leaveType == 9) {

                allLeaveData.push({
                    ...fullDayTypeData,
                    id: i,
                    date: moment(sCurrentData).format('MMM, DD YYYY'),
                    day: moment(sCurrentData).format('dddd'),
                });

                i = i + 1;

            } else {
                if (sCurrentData.getDay() != 6 && sCurrentData.getDay() != 0) {

                    allLeaveData.push({
                        ...fullDayTypeData,
                        id: i,
                        date: moment(sCurrentData).format('MMM, DD YYYY'),
                        day: moment(sCurrentData).format('dddd'),
                    });



                    i = i + 1;
                }
            }

            sCurrentData.setDate(sCurrentData.getDate() + 1)

        }

        //console.log('data-=====>', allLeaveData)

        setNoOfDays(i)
        setLeaveData(allLeaveData);
    }


    const hideDatePicker = () => {
        setShowStartDate(false);
        setShowEndDate(false);
        setShowCompansatoryDate(false);
    }

    const hideTimePicker = () => {
        setShowStartTime(false)
        setShowEndTime(false)
    }

    const onStartTimeChange = (selectedValue) => {
        setShowStartTime(!showStartTime)

        // if (endTime != null && selectedValue.getTime() > endTime.getTime()) {
        //     ShowToast('Please select start time less than end time')
        // } else {
        //     setStartTime(selectedValue)
        //     onTimeSelection(selectedValue, 'start')
        // }

        // let selectedTime = convertLocalToUTC(selectedValue)
        //console.log(selectedTime);
        // console.log(selectedTime)
        setStartTime(moment(selectedValue).format('HH:mm'))
        setEndTime(null)
        //onTimeSelection(selectedValue, 'start')
        setNoOfHours(0)
        setNoOfMinutes(0)

    }

    const onEndTimeChange = (selectedValue) => {
        setShowEndTime(!showEndTime)

        //let selectedTime = convertLocalToUTC(selectedValue)
        //console.log(selectedTime);

        //let t1 = moment(showUTCToLocal(startTime), 'HH:mm')
        //let t2 = moment(showUTCToLocal(selectedTime), 'HH:mm')
        //  console.log(t1.isAfter(t2))

        let t1 = moment(startTime, 'HH:mm')
        let t2 = moment(selectedValue)

        if (startTime != null && t1.isAfter(t2)) {
            ShowToast('Please select end time greater than start time')
        } else {
            setEndTime(moment(selectedValue).format('HH:mm'))
            setNoOfHours(t2.diff(t1, 'hours'))
            setNoOfMinutes(t2.diff(t1, 'minutes'))
        }
    }




    const onTimeSelection = (value, type) => {

        let time1 = ''
        let time2 = ''
        let hours = 0


        if (type == 'start' && endTime != null) {
            time1 = moment(value, 'hh:mm:ss');
            time2 = moment(endTime, 'hh:mm:ss');
        } else if (type == 'end' && startTime != null) {
            time1 = moment(startTime, 'hh:mm:ss');
            time2 = moment(value, 'hh:mm:ss');
        }


        if (time1 != '' && time2 != '') {
            hours = time2.diff(time1, 'hours')
        }

        setNoOfHours(hours)
    }

    const onStartDateChange = (selectedValue) => {

        // Custom logic to check if the selected date is a weekend (Saturday or Sunday)
        const isWeekend = selectedValue.getDay() === 0 || selectedValue.getDay() === 6;

        if (isWeekend) {
            // If it's a weekend, prevent setting the selected date
            alert('Weekends are not selectable.');
        } else {
            // If it's not a weekend, set the selected date and hide the picker
            // if (event?.type == 'dismissed') {
            //     setShowStartDate(!showStartDate);
            //     return
            // }

            setShowStartDate(!showStartDate)
            setStartDate(selectedValue);
            setEndDate(selectedValue)
            getLeaveList(selectedValue, selectedValue)
        }
    }


    {/* Text Input View*/ }
    const TextInputView = ({ text, image, isSpinner, backgroundColor, textColor, fontFamily }) => {
        return (
            <View style={[styles.textInputViewContainer, { backgroundColor: backgroundColor }]}>

                <View style={styles.content}>
                    {/* <Image source={image} style={styles.textInputStartImage} /> */}
                    {image == 'rm' ? <UserIcon /> : image == 'map' ? <MapPinIcon /> : image == 'date' ? <CalendarDaysIcon /> : image == 'time' ? <CLOCKIMAGE /> : null}
                    <CustomText children={text} style={[styles.textInputTextStyle, { color: textColor, fontFamily: fontFamily }]} />
                </View>

                {isSpinner ?
                    <Image source={DOWN_ARROW} style={styles.textInputDropDownImage} /> : null
                }


            </View>
        )
    }



    {/*leaves Table Item*/ }
    const RenderLeaveTypeItem = ({ item, onPress, index }) => {


        return (

            <View style={[styles.leavesTableItemContainer, { justifyContent: 'space-between', borderBottomWidth: index < leaveData.length - 1 ? 1 : 0 }]}>

                <CustomText children={item.date} style={[styles.leaveTableDateItemText, { flex: 1 }]} />
                <CustomText children={item.day} style={[styles.leaveTableDayItemText, { flex: 1 }]} />

                <TouchableOpacity style={[styles.FullHalfDayLeaveItemContainer, { flex: 1 }]} onPress={onPress}>
                    <CustomText children={item.type} style={[styles.FullHalfDayLeaveItemText, { flex: 1 }]} />
                    <Image source={DOWN_ARROW} style={styles.fullHalfDayLeaveItemImage} />
                </TouchableOpacity>

            </View >
        )


    }

    {/*Compansatory leaves Table Item*/ }
    const RenderCompansatoryLeaveTypeItem = ({ item, onPress, index }) => {


        return (


            <View style={[styles.leavesTableItemContainer, { borderBottomWidth: index < leaveData.length - 1 ? 1 : 0, alignItems: 'center' }]}>

                <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox
                        style={{ alignSelf: 'center' }}
                        onClick={() => {
                            let arrayCopy = [...compansatoryLeaves]

                            arrayCopy.map((itemItem, itemIndex) => {


                                if (itemIndex != index) {
                                    itemItem.isSelected = false
                                }


                            })

                            arrayCopy[index] = { ...arrayCopy[index], isSelected: !item.isSelected }
                            SelectedComOffId = item.id

                            setCompansatoryLeaves(arrayCopy)
                            setNoOfDays(1)
                        }}
                        uncheckedCheckBoxColor={GREY}
                        checkedCheckBoxColor={LIGHT_BLUE}
                        isChecked={item.isSelected}

                    />

                    <CustomText children={item.date} style={[styles.leaveTableDateItemText]} />

                </View>
                <CustomText children={item.day} style={[styles.leaveTableDayItemText, { width: '20%' }]} />

                <View style={[styles.FullHalfDayLeaveItemContainer, { width: '45%' }]} >

                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onPress}>
                        <CustomText children={item.type == 'Select Date' ? item.type : moment('' + item.type).format('MMM,DD YYYY')} style={styles.FullHalfDayLeaveItemText} />
                        <Image source={DOWN_ARROW} style={styles.fullHalfDayLeaveItemImage} />
                    </TouchableOpacity>
                    {/* <TRASHIMAGE /> */}
                </View>



            </View >
        )


    }


    {/*leaves Table */ }
    const MultipleLeaveSelectionView = () => {

        return (
            <View style={styles.leaveTableContainer}>
                <FlatList
                    ListHeaderComponent={
                        <View style={[styles.leaveTableColumnHeadingContainer, { justifyContent: 'space-between' }]}>

                            <CustomText children={'Date'} style={[styles.leaveTableColumnHeading, { flex: 1 }]} />
                            <CustomText children={'Day'} style={[styles.leaveTableColumnHeading, { flex: 1 }]} />
                            <CustomText children={'Type'} style={[styles.leaveTableColumnHeading, { flex: 1 }]} />

                        </View>
                    }
                    data={leaveData}
                    renderItem={({ item, index }) => <RenderLeaveTypeItem item={item} index={index} onPress={() => {
                        selectedDate = item?.date
                        selectedDay = item?.day
                        selectedIndex = index
                        selectedType = item?.selectedTypeId
                        if (leaveTypeData.length == 0) {
                            GET_LEAVE_TYPE_DATA()
                        } else {
                            setVisible(!visible)
                        }
                    }} />}
                    keyExtractor={item => item.id}

                />


            </View>

        )

    }



    {/*Compansatory List*/ }
    const CompansatoryList = () => {

        return (
            <View style={styles.leaveTableContainer}>
                <FlatList
                    ListHeaderComponent={
                        <View style={styles.leaveTableColumnHeadingContainer}>
                            <CustomText children={'Date'} style={[styles.leaveTableColumnHeading, { width: '40%' }]} />
                            <CustomText children={'Day'} style={[styles.leaveTableColumnHeading, { width: '20%' }]} />
                            <CustomText children={'Type'} style={[styles.leaveTableColumnHeading, { width: '45%' }]} />

                        </View>
                    }
                    data={compansatoryLeaves}
                    ListEmptyComponent={<View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 10
                    }}>
                        <CustomText children={'No Compansatory Leaves Found'} style={{ alignSelf: 'center', fontFamily: FontName.Gordita_Regular }} />
                    </View>}
                    renderItem={({ item, index }) => <RenderCompansatoryLeaveTypeItem item={item} index={index} onPress={() => {
                        // selectedDate = item?.date
                        // selectedDay = item?.day
                        selectedIndex = index
                        setShowCompansatoryDate(!showCompansatoryDate);


                        // selectedType = item?.selectedTypeId
                        // if (leaveTypeData.length == 0) {
                        //     GET_LEAVE_TYPE_DATA()
                        // } else {
                        //     setVisible(!visible)
                        // }
                    }} />}
                    keyExtractor={item => item.id}

                />


            </View>

        )

    }


    async function GET_LEAVE_TYPE_DATA() {
        const apiData = await makeApiRequest({ url: GET_LEAVE_SLOT_TYPE, method: 'GET', isToken: true });
        if (apiData?.status == true) {
            setLeaveTypeData(filterLeaveSlotTypeData(apiData?.data))

        } else {
            console.log("PROFILE API ERROR: ", apiData)
        }
    }

    async function GET_COMPANSATORY_LIST() {
        const apiData = await makeApiRequest({ url: GET_COMPANSATORY_TYPE_LIST, method: 'GET', isToken: true });
        if (apiData?.status == true) {
            //console.log(apiData);
            setCompansatoryLeaves(filterCompansatoryLeaves(apiData?.data))
        } else {
            console.log("PROFILE API ERROR: ", apiData)
        }
    }

    async function HOLIDAY_LIST_API() {
        const apiData = await makeApiRequest({ url: HOLIDAY_LIST, method: 'GET', isToken: true });
        if (apiData?.status == true) {
            console.log('holiday list are--->', apiData?.data)
            setOPHolidays(filterOptionalHolidayData(apiData?.data?.optional))

        } else {
            console.log("API ERROR: ", apiData)
        }
    }



    {/* Leave type data Object Conversion */ }
    const filterOptionalHolidayData = (list) => {
        let leaveData = []
        list?.map(item => {


            var currentDate = new Date()
            //console.log('date is =====>', currentDate)

            var holidayDate = moment(item?.date, 'yyyy-MM-DD')
            // console.log(item?.date)


            //  console.log('holidayDate--->', moment(item?.date, 'yyyy-MM-DD'), '  currentDate==>', new Date('2024-03-09'), '   status==>', moment(item?.date, 'yyyy-MM-DD').isAfter(new Date('2024-03-09')))


            if (holidayDate.isAfter(currentDate)) {

                leaveData.push({
                    label: item?.name + ' - ' + moment(item?.date, 'yyyy-MM-DD').format('DD-MM-yyyy'),
                    value: item?.date,
                    id: item?.id
                })
            }

        })



        // console.log('leaveData =====>', leaveData)

        return leaveData

    }



    {/* leave Balance Table */ }
    const LeaveBalanceContainer = ({ text, image, backgroundColor }) => {
        return (

            <TouchableOpacity
                onPress={() => setLBVisible(!lbVisible)}
                style={[styles.leaveBalanceTableContainer, { backgroundColor: backgroundColor }]}>

                <View style={styles.leaveBalanceContent}>
                    {/* <Image source={image} style={styles.leaveBalanceTableImage} /> */}
                    <CalendarClockBlue />
                    <CustomText children={text} style={styles.leaveBalanceTableText} />
                </View>
                <View style={styles.leaveBalanceTableArrow}>
                    <RIGHTARROWORANGE />
                </View>
            </TouchableOpacity>
        )
    }

    {/* Validation On submit Leave */ }
    const validateForm = () => {
        let isCompOff = false

        let isDateNotSelected = false

        for (var i = 0; i < compansatoryLeaves.length; i++) {
            if (!compansatoryLeaves[i].isSelected) {
                isCompOff = true;
            } else {
                isCompOff = false
                if (compansatoryLeaves[i].type == 'Select Date') {
                    isDateNotSelected = true
                }
                break;
            }
        }

        if (leaveType == -1) {
            ShowToast('Please select leave type.')
            return false
        }

        if (leaveType == 6 && isCompOff == true) {
            ShowToast('Please select CompOff Date.')
            return false
        }

        if (leaveType == 6 && isDateNotSelected == true) {
            ShowToast('Please select CompOff Leave Date.')
            return false
        }

        if (leaveType == 7 && startTime == null) {
            ShowToast('Please select start time.')
            return false
        }

        if (leaveType == 7 && endTime == null) {
            ShowToast('Please select end time.')
            return false
        }

        if (leaveType == 8 && selectedOptionalLeave == null) {
            ShowToast('Please select optional holiday.')
            return false
        }

        if (noOfMinutes > 120) {
            ShowToast('Time must be less than 120 minutes.')
            return false
        }

        if (reason == '') {
            ShowToast('Please enter reason.')
            return false
        }

        if (noOfDays == 0) {
            ShowToast('Please select leave date.')
            return false
        }


        return true;

    };


    {/* User Search Api */ }
    async function SUBMIT_NEW_LEAVE(status) {
        let leaveDays = []
        let body = {}

        if (leaveType == 6) {

            compansatoryLeaves.map(item => {

                if (item.isSelected) {
                    leaveDays.push(
                        {
                            leave_date: moment(item.type, 'MMM, DD YYYY').format('YYYY-MM-DD'),
                            day: item.day,
                            type: "1",
                            dedcutedleave: 1.0

                        }
                    )

                    body = {
                        appliedleaveId: 0,
                        attendance_approval_type: '0',
                        user_id: loginUserData?.user_id,
                        rm_user_id: managerDetails.user_id,//loginUserData?.reporting_manager_id,
                        leave_type_id: leaveType,
                        no_of_days: noOfDays,
                        fromdate: moment(item.type, 'MMM, DD YYYY').format('YYYY-MM-DD'),
                        todate: moment(item.type, 'MMM, DD YYYY').format('YYYY-MM-DD'),
                        compo_id: SelectedComOffId,
                        reason: reason,
                        status: status,
                        attendance_approval_type: 0,
                        leavedays: leaveDays
                    }
                }


            })



        } else if (leaveType == 7) {

            leaveDays.push(
                {
                    leave_date: moment(startDate).format('YYYY-MM-DD'),
                    day: moment(startDate).format('dddd'),
                    type: "1",
                    dedcutedleave: 1.0

                }
            )

            body = {
                appliedleaveId: isEdit ? editData?.leave_id : 0,
                user_id: loginUserData?.user_id,
                attendance_approval_type: '0',
                rm_user_id: managerDetails.user_id,
                leave_type_id: leaveType,
                no_of_days: noOfDays,
                fromdate: moment(startDate).format('YYYY-MM-DD'),
                todate: moment(endDate).format('YYYY-MM-DD'),
                start_time: moment(startTime, 'HH:mm').format(),
                end_time: moment(endTime, 'HH:mm').format(),
                reason: reason,
                status: status,
                attendance_approval_type: 0,
                leavedays: leaveDays
            }

        } else if (leaveType == 8) {
            leaveDays.push(
                {
                    leave_date: selectedOptionalLeave?.value,
                    day: moment(selectedOptionalLeave?.value).format('dddd'),
                    type: "1",
                    dedcutedleave: 1.0

                }
            )

            body = {
                appliedleaveId: 0,
                user_id: loginUserData?.user_id,
                attendance_approval_type: '0',
                rm_user_id: managerDetails.user_id,
                leave_type_id: leaveType,
                no_of_days: noOfDays,
                fromdate: moment(selectedOptionalLeave?.value).format('YYYY-MM-DD'),
                todate: moment(selectedOptionalLeave?.value).format('YYYY-MM-DD'),
                reason: reason,
                status: status,
                attendance_approval_type: 0,
                leavedays: leaveDays
            }
        } else {

            leaveData.map(item => {

                leaveDays.push(
                    {
                        leave_date: moment(item.date, 'MMM, DD YYYY').format('YYYY-MM-DD'),
                        day: item.day,
                        type: item.selectedTypeId,
                        dedcutedleave: item.deducted_leave

                    }
                )
            })

            body = {
                appliedleaveId: isEdit ? editData?.leave_id : 0,
                user_id: loginUserData?.user_id,
                attendance_approval_type: '0',
                rm_user_id: managerDetails.user_id,
                leave_type_id: leaveType,
                no_of_days: noOfDays,
                fromdate: moment(startDate).format('YYYY-MM-DD'),
                todate: moment(endDate).format('YYYY-MM-DD'),
                reason: reason,
                status: status,
                attendance_approval_type: 0,
                leavedays: leaveDays
            }
        }






        //console.log('body-------->', body);
        //return
        const apiData = await makeApiRequest({ url: NEW_LEAVE_REQUEST, method: 'POST', isToken: true, data: body, showProgress: true });

        if (apiData?.status == true) {
            ShowToast(status == 0 ? isEdit ? 'Leave Updated SuccessFully' : 'Leave Saved SuccessFully' : 'Leave Submitted SuccessFully')
            selectedDate = ""
            selectedDay = ""
            selectedIndex = 0
            selectedType = -1
            selectedOptionalLeave = null
            setReason('')

            setLeaveData([])
            navigation.goBack()


        } else {
            console.log("PROFILE API ERROR: ", apiData?.message)
            ShowToast(`${apiData?.message}`)

        }
    }



    return (
        <SafeAreaView style={styles.container}>
            <MeetingHomeHeader headerText={'New Leave'} handleBackPress={() => {
                selectedDate = ""
                selectedDay = ""
                selectedIndex = 0
                selectedType = -1
                setReason('')
                selectedOptionalLeave = null
                setLeaveData([])
                navigation.goBack()
            }} />

            <KeyboardAwareScrollView enableOnAndroid keyboardShouldPersistTaps={'handled'} style={{}}>

                <DropdownComponent enabled={isEdit == true && leaveType == 7} selectedValue={leaveTypeName} data={leavesTypes} onSelection={(value) => {
                    setLeaveType(value)
                    selectedOptionalLeave = null
                    //console.log(value)
                    if (value == 6) {
                        GET_COMPANSATORY_LIST()
                    } else if (value == 7) {
                        setStartDate(new Date())
                        setEndDate(new Date())
                    } else if (value == 8) {
                        HOLIDAY_LIST_API()
                    } else if (value == 9) {
                        setLeaveData([{
                            ...fullDayTypeData,
                            id: 1,
                            date: moment(new Date()).format('MMM, DD YYYY'),
                            day: moment(new Date()).format('dddd'),
                        }])

                        setNoOfDays(1)

                        setStartDate(new Date())
                        setEndDate(new Date())
                    } else {
                        if (new Date().getDay() != 6 && new Date().getDay() != 7) {
                            setLeaveData([{
                                ...fullDayTypeData,
                                id: 1,
                                date: moment(new Date()).format('MMM, DD YYYY'),
                                day: moment(new Date()).format('dddd'),
                            }])

                            setNoOfDays(1)

                        } else {
                            setNoOfDays(0)
                        }

                        setStartDate(new Date())
                        setEndDate(new Date())
                    }
                }} />
                <TextInputView text={capitalizeFirstLetter(managerDetails.full_name)} image={'rm'} backgroundColor={BACKGROUND_COLOR_LEAVE} isSpinner={false} textColor={INACTIVE_COLOR} fontFamily={FontName.Gordita_Medium} />

                <TextInputView text={capitalizeFirstLetter(loginUserData?.Location?.location_name)} image={'map'} backgroundColor={BACKGROUND_COLOR_LEAVE} isSpinner={false} textColor={INACTIVE_COLOR} fontFamily={FontName.Gordita_Medium} />


                {/* Select Date View */}
                {leaveType != 6 && leaveType != 8 ? <View style={styles.selectDatesContainer}>


                    <TouchableOpacity style={styles.startDateView} onPress={() => {
                        setShowStartDate(!showStartDate)
                    }

                    }>
                        <TextInputView text={moment('' + startDate).format('MMM,DD YYYY')} image={'date'} backgroundColor={WHITE} isSpinner={false} textColor={BLACK} fontFamily={FontName.Gordita_Regular} />
                    </TouchableOpacity>
                    <View style={{ marginTop: 15, alignSelf: 'center' }} >
                        <DateSeprator />
                    </View>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        if (leaveType != 7) {
                            setShowEndDate(!showEndDate)
                        }
                    }}>
                        <TextInputView text={moment('' + endDate).format('MMM,DD YYYY')} image={'date'} backgroundColor={WHITE} isSpinner={false} textColor={BLACK} fontFamily={FontName.Gordita_Regular} />
                    </TouchableOpacity>
                    <View style={styles.numberOfDaysView}>
                        <CustomText children={noOfDays} style={styles.numberOfDaysText} />
                        <CustomText children={DAYS} style={styles.daysText} />
                    </View>

                </View> : null}


                {/* Select Time View */}
                {leaveType == 7 ? <View style={styles.selectTimesContainer}>

                    <TouchableOpacity style={styles.startDateView} onPress={() => {
                        setShowStartTime(!showStartTime)
                    }

                    }>
                        <TextInputView text={startTime == null ? 'Start time' : startTime} image={'time'} backgroundColor={WHITE} isSpinner={false} textColor={BLACK} fontFamily={FontName.Gordita_Regular} />
                    </TouchableOpacity>
                    <View style={{ marginTop: 15, alignSelf: 'center' }} >
                        <DateSeprator />
                    </View>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        setShowEndTime(!showEndTime)
                    }}>
                        <TextInputView text={endTime == null ? 'End Time' : endTime} image={'time'} backgroundColor={WHITE} isSpinner={false} textColor={BLACK} fontFamily={FontName.Gordita_Regular} />
                    </TouchableOpacity>
                    <View style={styles.numberOfDaysView}>
                        <CustomText children={`${('0' + Math.floor(noOfMinutes / 60)).slice(-2)} : ${('0' + noOfMinutes % 60).slice(-2)}`} style={styles.numberOfDaysText} />
                        <CustomText children={HOURS} style={styles.daysText} />
                    </View>

                </View> : null}


                {leaveType != 7 && leaveType != 6 && leaveType != 8 && leaveType != 9 ? <MultipleLeaveSelectionView /> : null}

                {leaveType == 6 ? <CompansatoryList /> : null}

                {leaveType == 8 ? <DropdownComponent enabled={isEdit == true && leaveType == 7} selectedValue={optionalHoliday} data={opholidays} onSelection={(value) => {

                    var data = null

                    opholidays.map(item => {
                        if (item.id == value) {
                            data = item
                        }
                    })

                    setNoOfDays(1)


                    selectedOptionalLeave = data

                    //console.log(selectedOptionalLeave)

                }} /> : null}


                {/* <MultiLineTextInputView image={ALIGN_LEFT} defaultValue={reason} /> */}

                <View style={[styles.textInputViewContainer, { backgroundColor: WHITE }]}>

                    <View style={styles.inputTextcontent}>
                        {/* <Image source={image} style={styles.multiLineInputTextStartImage} /> */}
                        <View style={styles.multiLineInputTextStartImage}>
                            <AlignLeftIcon />
                        </View>
                        <CustomTextInput
                            style={[styles.multiLineInputText, { marginTop: Platform.OS == 'ios' ? widthPercentageToDP(1) : widthPercentageToDP(-2) }]}
                            onChangeText={onChange}
                            value={reason}
                            multiline={true}
                            placeholder='Reason'
                            underlineColor='white'
                            numberOfLines={5}
                            placeholderTextColor={'#00000035'}
                        />
                    </View>

                </View>



                <LeaveBalanceContainer text={'Leave Balance'} backgroundColor={SELECTED_INNER_COLOR} />

                {/* Submit Button */}
                <CustomButton title={isEdit ? 'Update' : 'Submit'} style={styles.submitButtonStyle} textStyle={styles.submitButtonTextStyle} onPress={() => {
                    if (validateForm()) {
                        setCancelvisible(!cancelvisible)
                    }

                }} />

                {/* Save And Cancel Button */}

                {!isEdit &&
                    <View style={{ flexDirection: 'row', paddingBottom: heightPercentageToDP(6) }}>
                        <CustomButton title={'Save as draft'} style={styles.saveCancelButtonStyle} textStyle={styles.saveCancelButtonTextStyle} onPress={() => {
                            if (validateForm()) {
                                SUBMIT_NEW_LEAVE(0);
                            }

                        }} />
                        <CustomButton title={'Cancel'} style={styles.saveCancelButtonStyle} textStyle={styles.saveCancelButtonTextStyle} onPress={() => {
                            selectedDate = ""
                            selectedDay = ""
                            selectedIndex = 0
                            selectedType = -1
                            selectedOptionalLeave = null
                            setReason('')

                            setLeaveData([])
                            navigation.goBack()
                        }} />
                    </View>
                }


            </KeyboardAwareScrollView>


            <LeaveTypeModal
                visible={visible}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}
                data={leaveTypeData}
                onPress={(values) => {
                    if (values != null) {
                        let arrayCopy = [...leaveData];
                        arrayCopy[selectedIndex] = { ...arrayCopy[selectedIndex], selectedTypeId: values?.id, type: values?.name, deducted_leave: values?.deducted_leave };

                        setLeaveData(arrayCopy)
                    }
                    toggleBottomNavigationView()
                }}
                selectedDate={selectedDate}
                selectedDay={selectedDay}
                selectedTypeId={selectedType}

            />


            <LeaveBalanceModal
                visible={lbVisible}
                onBackButtonPress={toggleBottomNavigationViewLB}
                onBackdropPress={toggleBottomNavigationViewLB}
                data={leaveBalanceData}
                onPress={toggleBottomNavigationViewLB}

            />

            {
                showStartDate && (
                    // <DateTimePicker
                    //     testID="dateTimePicker"
                    //     value={startDate}
                    //     mode='date'
                    //     is24Hour={true}
                    //     display="default"
                    //     onChange={onStartDateChange}
                    //     minimumDate={new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate())}
                    // />

                    <DateTimePicker
                        isVisible={showStartDate}
                        mode="date"
                        date={new Date(startDate)}
                        onConfirm={onStartDateChange}
                        onCancel={hideDatePicker}

                        // onChange={onChange}
                        minimumDate={new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate())}
                    // isDarkModeEnabled={false}
                    />
                )
            }

            {
                showEndDate && (
                    // <DateTimePicker
                    //     testID="dateTimePicker1"
                    //     value={endDate}
                    //     mode='date'
                    //     is24Hour={true}
                    //     display="default"
                    //     onChange={onEndDateChange}
                    //     minimumDate={new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate())}
                    // />

                    <DateTimePicker
                        isVisible={showEndDate}
                        date={new Date(endDate)}
                        mode="date"
                        onConfirm={onEndDateChange}
                        onCancel={hideDatePicker}

                        // onChange={onChange}
                        minimumDate={new Date(startDate)}
                    // isDarkModeEnabled={false}
                    />
                )
            }


            {
                showCompansatoryDate && (


                    <DateTimePicker
                        isVisible={showCompansatoryDate}
                        mode="date"
                        onConfirm={onCompansatoryDateChange}
                        onCancel={hideDatePicker}
                        minimumDate={new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate())}
                    />
                )
            }


            {
                showStartTime && (
                    <DateTimePicker
                        isVisible={showStartTime}
                        mode="time"
                        //date={new Date(startTime)}
                        onConfirm={onStartTimeChange}
                        onCancel={hideTimePicker}
                        is24Hour={false}
                    />
                )
            }

            {
                showEndTime && (
                    <DateTimePicker
                        isVisible={showEndTime}
                        mode="time"
                        //date={new Date(endTime)}
                        onConfirm={onEndTimeChange}
                        onCancel={hideTimePicker}
                        is24Hour={false}
                    />
                )
            }


            {cancelvisible &&
                <TaskModal
                    isVisible={cancelvisible}
                    text={isEdit ? 'Are you sure you want to update this leave?' : 'Are you sure you want to submit this leave?'}
                    onPress={() => {
                        isEdit ? SUBMIT_NEW_LEAVE(editData?.status) : SUBMIT_NEW_LEAVE(1);
                        toggleBottomNavigationViewCancel()
                    }}
                    onCancel={toggleBottomNavigationViewCancel}
                    type={AppString.SUCESS}
                />

            }

            <AppLoader isLoading={loading} />

        </SafeAreaView >
    )


}


export default NewLeave;