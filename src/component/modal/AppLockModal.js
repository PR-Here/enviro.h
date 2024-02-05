import { useState } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { WHITE } from "../../theme/Colors";
import CustomText from '../atoms/CustomText';
import { FontSize } from '../../theme/Fonts';
import CustomButton from '../atoms/CustomButton';

const AppLockModal = ({ message, buttonText, visible, onDone }) => {
    return (
        <View style={styles.mainContainer}>
            <Modal
                transparent={true}
                visible={visible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <CustomText children={message} style={{ fontSize: FontSize(12), marginHorizontal: 20, lineHeight: 16 }} />
                        <View style={{ marginTop: 20, backgroundColor: '#0002', height: 1, width: '100%' }}></View>
                        <CustomButton title={buttonText} onPress={onDone}
                            style={{ width: '40%', marginTop: 10, backgroundColor: 'transparent', height: hp(4), }}
                            textStyle={{ fontSize: FontSize(12), color: 'blue' }} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
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
        paddingVertical: hp(2),
        borderRadius: hp(2),
        alignItems: 'center',
        width: wp(80),
    },
    viewStyle: {
        height: 'auto',
        marginVertical: 5,
        width: '100%',
    },
})

export default AppLockModal