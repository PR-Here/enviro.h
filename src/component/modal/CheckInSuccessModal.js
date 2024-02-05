import { useEffect, useState } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BLACK, RED, WHITE } from "../../theme/Colors";
import CustomText from '../atoms/CustomText';
import { FontName, FontSize } from '../../theme/Fonts';
import RightCheckIn from '../../../assets/images/SVG/right_checkIn.svg'
import Sound from 'react-native-sound';
import CustomButton from '../atoms/CustomButton';
import { playSound } from '../../utils/SoundManager';
import PunchInSound from '../../../assets/sound/punchIn.mp3';
import QRErrorSound from '../../../assets/sound/qrError.mp3';


const CheckInSuccessModal = ({ visible = false, title, description, punchinTime, handlePopup }) => {

    useEffect(() => {
        setTimeout(() => {
            handlePopup()
        }, 4000);
    })

    useEffect(() => {
        // Call playSound when the screen mounts
        playSound(PunchInSound, () => {
            //console.log('Sound playback finished');
            // Any additional logic to execute after sound playback
        });
    }, []);

    return (
        <View style={styles.mainContainer}>
            <Modal
                transparent={true}
                animationType='slide'
                onRequestClose={()=>handlePopup()}
                visible={visible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <RightCheckIn />
                        <CustomText style={styles.qrscanText} children={title} />
                        <CustomText style={styles.punchInText} children={description} />
                        <CustomText style={styles.punchInTimeText} children={punchinTime} />

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
        backgroundColor: WHITE,
    },
    modalContent: {
        paddingVertical: hp(2),
        borderRadius: hp(2),
        alignItems: 'center',
    },
    viewStyle: {
        height: 'auto',
        marginVertical: 5,
        width: '100%',
    },
    qrscanText: {
        textAlign: 'center', color: BLACK, lineHeight: 25,
        marginTop: 30, fontSize: FontSize(20),
        padding:5
    },
    punchInText: {
        textAlign: 'center', color: BLACK, lineHeight: 22, marginTop: 5,
        fontFamily: FontName.Gordita_Regular, fontWeight: '400'
        , fontSize: FontSize(13)
    },

    punchInTimeText: {
        textAlign: 'center', color: BLACK, lineHeight: 20,
        marginTop: 30, fontSize: FontSize(12),
        fontFamily: FontName.Geo_Auto_Regular
    },
})

export default CheckInSuccessModal