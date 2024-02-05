import {
    View,
    FlatList,
    SectionList,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './Style';
import CustomText from '../../component/atoms/CustomText';
import NavString from '../../utils/NavString';
import { FontName, FontSize } from '../../theme/Fonts';
import CustomSearchBox from '../../component/atoms/CustomSearchBox';
import Task from '../../../assets/images/SVG/Settings/task.svg';
import Connect from '../../../assets/images/SVG/Settings/connect.svg';
import Community from '../../../assets/images/SVG/Settings/community.svg';
import Priority from '../../../assets/images/SVG/Settings/priority.svg';
//App Preferences
import Display from '../../../assets/images/SVG/Settings/display.svg';
import DateTimeSVG from '../../../assets/images/SVG/Settings/dateTime.svg';
import TabBarSVG from '../../../assets/images/SVG/Settings/tabbar.svg';
//App Integration & Permissions
import CalendarSVG from '../../../assets/images/SVG/Settings/calendar.svg';
import SignOut from '../../../assets/images/SVG/Settings/signout.svg';
//
import RightArrow from '../../../assets/images/SVG/Settings/rightArrow.svg';
import Header from '../../component/header/Header';

import AppString from '../../utils/AppString';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { LIGHT_GREY, WHITE } from '../../theme/Colors';
import Delete from '../../../assets/images/SVG/delete.svg';
import TaskModal from '../../component/modal/TaskModal';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../../redux/slices/AuthSlice';
import { useNavigation } from '@react-navigation/native';
import { DELETE_ACCOUNT, LOGOUT } from '../../services/ApiEndPoint';
import useApiEffect from '../../hooks/useApiEffect';
import FooterComponent from './FooterComponent';
import { handleStackNavigation } from '../../utils/Constant';
import { logoutSession } from '../../redux/slices/TokenSlice';
import { CommonActions } from '@react-navigation/native';
import { removeAnnouncement } from '../../redux/slices/OnboardingSlice';
import AppLoader from '../../utils/AppLoader';


const Settings = () => {
    const navigation = useNavigation()
    const [searchFlag, setSearchFlag] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const dispatch = useDispatch();
    const { makeApiRequest, loading } = useApiEffect()

    const Log_Out = () => {
        //setIsLogout(false)
        //setIsVisible(false)
        dispatch(logoutSuccess())
        dispatch(logoutSession())
        dispatch(removeAnnouncement())
        setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: NavString.AUTH_STACK,
                            state: {
                                routes: [{ name: NavString.LOGIN }],
                            },
                        },
                    ],
                })
            );
        }, 300);
    }

    const SECTION = [
        // {
        //     itemHeaderId: 1,
        //     title: 'Notification Preferences',
        //     data: [
        //         {
        //             list: [
        //                 {
        //                     id: 1,
        //                     image: <Task width={40} />,
        //                     name: NavString.TASK_MANAGER,
        //                     subName: 'All Notifications',

        //                 },
        //                 {
        //                     id: 2,
        //                     image: <Connect width={40} />,
        //                     name: NavString.CONNECT,
        //                     subName: 'All Notifications',

        //                 },
        //                 {
        //                     id: 3,
        //                     image: <Community width={40} />,
        //                     name: NavString.COMMUNITY,
        //                     subName: 'All Notifications',

        //                 },
        //                 {
        //                     id: 4,
        //                     image: <Priority width={40} />,
        //                     name: NavString.PRIORITY_SETTINGS,
        //                     subName: 'Default',

        //                 }
        //             ],
        //         },
        //     ],
        // },
        // {
        //     itemHeaderId: 2,
        //     title: 'App Preferences',
        //     data: [
        //         {
        //             list: [
        //                 {
        //                     id: 5,
        //                     image: <Display width={40} />,
        //                     name: NavString.DISPLAY_MODE,
        //                     subName: 'System',

        //                 },
        //                 {
        //                     id: 6,
        //                     image: <DateTimeSVG width={40} />,
        //                     name: NavString.DATE_TIME_FORMAT,
        //                     subName: 'System',

        //                 },
        //                 {
        //                     id: 7,
        //                     image: <TabBarSVG width={40} />,
        //                     name: NavString.TAB_BAR,
        //                     subName: 'System',

        //                 },
        //             ],
        //         },
        //     ],
        // },
        {
            itemHeaderId: 2,
            title: 'App Integration & Permissions',
            data: [
                {
                    list: [
                        // {
                        //     id: 8,
                        //     image: <CalendarSVG width={40} />,
                        //     name: NavString.CALENDAR,
                        //     subName: 'Google Calendar',

                        // },
                        {
                            id: 9,
                            image: <Delete width={40} />,
                            name: 'Delete Accout',
                            subName: '',
                            onPress: () => { setIsVisible(true) }
                        },
                        {
                            id: 10,
                            image: <SignOut width={40} />,
                            name: NavString.SIGN_OUT,
                            subName: '',
                            onPress: () => { setIsLogout(true) }

                        }
                    ],
                },
            ],
        },
    ];


    async function DELETE_ACCOUNT_API() {
        const apiData = await makeApiRequest({ url: DELETE_ACCOUNT, method: 'POST', isToken: true, data: {} });
        if (apiData?.status == true) {
            Log_Out()
        } else {
            console.log('Api Error: ', apiData)
        }
    }
    const logoutAPI = async () => {
        setIsLogout(false)
        const apiData = await makeApiRequest({ url: LOGOUT, method: 'POST', isToken: true });
        if (apiData?.status == true) {
            Log_Out()
        } else {
            console.log("Api Error: ", apiData);
        }
    }


    const RenderItemHorizontal = ({ item, index }) => {
        return (
            <KeyboardAwareScrollView
                behavior={Platform.OS === 'ios' ? 'position' : 'undefined'}
                style={{ marginBottom: heightPercentageToDP(1) }}>

                <TouchableOpacity activeOpacity={0.7} style={styles.rowStyle} onPress={item.onPress}>
                    <View style={styles.startViewStyle}>
                        {item?.image}
                        <CustomText
                            children={item?.name}
                            fontSize={FontSize(13)}
                            style={{ alignSelf: 'center', fontFamily: FontName.Gordita_Regular }}
                        />
                    </View>
                    <View style={styles.endViewStyle}>
                        <CustomText
                            children={item?.subName}
                            fontSize={FontSize(13)}
                            style={{ alignSelf: 'center', fontFamily: FontName.Gordita_Regular, color: LIGHT_GREY }}
                        />
                        <RightArrow width={30} />
                    </View>
                </TouchableOpacity>
                {/* <View style={styles.separatorBottom}></View> */}
            </KeyboardAwareScrollView >
        );
    };

    // Horizontal List set Banner's
    // eslint-disable-next-line react/no-unstable-nested-components
    const ListHeader = ({ item }) => {
        return (
            <View>
                <FlatList
                    data={item.list}
                    renderItem={RenderItemHorizontal}
                    nestedScrollEnabled
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(itemData, index) => {
                        return itemData.id;
                    }}
                    style={styles.backgroundFlatList}
                    ItemSeparatorComponent={<View style={styles.separatorBottom}></View>
                    } // Use your custom separator component

                />
                {searchFlag ? <CustomSearchBox /> : null}
            </View>
        );
    };

    // Title Header Name Set
    // eslint-disable-next-line react/no-unstable-nested-components
    const RenderSectionHeader = ({ section }) => {
        return (
            <CustomText
                children={section.title}
                style={{
                    marginStart: 10, marginTop: 20, marginBottom: 8, fontSize: FontSize(16), fontFamily: FontName.Gordita_Medium,
                }} />
        );
    };

    return (
        <View style={styles.container}>
            <Header title={AppString.SETTINGS} />
            <SectionList
                sections={SECTION}
                renderItem={ListHeader}
                renderSectionHeader={RenderSectionHeader}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                stickySectionHeadersEnabled={false}
                ListFooterComponent={<FooterComponent />}
            />

            <TaskModal isVisible={isLogout} onPress={logoutAPI} onCancel={() => setIsLogout(false)} text='Are you sure you want to Log Out?' />
            <TaskModal isVisible={isVisible} onPress={DELETE_ACCOUNT_API} onCancel={() => setIsVisible(false)} text='Are you sure you want to Delete your Account?' type={AppString.DELETE} />
            <AppLoader isLoading={loading} />

        </View>
    );
};

export default Settings
