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


const AddHotel = ({ visible, handleAddHotelClose }) => {
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');
    const [startDate, setStartDate] = useState(moment().format("DD MMM ddd, YYYY"))
    const [datePicker, setDatePicker] = useState(false)
    const [start, setStart] = useState(false)
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

                <View style={styles.viewLocationStyle}>
                    {/**Pick Up Location View */}
                    <TouchableOpacity style={[styles.input, { width: '45%', flexDirection: 'row', alignItems: 'center' }]} onPress={() => {
                        setStart(true)
                        setDatePicker(true)
                    }}>
                        <Calendar />
                        <Text style={styles.label}>{startDate}</Text>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginEnd: 3, marginStart: 3 }}>
                        <Swap />
                    </View>
                    <TouchableOpacity style={[styles.input, { width: '45%', flexDirection: 'row', alignItems: 'center' }]} onPress={() => {
                        setStart(true)
                        setDatePicker(true)
                    }}>
                        <Calendar />
                        <Text style={styles.label}>{startDate}</Text>
                    </TouchableOpacity>
                </View>

                {/**No of Days View */}
                <View style={styles.viewBottomStyle}>
                    <Clock />
                    <CustomTextInput
                        onChangeText={(e) => setDropLocation(e)}
                        value={dropLocation}
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

                <CustomButton style={styles.button} title={'Add Hotel'} textStyle={styles.reqButtonText} />

                <DateTimePickerModal
                    isVisible={datePicker}
                    mode="date"
                    date={new Date()}
                    onConfirm={(date) => {
                        setDatePicker(false)
                        if (start) {
                            setStartDate(moment(date).format('DD MMM ddd, YYYY'))
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

export default AddHotel;
