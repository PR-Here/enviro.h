import { SafeAreaView, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native"
import styles from "./styles"
import CustomRadioButton from "../../../../component/atoms/CustomRadioButton"
import { useState } from "react"
import CustomTextInput from "../../../../component/atoms/CustomTextInput"
import Swap from '../../../../../assets/images/SVG/swap.svg'
import Add from '../../../../../assets/images/SVG/add-outlined.svg'
import { BLACK, GREEN, GREY, LIGHTGREY, WHITE } from "../../../../theme/Colors"
import CustomText from "../../../../component/atoms/CustomText"
import CustomButton from "../../../../component/atoms/CustomButton"
import CustomIconButton from "../../../../component/atoms/CustomIconButton"
import Calendar from '../../../../../assets/images/SVG/calendar-new.svg'
import Clock from '../../../../../assets/images/SVG/clock_event.svg'
import User from '../../../../../assets/images/SVG/user.svg'
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import moment from "moment"

function CabBookingScreen() {

    const tripChoices = ['Single Trip', 'Round Trip', 'Multicity']
    const [trip, setTrip] = useState(false)
    const [selectedIndex, setSelectdIndex] = useState(-1)
    const [datePicker, setDatePicker] = useState(false)
    const [timePicker, setTimePicker] = useState(false)
    const [startDate, setStartDate] = useState(moment().format("DD MMM ddd, YYYY"))
    const [endDate, setEndDate] = useState(moment().format("DD MMM ddd, YYYY"))
    const [startTime, setStartTime] = useState(moment().format('LT'))
    const [endTime, setEndTime] = useState(moment().format('LT'))
    const [start, setStart] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ padding: 10, backgroundColor: WHITE, borderWidth: 1, borderTopWidth: 0, borderColor: LIGHTGREY, borderBottomLeftRadius: 1, borderBottomRightRadius: 4 }}>
                    <View>
                        <View style={styles.verticalMargin} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {
                                tripChoices.map((element, index) => {
                                    return (
                                        <CustomRadioButton
                                            label={element}
                                            onToggle={() => {
                                                setSelectdIndex(index)
                                            }}
                                            radioChecked={index == selectedIndex ? true : false}
                                            labelStyle={styles.label}
                                        />
                                    )
                                })
                            }
                        </View>
                        <View style={styles.verticalMargin} />
                        <View style={styles.locationView}>
                            <TextInput style={styles.input} placeholder={'Delhi'} placeholderTextColor={BLACK} />
                            <Swap />
                            <TextInput style={styles.input} placeholder={'Mumbai'} placeholderTextColor={BLACK} />
                        </View>
                        <View style={styles.verticalMargin} />
                        <TouchableOpacity style={[styles.input, { width: '100%', flexDirection: 'row', alignItems: 'center' }]} onPress={() => {
                            setStart(true)
                            setDatePicker(true)
                        }} >
                            <Calendar />
                            <Text style={styles.label}>{startDate}</Text>

                        </TouchableOpacity>
                        <View style={styles.verticalMargin} />
                        <TouchableOpacity style={[styles.input, { width: '100%', flexDirection: 'row', alignItems: 'center' }]} onPress={() => {
                            setStart(true)
                            setTimePicker(true)
                        }}>
                            <Clock />
                            <Text style={styles.label}> {startTime}</Text>

                        </TouchableOpacity>
                        <View style={styles.verticalMargin} />
                        <TouchableOpacity style={[styles.input, { width: '100%', flexDirection: 'row', alignItems: 'center' }]} onPress={() => {
                            setStart(false)
                            setDatePicker(true)
                        }}  >
                            <Calendar />
                            <Text style={styles.label}>{endDate}</Text>
                        </TouchableOpacity>
                        <View style={styles.verticalMargin} />
                        <TouchableOpacity style={[styles.input, { width: '100%', flexDirection: 'row', alignItems: 'center' }]} onPress={() => {
                            setStart(false)
                            setTimePicker(true)
                        }} >
                            <Clock />
                            <Text style={styles.label}>{endTime}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.verticalMargin} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Add stroke={BLACK} />
                        <CustomText style={styles.addLabel}>Add Cab</CustomText>
                    </View>
                    <View style={styles.verticalMargin} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Add stroke={BLACK} />
                        <CustomText style={styles.addLabel}>Add Hotel Accommodation</CustomText>
                    </View>
                    <View style={styles.verticalMargin} />
                </View>


                <CustomText style={styles.heading}>Traveler's Info</CustomText>
                <View style={{ padding: 10, backgroundColor: WHITE, borderColor: LIGHTGREY, borderRadius: 4, elevation: 3, shadowColor: 'grey' }}>
                    <View style={styles.verticalMargin} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginLeft: '3%' }} />
                        <User style={{ marginRight: '-8%' }} />
                        <CustomTextInput style={[styles.input, { width: '100%', paddingLeft: '10%', alignSelf: 'center', }]} placeholder={'Employee ID'} />
                    </View>


                    <View style={styles.verticalMargin} />
                    <CustomIconButton title={'Add Traveller'} textStyle={styles.buttonText} />
                    <View style={styles.verticalMargin} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Add stroke={BLACK} />
                        <CustomText style={styles.addLabel}>Client Meeting</CustomText>
                    </View>
                    <View style={styles.verticalMargin} />
                </View>
                <View style={styles.verticalMargin} />
                <CustomButton style={styles.button} title={'Send Request'} textStyle={styles.reqButtonText} />
                <View style={styles.verticalMargin} />
                <CustomButton style={styles.outlinedButton} title={'Save Draft'} textStyle={styles.saveButtonText} />
                <View style={styles.verticalMargin} />
            </ScrollView>
            <DateTimePickerModal
                isVisible={timePicker}
                mode="time"
                date={new Date()}
                onConfirm={(date) => {
                    setTimePicker(false)
                    if (start) {
                        setStartTime(moment(date).format('LT'))
                    }
                    else {
                        setEndTime(moment(date).format('LT'))
                    }

                }}
                onCancel={() => {
                    setTimePicker(false)
                }}
            />
            <DateTimePickerModal
                isVisible={datePicker}
                mode="date"
                date={new Date()}
                onConfirm={(date) => {
                    setDatePicker(false)
                    if (start) {
                        setStartDate(moment(date).format('DD MMM ddd, YYYY'))
                    }
                    else {
                        setEndDate(moment(date).format('DD MMM ddd, YYYY'))
                    }

                }}
                onCancel={() => {
                    setDatePicker(false)
                }}
            />

        </SafeAreaView>
    )
}

export default CabBookingScreen