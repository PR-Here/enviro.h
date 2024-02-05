import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DROPDOWNARROW from '../../../../assets/images/SVG/downarrow.svg';
import { BLACK, BUTTON_BACKGROUND } from '../../../theme/Colors';
import { FontName, FontSize } from '../../../theme/Fonts';
const { Dropdown } = require("react-native-element-dropdown")


const MeetingMonthDropdown = ({ selectedValue, data, onSelection }) => {
    const [value, setValue] = useState(selectedValue)

    return (
        <View style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={data}
                maxHeight={300}
                minHeight={100}
                labelField="label"
                valueField="value"
                itemTextStyle={{
                    height: wp(5), fontSize: FontSize(10),
                    color: BLACK, fontFamily: FontName.Gordita_Medium
                }}
                itemContainerStyle={{ height: wp(10) }}
                //activeColor={SELECTION_COLOR}
                value={value}
                onChange={(item) => {
                    //console.log('item', item);
                    setValue(item)
                    onSelection(item)
                }}
                renderRightIcon={() => (
                    <DROPDOWNARROW height={15} width={15} />
                )
                }
            />
        </View>
    );
};

export default MeetingMonthDropdown;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: wp(2)
    },
    dropdown: {
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
        fontSize: FontSize(12),
        color: BLACK
    },
    selectedTextStyle: {
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Medium,
        color: BLACK
    },
    iconStyle: {
        width: wp(6),
        height: wp(6),
    },

});

