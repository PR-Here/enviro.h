import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { BottomSheet } from 'react-native-btr';
import { BLACK, EXTRA_LIGHT_GREY, GREY, LIGHTGREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors";
import { FontName, FontSize } from "../../theme/Fonts";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { useEffect, useState } from 'react'
import CustomText from "../../component/atoms/CustomText";
import { ScrollView } from "react-native-gesture-handler";

import Cross from '../../../assets/images/SVG/cros.svg'
import CustomButton from "../../component/atoms/CustomButton";
import FilterItem from "../../component/listItems/FilterItem";


const ItemListModal = ({ visible, onBackButtonPress, onBackdropPress, onApplyClick, list, selectedFilterData }) => {

    const [selectedType, setSelectedType] = useState(null)



    useEffect(() => {
        if (visible) {

            let type = selectedFilterData?.typeId == undefined || selectedFilterData?.typeId == '' ? null : selectedFilterData?.typeId


            list?.map((item, index) => {
                if (item.id == type) {
                    setSelectedType(index)
                }
            })



        }
    }, [visible]);


    const getSelectedData = () => {

        const selectedData = {};

        if (selectedType != null) {
            const type = list?.[selectedType]
            selectedData.typeId = type.id
            selectedData.typeName = type.name
        }

        return selectedData;
    };

    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={onBackButtonPress}
            onBackdropPress={onBackdropPress}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Filters</Text>
                    <TouchableOpacity style={styles.close} onPress={onBackButtonPress}>
                        <Cross />
                    </TouchableOpacity>
                </View>
                <View style={styles.verticalMargin} />
                <ScrollView showsVerticalScrollIndicator={false}>

                    <CustomText children={'Type'} style={styles.headerText} />
                    <View style={styles.itemContainer}>
                        {list.map((type, index) => (

                            <TouchableOpacity key={index} activeOpacity={0.7} style={{ margin: 8 }} onPress={() => setSelectedType(index)}>
                                <FilterItem
                                    text={type.name}
                                    containerStyle={{
                                        backgroundColor: index == selectedType ? PRIMARY_COLOR : WHITE,
                                        borderColor: index == selectedType ? PRIMARY_COLOR : LIGHTGREY,
                                        paddingHorizontal: 10
                                    }}
                                    textStyle={{ color: index == selectedType ? WHITE : BLACK }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>



                </ScrollView>
                <View style={styles.verticalMargin} />

                <View style={styles.verticalMargin} />
                <CustomButton title={'Apply'} style={styles.button}
                    onPress={() => {
                        const selectedData = getSelectedData()
                        onApplyClick(selectedData);
                    }}
                />

            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: '90%',
        height: 'auto',
        backgroundColor: WHITE,
        borderTopLeftRadius: 38,
        borderTopRightRadius: 38,

    },
    headerText: {
        margin: 8, fontFamily: FontName.Gordita_Regular, fontSize: 12, fontWeight: '500', color: '#8F8F8F'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: EXTRA_LIGHT_GREY,
        justifyContent: 'center',
        padding: 15
    },
    title: {
        fontSize: FontSize(16),
        fontWeight: '500',
        fontFamily: FontName.Gordita_Medium,
        color: BLACK
    },
    close: {
        tintColor: BLACK,
        position: 'absolute',
        right: 20,
        width: heightPercentageToDP(2.8),
        height: heightPercentageToDP(2.8),
        alignItems: 'center',
        justifyContent: 'center'
    },
    verticalMargin: {
        height: '2%'
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
        marginTop: 0,
        alignSelf: 'center',
        fontSize: 16,
        marginBottom: Platform.OS == 'ios' ? 30 : 0
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
    itemContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    titleBottomTxtStyle: {
        margin: FontSize(14),
        alignContent: 'flex-start',
        justifyContent: 'space-around',
        fontSize: 20,
        color: BLACK,
        fontFamily: FontName.Gorditas_Bold
    },
    iconStyle: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: 20,
        tintColor: BLACK
    },
    viewTextFilterStyle: {
        marginEnd: 15,
        marginStart: 15,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    verticleLine: {
        height: 1,
        width: 'auto',
        backgroundColor: GREY,
    },
    viewCellStyle: {
        flexDirection: 'row',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: LIGHTGREY,
        backgroundColor: WHITE,
        borderRadius: 8,
        marginEnd: 2,
        marginStart: 3,
        justifyContent: 'center',
        width: widthPercentageToDP(20),
    },
    viewCellActiveStyle: {
        color: BLACK,
        fontSize: FontSize(13),
        fontFamily: FontName.Gordita_Medium,
        paddingTop: 10,
        paddingBottom: 10,
    },
    viewStyle: {
        margin: 5
    },
    viewDateBottomStyle: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        marginTop: heightPercentageToDP(2),
        flex: 1,

    },
    viewStartDateStyle: {
        flexDirection: 'row',
        paddingHorizontal: widthPercentageToDP(2)
    },
    subDateTitle: {
        fontWeight: "normal",
        color: BLACK,
        backgroundColor: WHITE,
        fontSize: FontSize(13),
        paddingVertical: widthPercentageToDP(3),
        fontFamily: FontName.Geo_Auto_Regular,
        textAlignVertical: 'center',
        alignSelf: 'center',
        marginStart: 5,
        flex: 1
    },
    imageStyle: {
        height: 20,
        width: 20,
        alignSelf: 'center'
    },
    viewEndColumStyle: {
        padding: 2,
        borderWidth: 1,
        borderColor: LIGHTGREY,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: widthPercentageToDP(2)
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: widthPercentageToDP(100),
    },
    saveButton: {
        backgroundColor: PRIMARY_COLOR,
        fontSize: FontSize(12),
        justifyContent: 'center',
        borderRadius: 10
    },
    customTextViewStyle: {
        marginStart: 10, color: GREY, fontFamily: FontName.Gorditas_Bold,
    },
})

export default ItemListModal