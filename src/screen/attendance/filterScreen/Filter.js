import React, { useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { heightPercentageToDP, widthPercentageToDP, } from 'react-native-responsive-screen';
import Cross from '../../../../assets/images/SVG/cros.svg';
import CustomButton from '../../../component/atoms/CustomButton';
import CustomText from '../../../component/atoms/CustomText';
import FilterItem from '../../../component/listItems/FilterItem';
import { BLACK, EXTRA_LIGHT_GREY, GREY, LIGHTGREY, PRIMARY_COLOR, WHITE } from '../../../theme/Colors';
import { FontName, FontSize } from '../../../theme/Fonts';
import AppString from '../../../utils/AppString';
import { CALENDER_ICON } from '../../../utils/AssetsImages';
import { ShowToast, formatDate } from '../../../utils/Constant';

const Filter = ({ onApply, onCancel, visible }) => {

    const [startDate, setStartDate] = useState('');
    const [modeStartDate, setModeStartDate] = useState('date');
    const [showStartDate, setShowStartDate] = useState(false);
    const [endDate, setEndDate] = useState('');
    const [showEndDate, setShowEndDate] = useState(false);
    const [selectDays, setSelectDays] = useState(null);
    const [selectType, setSelectType] = useState(null);

    const dayData = ['Week', 'Monthly', 'Yesterday']
    const typeData = ['WFO', 'CM', 'WFH', 'PH', 'WO', 'Leave']

    // handle For Apply Function
    const handleApply = () => {
        // if (selectDays == null && startDate == '' && endDate == '') {
        //     ShowToast("Please select days or start and end date.")
        // } else if (selectType == null) {
        //     ShowToast("Please select type.")
        // } else if (startDate == '' && selectDays == null) {
        //     ShowToast("Please select start date.")
        // } else if (endDate == '' && selectDays == null) {
        //     ShowToast("Please select end date.")
        // } else if (startDate >= endDate && selectDays == null) {
        //     ShowToast("End date should be greater then start date.")
        // } else {
        // }
        onApply({ 'days': dayData[selectDays], 'type': typeData[selectType], 'startDate': startDate, 'endDate': endDate })
    }

    const clearFilter = () => {
        setSelectDays(null)
        setSelectType(null)
        onCancel()
        setStartDate('')
        setEndDate('')
        onApply({ 'days': '', 'type': '', 'startDate': '', 'endDate': '' })

    }

    // START DATE AFTER SELECT
    const onChange = (event, selectedValue) => {
        setShowStartDate(Platform.OS === 'ios');
        if (modeStartDate == 'date') {
            setStartDate(formatDate(selectedValue));
        }
    };

    // START DATE AFTER SELECT
    const onEndDateChange = (event, selectedValue) => {
        setShowEndDate(Platform.OS === 'ios');
        if (modeStartDate == 'date') {
            setEndDate(formatDate(selectedValue));
        }
    };
    const showMode = currentMode => {
        setShowStartDate(true);
        setModeStartDate(currentMode);
    };

    const handleConfirm = (date) => {
        setShowStartDate(Platform.OS === 'ios');
        if (modeStartDate == 'date') {
            setStartDate(formatDate(date));
        }
        setSelectDays(null)
        setShowStartDate(false);

    };

    const handleEndConfirm = (date) => {
        setShowEndDate(Platform.OS === 'ios');
        if (modeStartDate == 'date') {
            setEndDate(formatDate(date));
        }
        setSelectDays(null)
        setShowEndDate(false)
    };

    const showDateTimePicker = () => {
        setShowStartDate(true);
    };
    const showEndTimePicker = () => {
        setShowEndDate(true);
    };

    const hideDatePicker = () => {
        setShowStartDate(false);
    };
    const hideEndDatePicker = () => {
        setShowEndDate(false);
    };

    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={onCancel}
            onBackdropPress={onCancel}
        >
            <View style={{
                maxHeight: '90%', height: 'auto', backgroundColor: WHITE, borderTopLeftRadius: 38, borderTopRightRadius: 38
            }}>

                <View style={styles.bottomSheetHeader}>
                    <Text style={styles.header}>Filters</Text>
                    <TouchableOpacity style={styles.close} onPress={onCancel}>
                        <Cross />
                    </TouchableOpacity>
                </View>

                {/* View days & Flatlist data set*/}
                <CustomText children={"Days"} style={styles.customTextViewStyle} fontSize={12} />

                <View style={styles.viewStyle}>
                    {
                        dayData?.map((item, index) => (
                            <TouchableOpacity activeOpacity={0.7} style={{ margin: 8 }} key={index} onPress={() => {
                                setSelectDays(index);
                                setStartDate('')
                                setEndDate('')
                            }}>
                                <FilterItem
                                    text={item}
                                    key={index}
                                    containerStyle={{
                                        backgroundColor: index == selectDays ? PRIMARY_COLOR : WHITE,
                                        borderColor: index == selectDays ? PRIMARY_COLOR : LIGHTGREY
                                    }}
                                    textStyle={{ color: index == selectDays ? WHITE : BLACK }}
                                />
                            </TouchableOpacity>
                        )
                        )
                    }
                </View>

                {/* View Type & Flatlist data set*/}
                <CustomText children={"Type"} style={styles.customTextViewStyle} fontSize={12} />

                <View style={styles.viewStyle}>
                    {
                        typeData?.map((item, index) => (
                            <TouchableOpacity activeOpacity={0.7} style={{ margin: 8 }} key={index} onPress={() => {
                                setSelectType(index);
                            }}>
                                <FilterItem
                                    text={item}
                                    key={index}
                                    containerStyle={{
                                        backgroundColor: index == selectType ? PRIMARY_COLOR : WHITE,
                                        borderColor: index == selectType ? PRIMARY_COLOR : LIGHTGREY
                                    }}
                                    textStyle={{ color: index == selectType ? WHITE : BLACK }}
                                />
                            </TouchableOpacity>
                        )
                        )
                    }
                </View>

                {/* View date Start and end date data set*/}
                <CustomText children={"Filter by Date Range"} style={styles.customTextViewStyle} fontSize={12} />

                {/* start date */}
                <View style={styles.viewDateBottomStyle}>
                    <TouchableOpacity onPress={() => setShowStartDate(true)} style={styles.viewEndColumStyle}>
                        <CustomText children={startDate ? formatDate(startDate) : "From"} style={styles.subDateTitle} />
                        <Image source={CALENDER_ICON} style={styles.imageStyle} />
                    </TouchableOpacity>

                    {/* End date */}
                    <TouchableOpacity onPress={() => setShowEndDate(true)} style={styles.viewEndColumStyle}>
                        <CustomText children={endDate ? formatDate(endDate) : "To"} style={styles.subDateTitle} />
                        <Image source={CALENDER_ICON} style={styles.imageStyle} />
                    </TouchableOpacity>
                </View>
                {/* View Apply Button and handle press*/}
                <View style={styles.viewButton}>
                    <CustomButton
                        onPress={handleApply}
                        title={AppString.APPLY}
                        style={styles.saveButton}
                    />

                    <CustomButton
                        onPress={clearFilter}
                        title={'Clear filter'}
                        style={styles.clearbutton}
                        textStyle={{ color: BLACK }}
                    />

                </View>

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
                {showEndDate && (
                    <DateTimePicker
                        isVisible={showEndTimePicker}
                        mode="date"
                        onConfirm={handleEndConfirm}
                        onCancel={hideEndDatePicker}
                        maximumDate={new Date()}
                        onChange={onEndDateChange}
                    />
                )}

            </View>

        </BottomSheet>
    )
}

const styles = StyleSheet.create({

    viewStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    viewDateBottomStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: heightPercentageToDP(2),
        marginHorizontal: 10
    },

    subDateTitle: {
        color: BLACK,
        fontSize: FontSize(13),
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '400',
        flex: 1,

    },
    imageStyle: {
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignSelf: 'center',
    },
    viewEndColumStyle: {
        height: heightPercentageToDP(5),
        borderWidth: 1,
        borderColor: LIGHTGREY,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        marginEnd: 10

    },
    viewButton: {
        justifyContent: 'center',
        width: widthPercentageToDP(100),
        marginTop: 35,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: PRIMARY_COLOR,
        fontSize: FontSize(12),
        justifyContent: 'center',
        borderRadius: 10
    },
    clearbutton: {
        backgroundColor: WHITE,
        marginTop: 0,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30,
        fontSize: 16,
        borderWidth: 2,
        borderColor: PRIMARY_COLOR,
    },

    customTextViewStyle: {
        marginStart: 10, color: GREY, fontFamily: FontName.Gorditas_Bold, marginTop: 20
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: EXTRA_LIGHT_GREY,
        height: '10%',
        justifyContent: 'center',
    },
    header: {
        fontSize: 16,
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '500'
    },
    close: {
        tintColor: BLACK,
        position: 'absolute',
        right: 30,
        width: heightPercentageToDP(2.8),
        height: heightPercentageToDP(2.8),
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Filter;