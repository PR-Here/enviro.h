import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-animatable';
import { CALENDER_CLOCK, DOWN_ARROW } from '../../utils/AssetsImages';
import { BLACK, BUTTON_BACKGROUND, GREEN, GREY, INACTIVE_COLOR, SECONDARY_COLOR, SELECTION_COLOR } from '../../theme/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../theme/Fonts';
const { Dropdown } = require("react-native-element-dropdown")
import CalendarClockIcon from '../../../assets/images/SVG/calendar_clock_icon.svg'



const DropdownComponent = ({ enabled, selectedValue, data, onSelection }) => {
    const [value, setValue] = useState(selectedValue)


    return (
        <View style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                disable={enabled}
                data={data}
                maxHeight={300}
                minHeight={100}
                labelField="label"
                valueField="value"
                placeholder={selectedValue == null ? 'Leave Type' : selectedValue}
                itemTextStyle={{ height: wp(5), fontSize: FontSize(13), alignSelf: 'center', color: BLACK, fontFamily: FontName.Gordita_Regular }}
                itemContainerStyle={{ height: wp(10), justifyContent: 'center' }}
                activeColor={SELECTION_COLOR}
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                    setValue(item)
                    onSelection(item?.id)
                }}
                renderLeftIcon={() => (
                    <View style={styles.icon}>
                        <CalendarClockIcon />

                    </View>
                )}
            />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: wp(2),
        marginTop: 10,
    },
    dropdown: {
        height: hp(6),
        width: '100%',
        borderColor: '#D9D9D9',
        borderWidth: hp(0.12),
        borderRadius: hp(0.8),
        paddingHorizontal: hp(1),
    },
    icon: {
        width: wp(6),
        height: wp(6),
        marginRight: 5,
        tintColor: BUTTON_BACKGROUND
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: FontSize(16),
        color: INACTIVE_COLOR
    },
    selectedTextStyle: {
        fontSize: FontSize(16),
        color: BLACK
    },
    iconStyle: {
        width: wp(6),
        height: wp(6),
    },
    inputSearchStyle: {
        height: wp(8),
        fontSize: FontSize(16),
        color: BLACK
    },
});




