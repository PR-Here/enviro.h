import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../theme/Fonts';
import CustomText from '../atoms/CustomText';
import { BACKGROUND_COLOR_DASHBOARD, BLUE, SELECTED_OUTER_COLOR, WHITE } from '../../theme/Colors';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../../assets/images/SVG/back_icon.svg'
import { BACK_WHITE } from '../../utils/AssetsImages';
import WalletImg from '../../../assets/images/SVG/PlanGo/wallet.svg';

const NotificationHeader = ({ headerText = '', actionText = '', onActionPress, isEditable = false, isShowWalletIcon = false, handleBackPress, style, from = 'notification' }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, style]}>
      {/** Back and Text onPress method */}
      <TouchableOpacity onPress={handleBackPress} style={styles.headerContent}>
        {/** Back Button Icon */}
        {
          from == 'punchin' ? <Image resizeMode='contain' style={styles.backImage} source={BACK_WHITE} />
            :
            <BackIcon />}
        {/** Title Text Icon */}
        <CustomText style={styles.headerText} children={headerText} />
      </TouchableOpacity>
      {
        isShowWalletIcon ?
          <TouchableOpacity onPress={onActionPress} style={{ marginEnd: -10 }}>
            <WalletImg />
          </TouchableOpacity> :
          isEditable ? null : <TouchableOpacity onPress={onActionPress} style={styles.actionButton}>
            <CustomText style={styles.actionText} children={actionText} />
          </TouchableOpacity>
      }

    </View >
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
    paddingHorizontal: hp(2),
    backgroundColor: BACKGROUND_COLOR_DASHBOARD,
    height:50
  },

  actionButton: {
    padding: hp(1),
  },
  actionText: {
    fontSize: FontSize(12),
    color: SELECTED_OUTER_COLOR,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: wp(4),
    height: hp(2),
  },
  headerText: {
    fontSize: FontSize(15),
    fontFamily: FontName.Gorditas_Bold,
    marginLeft: hp(0.5),
    fontWeight: '500'
  },
  backImage: {
    width: 20, height: 20,
  }
});

export default NotificationHeader;
