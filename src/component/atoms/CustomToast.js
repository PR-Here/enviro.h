import React from 'react';
import { View, Modal, StyleSheet, Image } from 'react-native';
import CustomButton from '../atoms/CustomButton';
import CustomText from '../atoms/CustomText';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { GREY, PRIMARY_COLOR, WHITE } from '../../theme/Colors';
import AppString from '../../utils/AppString';
import { FontSize } from '../../theme/Fonts';
import AssetsImages from '../../utils/AssetsImages';

const CustomToast = ({
  isVisible,
  text,
  onPress,
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
            <Image source={type == true ? AssetsImages.ROOM_CHECK : AssetsImages.CROSS} style={[styles.icon, { borderColor: type == true ? '#4ED063' : 'gray' }]} />
            <CustomText style={styles.modalText} children={text} />
            <View style={styles.buttonView}>
              {/* Confirm Button */}
              <CustomButton
                style={styles.modalConfirmButton}
                onPress={onPress}
                title={AppString.OK}
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
    padding: heightPercentageToDP(4),
    borderRadius: heightPercentageToDP(3),
    alignItems: 'center',
    width: widthPercentageToDP(80),
  },
  modalText: {
    fontSize: FontSize(14),
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 20
  },
  modalCancelButton: {
    backgroundColor: GREY,
    borderRadius: 5,
    width: widthPercentageToDP(25),
    fontSize: FontSize(12),
    height: heightPercentageToDP(5),
    justifyContent: 'center',
    marginTop: 0,
  },
  modalConfirmButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 5,
    width: widthPercentageToDP(25),
    fontSize: FontSize(12),
    height: heightPercentageToDP(5),
    justifyContent: 'center',
    marginTop: 0,
  },
  buttonView: {
    width: widthPercentageToDP(60),
    marginTop: heightPercentageToDP(2),
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    alignSelf: 'center',
    height: 30,
    width: 30,
    borderWidth: 1,
    borderRadius: 15
  }
});

export default CustomToast;
