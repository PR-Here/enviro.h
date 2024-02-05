import React, { useState } from 'react';
import { View, Modal, StyleSheet, Image } from 'react-native';
import CustomButton from '../atoms/CustomButton';
import CustomText from '../atoms/CustomText';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PRIMARY_COLOR, WHITE, BLACK } from '../../theme/Colors';
import AppString from '../../utils/AppString';
import { FontName, FontSize } from '../../theme/Fonts';
import CustomTextInput from '../atoms/CustomTextInput';
import AlignLeftIcon from '../../../assets/images/SVG/align_left_icon.svg'
import { ShowToast } from '../../utils/Constant';

const LeaveTaskModal = ({
    isVisible,
    text = 'Are you sure want to "Reject"?',
    onPress,
    onCancel,
    type,
    onChange,
    reason,
    buttonState
}) => {

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                visible={isVisible}
                onRequestClose={onCancel}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <CustomText style={styles.modalText} children={text} />

                        <View style={[styles.textInputViewContainer, { backgroundColor: WHITE }]}>

                            <View style={styles.inputTextcontent}>
                                {/* <Image source={image} style={styles.multiLineInputTextStartImage} /> */}
                                <View style={styles.multiLineInputTextStartImage}>
                                    <AlignLeftIcon />
                                </View>
                                <CustomTextInput
                                    style={[styles.multiLineInputText, { marginTop: Platform.OS == 'ios' ? wp(1) : wp(-2) }]}
                                    onChangeText={onChange}
                                    value={reason}
                                    multiline={true}
                                    placeholder='Reason'
                                    underlineColor='white'
                                    numberOfLines={5}
                                    placeholderTextColor={'#00000035'}
                                />
                            </View>



                        </View>


                        <View style={styles.buttonView}>
                            {/* Confirm Button */}
                            <CustomButton
                                style={styles.modalConfirmButton}
                                onPress={() => {
                                    if ((buttonState == 3 || buttonState == 4) && reason == '') {
                                        ShowToast('Please enter reason.')
                                    } else {
                                        onPress()
                                    }
                                }}
                                title={AppString.CONFIRM}
                                textStyle={styles.confirmTextStyle}
                            />

                            {/* Cancel Button */}
                            <CustomButton
                                style={styles.modalCancelButton}
                                onPress={onCancel}
                                title={AppString.CANCEL}
                                textStyle={styles.cancelTextStyle}
                            />

                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
        padding: hp(4),
        borderRadius: hp(3),
        alignItems: 'center',
        width: wp(80),
    },
    modalText: {
        fontSize: FontSize(14),
        textAlign: 'center',
        fontWeight: '500'
    },
    modalCancelButton: {
        backgroundColor: WHITE,
        borderRadius: wp(1),
        width: wp(25),
        fontSize: FontSize(12),
        borderColor: PRIMARY_COLOR,
        borderWidth: wp(0.4),
        height: hp(5),
        justifyContent: 'center',
        marginTop: 0,

    },
    modalConfirmButton: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: wp(1),
        width: wp(25),
        fontSize: FontSize(12),
        height: hp(5),
        justifyContent: 'center',
        marginTop: 0,
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: wp(60),
        marginTop: hp(2),
    },
    cancelTextStyle: {
        fontSize: FontSize(16),
        color: PRIMARY_COLOR,
        fontFamily: FontName.Gordita_Medium
    },
    confirmTextStyle: {
        fontSize: FontSize(16),
        color: WHITE,
        fontFamily: FontName.Gordita_Medium
    },
    imageStyle: { width: 70, height: 70, resizeMode: "contain", margin: 10 },
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

    }
});

export default LeaveTaskModal;