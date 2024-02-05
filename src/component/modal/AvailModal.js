import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";
import { BottomSheet } from 'react-native-btr';
import { BLACK, EXTRA_LIGHT_GREY, GREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors";
import { FontName, FontSize } from "../../theme/Fonts";
import moment from "moment";
import { useState } from 'react';
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Cross from '../../../assets/images/SVG/cros.svg';
import { ShowToast, convertLocalToUTC, showUTCToLocal } from "../../utils/Constant";
import CustomButton from "../atoms/CustomButton";
import TimeComponent from "../atoms/TimeComponent";
import WeeklyCalendar from "../molecules/WeeklyCalendar";
import CustomText from "../atoms/CustomText";

let start = true
const AvailModal = ({ visible, isAllDay, onBackButtonPress, onBackdropPress, onDone, meetingDate, bookedFrom, bookedTo }) => {

    const [selectedDate, setSelectedDate] = useState(meetingDate === undefined ? moment() : moment(meetingDate, 'dddd, D MMM YYYY').format('dddd DD MMM YYYY'))
    const [startTime, setStartTime] = useState(bookedFrom)
    const [endTime, setEndTime] = useState(bookedTo)

    //const [startTimeDateObj, setStartTimeDateObj] = useState(new Date())


    //const dateRef = useRef()

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);



    const handleDone = () => {
        if (startTime == 'Book from' && !isAllDay) {
            ShowToast('Please enter start time')
            return
        }
        let date = moment(selectedDate).format('DD/MM/YYYY')
        const startDateTime = moment(`${date} ${showUTCToLocal(startTime)}`, 'DD/MM/YYYY HH:mm');
        if (!isAllDay && startDateTime <= moment()) {
            ShowToast('Select start time must be greater then current time')
            return
        }
        if (endTime == 'Book to' && !isAllDay) {
            ShowToast('Please enter end time')
            return
        }
        const endDateTime = moment(`${date} ${showUTCToLocal(endTime)}`, 'DD/MM/YYYY HH:mm');
        //console.log('date ---------->', startDateTime, endDateTime);
        if (!isAllDay && startDateTime >= endDateTime) {
            ShowToast('End time must be greater then start time')
            return
        }
        if (isAllDay) {
            onDone(selectedDate, "00:00", "00:00");
        } else {
            onDone(selectedDate, startTime, endTime);
        }
        //onBackButtonPress()
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmStart = (date) => {
        setDatePickerVisibility(false);
        const time = convertLocalToUTC(date);
        setStartTime(time)
        setEndTime('Book to')
    };

    const handleConfirmEnd = (date) => {
        setDatePickerVisibility(false);
        const startDateTime = moment(`${moment(selectedDate).format('DD MMM YYYY')} ${showUTCToLocal(startTime)}`, 'DD MMM YYYY HH:mm');
        const endDateTime = moment(`${moment(selectedDate).format('DD MMM YYYY')} ${showUTCToLocal(convertLocalToUTC(date))}`, 'DD MMM YYYY HH:mm');

        if (startDateTime >= endDateTime) {
            setEndTime('Book to')
            ShowToast('End time must be greater then start time')
        } else {
            const time = convertLocalToUTC(date);
            setEndTime(time)
        }
        // if (moment(selectedDate).format('DD MMM YYYY') === moment().format('DD MMM YYYY')) {

        // } else {
        //     const time = convertLocalToUTC(date);
        //     setEndTime(time)
        // }
    };

    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={onBackButtonPress}
            onBackdropPress={onBackdropPress}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <CustomText style={styles.title} children={'Availability'} />
                    <TouchableOpacity
                        style={styles.close}
                        onPress={onBackButtonPress}
                    >
                        < Cross />
                    </TouchableOpacity>
                </View>
                <View style={styles.subContainer}>
                    <View style={styles.verticalMargin} />
                    <CustomText style={styles.label} children={'Select Date'} />
                    {/* <Text style={styles.dateText}>{moment(selectedDate).format('LL')}</Text> */}
                    <View style={{ height: heightPercentageToDP(10) }}>
                        <WeeklyCalendar
                            selectedDate={selectedDate}
                            onDateSelected={(e) => {
                                setSelectedDate(e)
                                // setStartTime(bookedFrom)
                                //setEndTime(bookedTo)
                            }}
                        />
                    </View>
                    <View style={styles.verticalMargin} />

                    {!isAllDay ? <View>
                        <CustomText style={styles.label} children={'Time'} />
                        <View style={styles.verticalMargin} />
                        <TimeComponent
                            //meridein={meridein}
                            onStartTime={() => {
                                start = true
                                setDatePickerVisibility(true);
                            }}
                            onEndTime={() => {
                                start = false
                                setDatePickerVisibility(true);
                            }}
                            startTime={startTime}
                            endTime={endTime}
                        />
                    </View> : null}
                    <View style={styles.verticalMargin} />
                    <View style={styles.verticalMargin} />
                    <CustomText style={styles.selDateText} children={moment(selectedDate).format('dddd, DD MMM YYYY')} />

                    {!isAllDay ?
                        <CustomText style={[styles.dateText, { textAlign: 'center', fontSize: FontSize(14) }]} children={`${showUTCToLocal(startTime)} - ${endTime == 'Book to' ? endTime : showUTCToLocal(endTime)}`} /> : null
                    }
                    <View style={styles.verticalMargin} />
                    <View style={styles.verticalMargin} />
                    <CustomButton title={'Done'} style={styles.button} onPress={handleDone} />
                </View>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                date={new Date()}
                onConfirm={start ? handleConfirmStart : handleConfirmEnd}
                onCancel={() => {
                    setDatePickerVisibility(false)
                }}
            />
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        width: '100%',
        backgroundColor: WHITE,
        borderTopLeftRadius: 38,
        borderTopRightRadius: 38
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: EXTRA_LIGHT_GREY,
        justifyContent: 'center',
        padding: 5
    },
    title: {
        fontSize: FontSize(16),
        fontWeight: '500',
        fontFamily: FontName.Gordita_Regular,
        color: BLACK,
        marginVertical: 10,
    },
    close: {
        tintColor: BLACK,
        position: 'absolute',
        right: '7%',
        width: 20,
        height: 20
    },
    subContainer: {
        margin: 10,
    },
    listHeading: {
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '500',
        color: GREY,
        lineHeight: 20
    },
    verticalMargin: {
        height: 10
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
        alignSelf: 'center',
        marginBottom: 20
    },
    dateText: {
        fontWeight: '500',
        fontSize: FontSize(16),
        fontFamily: FontName.Gordita_Regular,
        color: BLACK,
        lineHeight: 24
    },
    label: {
        fontWeight: '500',
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Regular,
        color: '#8F8F8F',
        marginBottom: heightPercentageToDP(1)
    },
    selDateText: {
        fontSize: FontSize(12),
        fontWeight: '400',
        fontFamily: FontName.Gordita_Regular,
        color: '#8F8F8F',
        textAlign: 'center'
    }
})

export default AvailModal