import React from 'react';
import { View, Modal, StyleSheet, Image, Vibration } from 'react-native';
import CustomButton from '../atoms/CustomButton';
import CustomText from '../atoms/CustomText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PRIMARY_COLOR, WHITE } from '../../theme/Colors';
import AppString from '../../utils/AppString';
import { FontName, FontSize } from '../../theme/Fonts';
import HapticFeedback from 'react-native-haptic-feedback';

const TaskModal = ({
  isVisible,
  text = 'Are you sure want to "Accept"?',
  onPress,
  onCancel,
  type
}) => {
  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isVisible}
        onRequestClose={onPress}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            {type === AppString.DELETE ?
              <Image
                source={require("../../../assets/images/GIF/trash.gif")}
                style={styles.imageStyle} />
              : type === AppString.LOGOUT ?
                <Image
                  source={require("../../../assets/images/GIF/loading.gif")}
                  style={styles.imageStyle} />
                : type === AppString.REJECT ?
                  <Image
                    source={require("../../../assets/images/GIF/invalid.gif")}
                    style={styles.imageStyle} />
                  : type === AppString.SUCESS ?
                    <Image
                      source={require("../../../assets/images/GIF/approved.gif")}
                      style={styles.imageStyle} />
                    : type === AppString.FAILED ?
                      <Image
                        source={require("../../../assets/images/GIF/invalid.gif")}
                        style={styles.imageStyle} />
                      : type === AppString.CANCEL ?
                        <Image
                          source={require("../../../assets/images/GIF/invalid.gif")}
                          style={styles.imageStyle} /> :
                        type === AppString.DELETE_NOTIFICATION ?
                          <Image
                            source={require("../../../assets/images/GIF/trash.gif")}
                            style={styles.imageStyle} /> :
                          ""
            }

            <CustomText style={styles.modalText} children={text} />
            <View style={styles.buttonView}>
              {/* Confirm Button */}
              <CustomButton
                style={styles.modalConfirmButton}
                onPress={() => {
                  // Trigger haptic feedback before executing onPress
                  const options = {
                    enableVibrateFallback: true, // fallback to vibration if haptic feedback is not supported
                    ignoreAndroidSystemSettings: false,
                  };

                  // // Trigger haptic feedback
                  HapticFeedback.trigger('impactMedium', options);
                  onPress();
                }}
                title={AppString.CONFIRM}
                textStyle={styles.confirmTextStyle}
              />

              {/* Cancel Button */}
              <CustomButton
                style={styles.modalCancelButton}
                onPress={() => {
                  // Trigger haptic feedback before executing onCancel
                  const options = {
                    enableVibrateFallback: true, // fallback to vibration if haptic feedback is not supported
                    ignoreAndroidSystemSettings: false,
                  };

                  // // Trigger haptic feedback
                  HapticFeedback.trigger('impactMedium', options);
                  onCancel();
                }}
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
  imageStyle: { width: 70, height: 70, resizeMode: "contain", margin: 10 }
});

export default TaskModal;
