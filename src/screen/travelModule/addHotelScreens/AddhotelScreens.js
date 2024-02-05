import React, { useState, useRef, useEffect } from 'react';
import { Text, TouchableOpacity, View, SafeAreaView, FlatList, TouchableHighlight } from 'react-native';
import CustomTextInput from '../../../component/atoms/CustomTextInput';
import { styles } from './AddHotelStyles';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppString from '../../../utils/AppString';
import Cross from '../../../../assets/images/SVG/cros.svg';
import Location from '../../../../assets/images/SVG/map-pin.svg';
import Clock from '../../../../assets/images/SVG/clock.svg';
import Calendar from '../../../../assets/images/SVG/calendar_days.svg';
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import Swap from '../../../../assets/images/SVG/swap.svg';
import moment from 'moment';
import CustomButton from '../../../component/atoms/CustomButton';
import { BLACK, PRIMARY_COLOR, WHITE } from '../../../theme/Colors';
import CustomText from '../../../component/atoms/CustomText';
import { moderateScale } from 'react-native-size-matters';


const AddHotel = ({ visible, handleAddHotelClose, onPressAddHotel }) => {
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');
    const [startDate, setStartDate] = useState(moment().format("DD MMM ddd, YYYY"))
    const [etartDate, setEtartDate] = useState(moment().format("DD MMM ddd, YYYY"))
    const [datePicker, setDatePicker] = useState(false)
    const [start, setStart] = useState(false)
    const [endDate, setEndDate] = useState(false)
    const [noOfDays, setNoOfDays] = useState('')
    const [distance, setDistance] = useState(null)
    const [isBackgroundColor, setIsBackgroundColor] = useState();
    const refRBSheet = useRef();

    const distanceData = [
        {
            id: 1,
            title: '5 Km'
        },
        {
            id: 2,
            title: '10 Km'
        }, {
            id: 3,
            title: 'Anywhere'
        },
    ]

    // handle Days Function
    const handleItemClick = itemObj => {
        setDistance(itemObj?.title)
    };

    useEffect(() => {
        if (visible) {
            refRBSheet.current.open();
        }
    }, [visible]);

    const handelAddHotel = () => {
        onPressAddHotel(startDate, etartDate, noOfDays, dropLocation)
        handleAddHotelClose()
    }


    // View Days and Select Item Function
    const MyFilterDaysStepperItem = (itemDays) => {
        return (
            <TouchableHighlight
                underlayColor={PRIMARY_COLOR}
                activeOpacity={0.3}
                onPress={() => {
                    handleItemClick(itemDays?.item)
                    setIsBackgroundColor(itemDays?.item.id)
                }}
                style={[
                    styles.viewCellStyle,
                    itemDays?.item.id === isBackgroundColor
                        ? { backgroundColor: PRIMARY_COLOR }
                        : { backgroundColor: WHITE },
                ]}>
                <View>
                    <CustomText children={itemDays?.item.title} style={[styles.viewCellActiveStyle, { color: itemDays?.item.id === isBackgroundColor ? WHITE : BLACK }]} />
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={false}
            closeOnPressMask={false}
            onClose={handleAddHotelClose}
            height={370}
            openDuration={250}
            customStyles={{
                container: {
                    borderTopLeftRadius: 38,
                    borderTopRightRadius: 38,
                },
                wrapper: {
                    backgroundColor: '#00000070',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
            }}>
            <SafeAreaView style={styles.viewMainBottomStyle}>
                <View style={styles.header}>
                    <Text style={styles.DetailsTitle}> {AppString.DETAILS}</Text>
                    <TouchableOpacity style={styles.close} onPress={handleAddHotelClose}>
                        <Cross />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', height: 45, marginTop: 10 }}>
                    <View>
                        <TouchableOpacity style={{
                            alignItems: 'center', flexDirection: 'row',
                            borderColor: '#D9D9D9', borderWidth: 1,
                            flex: 1, marginLeft: 10, marginRight: 7,
                            width: moderateScale(150),
                            borderRadius: 2
                        }} onPress={() => {
                            setEndDate(false)
                            setStart(true)
                            setDatePicker(true)

                        }}>
                            <View style={{ marginLeft: 5 }}>
                                <Calendar />
                            </View>
                            <Text style={styles.label}>{startDate}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Swap />
                    </View>

                    <View style={{}}>
                        <TouchableOpacity style={{
                            alignItems: 'center', flexDirection: 'row',
                            borderColor: '#D9D9D9', borderWidth: 1,
                            flex: 1, marginRight: 17, marginLeft: 7,
                            width: moderateScale(150), borderRadius: 2

                        }} onPress={() => {

                            setStart(false)
                            setEndDate(true)
                            setDatePicker(true)
                        }}>
                            <View style={{ marginLeft: 5 }}>
                                <Calendar />
                            </View>
                            <Text style={styles.label}>{etartDate}</Text>
                        </TouchableOpacity>
                    </View>

                </View>



                {/**No of Days View */}

                <View style={styles.viewBottomStyle}>
                    <Clock />
                    <CustomTextInput
                        onChangeText={(e) => setNoOfDays(e)}
                        value={noOfDays}
                        placeholder={'No. of Days'}
                        style={styles.textInputStyle}
                    />
                </View>

                {/**Drop Location View */}
                <View style={styles.viewBottomStyle}>
                    <Location />
                    <CustomTextInput
                        onChangeText={(e) => setDropLocation(e)}
                        value={dropLocation}
                        placeholder={'Location'}
                        style={styles.textInputStyle}
                    />
                </View>

                <FlatList
                    style={{ marginTop: 5 }}
                    data={distanceData}
                    renderItem={(itemdis) => MyFilterDaysStepperItem(itemdis)}
                    keyExtractor={itemdis => itemdis.id}
                    scrollEnabled={false}
                    horizontal
                />

                <CustomButton style={styles.button} title={'Add Hotel'} textStyle={styles.reqButtonText} onPress={handelAddHotel} />

                <DateTimePickerModal
                    isVisible={datePicker}
                    mode="date"
                    date={new Date()}
                    onConfirm={(date) => {
                        setDatePicker(false)
                        if (start) {

                            setStartDate(moment(date).format('DD MMM ddd, YYYY'))
                        } else {
                            setEtartDate(moment(date).format('DD MMM ddd, YYYY'))
                        }
                    }}
                    onCancel={() => {
                        setDatePicker(false)
                    }}
                />
            </SafeAreaView>
        </RBSheet>

    )
};

const dateTimePicker = ({ }) => {

}


export default AddHotel;
