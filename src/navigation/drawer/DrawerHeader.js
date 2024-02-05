import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AssetsImages from '../../utils/AssetsImages';
import {APPLOADER_COLOR, WHITE} from '../../theme/Colors';
import {FontSize} from '../../theme/Fonts';
import CustomText from '../../component/atoms/CustomText';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const DrawerHeader = ({imageUri, name, role}) => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={AssetsImages.PLACEHOLDER}
        style={styles.image}
      />
      <View style={styles.details}>
        <CustomText style={styles.name} children={name} />
        <CustomText style={styles.email} children={role} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: heightPercentageToDP(2),
    backgroundColor: APPLOADER_COLOR,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: heightPercentageToDP(60),
    borderWidth: 1,
    borderColor: WHITE,
    padding: heightPercentageToDP(2),
  },
  details: {
    marginLeft: heightPercentageToDP(2),
  },
  name: {
    fontSize: FontSize(14),
    color: WHITE,
    maxWidth: heightPercentageToDP(20),
  },
  email: {
    color: WHITE,
    fontSize: FontSize(12),
    flexWrap: 'wrap',
    maxWidth: heightPercentageToDP(90),
  },
});
export default DrawerHeader;
