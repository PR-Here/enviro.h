import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from 'react-native-responsive-screen';
import HomeBlack from '../../../../assets/images/SVG/gurukul-homeblack.svg';
import HomeGray from '../../../../assets/images/SVG/gurukul-homegray.svg';
import { BACKGROUND_COLOR_DASHBOARD_ICON, PRIMARY_COLOR, WHITE } from '../../../theme/Colors';
import NavString from '../../../utils/NavString';

import ConnechH from '../../../../assets/images/SVG/app_logo.svg';
import CoursesBlack from '../../../../assets/images/SVG/courses_black.svg';
import CoursesGrey from '../../../../assets/images/SVG/courses_grey.svg';
import ProfileBlack from '../../../../assets/images/SVG/profile_black.svg';
import ProfileGrey from '../../../../assets/images/SVG/profile_grey.svg';
import CustomText from '../../../component/atoms/CustomText';
import { FontSize } from '../../../theme/Fonts';

const GurukulBottomBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }}>
                <View style={{ alignItems: 'center', marginStart: 10, marginEnd: 5 }}>
                    <ConnechH height={40} width={40} style={{ marginStart: 10, marginRight: widthPercentageToDP(5) }} />
                </View>
            </TouchableOpacity>
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
                    // if (route.name == NavString.CATEGORIES_DETAILS) {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                    // }
                };

                return (
                    <TouchableHighlight
                        underlayColor={BACKGROUND_COLOR_DASHBOARD_ICON}
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={styles.viewStyle}>
                        {/* Tab Button Images with center icon changes */}
                        {label === NavString.GURUKUL_STACK ? (
                            isFocused ? <View style={{ alignItems: 'center' }}>
                                <HomeBlack height={24} width={24} style={{ margin: 12 }} />
                                <CustomText children={"Home"} style={styles.textActiveStyle} />
                            </View> : <View style={{ alignItems: 'center' }}>
                                <HomeGray height={24} width={24} style={{ margin: 12 }} />
                                <CustomText children={"Home"} style={styles.textInActiveStyle} />
                            </View>
                        ) : label === NavString.ALL_COURSES ? (
                            isFocused ? <View style={{ alignItems: 'center' }}>
                                <CoursesBlack height={24} width={24} style={{ margin: 12 }} />
                                <CustomText children={"Courses"} style={styles.textActiveStyle} />
                                <View style={{ width: 5, height: 3, backgroundColor: PRIMARY_COLOR, marginTop: 3 }} />
                            </View> : <View style={{ alignItems: 'center' }}>
                                <CoursesGrey height={24} width={24} style={{ margin: 12 }} />
                                <CustomText children={"Courses"} style={styles.textInActiveStyle} />
                            </View>
                        ) : label === NavString.MARKETING_LEADERSHIP ? (
                            isFocused ? <View style={{ alignItems: 'center' }}>
                                <ProfileBlack height={24} width={24} style={{ margin: 12 }} />
                                <CustomText children={"Profile"} style={styles.textActiveStyle} />
                            </View> : <View style={{ alignItems: 'center' }}>
                                <ProfileGrey height={24} width={24} style={{ margin: 12 }} />
                                <CustomText children={"Profile"} style={styles.textInActiveStyle} />
                            </View>
                        ) : ''}
                    </TouchableHighlight>

                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: WHITE,
        alignItems: 'center',
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
        color: '#262626'
    },
    textInActiveStyle: {
        marginTop: -12,
        fontSize: FontSize(10),
        color: '#6F6F6F'
    }
});

export default GurukulBottomBar;
