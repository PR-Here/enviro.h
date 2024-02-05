import React, { useState } from "react"
import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import { BLACK, EXTRA_LIGHT_GREY, LIGHTGREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors"
import { heightPercentageToDP } from "react-native-responsive-screen"
import { FontName } from "../../theme/Fonts"
import { BottomSheet } from 'react-native-btr';
import Cross from '../../../assets/images/SVG/cros.svg'
import FilterItem from "../../component/listItems/FilterItem"
import CustomButton from "../../component/atoms/CustomButton"

const FilterBottomSheet = ({ visible, onCancel, onApplyClick, data }) => {
    const [selectedFilter, setSelectedFilter] = useState(null)

    const handleDone = () => {
        onCancel()
        onApplyClick(data[selectedFilter])
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

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {data?.map((item, index) => (
                        <TouchableOpacity activeOpacity={0.7} style={{ margin: 8 }} key={index} onPress={() => {
                            setSelectedFilter(index);

                        }}>
                            <FilterItem
                                text={item}
                                key={index}
                                containerStyle={{
                                    backgroundColor: index == selectedFilter ? PRIMARY_COLOR : WHITE,
                                    borderColor: index == selectedFilter ? PRIMARY_COLOR : LIGHTGREY
                                }}
                                textStyle={{ color: index == selectedFilter ? WHITE : BLACK }}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <CustomButton title={'Apply'} style={styles.applyButton} onPress={handleDone} />

            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({

    header: {
        fontSize: 16,
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '500'
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: EXTRA_LIGHT_GREY,
        height: '15%',
        justifyContent: 'center',
        margin: 15
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
    applyButton: {
        backgroundColor: PRIMARY_COLOR,
        alignSelf: 'center',
        marginTop: 30,
        fontSize: 16
    }
})

export default FilterBottomSheet