import { View, Text, Alert, Platform, Image } from "react-native";
import { RadioButton, Checkbox } from 'react-native-paper';
import { styles } from './Style';
import React, { useState } from "react";
import Header from '../../../component/header/Header';
import AppString from '../../../utils/AppString';
import CustomButton from "../../../component/atoms/CustomButton";
import CustomText from "../../../component/atoms/CustomText";
import CustomTextInput from "../../../component/atoms/CustomTextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ShowToast, formatDate } from "../../../utils/Constant";
import MultiSelectItemScreen from "../multiSelectItemTime/MultiSelectItemScreen";
import { CREATE_TIME_SHEET, DELETE_TIME_SHEET } from "../../../services/ApiEndPoint";
import useApiEffect from "../../../hooks/useApiEffect";
import { useNavigation } from '@react-navigation/native';
import Calendar from '../../../../assets/images/SVG/timeSheetCalendar.svg';
import Clock from '../../../../assets/images/SVG/timesheetClock.svg';
import User from '../../../../assets/images/SVG/timesheetUser.svg';
import Project from '../../../../assets/images/SVG/timesheetProject.svg';
import Task from '../../../../assets/images/SVG/timesheetTask.svg';
import UserTwin from '../../../../assets/images/SVG/timesheetUser2.svg';
import Bill from '../../../../assets/images/SVG/timesheetBill.svg';
import DescImg from '../../../../assets/images/SVG/timesheetDesc.svg';
import BlankCheckbox from '../../../../assets/images/SVG/check_box_wihite.svg';
import CHCheckbox from '../../../../assets/images/SVG/check_box_tick_wihite.svg';
import { BLACK, PRIMARY_COLOR } from "../../../theme/Colors";
import DropDownImg from '../../../../assets/images/SVG/timeSheetDropDown.svg';
import { useSelector } from 'react-redux';
import NavString from "../../../utils/NavString";
import CustomTimePicker from "./CustomTimePicker";
import AppLoader from "../../../utils/AppLoader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Warning from '../../../../assets/images/SVG/warning.svg'
import CustomAlertDialog from "../../../component/atoms/CustomAlertDialog";
import CCheckBox from 'react-native-check-box'

const AddTimeSheet = (selectedItem) => {
    const [isSelectedItem, setIsSelectedItem] = useState(selectedItem?.route?.params);

    var formattedDate = ""
    if (isSelectedItem) {
        const inputDate = isSelectedItem?.date;
        const dateParts = inputDate.split('-');
        formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    }

    const [checked, setChecked] = useState((isSelectedItem?.timesheet_type == 1) ? "present" :
        (isSelectedItem?.timesheet_type == 2) ? "leave" :
            (isSelectedItem?.timesheet_type == 3) ? "Idle" : 'present');

    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isLabelHeader, setIsLabelHeader] = useState({});

    const [startDate, setStartDate] = useState(formattedDate);
    const [modeStartDate, setModeStartDate] = useState('date');
    const [showStartDate, setShowStartDate] = useState(false);

    const [selectedHour, selectedMinute] = (isSelectedItem?.duration ?? '0:0').split(':').map(Number);
    const [startTime, setStartTime] = useState(selectedHour + ' Hours & ' + selectedMinute + ' Min');

    const [startTimeForAPI, setStartTimeForAPI] = useState(isSelectedItem?.duration ?? '0:0');

    const [modeTime, setModeTime] = useState('time');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectDataType, setSelectDataType] = useState(isSelectedItem?.timesheet_type ? isSelectedItem?.timesheet_type : 1);
    const [selectClient, setSelectClient] = useState(isSelectedItem?.Client);
    const [selectProject, setSelectProject] = useState(isSelectedItem?.Project);
    const [selectProjectTask, setSelectProjectTask] = useState(isSelectedItem?.Task);
    const [selectBilling, setSelectBilling] = useState(isSelectedItem);

    const [des, setDes] = useState(isSelectedItem?.description);
    const navigation = useNavigation()
    const { makeApiRequest, loading } = useApiEffect()
    state = {
        receivedData: '', // Initialize a state variable to hold received data
    };

    const [isDialogVisible, setDialogVisible] = useState(false);

    const showDialog = () => {
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    //Get the Profile Data Here
    const loginUserData = useSelector((state) => state?.auth?.loginUser);

    {/** Handle Client, Product, Task and Billing data select in List set state */ }
    const handleClose = (selectedData) => {
        if (selectedData?.selectedType == AppString.SELECT_CLIENT) {
            setSelectClient(selectedData)
        } else if (selectedData?.selectedType == AppString.SELECT_PROJECT) {
            setSelectProject(selectedData)
        } else if (selectedData?.selectedType == AppString.SELECT_TASK) {
            setSelectProjectTask(selectedData)
        } else if (selectedData?.selectedType == AppString.SELECT_BILLING_METHOD) {
            setSelectBilling(selectedData)
        }
        setIsAddVisible(false)
    }

    const showTimeMode = currentMode => {
        setShowDatePicker(true);
        setModeTime(currentMode);
    };
    const showTimepicker = () => {
        showTimeMode('time');
    };

    // set the selected date here
    const onChange = (event, selectedValue) => {
        setShowStartDate(Platform.OS === 'ios');
        if (modeStartDate == 'date') {
            setStartDate(formatDate(selectedValue));
        }
    };

    const showMode = currentMode => {
        setShowStartDate(true);
        setModeStartDate(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };

    // Handle the List according to fields type
    const handleBottomMethod = (titleText) => {
        if (titleText == AppString.SELECT_DATE) {
            if (isSelectedItem?.timesheet_id == null) {
                showDatepicker()
            }

        } else if (titleText == AppString.SELECT_DURATION) {
            showTimepicker()
        }
        else if (titleText == AppString.SELECT_CLIENT) {
            if (isSelectedItem?.timesheet_id == null) {
                setIsAddVisible(true)
                // Send data Bottom Sheet data of particular type
                setIsLabelHeader({ id: isSelectedItem?.client_id ? isSelectedItem?.client_id : "", title: titleText, typeOfPresent: selectDataType })
                setSelectProject(null)
                setSelectProjectTask(null)
            }
        }
        else if (titleText == AppString.SELECT_PROJECT) {
            if (selectClient != null) {
                if (isSelectedItem?.timesheet_id == null) {
                    setIsAddVisible(true)
                    // Send data Bottom Sheet data of particular type
                    setIsLabelHeader({ id: isSelectedItem?.client_id ? isSelectedItem?.client_id : selectClient?.id, title: titleText, typeOfPresent: selectDataType })
                    setSelectProjectTask(null)
                }
            } else {
                ShowToast("Please Select Client")
            }
        }
        else if (titleText == AppString.SELECT_TASK) {
            if (selectProject != null) {
                if (isSelectedItem?.timesheet_id == null) {
                    setIsAddVisible(true)
                    // Send data Bottom Sheet data of particular type
                    setIsLabelHeader({ id: isSelectedItem?.project_id ? isSelectedItem?.project_id : selectProject?.id, title: titleText, typeOfPresent: selectDataType })
                }
            } else {
                ShowToast("Please Select Project")
            }
        }
        else if (titleText == AppString.SELECT_BILLING_METHOD) {
            if (selectProjectTask != null) {
                setIsAddVisible(true)
                // Send data Bottom Sheet data of particular type
                setIsLabelHeader({ id: isSelectedItem?.task_id ? isSelectedItem?.task_id : "", title: titleText, typeOfPresent: selectDataType })
            } else {
                ShowToast("Please Select Task")
            }
        } else {
            console.log("error");
        }
    }

    const showTimePicker = () => {
        setShowDatePicker(true);
    };

    const hideTimePicker = () => {
        setShowDatePicker(false);
    };
    {/** handle Time Duraction Value send and set */ }
    const handleTimeConfirm = (hrs, mint) => {
        setStartTimeForAPI(hrs + ':' + mint.toString().padStart(2, '0'))
        setStartTime(hrs + ' Hours & ' + mint + ' Min')
        hideTimePicker();
    };

    const showDateTimePicker = () => {
        setShowStartDate(true);
    };

    const hideDatePicker = () => {
        setShowStartDate(false);
    };

    const handleConfirm = (date) => {
        setShowStartDate(Platform.OS === 'ios');
        if (modeStartDate == 'date') {
            setStartDate(formatDate(date));
        }
        hideDatePicker();
    };

    onDataReceived = (data) => {
        this.setState({ receivedData: data });
    };

    const hours = [];
    const minutes = [];

    // Populate the hours and minutes arrays with options
    for (let i = 0; i < 24; i++) {
        const hour = i.toString().padStart(2, '0');
        hours.push(hour);
    }

    for (let i = 0; i < 60; i++) {
        const minute = i.toString().padStart(2, '0');
        minutes.push(minute);
    }


    {/** Delete Alert Dialog */ }
    const deleteDialog = (selectedTimeSheetId) => {
        Alert.alert(
            AppString.APP_NAME,
            'Are you sure? you want to delete.',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'no',
                },
                { text: 'Yes', onPress: () => handleDelete(selectedTimeSheetId) },
            ]
        );
    }

    {/** Delete Alert Dialog */ }
    const deleteCancel = (selectedTimeSheetId) => {
        navigation.goBack();
    }

    {/**Handle Delete Api Method */ }
    const handleDelete = (selectedTimeSheetId) => {
        // setLoader(true)
        const data = {
            timesheet_id: selectedTimeSheetId
        }
        Delete_TIME_SHEET_API(data)
    }

    {/** Using Apis Method to delete timesheet list*/ }
    async function Delete_TIME_SHEET_API(data) {
        const apiData = await makeApiRequest({ url: DELETE_TIME_SHEET, method: 'POST', isToken: true, data: data });
        if (apiData?.status == true) {
            ShowToast(apiData?.message)
            navigation.navigate(NavString.TIMESHEET)
        } else {
            console.log("Delete Timesheet API ERROR: ", apiData)
        }
    }

    const RowDesign = ({ titleText, icon, onPress }) => {
        return (
            <>
                {(selectDataType !== 4) ?
                    <TouchableOpacity onPress={onPress}>
                        <View style={styles.viewRowStyle}>
                            {/** Icon set in view Particular title with icon  */}
                            <View style={styles.viewTextImageStyle}>
                                {icon === 'Calendar' ? <Calendar height={20} width={20} /> : (null)}
                                {icon === 'Clock' ? <Clock height={20} width={20} /> : (null)}
                                {icon === 'User' ? <User height={20} width={20} /> : (null)}
                                {icon === 'Project' ? <Project height={20} width={20} /> : (null)}
                                {icon === 'Task' ? <Task height={20} width={20} /> : (null)}
                                {icon === 'Bill' ? <Bill height={20} width={20} /> : (null)}
                                <CustomText children={titleText} style={styles.textStyle} />
                            </View>
                            <DropDownImg />
                        </View>
                    </TouchableOpacity>
                    : ""}
            </>
        )
    }

    //handle to submit button process
    const handleSubmit = () => {
        const client_id = Number(selectClient?.id != null ? selectClient?.id : isSelectedItem?.client_id);
        const project_id = (selectDataType === 1) ? Number(selectProject?.id != null ? selectProject?.id : isSelectedItem?.project_id) : Number(selectProject?.id != null ? selectProject?.id : isSelectedItem?.project_id)
        const task_id = (selectDataType === 1) ? Number(selectProjectTask?.id != null ? selectProjectTask?.id : isSelectedItem?.task_id) : Number(selectProjectTask?.id != null ? selectProjectTask?.id : isSelectedItem?.task_id)
        const billing_method = (selectDataType === 1) ? Number(selectBilling?.id != null ? selectBilling?.id : isSelectedItem?.billing_method) : Number(selectBilling?.id != null ? selectBilling?.id : isSelectedItem?.billing_method)

        if (!startDate && (selectDataType !== 4)) {
            ShowToast('Please Select Date.')
            return false
        } if (startTimeForAPI == '0:0' && (selectDataType !== 4)) {
            ShowToast('Please Select Duration.')
            return false
        } if (!client_id && (selectDataType !== 4)) {
            ShowToast('Please Select Client.')
            return false
        } if (!project_id && selectDataType == 1 && (selectDataType !== 4)) {
            ShowToast('Please Select Project.')
            return false
        } if (!task_id && selectDataType == 1 && (selectDataType !== 4)) {
            ShowToast('Please Select Task.')
            return false
        } if (!billing_method && selectDataType == 1 && (selectDataType !== 4)) {
            ShowToast('Please Select Billing Method.')
            return false
        } if (!des && (selectDataType !== 4)) {
            ShowToast('Please Enter Description.')
            return false
        }

        { (selectDataType === 4) ? CREATE_TIME_SHEET_CHECK_API() : CREATE_TIME_SHEET_API(client_id, project_id, task_id, billing_method) }
        return true;

    };

    {/** Using Apis Method and submit the data of timesheet form*/ }
    async function CREATE_TIME_SHEET_API(client_id, project_id, task_id, billing_method) {

        // // Split the input date into day, month, and year
        // const [day, month, year] = startDate.split("-");

        // // Create a new date object with the parts rearranged
        // const rearrangedDate = new Date(`${year}-${month}-${day}`);

        // // Format the date as "YYYY/MM/DD"
        // const formattedDate = `${rearrangedDate.getFullYear()}/${rearrangedDate.getMonth() + 1}/${rearrangedDate.getDate()}`;

        const formattedDate = moment(startDate, 'DD-MM-YYYY').format('YYYY/MM/DD');


        const payload = {
            date: formattedDate,
            duration: startTimeForAPI,
            client_id: client_id,
            timesheet_type: Number(selectDataType != null ? selectDataType : isSelectedItem?.timesheet_type),
            // timesheet_id: Number(isSelectedItem?.timesheet_id != null ? isSelectedItem?.timesheet_id : ""),
            description: des
        }
        if (isSelectedItem?.timesheet_id) {
            payload.timesheet_id = isSelectedItem?.timesheet_id
        }
        // Check if selectDataType is 1
        if (selectDataType == 1) {
            payload.project_id = project_id
            payload.task_id = task_id
            payload.billing_method = billing_method
        }
        const apiData = await makeApiRequest({ url: CREATE_TIME_SHEET, method: 'POST', isToken: true, data: payload });
        if (apiData?.status == true) {
            ShowToast(apiData?.message)
            // navigation.navigate(NavString.TIMESHEET)
            navigation.goBack()
        } else {
            ShowToast(apiData?.message)
            console.log("API ERROR: ", apiData)
        }
    }

    {/** Using Apis Method and submit the data of timesheet form*/ }
    async function CREATE_TIME_SHEET_CHECK_API() {
        const checkPayload = {
            checkbox_type: (selectDataType === 4)
        }

        const apiData = await makeApiRequest({ url: CREATE_TIME_SHEET, method: 'POST', isToken: true, data: checkPayload });
        if (apiData?.status == true) {
            ShowToast(apiData?.message)
            navigation.navigate(NavString.TIMESHEET, { update: true })
        } else {
            ShowToast(apiData?.message)
            console.log("API ERROR: ", apiData)
        }
    }

    return (

        <View style={styles.container}>
            <Header title={AppString.TIMESHEET} />
            <KeyboardAwareScrollView
                behavior={Platform.OS === 'ios' ? 'position' : 'undefined'}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}
                style={isSelectedItem?.timesheet_id != null ?
                    { marginBottom: heightPercentageToDP(14) } : { marginBottom: heightPercentageToDP(14) }}>

                <View style={{ paddingStart: 10, paddingEnd: 10 }}>
                    {/*Radio button handling*/}
                    {isSelectedItem?.timesheet_id == null ?
                        <View style={styles.radioGroupStyle}>
                            <View style={styles.radioButtonStyle}>
                                {<RadioButton.Android
                                    value="present"
                                    status={checked === 'present' ? 'checked' : 'unchecked'}
                                    onPress={() => { setChecked('present'), setSelectDataType(1), setSelectClient(null), setSelectProject(null), setSelectProjectTask(null), setSelectBilling(null) }}
                                    text={AppString.PRESENT}
                                    color={PRIMARY_COLOR}
                                />}
                                <Text style={styles.radioTextStyle}>{AppString.PRESENT}</Text>
                            </View>
                            <View style={styles.radioButtonStyle}>
                                <RadioButton.Android
                                    value="leave"
                                    status={checked === 'leave' ? 'checked' : 'unchecked'}
                                    onPress={() => { setChecked('leave'), setSelectDataType(2), setSelectClient(null), setSelectProject(null), setSelectProjectTask(null), setSelectBilling(null) }}
                                    color={PRIMARY_COLOR}
                                />
                                <Text style={styles.radioTextStyle}> {AppString.LEAVE}</Text>
                            </View>
                            <View style={styles.radioButtonStyle}>
                                <RadioButton.Android
                                    value="idle"
                                    status={checked === 'idle' ? 'checked' : 'unchecked'}
                                    onPress={() => { setChecked('idle'), setSelectDataType(3), setSelectClient(null), setSelectProject(null), setSelectProjectTask(null), setSelectBilling(null) }}
                                    color={PRIMARY_COLOR}
                                />
                                <Text style={styles.radioTextStyle}>{AppString.IDLE}</Text>
                            </View>
                            <View style={styles.radioButtonStyle}>
                                {Platform.OS === 'ios' ? (<CCheckBox
                                    style={{ padding: 5 }}
                                    onClick={() => { setChecked('Copy From Previous Date'), setSelectDataType(4), setSelectClient(null), setSelectProject(null), setSelectProjectTask(null), setSelectBilling(null) }}
                                    isChecked={checked === 'Copy From Previous Date' ? 'checked' : 'unchecked'}
                                    checkedImage={selectDataType == 4 ? <CHCheckbox width={30} height={30} /> : <BlankCheckbox width={30} height={30} />}

                                />) : (<Checkbox.Android
                                    value="Copy From Previous Date"
                                    status={checked === 'Copy From Previous Date' ? 'checked' : 'unchecked'}
                                    onPress={() => { setChecked('Copy From Previous Date'), setSelectDataType(4), setSelectClient(null), setSelectProject(null), setSelectProjectTask(null), setSelectBilling(null) }}
                                    color={PRIMARY_COLOR}
                                />)}

                                <CustomText children={"Copy From Previous Date"} style={[styles.radioTextStyle]} />
                                <TouchableOpacity onPress={() => { showDialog() }}>
                                    <Warning height={20} width={20} marginStart={10} />
                                </TouchableOpacity>

                            </View>
                            <CustomAlertDialog
                                visible={isDialogVisible}
                                onClose={hideDialog}
                                title=""
                                message={AppString.INFO_MSG}
                            />
                        </View> : <View />}

                    {/** Calendar Date Select */}
                    <RowDesign titleText={startDate ? startDate : AppString.SELECT_DATE}
                        icon={'Calendar'}
                        onPress={() => handleBottomMethod(AppString.SELECT_DATE)}
                    />
                    {showStartDate && (

                        <DateTimePicker
                            isVisible={showDateTimePicker}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            maximumDate={new Date()}
                            onChange={onChange}
                        />
                    )}

                    {/** Custom Time Sheet send and Select */}
                    <RowDesign titleText={startTime ? startTime : AppString.SELECT_DURATION}
                        icon={'Clock'} onPress={() => handleBottomMethod(AppString.SELECT_DURATION)} />
                    {showDatePicker &&
                        // <CustomTimePicker onConfrim={handleTimeConfirm} isTimePickerVisible={showDatePicker} onCancel={hideTimePicker} />
                        <CustomTimePicker onConfrim={handleTimeConfirm} isTimePickerVisible={showDatePicker} onCancel={hideTimePicker} editTime={startTimeForAPI ? startTimeForAPI : '0:0'} editMode={startTimeForAPI == '0:0' ? false : true} />
                    }
                    {/** Custom select item set Client name */}
                    <RowDesign titleText={selectClient?.name != null ? selectClient?.name : selectClient?.client_name != null ? selectClient?.client_name : AppString.SELECT_CLIENT}
                        icon={'User'} onPress={() => handleBottomMethod(AppString.SELECT_CLIENT)} />
                    {/** Custom select item set name */}
                    {checked == "present" ? (<RowDesign titleText={selectProject?.name != null ? selectProject?.name : selectProject?.project_name != null ? selectProject?.project_name : AppString.SELECT_PROJECT}
                        icon={'Project'} onPress={() => handleBottomMethod(AppString.SELECT_PROJECT)} />) : <View />}
                    {/** Custom select item set project name and handle leave and idle */}
                    {checked == "present" ? (<RowDesign titleText={selectProjectTask?.name != null ? selectProjectTask?.name : selectProjectTask?.task_name != null ? selectProjectTask?.task_name : AppString.SELECT_TASK}
                        icon={'Task'} onPress={() => handleBottomMethod(AppString.SELECT_TASK)} />) : <View />}

                    {isAddVisible ? <MultiSelectItemScreen visible={isAddVisible} handleClose={handleClose} isLabelHeader={isLabelHeader} /> : ''}
                    {/** Custom select item set full name and handle leave and idle */}
                    {checked == "present" && (selectDataType !== 4) ? (<View style={styles.viewTextStyle}>
                        <UserTwin height={20} width={20} />
                        <CustomText children={`${loginUserData?.reporting_manager?.first_name} ${loginUserData?.reporting_manager?.last_name}`} style={styles.textTStyle} />
                    </View>) : <View />}
                    {/** Custom select item set Billing name and handle leave and idle */}
                    {checked == "present" ? (<RowDesign titleText={selectBilling?.name != null ? selectBilling?.name : (isSelectedItem?.billing_method == 1) ? "Billing" :
                        (isSelectedItem?.billing_method == 2) ? "Non Billing" :
                            (isSelectedItem?.billing_method == 3) ? "Mockup" : AppString.SELECT_BILLING_METHOD}
                        icon={'Bill'} onPress={() => handleBottomMethod(AppString.SELECT_BILLING_METHOD)} />) : <View />}

                    {(selectDataType !== 4) ?
                        <View style={styles.viewTextDesStyle}>
                            <DescImg height={20} width={20} />
                            <CustomTextInput
                                onChangeText={(e) => setDes(e)}
                                value={des}
                                placeholder={'Description'}
                                multiline={true}
                                numberOfLines={5}
                                style={styles.inputTextStyle}
                            />
                        </View>
                        : <View />}
                </View>
            </KeyboardAwareScrollView>

            <View style={styles.bottomView}>
                {/*Submit button handling*/}
                <CustomButton
                    title={isSelectedItem?.timesheet_id != null ? AppString.UPDATE : AppString.SUBMIT}
                    onPress={() => handleSubmit()}
                    style={styles.buttonStyle} />
                {isSelectedItem?.timesheet_id != null ?
                    <CustomButton
                        title={AppString.DELETE}
                        textStyle={styles.textCancelColor}
                        onPress={() => deleteDialog(isSelectedItem?.timesheet_id)}
                        style={styles.buttonDeleteStyle} /> : <CustomButton
                        title={AppString.CANCEL}
                        textStyle={styles.textCancelColor}
                        onPress={() => deleteCancel(isSelectedItem?.timesheet_id)}
                        style={styles.buttonDeleteStyle} />}
            </View>

            <AppLoader isLoading={loading} />
        </View >
    );
}
export default AddTimeSheet;
