const { BottomSheet } = require("react-native-btr")
import { FlatList, Image, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BLACK, GREEN, GREY, LIGHTGREY, LIGHT_SHADE_GREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors";
import { FontName, FontSize } from "../../theme/Fonts";
import AppString from "../../utils/AppString";
import { PLACEHOLDER } from "../../utils/AssetsImages";
import CustomButton from "../atoms/CustomButton";
import CustomText from "../atoms/CustomText";
import { ShowToast, capitalizeFirstLetter, convertTimeToUTC, getTimeAgo } from "../../utils/Constant";
import moment from "moment";
import CustomTextInput from "../atoms/CustomTextInput";
import AlignLeftIcon from '../../../assets/images/SVG/align_left_icon.svg'

const LeaveApprovalModal = ({ isVisible, onPress, onBackButtonPress, data, onCancel, onApprove, onDisApprove, reason, onChange }) => {


    var totalNumberOfHours = 0

    if (data?.type == 7) {
        let t1 = moment(data?.startTime, 'HH:mm')
        let t2 = moment(data?.endTime, 'HH:mm')
        totalNumberOfHours = t2.diff(t1, 'minutes')
    }

    const RenderItem = ({ leave, index }) => {
        //console.log('listData =>' + leave)
        return (
            <View style={[styles.leavesTableItemContainer, { borderBottomWidth: index < data.length - 1 ? 1 : 0 }]}>
                <CustomText children={moment(leave?.leavedate).format('MMM, DD YYYY')} style={styles.leaveTableItemText} />
                <CustomText children={moment(leave?.leavedate).format('dddd')} style={styles.leaveTableItemText} />
                <CustomText children={leave?.LeaveTypeSlotsModel?.slot_name} style={styles.leaveTableItemText} />
            </View >
        )
    }

    const onApproveLeave = () => {
        onApprove(data)
    }

    const onRejectLeave = () => {

        onDisApprove(data)
    }
    return (
        <BottomSheet
            visible={isVisible}
            onBackButtonPress={onBackButtonPress}
            onBackdropPress={onBackButtonPress}>

            <View style={styles.container}>
                <View style={styles.profileView}>
                    <Image style={styles.profileImage} source={PLACEHOLDER} />
                    <View style={styles.userInfoStyle}>
                        <CustomText style={styles.titleText} children={capitalizeFirstLetter(data?.userData?.first_name) + ' ' + capitalizeFirstLetter(data?.userData?.last_name)} />
                        <CustomText style={[styles.designationText, { marginLeft: hp(2), }]} children={capitalizeFirstLetter(data?.userData?.Designation?.designation_name)} />
                        {/* <CustomText style={styles.statusText} children={'Approved'} /> */}
                    </View>
                    {/* hour text */}
                    <CustomText style={styles.hourText} children={data?.type == 6 ? data?.leaveTypeModel?.leave_type_name : getTimeAgo(data?.appliedOnDate)} />
                </View>

                {/* FROM - TO  VIEW */}
                <View style={styles.fromTOView}>
                    {/* from view */}
                    <View >
                        <CustomText style={styles.fromToText} children={'From'} />
                        <CustomText style={styles.dateTimeText} children={moment(data?.from_date).format('DD MMM YY')} />
                    </View>
                    {/* To view */}
                    <View >
                        <CustomText style={styles.fromToText} children={'To'} />
                        <CustomText style={styles.dateTimeText} children={moment(data?.to_date).format('DD MMM YY')} />
                    </View>
                    {/* Days view */}
                    <View >
                        <CustomText style={styles.fromToText} children={'Days'} />
                        <CustomText style={styles.dateTimeText} children={data?.totalDaysAbsence} />
                    </View>
                </View>




                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                    <CustomText
                        style={[styles.RequestTypeStyle, { color: '#00000060' }]}
                        numberOflines={1}
                        ellipsizeMode={'tail'}
                        children={'Request Type : '}
                    />

                    <CustomText
                        style={[styles.RequestTypeStyle, { color: PRIMARY_COLOR }]}
                        numberOflines={1}
                        ellipsizeMode={'tail'}
                        children={data?.leaveTypeName}
                    />

                </View>



                {data.type == 7
                    ?
                    <View style={styles.fromTOView}>
                        <View style={styles.fromview}>
                            <CustomText style={styles.fromToText} children={'Start Time'} />
                            <CustomText style={styles.dateTimeText} children={convertTimeToUTC(data?.startTime)} />
                        </View>

                        <View style={styles.fromview}>
                            <CustomText style={styles.fromToText} children={'End Time'} />
                            <CustomText style={styles.dateTimeText} children={convertTimeToUTC(data?.endTime)} />
                        </View>
                        <View style={{ width: '18%' }} >
                            <CustomText style={styles.fromToText} children={'Hours'} />
                            <CustomText style={styles.dateTimeText} children={`${('0' + Math.floor(totalNumberOfHours / 60)).slice(-2)} : ${('0' + totalNumberOfHours % 60).slice(-2)}`} />
                        </View>
                    </View>
                    :
                    <View style={styles.leaveTableContainer}>
                        <View style={styles.leaveTableColumnHeadingContainer}>
                            <CustomText children={data?.type == 6 ? 'Com-off Date' : 'Date'} style={styles.leaveTableColumnHeading} />
                            <CustomText children={data?.type == 6 ? 'Consumed' : 'Day'} style={styles.leaveTableColumnHeading} />
                            <CustomText children={data?.type == 6 ? 'Type' : 'Type'} style={styles.leaveTableColumnHeading} />
                        </View>
                        {data?.type == 6 ?
                            <View style={[styles.leavesTableItemContainer]}>
                                <CustomText children={moment(data?.from_date).format('MMM, DD YYYY')} style={styles.leaveTableItemText} />
                                <CustomText children={moment(data?.consumedDate).format('MMM, DD YYYY')} style={styles.leaveTableItemText} />
                                <CustomText children={data?.userAppliedLeaveDates[0].LeaveTypeSlotsModel?.slot_name} style={styles.leaveTableItemText} />
                            </View >
                            : <FlatList
                                data={data?.userAppliedLeaveDates}
                                style={{ maxHeight: 150 }}
                                scrollEnabled={true}
                                renderItem={({ item, index }) =>
                                    <RenderItem leave={item} index={index} />
                                }
                                keyExtractor={(leave, index) => {
                                    return `${index}`;
                                }}
                                showsVerticalScrollIndicator={true}
                            />

                        }
                    </View>}


                <View style={[styles.textInputViewContainer, { backgroundColor: WHITE }]}>

                    <View style={styles.inputTextcontent}>
                        {/* <Image source={image} style={styles.multiLineInputTextStartImage} /> */}
                        <View style={styles.multiLineInputTextStartImage}>
                            <AlignLeftIcon />
                        </View>
                        <CustomTextInput
                            style={[styles.multiLineInputText, { marginTop: Platform.OS == 'ios' ? wp(1) : wp(-2) }]}
                            // onChangeText={onChange}
                            value={data?.reason}
                            multiline={true}
                            placeholder='Reason'
                            underlineColor='white'
                            numberOfLines={5}
                            placeholderTextColor={'#00000035'}
                            editable={false}
                        />
                    </View>



                </View>



                <View style={{ alignItems: 'center' }}>
                    {data?.status == 1 ?
                        <CustomButton title={AppString.APPROVE} style={{ width: wp(85), marginTop: wp(4), height: 40 }}
                            textStyle={{ fontFamily: FontName.Gordita_Medium, fontSize: FontSize(13) }}
                            onPress={() => { onApproveLeave(data) }} /> : null

                    }

                    <View style={{ flexDirection: 'row', paddingVertical: wp(2), width: wp(85), marginTop: wp(2) }}>
                        {data?.status == 1 ?
                            <CustomButton title={AppString.DISAPPROVE} style={{
                                height: 40, flex: 1, marginRight: wp(1),
                                backgroundColor: WHITE,
                                borderColor: PRIMARY_COLOR, borderWidth: 2
                            }}
                                textStyle={{ color: PRIMARY_COLOR, fontFamily: FontName.Gordita_Medium, fontSize: FontSize(13) }}
                                onPress={() => {

                                    onRejectLeave(data)


                                }} /> : null
                        }

                        <CustomButton title={AppString.CANCEL} style={{
                            height: 40, flex: 1, marginLeft: wp(1), backgroundColor: WHITE,
                            borderColor: PRIMARY_COLOR, borderWidth: 2
                        }}
                            textStyle={{ color: PRIMARY_COLOR, fontFamily: FontName.Gordita_Medium, fontSize: FontSize(13) }}
                            onPress={() => { onCancel(data) }} />
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
    fromTOView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: wp(4)
    },
    fromToText: {
        fontSize: FontSize(13),
        color: '#00000060',
        fontFamily: FontName.Gordita_Regular
    },
    dateTimeText: {
        fontSize: FontSize(13),
        marginTop: hp(0.5),
    },
    profileView: {
        flexDirection: 'row',
    },
    leaveTableContainer: {
        borderRadius: wp(1),
        borderWidth: wp(0.3),
        borderColor: LIGHTGREY,
        marginTop: wp(5),
        maxHeight: '55%'
    },
    leaveTableColumnHeading: {
        flex: 1,
        fontSize: FontSize(13),
        fontFamily: FontName.Gordita_Medium,
        color: WHITE,
        textAlign: 'center'
    },
    leaveTableColumnHeadingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: wp(2),
        borderTopLeftRadius: wp(1),
        borderTopRightRadius: wp(1),
        backgroundColor: PRIMARY_COLOR,
        borderBottomColor: PRIMARY_COLOR
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

    },
    leavesTableItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: wp(3),
        paddingVertical: wp(4),
        borderBottomColor: LIGHTGREY
    },
    leaveTableItemText: {
        flex: 1,
        fontSize: FontSize(12),
        fontWeight: 'normal',
        color: BLACK,
        fontFamily: FontName.Geo_Auto_Regular,
        textAlign: 'center'

    },
    textInputViewContainer: {
        paddingHorizontal: wp(1),
        paddingVertical: wp(3),
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: '#A0A2B2',
        alignItems: 'center',
        borderWidth: wp(0.2),
        borderRadius: wp(1),
        marginTop: wp(2.5),
    },
    multiLineInputTextStartImage: {
        // tintColor: '#F17C1D',
        // height: wp(6),
        // width: wp(6),
        marginTop: wp(1)
    }
    ,
    inputTextcontent: {
        flexDirection: 'row',
        paddingEnd: wp(1),
        paddingStart: wp(1),
        flex: 1,
    },
    multiLineInputText: {
        backgroundColor: WHITE,
        textAlignVertical: 'top',
        flex: 1,
        borderWidth: 0,
        color: BLACK,
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Regular,
        height: 'auto',
        minHeight: wp(20),
        maxHeight: wp(40),

    },

    RequestTypeStyle: {
        fontSize: FontSize(13),
        color: '#00000060',
        fontFamily: FontName.Gordita_Regular
    }, fromview: {

    },
    dateTimeText: {
        fontSize: FontSize(13),
        marginTop: hp(0.5),
    },
})


export default LeaveApprovalModal;