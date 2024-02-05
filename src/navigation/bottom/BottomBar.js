import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  SafeAreaView
} from 'react-native';
import React from 'react';
import { BACKGROUND_COLOR_DASHBOARD_ICON, BLACK, GREEN, GREY, HIGH_LIGHT_COLOR, PRIMARY_COLOR, TEXT_COLOR_ORANGE, WHITE } from '../../theme/Colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import NavString from '../../utils/NavString';
import Home from '../../../assets/images/SVGInactive/home.svg';
import ProjectManage from '../../../assets/images/SVGInactive/project_manager.svg';
import MessageIcon from '../../../assets/images/SVGInactive/message.svg';
import ChatBot from '../../../assets/images/SVGInactive/chatbot.svg';
import Logo from '../../../assets/images/SVGInactive/logo_chat.svg';

import LogoB from '../../../assets/images/SVGOrange/logo_chat.svg';
import HomeO from '../../../assets/images/SVGOrange/home.svg';
import ProjectManageO from '../../../assets/images/SVGOrange/project_manager.svg';
import MessageIconO from '../../../assets/images/SVGOrange/message.svg';
import ChatBotO from '../../../assets/images/SVGOrange/chatbot.svg';
import CustomText from '../../component/atoms/CustomText';
import { FontSize } from '../../theme/Fonts';

const BottomBar = ({ state, descriptors, navigation }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR_DASHBOARD_ICON}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index.toString()}
            style={styles.viewStyle}>
            {/* Tab Button Images with center icon changes */}
            {label === NavString.NEWS_BANNER ? (
              isFocused ? <LogoB height={50} width={50} style={{ margin: 3 }} /> : <Logo height={50} width={50} style={{ margin: 3 }} />
            ) : label === NavString.HOME_STACK ? (
              isFocused ? <View style={{ alignItems: 'center' }}>
                <HomeO height={30} width={30} style={{ marginBottom: 12 }} />
                <CustomText children={"Home"} style={styles.textActiveStyle} />
              </View> : <View style={{ alignItems: 'center' }}>
                <Home height={30} width={30} style={{ marginBottom: 12 }} />
                <CustomText children={"Home"} style={styles.textInActiveStyle} />
              </View>
            ) : label === NavString.COMPANY_POLICY ? (
              isFocused ? <View style={{ alignItems: 'center' }}>
                <ProjectManageO height={30} width={30} style={{ marginBottom: 12 }} />
                <CustomText children={"Project M."} style={styles.textActiveStyle} />
              </View> : <View style={{ alignItems: 'center' }}>
                <ProjectManage height={30} width={30} style={{ marginBottom: 12 }} />
                <CustomText children={"Project M."} style={styles.textInActiveStyle} />
              </View>
            ) : label === NavString.SUPPORT ? (
              isFocused ? <View style={{ alignItems: 'center' }}>
                <MessageIconO height={30} width={30} style={{ marginBottom: 12 }} />
                <CustomText children={"Connect H."} style={styles.textActiveStyle} />
              </View> : <View style={{ alignItems: 'center' }}>
                <MessageIcon height={30} width={30} style={{ marginBottom: 12 }} />
                <CustomText children={"Connect H."} style={styles.textInActiveStyle} />
              </View>
            ) : label === NavString.HUB_STACK ? (
              isFocused ? <View style={{ alignItems: 'center' }}>
                <ChatBotO height={30} width={30} style={{ marginBottom: 12 }} />
                <CustomText children={"Community"} style={styles.textActiveStyle} />
              </View> : <View style={{ alignItems: 'center' }}>
                <ChatBot height={30} width={30} style={{ marginBottom: 12 }} />
                <CustomText children={"Community"} style={styles.textInActiveStyle} />
              </View>
            ) : ''}
          </TouchableHighlight>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#AFB9C7',
    shadowRadius: 18,
    // shadowOpacity: 0.8,
    // shadowOffset: { width: 0, height: 2 },
    paddingVertical: heightPercentageToDP(0.5),
  },
  viewStyle: {
    flex: 1,
    alignItems: 'center',
  },
  iconStyle: {
    height: heightPercentageToDP(4),
    width: widthPercentageToDP(9),
    margin: heightPercentageToDP(1),
    resizeMode: 'contain',
  },
  centerIconStyle: {
    height: heightPercentageToDP(8),
    width: 100, //widthPercentageToDP(10),
    margin: heightPercentageToDP(1),
    resizeMode: 'contain',
  },
  textActiveStyle: {
    marginTop: -12,
    fontSize: FontSize(10),
    color: TEXT_COLOR_ORANGE
  },
  textInActiveStyle: {
    marginTop: -12,
    fontSize: FontSize(10),
    color: BLACK
  }
});

export default BottomBar;
