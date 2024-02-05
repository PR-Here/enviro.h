import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';

import React, { useState, useRef, useEffect } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from '../../../component/atoms/CustomText';
import { BLACK, PRIMARY_COLOR, WHITE } from '../../../theme/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppString from '../../../utils/AppString';
import AssetsImages, { CALENDER_ICON } from '../../../utils/AssetsImages';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../../component/atoms/CustomButton';
import { ShowToast, formatDate } from '../../../utils/Constant';
import { styles } from './FilterHistoryStyle';

const FilterHistory = ({ showFilterVisible, handleBottomNavigationPopup }) => {

    const [startDate, setStartDate] = useState('');
    const [modeStartDate, setModeStartDate] = useState('date');
    const [showStartDate, setShowStartDate] = useState(false);
    const [endDate, setEndDate] = useState('');
    const [modeEndDate, setModeEndDate] = useState('date');
    const [showEndDate, setShowEndDate] = useState(false);
    const [isBackgroundColor, setIsBackgroundColor] = useState();
    const [isShiftBackgroundColor, setIsShiftBackgroundColor] = useState();
    const [isTypeBackgroundColor, setIsTypeBackgroundColor] = useState();
    const [isAmountBackgroundColor, setIsAmountBackgroundColor] = useState();
    const [selectDays, setSelectDays] = useState(null);
    const [selectShift, setSelectShift] = useState(null);
    const [selectType, setSelectType] = useState(null);
    const [selectAmount, setSelectAmount] = useState(null);
    const refRBSheet = useRef();

    const dayData = [
        {
            id: 1,
            title: 'Approved'
        },
        {
            id: 2,
            title: 'Not Approved'
        }, {
            id: 3,
            title: 'Not Uploaded'
        },
    ]
    const ShiftData = [
        {
            id: 1,
            title: 'Cab'
        },
        {
            id: 2,
            title: 'Meal'
        },
    ]
    const typeData = [
        {
            id: 1,
            title: 'Jul’23'
        },
        {
            id: 2,
            title: 'Aug’23'
        },
        {
            id: 3,
            title: 'Sep’23'
        },
        {
            id: 4,
            title: 'Oct’23'
        },
        {
            id: 5,
            title: 'Nov’23'
        },
    ]

    const amountData = [
        {
            id: 1,
            title: '<1000'
        },
        {
            id: 2,
            title: '<2000'
        },
        {
            id: 3,
            title: '<3000'
        }
    ]

    useEffect(() => {
        if (showFilterVisible) {
            refRBSheet.current.open();
        }
    }, [showFilterVisible]);

    const closeFilterButton = () => {
        handleBottomNavigationPopup()
    }

    // handle For Apply Function
    const handleApply = () => {
        if (selectDays == null) {
            ShowToast("Please Select Days")
        } else if (selectShift == null) {
            ShowToast("Please Select Shift")
        } else if (selectType == null) {
            ShowToast("Please Select Type")
        } else if (selectAmount == null) {
            ShowToast("Please Select Type")
        } else {
            handleBottomNavigationPopup()
        }
    }

    // START DATE AFTER SELECT
    const onChange = (event, selectedValue) => {
        setShowStartDate(Platform.OS === 'ios');
        if (modeStartDate == 'date') {
            const currentDate = selectedValue || new Date();
            setStartDate(currentDate);
        }
    };
    const showMode = currentMode => {
        setShowStartDate(true);
        setModeStartDate(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    // END DATE AFTER SELECT
    const onEndChange = (event, selectedValue) => {
        setShowEndDate(Platform.OS === 'ios');
        if (modeEndDate == 'date') {
            const currentDate = selectedValue || new Date();
            setEndDate(currentDate);
        }
    };
    const showDateEnd = currentMode => {
        setShowEndDate(true);
        setModeEndDate(currentMode);
    };
    const showEndDatepicker = () => {
        showDateEnd('date');
    };

    // handle Days Function
    const handleItemClick = itemId => {
        setSelectDays(itemId?.title)
    };

    // handle Shift Function
    const handleItemShiftClick = itemShift => {
        setSelectShift(itemShift?.title)
    };

    // handle Type Function
    const handleItemTypeClick = itemType => {
        setSelectType(itemType?.title)
    };
    // handle Type Function
    const handleItemAmountClick = itemType => {
        setSelectAmount(itemType?.title)
    };

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
                <View >
                    <CustomText children={itemDays?.item.title} style={[styles.viewCellActiveStyle, { color: itemDays?.item.id === isBackgroundColor ? WHITE : BLACK },]} />
                </View>
            </TouchableHighlight>
        )
    }

    // View Shift and Select Item Function
    const MyFilterShiftStepperItem = (itemshift) => {
        return (
            <TouchableHighlight
                underlayColor={PRIMARY_COLOR}
                activeOpacity={0.3}
                onPress={() => {
                    handleItemShiftClick(itemshift?.item)
                    setIsShiftBackgroundColor(itemshift?.item.id)
                }}
                style={[
                    styles.viewCellStyle,
                    itemshift?.item.id === isShiftBackgroundColor
                        ? { backgroundColor: PRIMARY_COLOR }
                        : { backgroundColor: WHITE },
                ]}>
                <View >
                    <CustomText children={itemshift?.item.title} style={[styles.viewCellActiveStyle, { color: itemshift?.item.id === isShiftBackgroundColor ? WHITE : BLACK },]} />
                </View>
            </TouchableHighlight>
        )
    }

    // View Type and Select Item Function
    const MyFilterTypeStepperItem = (itemType) => {
        return (
            <TouchableHighlight
                underlayColor={PRIMARY_COLOR}
                activeOpacity={0.3}
                onPress={() => {
                    handleItemTypeClick(itemType?.item)
                    setIsTypeBackgroundColor(itemType?.item.id)
                }}
                style={[
                    styles.viewCellStyle,
                    itemType?.item.id === isTypeBackgroundColor
                        ? { backgroundColor: PRIMARY_COLOR }
                        : { backgroundColor: WHITE },
                ]}>
                <View >
                    <CustomText children={itemType?.item.title} style={[styles.viewCellActiveStyle, { color: itemType?.item.id === isTypeBackgroundColor ? WHITE : BLACK },]} />
                </View>
            </TouchableHighlight>
        )
    }

    // View Type and Select Item Function
    const MyFilterAmountStepperItem = (itemType) => {
        return (
            <TouchableHighlight
                underlayColor={PRIMARY_COLOR}
                activeOpacity={0.3}
                onPress={() => {
                    handleItemAmountClick(itemType?.item)
                    setIsAmountBackgroundColor(itemType?.item.id)
                }}
                style={[
                    styles.viewCellStyle,
                    itemType?.item.id === isAmountBackgroundColor
                        ? { backgroundColor: PRIMARY_COLOR }
                        : { backgroundColor: WHITE },
                ]}>
                <View >
                    <CustomText children={itemType?.item.title} style={[styles.viewCellActiveStyle, { color: itemType?.item.id === isAmountBackgroundColor ? WHITE : BLACK },]} />
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={false}
            closeOnPressMask={false}
            height={500}
            openDuration={250}
            customStyles={{
                container: {
                    borderTopLeftRadius: 38,
                    borderTopRightRadius: 38,
                },
                wrapper: {
                    backgroundColor: '#00000099',
                },
                draggableIcon: {
                    backgroundColor: BLACK,
                },
            }}>
            <KeyboardAwareScrollView enableOnAndroid>
                <View>
                    <View style={styles.viewTextFilterStyle}>
                        <Text style={styles.titleBottomTxtStyle}>
                            {AppString.DETAILS + ' :'}
                        </Text>
                        <TouchableOpacity onPress={() => closeFilterButton()}>
                            <Image source={AssetsImages.CLOSE} style={styles.iconStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.verticleLine} />
                    {/* View days & Flatlist data set*/}
                    <View style={styles.viewStyle}>
                        <CustomText children={"Status"} style={styles.customTextViewStyle} fontSize={12} />
                        <FlatList
                            style={{ marginTop: 5 }}
                            data={dayData}
                            renderItem={(itemDays) => MyFilterDaysStepperItem(itemDays)}
                            keyExtractor={itemDays => itemDays.id}
                            scrollEnabled={false}
                            horizontal
                        />
                    </View>
                    {/* View shift & Flatlist data set*/}
                    <View style={styles.viewStyle}>
                        <CustomText children={"Expense Type"} style={styles.customTextViewStyle} fontSize={12} />
                        <FlatList
                            style={{ marginTop: 5 }}
                            data={ShiftData}
                            renderItem={(itemshift) => MyFilterShiftStepperItem(itemshift)}
                            keyExtractor={itemshift => itemshift.id}
                            scrollEnabled={false}
                            horizontal
                        />
                    </View>
                    {/* View Type & Flatlist data set*/}
                    <View style={styles.viewStyle}>
                        <CustomText children={"Month"} style={styles.customTextViewStyle} fontSize={12} />
                        <FlatList
                            style={{ marginTop: 5 }}
                            data={typeData}
                            renderItem={(itemType) => MyFilterTypeStepperItem(itemType)}
                            keyExtractor={itemType => itemType.id}
                            scrollEnabled={true}
                            scrollIndicatorInsets={false}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    {/* View Type & Flatlist data set*/}
                    <View style={styles.viewStyle}>
                        <CustomText children={"Amount"} style={styles.customTextViewStyle} fontSize={12} />
                        <FlatList
                            style={{ marginTop: 5 }}
                            data={amountData}
                            renderItem={(itemType) => MyFilterAmountStepperItem(itemType)}
                            keyExtractor={itemType => itemType.id}
                            scrollEnabled={true}
                            scrollIndicatorInsets={false}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    {/* View date Start and end date data set*/}
                    <View style={styles.viewStyle}>
                        <CustomText children={"Filter by Date Range"} style={styles.customTextViewStyle} fontSize={12} />
                        <View style={{ flexDirection: 'row' }}>
                            {/* start date */}
                            <View style={styles.viewDateBottomStyle}>
                                <View style={styles.viewEndColumStyle}>
                                    <TouchableOpacity onPress={showDatepicker}>
                                        <View style={styles.viewStartDateStyle}>
                                            <CustomText children={startDate ? formatDate(startDate) : "From"} style={styles.subDateTitle} />
                                            <Image source={CALENDER_ICON} style={styles.imageStyle} />
                                        </View>
                                    </TouchableOpacity>
                                    {showStartDate && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={new Date()}
                                            mode={modeStartDate}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )}
                                </View>
                                {/* End date */}
                                <View style={styles.viewEndColumStyle}>
                                    <TouchableOpacity onPress={showEndDatepicker}>
                                        <View style={styles.viewStartDateStyle}>
                                            <CustomText children={endDate ? formatDate(endDate) : "To"} style={styles.subDateTitle} />
                                            <Image source={CALENDER_ICON} style={styles.imageStyle} />
                                        </View>
                                    </TouchableOpacity>
                                    {showEndDate && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={new Date()}
                                            mode={modeEndDate}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onEndChange}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* View Apply Button and handle press*/}
                    <View style={styles.viewButton}>
                        <CustomButton
                            onPress={handleApply}
                            title={AppString.APPLY}
                            style={styles.saveButton}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </RBSheet>
    )
}

export default FilterHistory;