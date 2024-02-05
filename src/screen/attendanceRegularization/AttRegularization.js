import { React, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    Platform,
    TouchableOpacity,
    View
} from 'react-native';
import CustomText from '../../component/atoms/CustomText';
import MeetingHomeHeader from '../../component/header/MeetingHeader';
import AppLoader from '../../utils/AppLoader';
import AppString from '../../utils/AppString';
import { styles } from './Style';
import useApiEffect from '../../hooks/useApiEffect';
import AssetsImages from '../../utils/AssetsImages';
import NavString from '../../utils/NavString';
import RegularizationBottomSheet from './RegularizationBottomSheet';
import { ATTENDANCE_REGULARIZATION } from '../../services/ApiEndPoint';
import moment from 'moment';
import { convertTimeToUTC, getTimeDuration } from '../../utils/Constant';
import { useIsFocused } from '@react-navigation/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { GREY } from '../../theme/Colors';


let selectedType = ''
const AttRegularization = ({ navigation }) => {

    const { makeApiRequest, loading } = useApiEffect()
    const [isFilterSheetVisible, setIsFilterSheetVisible] = useState(false);
    const [defaultHandleTab, setDefaultHandleTab] = useState(false);
    const [listData, setListData] = useState([]);
    const [pendingListData, setPendingListData] = useState([]);
    const [requestListData, setRequestListData] = useState([]);

    const [selectedFilterData, setSelectedFilterData] = useState(null)
    const [filterData, setFilterData] = useState('monthly')
    const daysData = ['This Month', 'Last Month']
    // const typeData = ['Approved', 'Reject']

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused)
            AttendanceRegularizationListAPI()
    }, [isFocused, filterData])

    // useEffect(() => {
    //     AttendanceRegularizationListAPI()
    // }, [selectedFilterData])

    const getFilter = (index) => {
        // if (index == 0) {
        //     return 'weekly'
        // } else 
        if (index == 0) {
            return 'monthly'
        } else if (index == 1) {
            return 'lastmonth'
        }
    }

    {/* Get Meeting Details API */ }
    async function AttendanceRegularizationListAPI() {
        const body = {
            days: filterData != null ? filterData : null
        }
        const apiData = await makeApiRequest({ url: ATTENDANCE_REGULARIZATION, method: 'POST', isToken: true, data: body });
        console.log('response ------------------>', JSON.stringify(apiData?.data));
        if (apiData?.status == true) {
            var list = []

            apiData?.data.reverse().map((data) => {
                if (!(data?.action == '6' && data?.Attendance_report_leave == null)) {
                    list.push(data)
                }
            })
            setListData(list)
            setPendingListData(list?.filter((item) => item?.Attendance_report_leave?.UserAppliedLeave?.status == 1))
            setRequestListData(list?.filter((item) => item?.Attendance_report_leave == null))
        }
    }

    const TabNavigation = ({ tabItemOnPress, setDefaultHandleTab, tabClick }) => {
        const tabs = [
            { id: 'All', label: AppString.ALL },
            { id: 'Request', label: AppString.REQUEST },
            { id: 'Pending', label: AppString.PENDING },
        ];
        const [activeTab, setActiveTab] = useState('All');

        useEffect(() => {
            handleDefaultTab()
        })

        const handleTabChange = tabId => {
            setActiveTab(tabId);
            {/* We are passing this function for set state defaultHandleTab to default value false */ }
            tabClick(tabId)
        };

        const handleDefaultTab = () => {
            if (setDefaultHandleTab) {
                {/* we are set first tab every time cancel request or submit request */ }
                setActiveTab('All');
            }
        }

        const getType = (status) => {
            if (status == 0) {
                return <CustomText style={{ color: '#FC7D75', fontSize: 12, fontWeight: 400 }}>A/LWP</CustomText>
            } else if (status == 3) {
                return <CustomText style={{ color: '#FFC670', fontSize: 12, fontWeight: 400 }}>Pending</CustomText>
            }
            // else if (status == 4) {
            //     return <CustomText style={{ color: '#FFC670', fontSize: 12, fontWeight: 400 }}>Pending</CustomText>
            // }
        }

        const getTime = (time) => {
            if (time == null) {
                return '--'
            }
            return convertTimeToUTC(time)
        }

        const ListView = ({ item, index }) => {
            var hourRequired = parseInt(item?.total_hr.split(":")[0])
            // console.log('item?.total_hr ', item.date, hourRequired);
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        //console.log('item?.status----->', item?.status);
                        //if (item?.status == 0 || item?.status == 3) {
                        if (item?.punching_out == null || hourRequired < 8) {
                            navigation.navigate(NavString.REQUEST_REGULARIZATION, { data: item })
                        }
                    }}>
                    <View style={{
                        paddingVertical: 10, flexDirection: 'row', elevation: 2, shadowOpacity: 0.3,
                        shadowOffset: { width: 0, height: 0 }, alignContent: 'center',
                        marginHorizontal: 14, marginVertical: 10, borderRadius: 5, backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <CustomText style={{
                                color: '#000000', fontSize: 14, fontWeight: '500',
                                marginTop: 2, width: 72, textAlign: 'center'
                            }}>{moment(item.date, 'yyyy-MM-D').format('D')}</CustomText>
                            <CustomText style={{
                                color: '#000000', fontSize: 14, fontWeight: '500',
                                marginTop: 6, width: 72, textAlign: 'center'
                            }}>{moment(item.date, 'yyyy-MM-D').format('ddd')}</CustomText>
                            <CustomText style={{
                                color: '#000000', fontSize: 14, fontWeight: '500',
                                marginTop: 6, width: 72, textAlign: 'center'
                            }}>{moment(item.date, 'yyyy-MM-D').format('MMM')}</CustomText>
                        </View>
                        <View style={{ width: 1, backgroundColor: '#D1D1D1', marginVertical: 5 }}></View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 17, marginRight: 46, flex: 1 }}>
                                <View style={{}}>
                                    <CustomText style={{ color: '#1D1B1B', fontSize: 12, fontWeight: 400 }}>In Time</CustomText>
                                    <CustomText style={{ color: '#1D1B1B', fontSize: 12, fontWeight: 400, marginTop: 4 }}>{getTime(item?.punching_in)}</CustomText>
                                </View>
                                <View style={{}}>
                                    <CustomText style={{ color: '#1D1B1B', fontSize: 12, fontWeight: 400 }}>Out Time</CustomText>
                                    <CustomText style={{ color: '#1D1B1B', fontSize: 12, fontWeight: 400, marginTop: 4 }}>{getTime(item?.punching_out)}</CustomText>
                                </View>
                                <View style={{}}>
                                    <CustomText style={{ color: '#1D1B1B', fontSize: 12, fontWeight: 400 }}>Hours</CustomText>
                                    <CustomText style={{
                                        color: '#1D1B1B', fontSize: 12, fontWeight: 400,
                                        marginTop: 4
                                    }}>{getTimeDuration(item?.punching_in, item?.punching_out)}</CustomText>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, marginLeft: 17, marginRight: 14, flex: 1 }}>
                                {(item?.punching_out === null || hourRequired < 8) && item?.Attendance_report_leave?.UserAppliedLeave?.leave_type_id != 0 ? < View style={{ flexDirection: 'row' }}>
                                    <CustomText style={{ color: '#88898A', fontSize: 12, fontWeight: 400 }}>Att. Marked as : </CustomText>
                                    {/* {getType(item)} */}
                                    <CustomText style={{ color: '#FC7D75', fontSize: 12, fontWeight: 400 }}>A/LWP</CustomText>
                                </View> :
                                    <View style={{ flexDirection: 'row' }}>
                                        <CustomText style={{ color: '#88898A', fontSize: 12, fontWeight: 400 }}>Status : </CustomText>
                                        {/* {getType(item?.Attendance_report_leave?.UserAppliedLeave?.status)} */}
                                        {item?.Attendance_report_leave?.UserAppliedLeave?.status == 1 ?
                                            <CustomText style={{ color: '#FFC670', fontSize: 12, fontWeight: 400 }}>Pending</CustomText>
                                            : <CustomText style={{ color: '#05A015', fontSize: 12, fontWeight: 400 }}>Approved</CustomText>}
                                    </View>}

                                {item?.punching_out == null || hourRequired < 8 ? <Image style={{ height: 20, width: 20 }} source={AssetsImages.RIGHT_ARROW}></Image> : null}
                            </View>
                        </View>

                    </View>
                </TouchableOpacity >
            )
        }

        // Api Calling Here
        // AND SAVED ALL PROFILE RESPONSE INTO USER PROFILE DATA.
        return (
            <View style={styles.container}>
                <View style={styles.tabBarContainer}>
                    {tabs?.map(tab => (
                        <TouchableOpacity
                            key={tab.id}
                            style={[
                                styles.tabButton,
                                tab.id === activeTab ? styles.activeTab : null,
                            ]}
                            onPress={() => handleTabChange(tab.id)}>
                            <CustomText
                                style={[
                                    tab?.id === activeTab ? styles.activetabText : styles.tabText,
                                    tab?.id === activeTab ? styles.activeTextColor : styles.InactiveTextColor,
                                ]}
                                children={tab.label}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                {activeTab === 'All' && (

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={listData}
                        renderItem={ListView}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: heightPercentageToDP(60) }}>
                                <CustomText children={'No Record Found'} style={{ fontSize: 12, color: GREY }} />
                            </View>
                        }
                    />

                )}
                {activeTab === 'Request' && (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={requestListData}
                        renderItem={ListView}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: heightPercentageToDP(60) }}>
                                <CustomText children={'No Record Found'} style={{ fontSize: 12, color: GREY }} />
                            </View>
                        }
                    />
                )}
                {activeTab === 'Pending' && (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={pendingListData}
                        renderItem={ListView}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: heightPercentageToDP(60) }}>
                                <CustomText children={'No Record Found'} style={{ fontSize: 12, color: GREY, }} />
                            </View>
                        }
                    />
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>

            <MeetingHomeHeader
                headerText={'Att. Regularization'}
                filter={true}
                icon={'filter'}
                onFilterClick={() => {
                    setIsFilterSheetVisible(true)
                }}
            />

            <TabNavigation setDefaultHandleTab={defaultHandleTab}
                tabClick={(tabId) => setDefaultHandleTab(false)}
                tabItemOnPress={(item, type) => {
                    selectedType = type
                }}
            />

            <AppLoader isLoading={loading} />
            <RegularizationBottomSheet
                visible={isFilterSheetVisible}
                data={daysData}
                //typeData={typeData}
                onCancel={() => {
                    console.log('cancel');
                    setIsFilterSheetVisible(false)
                }}
                onApplyClick={(filter) => {
                    //console.log('filter ------------', filter);
                    setIsFilterSheetVisible(false);
                    setFilterData(getFilter(filter))
                }
                }
            />
        </View >
    )
}


export default AttRegularization;




