import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FontName, FontSize} from '../../theme/Fonts';
import {BLACK} from '../../theme/Colors';
import AssetsImages from '../../utils/AssetsImages';
import BadgeComponent from '../atoms/BadgeComponent';
import NavString from '../../utils/NavString';

const DashboardHeader = ({navigation, title}) => {
  const handleMenuPress = () => {};

  const handleBellClick = () => {
    navigation.push(NavString.HOME_NOTIFICATION);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <TouchableOpacity onPress={handleMenuPress} style={styles.backButton}>
        <Image style={styles.backButton} source={AssetsImages.MENU} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {/* Bell Icon */}
      <TouchableOpacity onPress={handleBellClick} style={styles.bellButton}>
        <Image style={styles.backButton} source={AssetsImages.BELL} />
        <BadgeComponent text={'99+'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthPercentageToDP(10),
    height: hp(8),
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    position: 'absolute',
    left: heightPercentageToDP(1),
    top: '50%',
    transform: [{translateY: -12}],
    width: 30,
    height: 30,
  },
  title: {
    fontSize: FontSize(16),
    color: BLACK,
    fontFamily: FontName.Geo_Auto_Regular,
  },
  bellButton: {
    position: 'absolute',
    right: heightPercentageToDP(2),
    top: '50%',
    transform: [{translateY: -12}],
    backgroundColor:'red'
  },
});

export default DashboardHeader;
