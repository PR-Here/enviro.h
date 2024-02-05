const { BottomSheet } = require("react-native-btr")
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import CheckBoxWhite from "../../../assets/images/SVG/check_box_wihite.svg";
import CheckBoxTickWhite from "../../../assets/images/SVG/check_box_tick_wihite.svg";
import { BLACK, GREEN, GREY, LIGHT_BLUE, LIGHT_SHADE_GREY, PRIMARY_COLOR, SELECTED_OUTER_COLOR, T_BORDER_COLOR, WEEKDAY_COLOR, WHITE } from "../../theme/Colors";
import { FontName, FontSize } from "../../theme/Fonts";
import AppString from "../../utils/AppString";
import { PLACEHOLDER } from "../../utils/AssetsImages";
import CustomButton from "../atoms/CustomButton";
import CustomText from "../atoms/CustomText"
import moment from "moment";
import { useState } from "react";
import CheckBox from 'react-native-check-box';
import { convertTimeToUTC, formateTime } from "../../utils/Constant";

const AttendanceApprovalModal = ({ visible, onBackButtonPress, data, onCancel, onCheckMark, onSelectAll, onApprove, onReject }) => {
    //console.log('data11111111111111111 =>' + JSON.stringify(data))

    const [isSelect, setIsSelect] = useState(false)

    let attandenceTotalDays = 0
    let attandenceTotalHours = 0
    let approvedCount = 0
    let disapproveCount = 0
    let pendingCount = 0

    data?.data?.map(item => {

        if (item?.status == 2) {
            approvedCount += 1
        } else if (item?.status == 3) {
            disapproveCount += 1
        } else if (item?.status == 1) {
            pendingCount += 1
        }


        let time1 = moment(item?.s_start_time, 'hh:mm:ss')
        let time2 = moment(item?.s_end_time, 'hh:mm:ss')
        let minutes = time2.diff(time1, 'minutes')


        attandenceTotalHours += minutes
        attandenceTotalDays += item?.no_of_days



    })



    const RenderItem = ({ attendance, index }) => {
        //console.log('attendance?.s_start_time ->', attendance?.s_start_time);

        let time1 = moment(attendance?.s_start_time, 'hh:mm:ss')
        let time2 = moment(attendance?.s_end_time, 'hh:mm:ss')

        let minutes = time2.diff(time1, 'minutes')

        let noOfHours = Math.floor(minutes / 60)
        let noOfMinutes = minutes % 60
        noOfHours = noOfHours < 10 ? '0' + noOfHours : noOfHours
        noOfMinutes = noOfMinutes < 10 ? '0' + noOfMinutes : noOfMinutes








        return (
            <View style={{ paddingVertical: wp(1), flexDirection: 'row' }} >
                <View style={{
                    paddingHorizontal: wp(2),
                    paddingVertical: wp(2),
                    backgroundColor: attendance.status == 1 ? PRIMARY_COLOR : WHITE,
                    borderRadius: wp(1.5),
                    borderColor: attendance.status == 1 ? T_BORDER_COLOR : '#D1D1D1',
                    borderWidth: 1,
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { attendance.status == 1 ? onCheckMark(index) : null }}>
                        {!attendance?.isSelected ? < CheckBoxWhite height={18} width={18} /> : <CheckBoxTickWhite height={18} width={18} />}
                        <View style={{ alignItems: 'center', paddingRight: wp(2) }}>
                            <CustomText style={{ color: attendance.status == 1 ? WHITE : '#D1D1D1', fontFamily: FontName.Gorditas_Bold, fontSize: FontSize(14) }} children={moment(attendance?.from_date, 'yyyy-MM-D').format('D')} />
                            <CustomText style={{ color: attendance.status == 1 ? WHITE : '#D1D1D1', fontSize: FontSize(12) }} children={moment(attendance?.from_date, 'yyyy-MM-D').format('ddd')} />
                            <CustomText style={{ color: attendance.status == 1 ? WHITE : '#D1D1D1', fontFamily: FontName.Gordita_Regular, fontSize: FontSize(12) }} children={moment(attendance?.from_date, 'yyyy-MM-D').format('MMM')} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flex: 1,
                    marginLeft: wp(2),
                    paddingHorizontal: wp(3),
                    paddingVertical: wp(2),
                    borderRadius: wp(1.5),
                    borderWidth: 1.5,
                    borderColor: attendance.status == 1 ? T_BORDER_COLOR : '#D1D1D1',
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ paddingRight: wp(2) }}>
                            <CustomText style={{ color: attendance.status == 1 ? WEEKDAY_COLOR : '#D1D1D1', fontSize: FontSize(12) }} children={'In Time'} />
                            <CustomText style={{ color: attendance.status == 1 ? WEEKDAY_COLOR : '#D1D1D1', fontFamily: FontName.Gorditas_Bold, fontSize: FontSize(14) }} children={convertTimeToUTC(attendance?.s_start_time)} />
                        </View>
                        <View style={{ paddingRight: wp(2) }}>
                            <CustomText style={{ color: attendance.status == 1 ? WEEKDAY_COLOR : '#D1D1D1', fontSize: FontSize(12) }} children={'Out Time'} />
                            <CustomText style={{ color: attendance.status == 1 ? WEEKDAY_COLOR : '#D1D1D1', fontFamily: FontName.Gorditas_Bold, fontSize: FontSize(14) }} children={convertTimeToUTC(attendance?.s_end_time)} />
                        </View>
                        <View style={{ paddingRight: wp(2) }}>
                            <CustomText style={{ color: attendance.status == 1 ? WEEKDAY_COLOR : '#D1D1D1', fontSize: FontSize(12) }} children={'Hours'} />
                            <CustomText style={{ color: attendance.status == 1 ? SELECTED_OUTER_COLOR : '#D1D1D1', fontFamily: FontName.Gorditas_Bold, fontSize: FontSize(14) }} children={noOfHours + ':' + noOfMinutes + ' H'} />
                        </View>
                    </View>
                    <CustomText style={{ color: WEEKDAY_COLOR, fontFamily: FontName.Gordita_Regular, fontSize: FontSize(11) }} numberOflines={2} children={'Reason: ' + attendance?.reason} ellipsizeMode={'tail'} />

                </View>
            </View>
        )
    }




    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={onBackButtonPress}
            onBackdropPress={onBackButtonPress}>

            <View style={styles.container}>
                <View style={styles.profileView}>
                    <Image style={styles.profileImage} source={PLACEHOLDER} />
                    <View style={styles.userInfoStyle}>
                        <CustomText style={styles.titleText} children={data?.userData?.first_name + ' ' + data?.userData?.last_name} />
                        <CustomText style={[styles.designationText, { marginLeft: hp(2), }]} children={data?.userData?.Designation?.designation_name} />
                        {/* <CustomText style={styles.statusText} children={'Approved'} /> */}
                    </View>
                    {/* hour text */}
                    {/* <CustomText style={styles.hourText} children={'5h ago'} /> */}
                </View>

                <View style={{ flexDirection: 'row', paddingVertical: wp(3) }}>
                    <CustomText style={[styles.designationText, { color: PRIMARY_COLOR, flex: 1 }]} children={'Total hours : ' + `${('0' + Math.floor(attandenceTotalHours / 60)).slice(-2)} : ${('0' + attandenceTotalHours % 60).slice(-2)}` + ' hours'} />
                    <CustomText style={[styles.designationText, { color: PRIMARY_COLOR, flex: 1, textAlign: 'right' }]} children={'Total Days : ' + attandenceTotalDays + 'days'} />

                </View>


                <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox
                        onClick={() => {
                            onSelectAll(isSelect)
                            setIsSelect(!isSelect)
                        }}
                        uncheckedCheckBoxColor={GREY}
                        checkedCheckBoxColor={LIGHT_BLUE}
                        isChecked={isSelect}
                    />

                    <CustomText children={'Select All'} style={[styles.leaveTableDateItemText]} />

                </View>





                <FlatList
                    data={data?.data}
                    renderItem={({ item, index }) =>
                        <RenderItem attendance={item} index={index} />
                    }
                    keyExtractor={(attendance, index) => {
                        return `${index}`;
                    }}
                    showsVerticalScrollIndicator={true}
                />
                <View style={{ alignItems: 'center' }}>
                    {((approvedCount + disapproveCount) < attandenceTotalDays) ? <CustomButton title={AppString.APPROVE} style={{ width: wp(85), marginTop: wp(4), height: 40 }}
                        textStyle={{ fontFamily: FontName.Gordita_Medium, fontSize: FontSize(13) }}
                        onPress={() => { onApprove(data) }} /> : null}
                    <View style={{ flexDirection: 'row', paddingVertical: wp(2), width: wp(85), marginTop: wp(2) }}>
                        {((approvedCount + disapproveCount) < attandenceTotalDays) ? <CustomButton title={AppString.DISAPPROVE} style={{
                            height: 40, flex: 1, marginRight: wp(1),
                            backgroundColor: WHITE,
                            borderColor: PRIMARY_COLOR, borderWidth: 2
                        }}
                            textStyle={{ color: PRIMARY_COLOR, fontFamily: FontName.Gordita_Medium, fontSize: FontSize(13) }}
                            onPress={() => { onReject(data) }} /> : null}
                        <CustomButton title={AppString.CANCEL} style={{
                            height: 40, flex: 1, marginLeft: wp(1), backgroundColor: WHITE,
                            borderColor: PRIMARY_COLOR, borderWidth: 2
                        }}
                            textStyle={{ color: PRIMARY_COLOR, fontFamily: FontName.Gordita_Medium, fontSize: FontSize(13) }}
                            onPress={() => onCancel()} />
                    </View>
                </View>
            </View>
        </BottomSheet>
    )



}



const styles = StyleSheet.create({

    container: {
        height: 'auto',
        maxHeight: '80%',
        width: '100%',
        paddingHorizontal: wp(4),
        paddingVertical: wp(5),
        backgroundColor: LIGHT_SHADE_GREY,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
    },
    profileView: {
        flexDirection: 'row',
    },
    profileImage: {
        width: wp(8),
        height: wp(8),
        borderWidth: 1,
        borderColor: GREY,
        borderRadius: 100 / 2,
    },
    userInfoStyle: {
        width: '50%',
        flex: 1,
    },
    titleText: {
        marginLeft: hp(2),
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Medium,

    },
    designationText: {
        fontSize: FontSize(13),
        fontFamily: FontName.Gordita_Regular,
        color: '#00000060'

    },
    statusText: {
        marginLeft: hp(2),
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Regular,
        color: GREEN
    },
    hourText: {
        fontSize: FontSize(12),
        color: '#00000060',
        fontFamily: FontName.Geo_Auto_Regular

    }
    ,
    leaveTableDateItemText: {

        fontSize: FontSize(13),
        fontWeight: 'normal',
        color: BLACK,
        fontFamily: FontName.Geo_Auto_Regular
    }
})


export default AttendanceApprovalModal;