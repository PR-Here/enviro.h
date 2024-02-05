import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BACK_ARROW from '../../../assets/images/SVG/backArrowNew.svg';
import FilterBg from '../../../assets/images/SVG/filterwithwhitebg.svg';
import Notification from '../../../assets/images/SVG/notification.svg';
import Download from '../../../assets/images/SVG/download.svg';
import { BLUE, LIGHTWHITE } from '../../theme/Colors';
import { FontName, FontSize } from '../../theme/Fonts';
import AssetsImages from '../../utils/AssetsImages';
import CustomText from '../atoms/CustomText';

const MeetingHomeHeader = ({ headerText, onFilter, icon, onPress, onNotificatinClick, onClickDownload, onFilterClick }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onPress == undefined) {
      navigation.goBack();
    } else {
      onPress()
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleBackPress} style={styles.headerContent}>
        <BACK_ARROW />
        <CustomText style={styles.headerText} children={headerText} />
      </TouchableOpacity>
      {icon === 'filter' ? (
        <TouchableOpacity onPress={onFilterClick} style={styles.filterIconStyle}>
          <FilterBg height={18} width={18} />
        </TouchableOpacity>
      ) :
        (
          null
        )}
      {icon === 'notification' ? (

        <TouchableOpacity onPress={onNotificatinClick} style={{ paddingHorizontal: wp(1.2), paddingVertical: wp(1.2), borderColor: '#EEEEEE', borderWidth: 1, borderRadius: 8, alignSelf: 'center' }}>
          <Notification />
        </TouchableOpacity>
      ) :
        (
          null
        )}
      {icon === 'chat-bot' ? (
        <Image source={AssetsImages.CHAT_BOT} style={{ height: 40, width: 40, }} />
      ) :
        (
          null
        )}
      {icon === 'download' ? (
        <TouchableOpacity onPress={onClickDownload} style={{ paddingHorizontal: wp(1.2), paddingVertical: wp(1.2), borderColor: '#EEEEEE', borderWidth: 1, borderRadius: 8, alignSelf: 'center' }}>

          <Download />
        </TouchableOpacity>
      ) :
        (
          null
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
    paddingHorizontal: hp(2),
    height: hp(8),
    alignItems: 'center'
  },
  actionButton: {
    padding: hp(1),
  },
  actionText: {
    fontSize: FontSize(12),
    color: BLUE,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backIcon: {
    marginRight: hp(1)
  },
  headerText: {
    fontSize: FontSize(16),
    fontFamily: FontName.Gorditas_Bold,
    fontWeight: 'bold',
    marginLeft: wp(1),
    marginTop: Platform.OS == 'ios' ? 3 : 0,
    alignSelf: 'center',
  },
  filterIconStyle: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    borderRadius: wp(100),
    alignSelf: 'center',
    backgroundColor: LIGHTWHITE
  }
});

export default MeetingHomeHeader;
