import React, { useState, useRef, useEffect } from 'react';
import { Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import CustomTextInput from '../../../component/atoms/CustomTextInput';
import { styles } from './AddCabScreenStyle';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppString from '../../../utils/AppString';
import Cross from '../../../../assets/images/SVG/cros.svg';
import Location from '../../../../assets/images/SVG/map-pin.svg';
import MoveLeft from '../../../../assets/images/SVG/move_left.svg';
import Calendar from '../../../../assets/images/SVG/calendar_days.svg';
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import moment from 'moment';
import CustomButton from '../../../component/atoms/CustomButton';


const AddCab = ({ visible, handleAddCabClose, onPressAddLocation }) => {
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');
    const [startDate, setStartDate] = useState(moment().format("DD MMM ddd, YYYY"))
    const [datePicker, setDatePicker] = useState(false)
    const [start, setStart] = useState(false)
    const refRBSheet = useRef();

    useEffect(() => {
        if (visible) {
            refRBSheet.current.open();
        }
    }, [visible]);


    const onChange = (text) => {
        setPickupLocation(text)
    }
    const addLocation = () => {
        onPressAddLocation(pickupLocation, dropLocation, startDate)
        handleAddCabClose()
    }

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={false}
            closeOnPressMask={false}
            onClose={handleAddCabClose}
            height={330}
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
                    <TouchableOpacity style={styles.close} onPress={handleAddCabClose}>
                        <Cross />
                    </TouchableOpacity>
                </View>

                <View style={styles.viewLocationStyle}>
                    <View>
                        {/**Pick Up Location View */}
                        <View style={styles.viewBottomStyle}>
                            <Location />
                            <CustomTextInput
                                onChangeText={(e) => setPickupLocation(e)}
                                value={pickupLocation}
                                placeholder={'Enter Pick-Up Location'}
                                style={styles.textInputStyle}
                            />
                        </View>
                        {/**Drop Location View */}
                        <View style={styles.viewBottomStyle}>
                            <Location />
                            <CustomTextInput
                                onChangeText={(e) => setDropLocation(e)}
                                value={dropLocation}
                                placeholder={'Enter Drop Location'}
                                style={styles.textInputStyle}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <MoveLeft />
                    </View>
                </View>
                <TouchableOpacity style={[styles.input, { width: '96%', flexDirection: 'row', alignItems: 'center' }]} onPress={() => {
                    setStart(true)
                    setDatePicker(true)
                }}>
                    <Calendar />
                    <Text style={styles.label}>{startDate}</Text>
                </TouchableOpacity>

                <CustomButton style={styles.button} title={'Add Cab'} textStyle={styles.reqButtonText} onPress={addLocation} />

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

export default AddCab;
