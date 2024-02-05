import { SafeAreaView, Text, View, ScrollView, TextInput, TouchableOpacity, FlatList } from "react-native"
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
import Calendar from '../../../../../assets/images/SVG/calendar-days.svg'
import Clock from '../../../../../assets/images/SVG/Input-Affix.svg'
import Location from '../../../../../assets/images/SVG/map-pin.svg';
import User from '../../../../../assets/images/SVG/travelUser.svg'
import MoveLeft from '../../../../../assets/images/SVG/move_left.svg';
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import moment from "moment"
import AddCab from "../../addCabScreens/AddCabScreens"
import AddHotel from "../../addHotelScreens/AddhotelScreens"
import ClientMeeting from "../../../checkInMeeting/ClientMeeting"
import ClientMeetingScreen from "../../clientMeetingScreen/ClientMeetingScreen"
import { addstyles } from '../../../travelModule/addCabScreens/AddCabScreenStyle';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"
import { FontName } from "../../../../theme/Fonts"
import { FontSize } from "../../../settings/GlobalStyles"
import { moderateScale } from "react-native-size-matters"
function FlightBookingScreen() {

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

    const [isAddCabVisible, setIsAddCabVisible] = useState(false);
    const [isAddHotelVisible, setIsAddHotelVisible] = useState(false);
    const [isClientMeetingVisible, setIsClientMeetingVisible] = useState(false);

    const [addCapArr, setAddCapArr] = useState([])
    const [addAccommdoation, setAddAccommdoation] = useState([])
    const [clientArr, setClientArr] = useState([])


    const [sAddCap, setSAddCap] = useState(false);
    const [saddAccommodation, setSaddAccommodation] = useState(false);


    const handleAddHotelClose = () => {
        setIsAddHotelVisible(false);
    }

    const handleAddCabClose = () => {
        setIsAddCabVisible(false);
    }
    const handelAddAccommodation = (startDate, etartDate, noOfDays, dropLocation) => {

        const item = {
            "startDate": `${startDate}`,
            "etartDate": `${etartDate}`,
            "noOfDays": `${noOfDays}`,
            "dropLocation": `${dropLocation}`,
        };

        // Update the state to include the new dictionary
        setAddAccommdoation([...addAccommdoation, item]);
        setSaddAccommodation(true)

    }
    const handleAddCap = (pickLoction, dropLocation, date) => {

        const item = {
            "pickLocation": `${pickLoction}`,
            "dropLocation": `${dropLocation}`,
            "date": `${date}`,
        };

        // Update the state to include the new dictionary
        setClientArr([...addCapArr, item]);
        setSAddCap(true)


    }

    const handleClientMeetingClose = () => {
        setIsClientMeetingVisible(false);
    }

    const handleClientSelected = (client) => {

        const item = {
            "clientName": `${pickLoction}`,

        };
        setClientArr([...clientArr, item]);

    }

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
                            <TextInput style={styles.input} placeholder={'From'} placeholderTextColor={"#88898A"} />
                            <Swap />
                            <TextInput style={styles.input} placeholder={'To'} placeholderTextColor={"#88898A"} />
                        </View>
                        <View style={styles.verticalMargin} />
                        <TouchableOpacity style={[styles.input, { width: '100%', flexDirection: 'row', alignItems: 'center' }]} onPress={() => {
                            setStart(true)
                            setDatePicker(true)
                        }}>
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
                        {/* <View style={styles.verticalMargin} />
                        <TouchableOpacity style={[styles.input, { width: '100%', flexDirection: 'row', alignItems: 'center' }]} onPress={() => {
                            setStart(false)
                            setDatePicker(true)
                        }}>
                            <Calendar />
                            <Text style={styles.label}>{endDate}</Text>
                        </TouchableOpacity>
                        <View style={styles.verticalMargin} />
                        <TouchableOpacity style={[styles.input, { width: '100%', flexDirection: 'row', alignItems: 'center' }]} onPress={() => {
                            setStart(false)
                            setTimePicker(true)
                        }}>
                            <Clock />
                            <Text style={styles.label}>{endTime}</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.verticalMargin} />

                    <TouchableOpacity onPress={() => {

                        {
                            sAddCap === false && selectedIndex === 0 ? setIsAddCabVisible(true) : null
                        }


                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Add />
                            <CustomText style={styles.addLabel}>Add Cab</CustomText>
                        </View>
                    </TouchableOpacity>
                    {/* const handleAddCap = () => {
        onPressAddLocation */}

                    {isAddCabVisible ? <AddCab onPressAddLocation={handleAddCap} handleAddCabClose={handleAddCabClose} visible={isAddCabVisible} /> : ''}

                    <FlatList
                        data={addCapArr}
                        renderItem={capViewComponet}
                        keyExtractor={item => item.key}
                    />

                    <View style={styles.verticalMargin} />
                    <TouchableOpacity onPress={() => {
                        {
                            saddAccommodation === false && selectedIndex === 0 ? setIsAddHotelVisible(true) : null
                        }


                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Add />
                            <CustomText style={styles.addLabel}>Add Hotel Accommodation</CustomText>
                        </View>
                    </TouchableOpacity>

                    {isAddHotelVisible ? <AddHotel handleAddHotelClose={handleAddHotelClose} onPressAddHotel={handelAddAccommodation} visible={isAddHotelVisible} /> : ''}

                    <FlatList
                        data={addAccommdoation}
                        renderItem={addAccoummodationComponet}
                        keyExtractor={item => item.key}
                    />
                    <View style={styles.verticalMargin} />
                </View>

                <CustomText style={styles.heading}>Traveler's Info</CustomText>
                <View style={{ padding: 10, backgroundColor: WHITE, borderColor: LIGHTGREY, borderRadius: 4, elevation: 3, shadowColor: 'grey' }}>
                    <View style={styles.verticalMargin} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginLeft: '3%' }} />
                        <User stroke={GREY} style={{ marginRight: '-8%' }} />
                        <CustomTextInput style={[styles.input, { width: '100%', paddingLeft: '10%', alignSelf: 'center', }]} placeholder={'Employee ID'} />
                    </View>


                    <View style={styles.verticalMargin} />
                    <CustomIconButton title={'Add Traveller'} textStyle={styles.buttonText} />
                    <View style={styles.verticalMargin} />
                    <TouchableOpacity onPress={() => { setIsClientMeetingVisible(true) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Add />
                            <CustomText style={styles.addLabel}>Client Meeting</CustomText>
                        </View>
                    </TouchableOpacity>
                    {isClientMeetingVisible ? <ClientMeetingScreen handleClientMeetingClose={handleClientMeetingClose} onDonePress={handleClientSelected} visible={isClientMeetingVisible} /> : ''}

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


// {  Add Cap Componet with multipal and single }
const capViewComponet = ({ item }) => {
    return (
        <View style={{ marginTop: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <View style={{
                        flexDirection: 'row', borderWidth: 1, borderColor: '#D9D9D9', height: 40, alignItems: 'center',
                        marginVertical: 5, paddingLeft: 10
                    }}>
                        <Location />
                        <CustomText children={item.pickLocation} style={{ marginLeft: 15 }} />
                    </View>
                    <View style={{
                        flexDirection: 'row', borderWidth: 1, borderColor: '#D9D9D9', height: 40, alignItems: 'center',
                        marginVertical: 5, paddingLeft: 10
                    }}>
                        <Location />
                        <CustomText children={item.dropLocation} style={{ marginLeft: 15 }} />
                    </View>
                </View>
                <MoveLeft />
            </View>
            <View style={{
                flexDirection: 'row', borderWidth: 1, borderColor: '#D9D9D9', height: 40, alignItems: 'center',
                marginVertical: 5, paddingLeft: 10
            }}>
                <Calendar />
                <Text style={{
                    fontFamily: FontName.Gordita_Medium,
                    // fontSize: FontSize(14),
                    ineHeight: 24,
                    marginLeft: 10,
                    color: BLACK
                }}>{item.date}
                </Text>
            </View>

        </View>
    );
}

const addAccoummodationComponet = ({ item }) => {

    // const item = {
    //     "startDate": `${startDate}`,
    //     "etartDate": `${etartDate}`,
    //     "noOfDays": `${noOfDays}`,
    //     "dropLocation": `${dropLocation}`,
    // };

    return (
        <View style={{ marginTop: 15 }}>
            <View style={{ flexDirection: 'row', height: 45, marginTop: 10, }}>
                <View style={{
                    alignItems: 'center', flexDirection: 'row', borderColor: '#D9D9D9', borderWidth: 1, borderRadius: 2,
                    marginRight: 5, flex: 1, overflow: 'hidden', justifyContent: 'center'
                }}>
                    <View style={{ marginLeft: 3 }}>
                        <Calendar />
                    </View>
                    <Text style={styles.label}>{item.startDate}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Swap />
                </View>

                <View style={{
                    alignItems: 'center', flexDirection: 'row', borderColor: '#D9D9D9', borderWidth: 1, borderRadius: 2,
                    marginLeft: 5, flex: 1
                }}>
                    <View style={{ marginLeft: 3 }}>
                        <Calendar />
                    </View>
                    <Text style={styles.label}>{item.etartDate}</Text>
                </View>

            </View>
            <View style={styles.viewBottomStyle}>
                <Clock />
                <CustomText
                    children={item.noOfDays}

                    style={styles.textInputStyle}
                />
            </View>
            <View style={styles.viewBottomStyle}>
                <Location />
                <CustomText
                    children={item.dropLocation}

                    style={styles.textInputStyle}
                />
            </View>

        </View>
    );
}

export default FlightBookingScreen