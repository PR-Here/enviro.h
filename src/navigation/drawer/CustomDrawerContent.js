// CustomDrawerContent.js
import React from 'react';
import {
  View,
  Share,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import DrawerHeader from './DrawerHeader';
import NavString from '../../utils/NavString';
import CustomText from '../../component/atoms/CustomText';
import { useNavigation } from '@react-navigation/native';
import { DrawerItemJson } from '../../../assets/json/DrawerItemJson';
import { FontSize } from '../../theme/Fonts';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { LINE_COLOR } from '../../theme/Colors';
import { onShare, showAlert } from '../../utils/Constant';

const CustomDrawerContent = () => {
  const navigation = useNavigation();

  const handleAlertPress = () => {
    navigation.navigate(NavString.LOGIN);
  };

  const handleItemClick = item => {
    if (item.action === 'logout') {
      handleAlertPress();
    } else if (item.action === 'share') {
      onShare(handleAlertPress);
    } else navigation.navigate(item?.screenName);
  };

  return (
    <DrawerContentScrollView style={{ marginTop: -10 }}>
      <DrawerHeader
        imageUri="URL_OF_YOUR_IMAGE"
        name="John Doe"
        role="App Developer"
      />
      {DrawerItemJson.map(item => (
        <TouchableOpacity key={item.key} onPress={() => handleItemClick(item)}>
          <View style={styles.view}>
            {/* Icon */}
            <Image
              resizeMode="contain"
              source={item.icon}
              style={styles.iconImage}
            />
            {/* Label */}
            <CustomText style={styles.labelText} children={item?.label} />
          </View>
          {/* Line */}
          <View style={styles.line}></View>
        </TouchableOpacity>
      ))}
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: heightPercentageToDP(2),
    marginHorizontal: heightPercentageToDP(2),
  },
  labelText: {
    fontSize: FontSize(14),
    marginLeft: heightPercentageToDP(2),
  },
  iconImage: {
    marginRight: heightPercentageToDP(2),
    width: widthPercentageToDP(5),
    height: heightPercentageToDP(3),
  },
  line: {
    height: 1,
    backgroundColor: LINE_COLOR,
  },
});
