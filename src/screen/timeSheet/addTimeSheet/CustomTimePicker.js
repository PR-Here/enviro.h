
import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from 'react'
import AppString from '../../../utils/AppString';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../../theme/Fonts';
import { BLACK, EXTRA_LIGHT_GREY, PRIMARY_COLOR, WHITE } from '../../../theme/Colors';
import CustomButton from '../../../component/atoms/CustomButton';
import { BottomSheet } from 'react-native-btr';
import Cross from '../../../../assets/images/SVG/cros.svg'
import { ShowToast } from '../../../utils/Constant';

const CustomTimePicker = ({ onConfrim, isTimePickerVisible, onCancel, editTime, editMode }) => {

    const [preselectedHour, preselectedMinute] = editTime.split(':').map(Number);
    //console.log('Preselected Hour:', preselectedHour);
    //console.log('Preselected Minute:', preselectedMinute);
    const [selectedHour, setSelectedHour] = useState(editMode ? preselectedHour : 0);
    const [selectedMinute, setSelectedMinute] = useState(editMode ? preselectedMinute : 0);

    const handleConfirm = () => {
        if (selectedHour == 0 && selectedMinute == 0) {
            ShowToast("Please Select Duration")
        } else {
            onConfrim(selectedHour, selectedMinute)
        }
    };

    return (
        <View >

            <BottomSheet
                visible={isTimePickerVisible}
                transparent={true}
            >
                <View style={{ height: 'auto', width: '100%', backgroundColor: WHITE, borderTopLeftRadius: 38, borderTopRightRadius: 38 }}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Select Duration</Text>
                        <TouchableOpacity
                            style={styles.close}
                            onPress={onCancel}
                        >
                            < Cross />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Picker
                            selectedValue={selectedHour}
                            onValueChange={(itemValue) => setSelectedHour(itemValue)}
                            style={{ flex: 1 }} // Adjust flex as needed
                        >
                            {[...Array(11).keys()].map((hour) => (
                                <Picker.Item label={`${hour} Hours`} value={hour} key={hour} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={selectedMinute}
                            onValueChange={(itemValue) => setSelectedMinute(itemValue)}
                            style={{ flex: 1 }} // Adjust flex as needed
                        >
                            {/* Populate the minute picker with your desired minute options */}
                            {[0, 15, 30, 45].map((minute) => (
                                <Picker.Item label={`${minute} Minutes`} value={minute} key={minute} />
                            ))}
                        </Picker>
                    </View>
                    <CustomButton
                        style={styles.modalConfirmButton}
                        onPress={handleConfirm}
                        title={AppString.APPLY}
                    />
                    {/* </View> */}
                </View>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    modalCancelButton: {
        backgroundColor: '#A09F9E',
        borderRadius: 5,
        width: widthPercentageToDP(25),
        fontSize: FontSize(12),
        height: heightPercentageToDP(5),
        justifyContent: 'center',
        marginTop: 0,
    },
    modalConfirmButton: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 8,
        width: widthPercentageToDP(25),
        fontSize: FontSize(12),
        height: heightPercentageToDP(5),
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 20,
        alignSelf: 'center',
        width: widthPercentageToDP(80),
        height: 42,
        gap: 10,


        // flex: 1
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
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
    close: {
        tintColor: BLACK,
        position: 'absolute',
        right: '7%',
        width: 20,
        height: 20
    },
    title: {
        fontSize: FontSize(16),
        fontWeight: '500',
        fontFamily: FontName.Gordita_Regular,
        color: BLACK,
        marginVertical: 20,
    },
});


export default CustomTimePicker