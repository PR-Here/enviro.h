import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { widthPercentageToDP } from "react-native-responsive-screen";
import AlignLeftIcon from '../../../assets/images/SVG/align_left_icon.svg';
import CalendarDaysIcon from '../../../assets/images/SVG/calendar_days_icon.svg';
import DateSeprator from '../../../assets/images/SVG/date_seprator.svg';
import MapPinIcon from '../../../assets/images/SVG/map_pin_icon.svg';
import CLOCKIMAGE from '../../../assets/images/SVG/timesheetClock.svg';
import UserIcon from '../../../assets/images/SVG/user_icon.svg';
import CustomText from "../../component/atoms/CustomText";
import CustomTextInput from "../../component/atoms/CustomTextInput";
import MeetingHomeHeader from "../../component/header/MeetingHeader";
import { BLACK, PRIMARY_COLOR, WHITE } from "../../theme/Colors";
import { FontName, FontSize } from "../../theme/Fonts";

import moment from "moment";
import { useSelector } from "react-redux";
import CustomButton from "../../component/atoms/CustomButton";
import CustomToast from "../../component/atoms/CustomToast";
import TaskModal from "../../component/modal/TaskModal";
import useApiEffect from "../../hooks/useApiEffect";
import { CANCELLED_LEAVE, MANAGER_DETAILS, NEW_LEAVE_REQUEST } from "../../services/ApiEndPoint";
import AppString from "../../utils/AppString";

import { ShowToast, capitalizeFirstLetter, convertLocalToUTC, convertTimeToUTC, getLocalTimeZone, getTimeDuration, showUTCToLocal } from "../../utils/Constant";
import AppLoader from "../../utils/AppLoader";

const RequestRegularization = ({ navigation, route }) => {
    let editData = route?.params?.data
    let isEdit = editData?.Attendance_report_leave?.UserAppliedLeave?.leave_type_id == 0
    // console.log('editData', editData);

    const loginUserData = useSelector((state) => state?.auth?.loginUser);
    const reportingManager = loginUserData?.reporting_manager

    const { makeApiRequest, loading } = useApiEffect()

    const [showStartTime, setShowStartTime] = useState(false)
    const [showEndTime, setShowEndTime] = useState(false)
    const [cancelVisible, setCancelVisible] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    const [startTime, setStartTime] = useState(isEdit ? convertTimeToUTC(editData?.Attendance_report_leave?.UserAppliedLeave?.s_start_time) : null)
    const [endTime, setEndTime] = useState(isEdit ? convertTimeToUTC(editData?.Attendance_report_leave?.UserAppliedLeave?.s_end_time) : null)

    const [noOfHours, setNoOfHours] = useState(isEdit ? getTimeDuration(editData?.Attendance_report_leave != null ? editData?.Attendance_report_leave?.UserAppliedLeave?.s_start_time : null, editData?.Attendance_report_leave != null ? editData?.Attendance_report_leave?.UserAppliedLeave?.s_end_time : null) : '0')
    const [reason, setReason] = useState(isEdit ? editData?.Attendance_report_leave?.UserAppliedLeave?.reason : '');
    const [managerDetails, setManagerDetails] = useState([])

    useEffect(() => {
        ManagerDetails()
    }, [])

    async function ManagerDetails() {

        const apiData = await makeApiRequest({ url: MANAGER_DETAILS, method: 'GET', isToken: true });

        if (apiData?.status == true) {
            setManagerDetails(apiData?.data)
        }
    }

    const hideTimePicker = () => {
        setShowStartTime(false)
        setShowEndTime(false)
    }

    const onChange = (text) => {
        setReason(text)
    }

    const onStartTimeChange = (selectedValue) => {
        setShowStartTime(!showStartTime)
        console.log('selectedValue--->', selectedValue);

        //let selectedTime = convertLocalToUTC(selectedValue)
        //console.log('selectedTime--->', selectedTime);
        setStartTime(moment(selectedValue).format('HH:mm'))
        setEndTime(null)
        setNoOfHours(0)

    }

    const onEndTimeChange = (selectedValue) => {
        setShowEndTime(!showEndTime)
        console.log('selectedValue--->', selectedValue);
        // let selectedTime = convertLocalToUTC(selectedValue, getLocalTimeZone())
        // let t1 = moment(showUTCToLocal(startTime), 'HH:mm')
        // let t2 = moment(showUTCToLocal(selectedTime), 'HH:mm')

        let t1 = moment(startTime, 'HH:mm')
        let t2 = moment(selectedValue)

        if (startTime != null && t1.isAfter(t2)) {
            ShowToast('Please select end time greater than start time')
        } else {
            setEndTime(moment(selectedValue).format('HH:mm'))
            setNoOfHours(getTimeDuration(moment(startTime, 'HH:mm').format('HH:mm'), moment(selectedValue).format('HH:mm')))
        }
    }

    {/* Text Input View*/ }
    const TextInputView = ({ text, image, isSpinner, backgroundColor, textColor, fontFamily }) => {
        return (
            <View style={[styles.textInputViewContainer, { backgroundColor: backgroundColor }]}>
                {image == 'rm' ? <UserIcon /> : image == 'map' ? <MapPinIcon /> : image == 'date' ? <CalendarDaysIcon /> : image == 'time' ? <CLOCKIMAGE /> : null}
                <CustomText children={text} style={[styles.textInputTextStyle, { color: textColor, fontFamily: fontFamily }]} />
            </View>
        )
    }

    const DetailsViewTypes = ({ type, value }) => {
        return (<View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <CustomText children={type} style={styles.title} />
            <CustomText children={value} style={styles.detail} />
        </View>
        )
    }


    {/* Validation On submit Leave */ }
    const validateForm = () => {
        if (startTime == null) {
            ShowToast('Please select start time.')
            return false
        }
        if (endTime == null) {
            ShowToast('Please select end time.')
            return false
        }
        if (reason == '') {
            ShowToast('Please enter reason.')
            return false
        }
        return true;
    };


    {/* Get AttendanceRegularizationRequestAPI API */ }
    async function AttendanceRegularizationRequestAPI() {
        var body = {
            appliedleaveId: isEdit ? editData?.leave_id : 0,
            user_id: loginUserData?.user_id,
            rm_user_id: managerDetails?.user_id, //loginUserData?.reporting_manager_id,
            fromdate: moment(editData?.date).format('YYYY-MM-DD'),
            todate: moment(editData?.date).format('YYYY-MM-DD'),
            reason: reason,
            start_time: moment(startTime, 'HH:mm').format(),
            end_time: moment(endTime, 'HH:mm').format(),
            attendance_approval_type: 1,
            leave_type_id: 0,
            no_of_days: 1,
            status: 1,
            leavedays: [
                {
                    leave_date: moment(editData?.createdAt).format('YYYY-MM-DD'),
                    day: moment(editData?.createdAt).format('dddd'),
                    type: "1",
                    dedcutedleave: parseFloat(noOfHours) <= 4 ? 0.5 : 1.0
                }
            ]
        }
        console.log('body------------>', body);
        //return
        const apiData = await makeApiRequest({ url: NEW_LEAVE_REQUEST, method: 'POST', isToken: true, data: body });
        //console.log('response ------------------>', apiData);
        if (apiData?.status == true) {
            setShowPopup(true)
        }
    }

    {/* Get AttendanceRegularizationRequestAPI API */ }
    async function CancelRequest() {
        console.log('CancelRequest');
        var body = {
            id: editData?.Attendance_report_leave?.id,
            leave_id: editData?.Attendance_report_leave?.UserAppliedLeave?.leave_id,
        }
        console.log('body------------>', body);
        const apiData = await makeApiRequest({ url: CANCELLED_LEAVE, method: 'POST', isToken: true, data: body });
        console.log('response ------------------>', apiData);
        if (apiData?.status == true) {
            setShowPopup(true)
        } else {
            ShowToast(`${apiData?.message}`)
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <MeetingHomeHeader headerText={isEdit ? 'Regularization Details' : "Request Regularization"} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>
                <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={25}>
                    <View style={{ marginHorizontal: 20 }}>
                        <CustomText children={'Details : '} style={{ fontWeight: '500', fontSize: 16, fontFamily: FontName.Gordita_Medium }} />
                        <DetailsViewTypes type={'Reporting Mgr. (Ecode):'} value={`${capitalizeFirstLetter(managerDetails?.full_name)} (${capitalizeFirstLetter(managerDetails?.employee_code)})`} />
                        <DetailsViewTypes type={'Attendance Date:'} value={moment(editData?.date).format('Do-MMM-yyyy')} />
                        <DetailsViewTypes type={'Planned Shift:'} value={'Day'} />
                        <DetailsViewTypes type={'Work Location:'} value={`${capitalizeFirstLetter(loginUserData?.Location?.location_name)}`} />
                        <DetailsViewTypes type={'Shift In Time:'} value={'09:30'} />
                        <DetailsViewTypes type={'Shift Out Time:'} value={'18:30'} />
                    </View>

                    <View style={{ height: 1, backgroundColor: '#DEDEDE', marginTop: 25 }} />

                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 15, marginBottom: 5 }}>
                        <CustomText children={'Regularise Type:'} style={styles.title} />
                        <CustomText children={'Regularise Time'} style={styles.detail} />
                    </View>
                    <View style={styles.selectTimesContainer}>
                        <TouchableOpacity style={styles.startDateView}
                            activeOpacity={isEdit ? 1 : 0.7}
                            onPress={() => {
                                if (!isEdit)
                                    setShowStartTime(!showStartTime)
                            }}>
                            {/* <TextInputView text={startTime == null ? 'In Time' : isEdit ? convertTimeToUTC(startTime) : showUTCToLocal(startTime)} image={'time'} backgroundColor={WHITE} isSpinner={false} textColor={'#88898A'} fontFamily={FontName.Gordita_Regular} /> */}
                            <TextInputView text={startTime == null ? 'In Time' : startTime} image={'time'} backgroundColor={WHITE} isSpinner={false} textColor={'#88898A'} fontFamily={FontName.Gordita_Regular} />
                        </TouchableOpacity>
                        <View style={{ marginTop: 5 }} >
                            <DateSeprator />
                        </View>
                        <TouchableOpacity style={{ flex: 1 }}
                            activeOpacity={isEdit ? 1 : 0.7}
                            onPress={() => {
                                if (!isEdit) {
                                    if (startTime == null) {
                                        ShowToast('Please select start time')
                                        return
                                    }
                                    setShowEndTime(!showEndTime)
                                }
                            }}>
                            {/* <TextInputView text={endTime == null ? 'Out Time' : isEdit ? convertTimeToUTC(endTime) : showUTCToLocal(endTime)} image={'time'} backgroundColor={WHITE} isSpinner={false} textColor={'#88898A'} fontFamily={FontName.Gordita_Regular} /> */}
                            <TextInputView text={endTime == null ? 'Out Time' : endTime} image={'time'} backgroundColor={WHITE} isSpinner={false} textColor={'#88898A'} fontFamily={FontName.Gordita_Regular} />
                        </TouchableOpacity>
                        <View style={styles.numberOfDaysView}>
                            <CustomText children={noOfHours} style={styles.numberOfDaysText} />
                            <CustomText children={'Hours'} style={styles.daysText} />
                        </View>
                    </View>
                    <CustomText children={'HH:MM (24:00 hr. format)'} style={[styles.detail, { margin: 10 }]} />

                    <View style={[styles.textInputViewContainer, { backgroundColor: WHITE, marginTop: 5 }]}>

                        <View style={styles.inputTextcontent}>
                            <View style={styles.multiLineInputTextStartImage}>
                                <AlignLeftIcon />
                            </View>
                            <CustomTextInput
                                style={[styles.multiLineInputText, { marginTop: Platform.OS == 'ios' ? 0 : widthPercentageToDP(-2), marginLeft: 15 }]}
                                onChangeText={onChange}
                                value={reason}
                                editable={!isEdit}
                                multiline={true}
                                placeholder='Reason for regularization'
                                underlineColor='white'
                                numberOfLines={5}
                                placeholderTextColor={'#00000035'}
                            />
                        </View>

                    </View>

                    {/* Submit Button */}
                    <CustomButton title={isEdit ? 'Cancel Request' : 'Submit'} style={styles.submitButtonStyle} textStyle={styles.submitButtonTextStyle}
                        onPress={() => {
                            if (isEdit) {
                                setCancelVisible(true)
                            } else {
                                if (validateForm()) {
                                    setCancelVisible(true)
                                }
                            }
                        }} />

                    {/* Cancel Button */}
                    <CustomButton title={'Cancel'} style={styles.saveCancelButtonStyle} textStyle={styles.saveCancelButtonTextStyle}
                        onPress={() => navigation.goBack()} />
                </KeyboardAvoidingView>

            </ScrollView>
            {
                showStartTime && (
                    <DateTimePicker
                        isVisible={showStartTime}
                        mode="time"
                        onConfirm={onStartTimeChange}
                        onCancel={hideTimePicker}
                        is24Hour={false}
                        date={new Date(moment('09:30', 'HH:mm'))}
                    />
                )
            }

            {
                showEndTime && (
                    <DateTimePicker
                        isVisible={showEndTime}
                        mode="time"
                        onConfirm={onEndTimeChange}
                        onCancel={hideTimePicker}
                        is24Hour={false}
                        date={new Date(moment('18:30', 'HH:mm'))}
                    />
                )
            }

            <TaskModal
                isVisible={cancelVisible}
                text={`Are you sure you want to ${isEdit ? 'cancel' : 'submit'} this request?`}
                onPress={() => {
                    setCancelVisible(false)
                    if (isEdit) {
                        CancelRequest()
                    } else {
                        AttendanceRegularizationRequestAPI()
                    }
                }
                }
                onCancel={() => setCancelVisible(false)}
                type={isEdit ? AppString.CANCEL : AppString.SUCESS}
            />

            <CustomToast
                isVisible={showPopup}
                text={`Your Request has been ${isEdit ? 'Cancelled' : 'Submitted'}`}
                onPress={() => {
                    setShowPopup(false)
                    navigation.goBack()
                }}
                type={true}
            />
            <AppLoader isLoading={loading} />
        </View>

    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Medium,
        color: '#A09F9E',
        flex: 1
    },
    detail: {
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Regular,
        color: '#A09F9E',
        flex: 1
    },
    selectTimesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    startDateView: {
        flex: 1
    },
    numberOfDaysView: {
        alignSelf: 'center',
        marginTop: widthPercentageToDP(3),
        alignItems: 'center',
        marginEnd: widthPercentageToDP(2.5)
    },
    numberOfDaysText: {
        fontSize: FontSize(13),
        color: BLACK,
        fontFamily: FontName.Gordita_Medium
    },
    daysText: {
        fontSize: FontSize(14),
        color: '#00000035',
        fontFamily: FontName.Gordita_Regular
    },
    textInputViewContainer: {
        paddingHorizontal: widthPercentageToDP(1),
        paddingVertical: widthPercentageToDP(2.5),
        // justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: '#A0A2B2',
        alignItems: 'center',
        borderWidth: widthPercentageToDP(0.2),
        borderRadius: widthPercentageToDP(1),
        marginTop: widthPercentageToDP(2.5),
        marginHorizontal: widthPercentageToDP(2.5),
    },
    inputTextcontent: {
        flexDirection: 'row',
        paddingEnd: widthPercentageToDP(1),
        paddingStart: widthPercentageToDP(1),
        flex: 1,

    },
    multiLineInputTextStartImage: {

        marginTop: widthPercentageToDP(1)
    },
    multiLineInputText: {
        backgroundColor: WHITE,
        textAlignVertical: 'top',
        flex: 1,
        borderWidth: 0,
        color: BLACK,
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Regular,
        height: 'auto',
        minHeight: widthPercentageToDP(20),
        maxHeight: widthPercentageToDP(40),


    },
    textInputTextStyle: {
        fontSize: FontSize(13),
        color: '#A0A2B2',
        marginStart: widthPercentageToDP(1),
        alignSelf: 'center'
    },
    submitButtonStyle: {
        backgroundColor: PRIMARY_COLOR,
        alignSelf: 'center',
        marginTop: widthPercentageToDP(7),
        borderRadius: widthPercentageToDP(1.5),

    },
    submitButtonTextStyle: {
        color: WHITE,
        fontSize: FontSize(16),
        fontFamily: FontName.Gordita_Medium,
        width: '96%',
        textAlign: 'center',
    },
    saveCancelButtonStyle: {
        flex: 1,
        backgroundColor: WHITE,
        alignSelf: 'center',
        borderRadius: widthPercentageToDP(1),
        borderWidth: widthPercentageToDP(0.4),
        borderColor: PRIMARY_COLOR,
        marginTop: widthPercentageToDP(3),
        marginHorizontal: widthPercentageToDP(2)
    },
    saveCancelButtonTextStyle: {
        color: PRIMARY_COLOR,
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Medium
    },
});

export default RequestRegularization