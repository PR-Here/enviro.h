import moment from 'moment';
import React from 'react';
import { Clipboard, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Copy from '../../../../assets/images/SVG/copyCode.svg';
import Cross from '../../../../assets/images/SVG/cros.svg';
import Edit_Pencil from '../../../../assets/images/SVG/edit_pencil.svg';
import CustomText from '../../../component/atoms/CustomText';
import { BLACK, EXTRA_LIGHT_GREY, WHITE } from '../../../theme/Colors';
import { FontName, FontSize } from '../../../theme/Fonts';
import { ShowToast, convertTimeToUTC, openUrl, showUTCToLocal } from "../../../utils/Constant";
import { useSelector } from 'react-redux';

const MeetingModal = ({ isVisible, data, onPress, onCancel }) => {

    let loginUserId = useSelector(state => state?.auth?.loginUser?.user_id);
    //console.log('loginUserId------>', loginUserId);

    const copyToClipboard = () => {
        Clipboard.setString(data?.meeting_link);
        //    ClipboardModule.copyToClipboard("Hello I am "); 
        ShowToast('Link copied to Clipboard!')
    };

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                visible={isVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.bottomSheetHeader}>
                            <CustomText style={styles.header} children={'Meeting'} />
                            <View style={{ flexDirection: 'row', marginRight: 20 }}>
                                {loginUserId == data?.booked_by && < TouchableOpacity onPress={() => {
                                    onPress(data)
                                }} style={{ marginRight: wp(2) }}>
                                    <Edit_Pencil />
                                </TouchableOpacity>}
                                <TouchableOpacity onPress={onCancel} style={{ marginRight: wp(2) }}>
                                    <Cross />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <CustomText style={{
                            fontSize: FontSize(15),
                            textAlign: 'left',
                            fontWeight: '500',
                            lineHeight: 20,
                            color: BLACK,
                            marginLeft: wp(2),
                        }} children={`${data?.meeting_title}`} />
                        <CustomText style={{
                            fontSize: FontSize(12),
                            textAlign: 'left',
                            fontWeight: '500',
                            lineHeight: 20,
                            color: BLACK,
                            marginLeft: wp(2)
                        }} children={`${moment(data?.bookedfrom?.replace('.000Z', '')).format('dddd, MMMM D, ')} ${data?.all_day ? moment(data?.bookedfrom.replace(".000Z", "")).format('hh:mm A') : convertTimeToUTC(moment(data?.bookedfrom.replace(".000Z", "")).format('hh:mm:ss'))} - ${data?.all_day ? moment(data?.bookedto.replace(".000Z", "")).format('hh:mm A') : convertTimeToUTC(moment(data?.bookedto.replace(".000Z", "")).format('hh:mm'))} `} />

                        <View style={{ marginLeft: wp(2), flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ marginTop: 20 }} onPress={() => {
                                    if (data?.meeting_link !== undefined) {
                                        openUrl(data?.meeting_link)
                                    }
                                }}>
                                    <CustomText children={'Join with google meet'} style={{ color: 'blue' }} />
                                </TouchableOpacity>
                                <CustomText numberOflines={1} style={styles.modalText} children={`${data?.meeting_link}`} />
                            </View>
                            <TouchableOpacity onPress={copyToClipboard}>
                                <Copy />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: WHITE,
        padding: 15,
        borderRadius: hp(3),
        width: wp(80),
    },
    modalText: {
        fontSize: FontSize(12),
        textAlign: 'left',
        fontWeight: '500',
        lineHeight: 20,
        color: '#D5D1D1',
        marginBottom: 20
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
    bottomSheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: EXTRA_LIGHT_GREY,
        paddingBottom: 10,
        marginBottom: 20,
        width: wp(80),
    },
    header: {
        fontSize: FontSize(15),
        fontFamily: FontName.Gordita_Medium,
        fontWeight: '500', marginLeft: wp(2), flex: 1
    }
});

export default MeetingModal;