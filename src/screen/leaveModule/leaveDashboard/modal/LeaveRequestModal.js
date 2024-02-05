
const { BottomSheet, CheckBox } = require("react-native-btr")
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Platform } from "react-native";
import { BLACK, BUTTON_BACKGROUND, GREEN, GREY, GREY_LIGHT, LEAVESTATUSCOLOR, LEAVETYPECOLOR, LIGHTGREY, LIGHT_GREY, LIGHT_SHADE_GREY, PRIMARY_COLOR, RED, TABLE_STROKE_COLOR, WHITE } from "../../../../theme/Colors";

import { CLOSE } from "../../../../utils/AssetsImages";
import { FontName, FontSize } from "../../../../theme/Fonts";
import LeaveTypeFiltersList from "../../../../screen/leaveModule/leaveApply/LeaveTypeFilterList";
import moment from "moment";
import CustomText from "../../../../component/atoms/CustomText";
import CustomButton from "../../../../component/atoms/CustomButton";
import { FontFamily } from "../../../settings/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import CloseIcon from '../../../../../assets/images/SVG/close_icon.svg'
import { convertTimeToUTC } from "../../../../utils/Constant";




const LeaveRequestModal = ({ visible, onBackButtonPress, onBackdropPress, type, data, OnCancelPress, OnSubmitButtom, onEditButton, onDeleteButton }) => {

    console.log('data', data);
    const LabelValue = ({ label, labeltextColor, valuetextcolor, value, fontFamily, margin }) => {

        return (
            <View style={[styles.labelValueContainer, { marginTop: margin }]}>
                <CustomText children={label} style={[styles.labelTextStyle, { color: labeltextColor, fontFamily: type == 'savedleave' ? FontName.Gordita_Medium : FontName.Gordita_Regular }]} />
                <CustomText children={value} style={[styles.valueTextstyle, { fontFamily: fontFamily, color: valuetextcolor }]} />
            </View>

        )
    }

    return (

        < BottomSheet
            visible={visible}
            onBackButtonPress={onBackButtonPress}
            onBackdropPress={onBackdropPress} >

            <View style={styles.topContainerStyle} />

            <View style={styles.container}>
                <View style={[styles.innerTopContainer]}>
                    <CustomText children={type == 'myLeave' ? 'Leave Request' : type == 'leaveRequest' ? 'Leave Request' : 'Saved Leave'} style={[styles.titleTextStyle]} />
                    <TouchableOpacity onPress={onBackdropPress} style={styles.closeView}>
                        <CloseIcon />
                    </TouchableOpacity>
                </View>

                <View style={styles.lineStyle} />


                <View style={styles.leaveDataContainer}>
                    <LabelValue label={data?.leaveTypeName} value={data?.status == 0 ? 'Saved' : data?.status == 1 ? 'Awaiting' : data?.status == 2 ? 'Approved' : data?.status == 3 ? 'Rejected' : 'Cancelled'} labeltextColor={type == 'savedleave' ? BLACK : LEAVETYPECOLOR} valuetextcolor={data?.status == 2 ? GREEN : data?.status == 3 ? RED : data?.status == 4 ? RED : LEAVESTATUSCOLOR} fontFamily={FontName.Gordita_Regular} margin={12} />

                    <LabelValue label={'Start Date'} value={moment(data?.from_date).format('ddd, DD MMM YYYY')} labeltextColor={GREY} valuetextcolor={BLACK} fontFamily={FontName.Gordita_Medium} margin={20} />

                    <LabelValue label={'End Date'} value={moment(data?.to_date).format('ddd, DD MMM YYYY')} labeltextColor={GREY} valuetextcolor={BLACK} fontFamily={FontName.Gordita_Medium} margin={12} />


                    {data?.leave_type_id == 7 ?
                        <View>

                            <LabelValue label={'Start Time'} value={convertTimeToUTC(data?.startTime)} labeltextColor={GREY} valuetextcolor={BLACK} fontFamily={FontName.Gordita_Medium} margin={20} />

                            <LabelValue label={'End Time'} value={convertTimeToUTC(data?.endTime)} labeltextColor={GREY} valuetextcolor={BLACK} fontFamily={FontName.Gordita_Medium} margin={12} />
                        </View>
                        : <LabelValue label={'Half Day'} value={data?.is_half_day ? 'Yes' : 'No'} labeltextColor={GREY} valuetextcolor={BLACK} fontFamily={FontName.Gordita_Medium} margin={12} />}

                    <View style={{ flexDirection: 'column', marginTop: 12 }}>
                        <CustomText children={'Reason'} style={[styles.labelTextStyle, { color: GREY }]} />
                        <CustomText children={data?.reason} style={[styles.valueTextstyle, { fontFamily: FontName.Gordita_Medium, color: BLACK }]} margin={12} />
                    </View>
                    {data?.status == 2 || data?.status == 3 || data?.status == 4 ?
                        <View style={{ flexDirection: 'column', marginTop: 12 }}>
                            <CustomText children={'Manager Reason'} style={[styles.labelTextStyle, { color: GREY }]} />
                            <CustomText children={data?.status == 4 && data?.cancelReason == '' ? 'The leave request has been canceled by you.' : data?.cancelReason} style={[styles.valueTextstyle, { fontFamily: FontName.Gordita_Medium, color: BLACK }]} margin={12} />
                        </View> : null}

                    <LabelValue label={'Applied On'} value={moment(data?.appliedOnDate).format('ddd DD MMM')} labeltextColor={GREY} valuetextcolor={BLACK} fontFamily={FontName.Gordita_Medium} margin={18} />

                </View>



                {type == 'savedleave' ?
                    <View>
                        {/* Submit Button */}
                        <CustomButton title={'Submit Request'} style={styles.submitButtonStyle} textStyle={styles.submitButtonTextStyle} onPress={() => OnSubmitButtom(data?.leave_id, data?.status, data.leave_type_id)} />

                        {/* Save And Cancel Button */}
                        <View style={{ flexDirection: 'row' }}>
                            {data?.leave_type_id != 6 && data?.leave_type_id != 8 ? <CustomButton title={'Edit'} style={styles.saveCancelButtonStyle} textStyle={styles.saveCancelButtonTextStyle} onPress={() => onEditButton(data)} /> : null}
                            <CustomButton title={'Delete'} style={styles.saveCancelButtonStyle} textStyle={styles.saveCancelButtonTextStyle} onPress={() => onDeleteButton(data?.leave_id)} />
                        </View>
                    </View> : data?.status == 4 || data?.status == 3 || data?.status == 2 ? null : <CustomButton title={'Cancel Request'} style={{
                        backgroundColor: PRIMARY_COLOR, alignSelf: 'center', marginTop: 40,
                        marginBottom: Platform.OS === 'ios' ? wp(6) : wp(4)
                    }} textStyle={{ color: WHITE, fontSize: FontSize(16), fontFamily: FontName.Gordita_Medium }} onPress={() => OnCancelPress(data?.leave_id)} />

                }
            </View>
        </BottomSheet >
    )




}



const styles = StyleSheet.create({

    topContainerStyle: {
        width: '15%',
        height: wp(1),
        backgroundColor: WHITE,
        marginBottom: wp(4),
        alignSelf: 'center',
        borderRadius: wp(3)
    },

    container: {
        height: 'auto',
        width: '100%',
        backgroundColor: LIGHT_SHADE_GREY,
        borderTopLeftRadius: 38,
        borderTopRightRadius: 38
    },

    innerTopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    titleTextStyle: {
        fontSize: FontSize(16),
        fontWeight: 'normal',
        color: BLACK,
        alignSelf: 'center',
        fontFamily: FontName.Gordita_Medium
    },
    closeView: {
        right: 10,
        position: 'absolute',
    },
    closeIcon: {
        padding: 2,
        tintColor: BLACK,
    },
    lineStyle: {
        width: '100%',
        height: 1,
        marginTop: 20,
        backgroundColor: TABLE_STROKE_COLOR

    },
    labelTextStyle: {
        fontSize: FontSize(14),
        justifyContent: 'flex-start',
        fontFamily: FontName.Geo_Auto_Regular
    },
    valueTextstyle: {
        fontSize: FontSize(14),
        justifyContent: 'flex-end',
        fontFamily: FontName.Geo_Auto_Regular,
        marginTop: Platform.OS == 'ios' ? 10 : 2
    },
    submitButtonStyle: {
        backgroundColor: PRIMARY_COLOR,
        alignSelf: 'center',
        width: '90%',
        marginTop: wp(2.2)
    },
    submitButtonTextStyle: {
        color: WHITE,
        fontSize: FontSize(16),
        fontFamily: FontName.Gordita_Medium
    },
    saveCancelButtonStyle: {
        flex: 1,
        backgroundColor: WHITE,
        alignSelf: 'center',
        borderRadius: wp(1.5),
        borderWidth: wp(0.4),
        borderColor: PRIMARY_COLOR,
        marginTop: wp(6),
        marginHorizontal: wp(6),
        marginBottom: Platform.OS === 'ios' ? wp(6) : wp(4)
    },
    saveCancelButtonTextStyle: {
        color: BLACK,
        fontSize: 16,
        fontWeight: 'normal'
    },
    labelValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leaveDataContainer: {
        flexDirection: 'column',
        margin: wp(2)
    }
})


export default LeaveRequestModal;