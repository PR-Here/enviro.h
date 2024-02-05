const { BottomSheet, CheckBox } = require("react-native-btr")
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { BLACK, BUTTON_BACKGROUND, GREY_LIGHT, LIGHT_GREY, LIGHT_SHADE_GREY, PRIMARY_COLOR, TABLE_STROKE_COLOR, WHITE } from "../../theme/Colors";
import CustomText from "../atoms/CustomText";
import { CLOSE } from "../../utils/AssetsImages";
import CustomCheckBox from "../atoms/CustomCheckBox";
import { FontName, FontSize } from "../../theme/Fonts";
import FiltersList from "../../screen/bookRoom/FiltersList";
import CustomButton from "../atoms/CustomButton";
import LeaveTypeFiltersList from "../../screen/leaveModule/leaveApply/LeaveTypeFilterList";
import moment from "moment";
import { useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import CloseIcon from '../../../assets/images/SVG/close_icon.svg'
import { FontFamily } from "../../screen/GlobalStyles";




const LeaveTypeModal = ({ visible, onBackButtonPress, onBackdropPress, data, onPress, selectedDate, selectedDay, selectedTypeId }) => {


    const [selectedValue, setSelectedValue] = useState(null)

    const getBackSelectedValue = (values) => {

        //console.log('values-----------', values)
        setSelectedValue(values)
    }

    return (

        <BottomSheet
            visible={visible}
            onBackButtonPress={onBackButtonPress}
            onBackdropPress={onBackdropPress}>
            <View style={{ width: '15%', height: wp(1), backgroundColor: WHITE, marginBottom: wp(4), alignSelf: 'center', borderRadius: wp(3) }} />


            <View style={styles.container}>

                <View style={[styles.innerTopContainer]}>
                    <CustomText children={'Leave Type'} style={[styles.titleTextStyle]} />
                    <TouchableOpacity onPress={onBackdropPress} style={styles.closeView}>
                        <CloseIcon />
                    </TouchableOpacity>
                </View>

                <View style={styles.lineStyle} />

                <View style={styles.dateConatiner}>
                    <CustomText children={moment(selectedDate, 'MMM, DD YYYY').format('DD, MMM')} style={styles.dateStyle} />
                    <CustomText children={selectedDay} style={styles.dayStyle} />
                </View>


                <View style={styles.listContainerStyle}>
                    <LeaveTypeFiltersList
                        data={data}
                        getIndex={getBackSelectedValue}
                        selectedTypeId={selectedTypeId}
                    />
                </View>

                <CustomButton title={'Done'} style={styles.buttonViewStyle} textStyle={styles.buttonTextStyle} onPress={() => onPress(selectedValue)} />

            </View>
        </BottomSheet>
    )




}



const styles = StyleSheet.create({

    container: {
        height: 'auto',
        width: '100%',
        backgroundColor: LIGHT_SHADE_GREY,
        borderTopLeftRadius: wp(8),
        borderTopRightRadius: wp(8),
        paddingBottom: wp(4)
    },

    innerTopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: wp(4)
    },

    innerMiddleContainer: {
        justifyContent: 'center',
        backgroundColor: 'red',
    },

    titleTextStyle: {
        fontSize: FontSize(16),
        color: BLACK,
        alignSelf: 'center',
        fontFamily: FontName.Gordita_Medium
    },
    closeView: {
        right: wp(2),
        position: 'absolute',
    },
    closeIcon: {
        padding: wp(0.4),
        tintColor: BLACK,
    },
    lineStyle: {
        width: '100%',
        height: 1,
        marginTop: wp(4),
        backgroundColor: TABLE_STROKE_COLOR

    },
    dateConatiner: {
        justifyContent: 'flex-start',
        marginStart: wp(2),
        marginTop: wp(2)
    },
    dateStyle: {
        fontSize: FontSize(15),
        fontFamily: FontName.Gordita_Medium,
        color: BLACK
    },
    dayStyle: {
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Medium,
        color: TABLE_STROKE_COLOR
    },
    listContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: wp(4),
        alignSelf: 'center',
        paddingHorizontal: wp(2),
        paddingBottom: wp(2)
    },
    buttonViewStyle: {
        backgroundColor: BUTTON_BACKGROUND,
        alignSelf: 'center',
        marginTop: wp(8),
        marginBottom: Platform.OS === 'ios' ? wp(6) : 0
    },
    buttonTextStyle: {
        color: WHITE,
        fontSize: FontSize(16),
        fontFamily: FontName.Gordita_Medium
    }



})


export default LeaveTypeModal;