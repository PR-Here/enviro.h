import React, { useState } from "react"
import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import { BLACK, EXTRA_LIGHT_GREY, LIGHTGREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors"
import { heightPercentageToDP } from "react-native-responsive-screen"
import { FontName, FontSize } from "../../theme/Fonts"
import { BottomSheet } from 'react-native-btr';
import Cross from '../../../assets/images/SVG/cros.svg'
import FilterItem from "../../component/listItems/FilterItem"
import CustomButton from "../../component/atoms/CustomButton"
import CustomText from "../../component/atoms/CustomText"

const RegularizationBottomSheet = ({ visible, onCancel, onApplyClick, data, typeData }) => {
    const [selectedFilter, setSelectedFilter] = useState(null)
    const [selectedType, setSelectedType] = useState(null)


    const handleDone = () => {
        onApplyClick(selectedFilter)
    };

    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={onCancel}
            onBackdropPress={onCancel}
        >
            <View style={{
                maxHeight: '90%', height: 'auto', backgroundColor: WHITE, borderTopLeftRadius: 35, borderTopRightRadius: 35
            }}>
                <View style={styles.bottomSheetHeader}>
                    <CustomText style={styles.header}>Filters</CustomText>
                    <TouchableOpacity style={styles.close} onPress={onCancel}>
                        <Cross />
                    </TouchableOpacity>
                </View>
                <CustomText children={'Days'} style={{ color: '#8F8F8F', fontSize: 12, fontWeight: '500', fontFamily: FontName.Gordita_Regular, marginHorizontal: 20, marginTop: 15, marginBottom: 10 }} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 10 }}>
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
                                textStyle={{ color: index == selectedFilter ? WHITE : BLACK, marginHorizontal: 10 }}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                {/*<CustomText children={'Type'} style={{ color: '#8F8F8F', fontSize: 12, fontWeight: '500', fontFamily: FontName.Gordita_Regular, margin: 10 }} />
                 <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {typeData?.map((item, index) => (
                        <TouchableOpacity activeOpacity={0.7} style={{ margin: 8 }} key={index} onPress={() => {
                            setSelectedType(index);

                        }}>
                            <FilterItem
                                text={item}
                                key={index}
                                containerStyle={{
                                    backgroundColor: index == selectedType ? PRIMARY_COLOR : WHITE,
                                    borderColor: index == selectedType ? PRIMARY_COLOR : LIGHTGREY
                                }}
                                textStyle={{ color: index == selectedType ? WHITE : BLACK, marginHorizontal: 10 }}
                            />
                        </TouchableOpacity>
                    ))}
                </View> */}
                <CustomButton title={'Apply'} style={styles.applyButton} onPress={handleDone} />
                <CustomButton title={'Clear Filter'} style={styles.clearbutton}
                    onPress={() => {
                        setSelectedFilter(null)
                        //setSelectedType(null)
                        onApplyClick(0)
                    }}

                    textStyle={{ color: PRIMARY_COLOR }}

                />
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({

    header: {
        fontSize: FontSize(16),
        fontFamily: FontName.Gordita_Medium,
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
        //margin: 15
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
    },
    clearbutton: {
        backgroundColor: WHITE,
        marginTop: 0,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30,
        fontSize: 16,
        borderWidth: 2,
        borderColor: PRIMARY_COLOR
    },

})

export default RegularizationBottomSheet