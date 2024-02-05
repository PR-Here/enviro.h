import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';
import { styles } from './Style';
import CustomText from '../../../component/atoms/CustomText';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { INACTIVE_COLOR, WHITE } from '../../../theme/Colors';
import MeetingHomeHeader from '../../../component/header/MeetingHeader';
import NavString from '../../../utils/NavString';
//import PagerView from 'react-native-pager-view';
import useApiEffect from '../../../hooks/useApiEffect';
import { CANCELLED_LEAVE, GET_LEAVE_BALANCE_DATA, SUBMIT_SAVED_LEAVE, DELETE_SAVE_LEAVE, GET_LEAVE_TYPE } from '../../../services/ApiEndPoint';
import AppLoader from '../../../utils/AppLoader';
import LeaveRequestModal from './modal/LeaveRequestModal';
import AppString, { CASUAL_LEAVE, EARNED_LEAVE, LEAVES_BALANCE, LEAVE_REQUEST, LEAVE_REQUEST_PLUS, LEAVE_TAKEN, OPTIONAL_LEAVE, SICK_LEAVE, TOTAL_LEAVE } from '../../../utils/AppString';
import LeaveTabNavigation from '../../../navigation/topTabBar/leaveModuleTabBar/leaveTabNavigation';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import TaskModal from '../../../component/modal/TaskModal';
import { ShowToast } from '../../../utils/Constant';
//import { SafeAreaView } from 'react-native-safe-area-context';
import FilterLeave from './modal/filterScreen/FilterLeave';

const Tab = createMaterialTopTabNavigator();

let selectedType = ''
let cancelledLeaveId = null
let buttonState = -1
let selectedLeaveId = null
let selectedStatus = null
let selectedLeaveTypeId = null

const LeaveDashboard = ({ navigation, data }) => {

    const [isFilterSheetVisible, setIsFilterSheettVisible] = useState(false);
    const { makeApiRequest, loading } = useApiEffect()
    const [leaveBalance, setLeaveBalance] = useState([])
    const [visible, setVisible] = useState(false);
    const [cancelvisible, setCancelvisible] = useState(false);
    const [defaultHandleTab, setDefaultHandleTab] = useState(false);
    const [leaveData, setLeaveData] = useState({})
    const [selectedFilterData, setSelectedFilterData] = useState({})

    const [filterList, setFilterList] = useState([])



    const handleBottomNavigationPopup = () => {
        setIsFilterSheettVisible(false);
    }

    const getMessage = () => {
        if (buttonState == 0) {
            return 'Are you sure you want to cancel this leave?'

        } else if (buttonState == 1) {
            return 'Are you sure you want to submit this leave?'

        } else if (buttonState == 2) {
            return 'Are you sure you want to delete this leave?'


        }
    }

    var isFocus = useIsFocused()

    useEffect(() => {
        // console.log('hello------->')
        setDefaultHandleTab(false)
        async function GET_LEAVE_BALANCE() {
            const apiData = await makeApiRequest({ url: GET_LEAVE_BALANCE_DATA, method: 'GET', isToken: true, showProgress: false });
            //console.log('helloNewData----------->', apiData);
            if (apiData?.status == true) {

                setLeaveBalance(filterLeaveBalanceData(apiData?.data))

            } else {
                console.log("PROFILE API ERROR: ", apiData)
            }
        }
        GET_LEAVE_BALANCE()

        async function GET_LEAVE_TYPES() {
            const apiData = await makeApiRequest({ url: GET_LEAVE_TYPE, method: 'GET', isToken: true, showProgress: true });

            if (apiData?.status == true) {
                setFilterList(filterLeaveTypesData(apiData?.data))
            } else {
                console.log("PROFILE API ERROR: ", apiData)
            }
        }
        GET_LEAVE_TYPES()
    }, [defaultHandleTab, isFocus])


    useEffect(() => {
        setDefaultHandleTab(true)
    }, [selectedFilterData])

    const toggleBottomNavigationView = () => {
        setVisible(!visible);
    };

    const toggleBottomNavigationViewCancel = () => {
        setCancelvisible(!cancelvisible);
    };
    // Api Calling Here
    // AND SAVED ALL PROFILE RESPONCE INTO USER PROFILE DATA.

    // useFocusEffect(

    //     React.useCallback(() => {
    //         // This code will run when the screen gains focus





    //         return () => {
    //             // This cleanup function will run when the screen loses focus

    //         };
    //     }, [defaultHandleTab])
    // );


    {/* Leave type data Object Conversion */ }
    const filterLeaveTypesData = (list) => {
        let leaveData = []
        let types = []
        let subTypes = []



        list?.type?.map(item => {
            types.push({
                name: item?.leave_type_name,
                id: item?.leave_type_id
            })
        })

        list?.subtypes?.map(item => {
            subTypes.push({
                name: item?.slot_name,
                id: item?.id
            })
        })

        leaveData.push({ types: types })
        leaveData.push({ SubTypes: subTypes })
        leaveData.push({
            Approvals: [
                {
                    id: 1,
                    name: 'Approval',
                    status: 2

                },
                {
                    id: 2,
                    name: 'Pending',
                    status: 1

                },
                {
                    id: 3,
                    name: 'Rejected',
                    status: 3
                }

            ]
        })


        return leaveData

    }


    {/* Leave Balnace type data Object Conversion */ }
    const filterLeaveBalanceData = (list) => {
        let leaveBalanceData = []
        let i = 1;


        //console.log(list)


        list?.leavebalance?.map(item => {
            if (i < 5) {
                leaveBalanceData.push({
                    leave_type_name: item?.leave_type_name,
                    leave_balance: parseFloat(item?.EmpLeaveBal?.actual_bal).toFixed(2),
                })
            }

            i++;
        })

        list?.totalLeavesbal?.map(item => {
            leaveBalanceData.push({
                leave_type_name: 'Total Leave',
                leave_balance: parseFloat(item?.total_leaves).toFixed(2),
            })
        })

        list?.leavetakenbal?.map(item => {
            let takeLeave = (item?.leave_balance - item?.actual_bal).toFixed(2)
            leaveBalanceData.push({
                leave_type_name: 'Taken Leave',
                leave_balance: takeLeave,
            })
        })


        return leaveBalanceData

    }





    const DashboardView = ({ count, title, textColor }) => {
        return (

            <View style={[styles.dashboardItemContainer]}>

                <View style={styles.dashboardViewInnerContainer}>
                    <CustomText children={count} style={[styles.dashboardViewTitle, { color: textColor }]} />
                    {/* <Image source={image} style={styles.dashboardViewImage} /> */}
                </View>

                <CustomText children={title} style={styles.dashboardViewValue} />

            </View>

        )
    }

    async function SUBMIT_SAVE_LEAVE(leaveId1, status1, leaveTypeId1) {

        const body = {
            status: 1,
            leave_id: leaveId1,
            leave_type_id: leaveTypeId1
        }
        const apiData = await makeApiRequest({ url: SUBMIT_SAVED_LEAVE, method: 'POST', isToken: true, data: body, showProgress: true });
        if (apiData?.status == true) {
            ShowToast(`${apiData?.message}`)
            setDefaultHandleTab(true)
        } else {
            console.log("PROFILE API ERROR: ", apiData)
            ShowToast(`${apiData?.message}`)
        }
    }

    async function DELETE_SAVED_LEAVE(leaveId) {

        const body = {
            leave_id: leaveId,
        }
        const apiData = await makeApiRequest({ url: DELETE_SAVE_LEAVE, method: 'POST', isToken: true, data: body, showProgress: true });
        if (apiData?.status == true) {
            ShowToast(`${apiData?.message}`)
            setDefaultHandleTab(true)
        } else {
            console.log("PROFILE API ERROR: ", apiData)
        }
    }

    async function CANCEL_LEAVE(leaveId) {

        const body = {
            leave_id: leaveId,
        }
        const apiData = await makeApiRequest({ url: CANCELLED_LEAVE, method: 'POST', isToken: true, data: body, showProgress: true });
        if (apiData?.status == true) {
            ShowToast(`${apiData?.message}`)
            setDefaultHandleTab(true)
        } else {
            console.log("PROFILE API ERROR: ", apiData)
            ShowToast(`${apiData?.message}`)
        }
    }

    return (

        <View style={styles.container}>


            {/* Header */}
            <MeetingHomeHeader
                headerText={'Leave Records'}
                filter={true}
                icon={'filter'}
                onPress={() => {
                    setLeaveBalance([])
                    navigation.goBack()

                }}
                onFilterClick={() => {
                    setIsFilterSheettVisible(!isFilterSheetVisible)
                }}

            />

            {/* Add Leave Section */}
            <View style={styles.addLeaveSectionConatiner}>
                <CustomText children={LEAVES_BALANCE} style={styles.leaveBalanceText} />

                <TouchableOpacity onPress={() => {

                    navigation.navigate(NavString.NEW_LEAVE, { data: {}, isEdit: false })


                }}>
                    <CustomText children={LEAVE_REQUEST_PLUS} style={styles.leaveRequestText} />
                </TouchableOpacity>
            </View>

            <View style={styles.pagerViewStyle}>

                <View style={styles.leaveTakenContainer} key={'1'}>
                    <DashboardView count={leaveBalance[4]?.leave_balance == null ? 0.0 : leaveBalance[4]?.leave_balance} title={TOTAL_LEAVE} textColor={WHITE} />
                    <View style={styles.pagerViewDividerStyle} />
                    <DashboardView count={leaveBalance[5]?.leave_balance == null ? 0.0 : leaveBalance[5]?.leave_balance} title={LEAVE_TAKEN} textColor={WHITE} />
                </View>
                <View style={{ backgroundColor: INACTIVE_COLOR, width: '95%', height: 1, alignSelf: 'center' }} />
                <View style={styles.SickLeaveContainer} key={'2'}>
                    <DashboardView count={
                        leaveBalance[0]?.leave_balance
                            ? parseFloat(leaveBalance[0]?.leave_balance).toFixed(2)
                            : 0.0
                    } title={SICK_LEAVE} textColor={WHITE} />
                    <View style={styles.pagerViewDividerStyle} />
                    <DashboardView count={
                        leaveBalance[1]?.leave_balance
                            ? parseFloat(leaveBalance[1]?.leave_balance).toFixed(2)
                            : 0.0
                    } title={CASUAL_LEAVE} textColor={WHITE} />
                    <View style={styles.pagerViewDividerStyle} />
                    <DashboardView count={leaveBalance[2]?.leave_balance == null ? 0.0 : leaveBalance[2]?.leave_balance} title={EARNED_LEAVE} textColor={WHITE} />
                    <View style={styles.pagerViewDividerStyle} />
                    <DashboardView count={leaveBalance[3]?.leave_balance == null ? 0.0 : leaveBalance[3]?.leave_balance} title={OPTIONAL_LEAVE} textColor={WHITE} />

                </View>
            </View>

            {/* <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: 5 }}>
                <View style={[styles.pagerIndicatorStyle, { backgroundColor: selectedPage == 0 ? BLACK : LIGHTGREY }]}></View>
                <View style={[styles.pagerIndicatorStyle, { backgroundColor: selectedPage == 1 ? BLACK : LIGHTGREY }]}></View>
            </View>
 */}



            {/*Tabs */}

            <LeaveTabNavigation tabItemOnPress={(item, type) => {
                selectedType = type
                setVisible(!visible);
                setLeaveData(item)
            }} setDefaultHandleTab={defaultHandleTab} tabClick={(tabId) => setDefaultHandleTab(false)} selectedFilterData={selectedFilterData} />



            {visible &&
                <LeaveRequestModal
                    visible={visible}
                    onBackButtonPress={toggleBottomNavigationView}
                    onBackdropPress={toggleBottomNavigationView}
                    data={leaveData}
                    onPress={(id, name, deducted_leave) => {
                    }}

                    type={selectedType}
                    OnCancelPress={(leaveId) => {
                        cancelledLeaveId = leaveId
                        buttonState = 0
                        setVisible(!visible)
                        setTimeout(() => {
                            toggleBottomNavigationViewCancel()
                        }, 1000)

                    }}

                    OnSubmitButtom={(leaveId, status, leaveTypeId) => {
                        setVisible(!visible)
                        buttonState = 1
                        selectedLeaveId = leaveId
                        selectedStatus = status
                        selectedLeaveTypeId = leaveTypeId
                        setTimeout(() => {
                            toggleBottomNavigationViewCancel()
                        }, 500)





                    }}

                    onEditButton={(data) => {
                        setVisible(!visible)

                        navigation.navigate(NavString.NEW_LEAVE, { data: data, isEdit: true })

                    }}

                    onDeleteButton={(leaveId) => {
                        buttonState = 2
                        setVisible(!visible)
                        selectedLeaveId = leaveId
                        setTimeout(() => {
                            toggleBottomNavigationViewCancel()
                        }, 500)

                    }}

                />

            }

            {isFilterSheetVisible &&
                <FilterLeave
                    visible={isFilterSheetVisible}
                    onBackButtonPress={handleBottomNavigationPopup}
                    onBackdropPress={handleBottomNavigationPopup}
                    selectedFilterData={selectedFilterData}
                    onApplyClick={(data) => {
                        handleBottomNavigationPopup()
                        setSelectedFilterData(data)

                    }}
                    onClearFilter={(data) => {
                        handleBottomNavigationPopup()
                        setSelectedFilterData(data)
                    }}
                    list={filterList}
                />

            }


            {cancelvisible &&
                <TaskModal
                    isVisible={cancelvisible}
                    text={getMessage()}
                    onPress={() => {
                        if (buttonState == 0) {
                            toggleBottomNavigationViewCancel()
                            CANCEL_LEAVE(cancelledLeaveId)

                        } else if (buttonState == 1) {
                            toggleBottomNavigationViewCancel()
                            SUBMIT_SAVE_LEAVE(selectedLeaveId, selectedStatus, selectedLeaveTypeId)


                        } else if (buttonState == 2) {
                            toggleBottomNavigationViewCancel()
                            DELETE_SAVED_LEAVE(selectedLeaveId)
                        }


                    }}
                    onCancel={toggleBottomNavigationViewCancel}
                    type={buttonState == 0 ? AppString.CANCEL : buttonState == 1 ? AppString.SUCESS : AppString.DELETE}
                />

            }


            <AppLoader isLoading={loading} />
        </View >
    )
}


export default LeaveDashboard;