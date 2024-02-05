import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
  BackHandler,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../../../component/atoms/CustomText';
import { styles } from './Style';
import NotificationHeader from '../../../component/header/NotificationHeader';
import AppString, { APPROVAL, EMP_LEAVE_REQUEST } from '../../../utils/AppString';
import { RM_LEAVE_JSON } from '../../../../assets/json/RmLeaveJson';
import CustomButton from '../../../component/atoms/CustomButton';
import DropDownMessage from '../../../component/atoms/DropDownMessage';
import useApiEffect from '../../../hooks/useApiEffect';
import { GET_APPLIED_LIST, GET_MANAGER_LEAVE_ACTION, GET_MANAGER_LEAVE_REQUESTS } from '../../../services/ApiEndPoint';
import AppLoader from '../../../utils/AppLoader';
import MeetingHomeHeader from '../../../component/header/MeetingHeader';
import { FontName, FontSize } from '../../../theme/Fonts';
import { ShowToast, capitalizeFirstLetter, convertTimeToUTC, getTimeAgo } from '../../../utils/Constant';
import { PLACEHOLDER } from '../../../utils/AssetsImages';
import TaskModal from '../../../component/modal/TaskModal';
import { GREEN, GREY, INACTIVE_COLOR, LIGHTGREY, PRIMARY_COLOR, RED, WHITE } from '../../../theme/Colors';
import Attendence from '../../../../assets/images/SVG/Attendence.svg'
import LeaveApproval from '../../../../assets/images/SVG/leaveApproval.svg'
import AttendenceInactive from '../../../..//assets/images/SVGInactive/AttendenceInactive.svg'
import LeaveApprovalInactive from '../../../../assets/images/SVGInactive/leaveApprovalInactive.svg'
import CheckCircle from '../../../../assets/images/SVG/check-circle.svg'
import Delete from '../../../../assets/images/SVG/trash.svg'
import ThreeDotIcon from '../../../../assets/images/SVG/three_dot_icon.svg'
import CheckBoxTick from '../../../../assets/images/SVG/checkboxtick.svg'

import CheckBoxWhite from "../../../../assets/images/SVG/check_box_wihite.svg";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { MenuProvider } from 'react-native-popup-menu';
import PopUpMenuApproval from '../../../component/modal/PopUpMenu';
import LeaveApprovalModal from '../../../component/modal/LeaveApprovalModal';
import moment from 'moment';
import FilterManageRequest from './FilterManagerRequest';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import CustomSearchBox from '../../../component/atoms/CustomSearchBox';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AttendanceApprovalModal from '../../../component/modal/AttendanceApprovalModal';
import { Button, Snackbar } from 'react-native-paper';
import LeaveTaskModal from '../../../component/modal/LeaveTaskModel';
import { current } from '@reduxjs/toolkit';


let buttonState = -1
let selectedItem = null
let searchedName = ''
let selectedStartDate = ''
let selectedEndDate = ''
let selectedModules = 1
let haveAttandanceRequest = false
let haveLeaveRequest = false

export default function RmLeaveRequest() {
  const navigation = useNavigation();
  const { makeApiRequest, loading } = useApiEffect()
  const [rmLeaveData, setRmLeaveData] = useState([])
  const [selectedModule, setSelectedModule] = useState(1)
  const [numberOfRecord, setNumberOfRecord] = useState(0)
  const [visible, setvisible] = useState(false);
  const [status, setStatus] = useState(1);
  const [position, setPosition] = useState(2);
  const [sideMenudata, setSideMenuData] = useState([])
  const [sideMenuvisible, setSideMenuVisible] = useState(false);
  const [leaveApprovalvisible, setLeaveApprovalvisible] = useState(false);
  const [AttandanceApprovalvisible, setAttandanceApprovalvisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [reason, setReason] = useState('')
  const [selectedItemData, setselectedItemData] = useState({})
  const [selectedFilterData, setSelectedFilterData] = useState({ approvalId: 1, statusId: 1, status: 1, statusName: 'Pending' })
  const [filterList, setFilterList] = useState([])
  const [filterVisible, setFilterVisible] = useState(false)
  const [undoVisible, setUndoVisible] = useState(false)
  const [leaveTaskModelVisible, setLeaveTaskModelVisible] = useState(false)

  const [value, setValue] = useState([{
    id: 1,
    name: 'Select All',
    isSelectable: position == 1 ? true : false
  }, {
    id: 2,
    name: 'UnSelect All',
    isSelectable: false
  }, {
    id: 3,
    name: 'Approve All',
    isSelectable: false
  }])





  useEffect(() => {
    if (selectedItems.length > 0 && selectedItems.length == rmLeaveData.length) {
      changeStatusHandler(1)
    }
  }, [selectedItems])

  useEffect(() => {

    const backAction = () => {
      buttonState = -1
      selectedItem = null
      searchedName = ''
      selectedStartDate = ''
      selectedEndDate = ''
      selectedModules = 1
      haveAttandanceRequest = false
      haveLeaveRequest = false
      setSelectedItems([])
      navigation.goBack()

      return true
    }


    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove()

  }, [])


  const hideMenu = (item) => {
    if (item.id == 3) {
      if (selectedItems.length > 0) {
        buttonState = 2
        SET_MANAGER_LEAVE_ACTION()
        changeStatusHandler(2)
      } else {
        ShowToast('Please Select Leaves to Approve')
      }
    } else if (item.id == 1) {
      let array = []
      rmLeaveData.map((item) => {
        var iIDs = []

        if (item.type == 0) {
          item?.data.map((item) => {
            if (item.status == 1) {
              iIDs.push(item.leave_id)
            }
          })
        }

        array.push({ id: item.id, type: item.type, ids: iIDs })
      })
      changeStatusHandler(item.id)
      setSelectedItems(array);
    } else if (item.id == 2) {
      setSelectedItems([]);
      changeStatusHandler(item.id)
    }
    setSideMenuVisible(false);
    setPosition(item.id)
  }

  const showMenu = () => setSideMenuVisible(true);



  const getSelected = leave => {

    return checkItemExist(selectedItems, leave.id)

  };

  const deSelectItems = () => setSelectedItems([]);

  const selectItems = (item) => {

    if (checkItemExist(selectedItems, item.id)) {
      const newListItems = selectedItems.filter(listItem => listItem.id !== item.id);
      if (newListItems.length == 0) {
        changeStatusHandler(2)
      }
      return setSelectedItems([...newListItems]);
    }
    var iIDs = []

    if (item.type == 0) {
      item?.data.map((item) => {
        if (item?.status == 1) {
          iIDs.push(item.leave_id)
        }
      })

    }




    setSelectedItems([...selectedItems, { id: item.id, type: item.type, ids: iIDs }]);
  }

  const checkItemExist = (array, id) => {


    let booleanValue = false

    for (let i = 0; i < array.length; i++) {
      if (array[i].id == id) {
        booleanValue = true
        break;
      }
    }

    return booleanValue

  }



  const handleLongPress = leave => {

    selectItems(leave)
  }


  const handleOnPress = (leave) => {
    if (selectedItems.length) {
      return selectItems(leave)
    } else {
      setselectedItemData(leave)
      if (leave?.type == 0) {
        setAttandanceApprovalvisible(true)
      } else {
        setLeaveApprovalvisible(true)
      }
    }
  }


  useEffect(() => {
    changeStatusHandler(position)

    setFilterList([{
      status: [
        {
          id: 1,
          name: 'Pending',
          status: 1

        },
        {
          id: 2,
          name: 'Approved',
          status: 2

        },
        {
          id: 3,
          name: 'Rejected',
          status: 3
        }
      ]
    },

    {
      Approvals: [
        {
          id: 1,
          name: 'Leave',

        },
        {
          id: 2,
          name: 'Attendance',

        },
        {
          id: 3,
          name: 'Travel',
        }
      ]

    }
    ])
  }, [])


  const changeStatusHandler = (id) => {
    const filterData = value.filter((val) => val.id !== id)
    console.log("filteredData", filterData, id)
    setSideMenuData(filterData)
  }



  const toggleBottomNavigationViewCancel = () => {
    //Toggling the visibility state of the filter modal
    setvisible(!visible);
  };

  const toggleBottomApprovalModal = () => {
    //Toggling the visibility state of the filter modal
    setLeaveApprovalvisible(false);
    //setselectedItemData([])
  };

  const toggleBottomFilterlModal = () => {
    //Toggling the visibility state of the filter modal
    setFilterVisible(!filterVisible);

  };


  const getMessage = () => {
    if (buttonState == 3) {
      return 'Are you sure you want to reject this leave?'

    } else if (buttonState == 2) {
      return 'Are you sure you want to aprrove this leave?'

    } else if (buttonState == 4) {
      return 'Are you sure you want to cancel approved leave?'


    }
  }



  useEffect(() => {
    GET_MANAGER_LEAVE_REQUEST()
  }, [status, selectedModule])

  async function GET_MANAGER_LEAVE_REQUEST() {

    const startDate = selectedStartDate == undefined || selectedStartDate == '' ? {} : { from_date: moment(selectedStartDate).format('YYYY-MM-DD') }

    const endDate = selectedEndDate == undefined || selectedEndDate == '' ? {} : { to_date: moment(selectedEndDate).format('YYYY-MM-DD') }

    const status1 = status == -1 ? {} : { status: status }
    const body = {
      search: searchedName,
      type: selectedModules == -1 ? 1 : selectedModules == 1 ? 2 : selectedModules == 2 ? 3 : 4,
      ...status1,
      ...startDate,
      ...endDate,
    }



    const apiData = await makeApiRequest({ url: GET_MANAGER_LEAVE_REQUESTS, method: 'POST', isToken: true, data: body });
    if (apiData?.status == true) {

      setRmLeaveData(filterManagerData(apiData?.data))
    } else {
      console.log("PROFILE API ERROR: ", apiData)
    }
  }

  async function SET_MANAGER_LEAVE_ACTION() {

    let ids = []



    selectedItems.map((item) => {
      if (item.type == 0) {

        ids.push(...ids, ...item.ids)
      } else {
        ids.push(item.id)
      }


    })


    const body = {
      leave_id: ids,
      status: buttonState,
      reason: reason
      //leave_type_id: selectedItem?.leave_type_id,
      // user_id: selectedItem?.userId
    }

    const apiData = await makeApiRequest({ url: GET_MANAGER_LEAVE_ACTION, method: 'POST', isToken: true, data: body });
    if (apiData?.status == true) {

      setSelectedItems([])
      setReason('')
      GET_MANAGER_LEAVE_REQUEST()
      ShowToast(`${apiData?.message}`)

    } else {
      console.log("PROFILE API ERROR: ", apiData)
      ShowToast(`${apiData?.message}`)
    }
  }



  {/* Manager Leave Listing type data Object Conversion */ }
  const filterManagerData = (list) => {

    let Data = []
    let i = 1;

    const moviesByReleaseYear = list?.reduce((acc, item) => {
      if (item.leave_type_id == 0) {
        const { user_id, leave_type_id, User, ...restData } = item;

        if (restData.status == 1) {
          haveAttandanceRequest = true
        }

        var updated = {
          ...restData,
          isSelected: false
        }
        const group = acc.find((item) => item.id === user_id);
        if (!group) {
          acc.push({
            id: user_id,
            type: leave_type_id,
            userData: User,
            data: [updated],
          });
        } else {
          group.data.push(updated);
        }
      }
      return acc;
    }, []);

    //Data = []
    Data = moviesByReleaseYear


    list?.map(item => {
      let leaveTypeName = ''
      let isHalfDay = false
      let totalDaysAbsence = 0


      if (item?.leave_type_id != 0) {

        leaveTypeName = item?.LeaveTypeModel?.leave_type_name


        if (item.status == 1) {
          haveLeaveRequest = true
        }

        item?.UserAppliedLeavesDates?.map(leaves => {
          if (leaves?.deducted === "0.5") {
            isHalfDay = true
          }
        })


        item?.UserAppliedLeavesDates?.map(leaves => {
          totalDaysAbsence += parseFloat(leaves?.deducted)
        })
        //console.log('item?.s_start_time ->', item?.s_start_time);
        //console.log('item?.s_end_time ->', item?.s_end_time);
        Data.push({
          type: item?.leave_type_id,
          userId: item?.user_id,
          id: item?.leave_id,
          leave_type_id: item?.leave_type_id,
          no_of_days: item?.no_of_days,
          reason: item?.reason,
          from_date: item?.from_date,
          is_half_day: isHalfDay,
          to_date: item?.to_date,
          startTime: item?.s_start_time,
          endTime: item?.s_end_time,
          consumedDate: item?.compensatoryLeave?.date,
          status: item?.status,
          leaveTypeName: leaveTypeName,
          totalDaysAbsence: totalDaysAbsence,
          appliedOnDate: item?.createdAt,
          userData: item?.User,
          userAppliedLeaveDates: item?.UserAppliedLeavesDates,
          leaveTypeModel: item?.LeaveTypeModel,
        })
      }
      i++;
    })

    setNumberOfRecord(Data.length)

    return Data

  }



  const handleRejectClick = (item, value) => {
    buttonState = 3
    selectedItem = item
    var iIDs = []

    if (item.type == 0) {
      item?.data.map((item) => {
        if (value == 2) {
          if (item?.status == 1) {
            iIDs.push(item.leave_id)
          }
        } else {
          if (item.isSelected) {
            iIDs.push(item.leave_id)
          }
        }
      })
    }

    setSelectedItems([{ id: item?.id, type: item?.type, ids: iIDs }])
    //toggleBottomApprovalModal()
    setTimeout(() => {
      // if (value == 2) {
      setLeaveTaskModelVisible(true)
      // } else {
      //   toggleBottomNavigationViewCancel()
      // }

    }, 500);
  }

  const handleAproveClick = (item, value) => {

    buttonState = 2
    selectedItem = item
    var iIDs = []

    if (item.type == 0) {

      item?.data.map((item) => {
        if (value == 2) {
          if (item?.status == 1) {
            iIDs.push(item.leave_id)
          }
        } else {
          if (item.isSelected) {
            iIDs.push(item.leave_id)
          }
        }

      })
    }

    setSelectedItems([{ id: item?.id, type: item?.type, ids: iIDs }])
    //toggleBottomNavigationViewCancel()
    setLeaveTaskModelVisible(true)
  };

  const handleCancelApproveLeaveClick = (item, value) => {
    buttonState = 4
    selectedItem = item

    var iIDs = []

    if (item.type == 0) {

      item?.data.map((item) => {
        if (value == 2) {
          if (item?.status == 1) {
            iIDs.push(item.leave_id)
          }
        } else {
          if (item.isSelected) {
            iIDs.push(item.leave_id)
          }
        }

      })
    }

    setSelectedItems([{ id: item?.id, type: item?.type, ids: iIDs }])
    //toggleBottomNavigationViewCancel()
    // setLeaveTaskModelVisible(true)
    setTimeout(() => {
      //if (value == 2) {
      setLeaveTaskModelVisible(true)
      // } else {
      //   toggleBottomNavigationViewCancel()
      // }

    }, 500);
  };



  const ApprovalType = ({ status, moduleType, moduleName, isPendingRequest }) => {


    return (

      <TouchableOpacity style={[styles.approvalTypeContainer, { backgroundColor: status == 1 ? PRIMARY_COLOR : WHITE }]} onPress={() => {

        if (moduleType == 'Leave') {
          setSelectedModule(1)
          selectedModules = 1
          setStatus(1)
          let data = selectedFilterData
          data.approvalId = 1
          data.statusId = 1
          data.status = 1
          data.statusName = 'Pending'
          setSelectedFilterData(data)
          setSelectedItems([])
          changeStatusHandler(2)
          // GET_MANAGER_LEAVE_REQUEST()
        } else if (moduleType == 'Attandence') {
          setSelectedModule(2)
          setStatus(1)
          selectedModules = 2
          let data = selectedFilterData
          data.approvalId = 2
          data.statusId = 1
          data.status = 1
          data.statusName = 'Pending'
          setSelectedFilterData(data)
          setSelectedItems([])
          changeStatusHandler(2)
          // setRmLeaveData([])
          //setNumberOfRecord(0)
          // GET_MANAGER_LEAVE_REQUEST()
        } else {
          setSelectedModule(-2)
          selectedModules = -2
          setStatus(-1)
          setSelectedItems([])
          changeStatusHandler(2)
        }

      }}>

        {
          moduleType == 'Leave' ? status == 1 ? <LeaveApproval /> : <LeaveApprovalInactive /> : moduleType == 'Attandence' ? status == 1 ? <Attendence /> : <AttendenceInactive /> : null
        }

        <CustomText children={moduleName} style={{ fontSize: FontSize(12), color: status == 1 ? WHITE : PRIMARY_COLOR, marginStart: 2 }} />

        {isPendingRequest ? <View style={styles.indicatorStyle} /> : null}


      </TouchableOpacity>

    );
  };

  const LeftSwipeActions = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleAproveClick(item, 2)}
        style={{ width: '30%', backgroundColor: '#05A015', justifyContent: 'center', alignItems: 'center', marginVertical: heightPercentageToDP(1) }}
      >

        <CheckCircle />
        <Text
          style={{
            color: 'white',
            fontFamily: FontName.Gordita_Regular,
            paddingVertical: 5,
          }}
        >
          Approve
        </Text>
      </TouchableOpacity>
    );
  };

  const LeftSwipeCancel = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleCancelApproveLeaveClick(item, 2)}
        style={{ width: '30%', backgroundColor: '#D4190C', justifyContent: 'center', alignItems: 'center', marginVertical: heightPercentageToDP(1) }}
      >

        <CheckCircle />
        <Text
          style={{
            color: 'white',
            fontFamily: FontName.Gordita_Regular,
            paddingVertical: 5,
          }}
        >
          Cancel
        </Text>
      </TouchableOpacity>
    );
  };

  const RightSwipeActions = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleRejectClick(item, 2)}
        style={{ width: '30%', backgroundColor: '#D4190C', justifyContent: 'center', alignItems: 'center', marginVertical: heightPercentageToDP(1) }}
      >

        <Delete />
        <Text
          style={{
            color: 'white',
            fontFamily: FontName.Gordita_Regular,
            paddingVertical: 5,
          }}
        >
          Reject
        </Text>
      </TouchableOpacity>
    );
  };


  const ListRenderItem = ({ item, index, onPress, onLongPress, selected }) => {
    const [canPress, setCanPress] = useState(true);

    let attandenceTotalDays = 0
    let attandenceTotalHours = 0
    let approvedCount = 0
    let disapproveCount = 0
    let pendingCount = 0
    let totalNumberOfHours = 0

    if (item?.type == 0) {

      item.data?.map(item => {

        if (item?.status == 2) {
          approvedCount += 1
        } else if (item?.status == 3) {
          disapproveCount += 1
        } else if (item?.status == 1) {
          pendingCount += 1
        }



        let time1 = moment(convertTimeToUTC(item?.s_start_time), 'HH:mm')
        let time2 = moment(convertTimeToUTC(item?.s_end_time), 'HH:mm')


        let minutes = time2.diff(time1, 'minutes')


        attandenceTotalHours += minutes
        attandenceTotalDays += item?.no_of_days

      })


      // console.log('approvedCount and attandenceTotalDays', approvedCount, attandenceTotalDays)



    } else if (item?.type == 7) {
      let t1 = moment(convertTimeToUTC(item?.startTime), 'HH:mm')
      let t2 = moment(convertTimeToUTC(item?.endTime), 'HH:mm')
      totalNumberOfHours = t2.diff(t1, 'minutes')
    }
    // console.log('attandenceTotalHours---------->', item);
    return (
      <Swipeable
        renderLeftActions={() => item.type != 0 && item?.status == 1 ? <LeftSwipeActions item={item} /> : item.type == 0 && (approvedCount + disapproveCount) < attandenceTotalDays ? <LeftSwipeActions item={item} /> : item.type != 0 && item?.status == 2 ? <LeftSwipeCancel item={item} /> : null}
        onSwipeableOpen={e => console.log(e)}
        renderRightActions={() => item.type != 0 && item?.status == 1 ? <RightSwipeActions item={item} /> : item.type == 0 && (approvedCount + disapproveCount) < attandenceTotalDays ? <RightSwipeActions item={item} /> : null}
        onSwipeableOpenStartDrag={() => {

          setCanPress(false)
        }}

        onSwipeableCloseStartDrag={() => {

          setCanPress(true)
        }}
      >

        <TouchableOpacity
          style={{ margin: heightPercentageToDP(1) }}
          onPress={canPress ? onPress : null}
          onLongPress={canPress ? onLongPress : null}
          activeOpacity={0.8}
        >

          <View style={styles.renderItem}>

            <View style={{ position: 'absolute', marginTop: 5, marginLeft: 5 }}>
              {selected ? <CheckBoxTick /> : selectedItems.length > 0 ? <CheckBoxWhite height={18} width={18} /> : null}

            </View>

            {/* Profile View */}
            <View style={[styles.profileView, { marginTop: selected ? 10 : 1 }]}>
              <Image style={styles.profileImage} source={item?.userData?.profile_image == null || item?.userData?.profile_image == '' ? PLACEHOLDER : { uri: item?.userData?.profile_image }} />
              <View style={styles.userInfoStyle}>
                <CustomText style={styles.titleText} children={capitalizeFirstLetter(item?.userData?.first_name) + ' ' + capitalizeFirstLetter(item?.userData?.last_name)} />
                <CustomText style={styles.designationText} children={capitalizeFirstLetter(item?.userData?.Designation?.designation_name)} />


                {item.type != 0 ?
                  <CustomText style={[styles.statusText, { color: item?.status == 2 ? GREEN : item?.status == 3 ? RED : GREEN }]} children={item?.status == 2 ? 'Approved' : item?.status == 3 ? 'Rejected' : null} /> : null}

              </View>
              {item.type == 7 ?
                <CustomText style={styles.hourText} children={item?.leaveTypeName} /> : null
              }



            </View>



            {/* FROM - TO  VIEW */}
            {item.type != 0 ?
              <View>
                {item.type == 6 ?
                  <View style={{ paddingHorizontal: 10 }}>
                    <CustomText style={{ fontSize: FontSize(13), color: '#00000060', fontFamily: FontName.Gordita_Regular }}
                      children={'Com-off date : ' + moment(item?.consumedDate).format('DD MMM YY')} />
                    <CustomText style={{ fontSize: FontSize(13), color: '#00000060', fontFamily: FontName.Gordita_Regular }}
                      children={'Consumed on : ' + moment(item?.from_date).format('DD MMM YY')} />
                  </View> :
                  <View style={styles.fromTOView}>
                    {/* from view */}
                    <View style={{}}>
                      <CustomText style={styles.fromToText} children={'From'} />
                      <CustomText style={styles.dateTimeText} children={moment(item?.from_date).format('DD MMM YY')} />
                    </View>
                    {/* To view */}
                    <View style={{}}>
                      <CustomText style={styles.fromToText} children={'To'} />
                      <CustomText style={styles.dateTimeText} children={moment(item?.to_date).format('DD MMM YY')} />
                    </View>
                    {item.type == 7 ?
                      <View style={{ width: '18%' }}>
                        <CustomText style={styles.fromToText} children={'Hours'} />
                        <CustomText style={styles.dateTimeText} children={`${('0' + Math.floor(totalNumberOfHours / 60)).slice(-2)} : ${('0' + totalNumberOfHours % 60).slice(-2)}`} />
                      </View> :
                      item.type != 6 ?
                        <View style={{ width: '18%' }}>
                          <CustomText style={styles.fromToText} children={'Days'} />
                          <CustomText style={styles.dateTimeText} children={item?.totalDaysAbsence} />
                        </View> : null
                    }
                  </View>
                }
                {item.type == 7 ?
                  <View style={styles.fromTOView}>
                    <View style={styles.fromview}>
                      <CustomText style={styles.fromToText} children={'Start Time'} />
                      <CustomText style={styles.dateTimeText} children={convertTimeToUTC(item?.startTime)} />
                    </View>

                    <View style={styles.fromview}>
                      <CustomText style={styles.fromToText} children={'End Time'} />
                      <CustomText style={styles.dateTimeText} children={convertTimeToUTC(item?.endTime)} />
                    </View>
                    <View style={{ width: '18%' }} >
                    </View>
                  </View> :
                  null
                }

              </View>
              : <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginTop: 10, justifyContent: 'space-around' }}>
                  <CustomText style={{ fontSize: FontSize(13), color: '#00000060', fontFamily: FontName.Gordita_Regular }} children={'Total Days : ' + attandenceTotalDays + ' Days'} />
                  <CustomText style={{ fontSize: FontSize(13), color: '#00000060', fontFamily: FontName.Gordita_Regular, marginTop: 10 }} children={'Total Hours : ' + `${('0' + Math.floor(attandenceTotalHours / 60)).slice(-2)} : ${('0' + attandenceTotalHours % 60).slice(-2)}` + ' Hours'} />
                </View>

                <View style={{ justifyContent: 'flex-end' }}>
                  {approvedCount != 0 ? <CustomText style={{ fontSize: FontSize(13), color: '#E49273', fontFamily: FontName.Gordita_Medium }} children={'Approved(' + approvedCount + ')'} /> : null}
                  {disapproveCount != 0 ? <CustomText style={{ fontSize: FontSize(13), color: '#FB3022', fontFamily: FontName.Gordita_Medium, marginTop: 10 }} children={'Disapprove(' + disapproveCount + ')'} /> : null}

                </View>

              </View>
            }


            {item.type != 0 && item.type != 7 ?

              <View style={{ flexDirection: 'row', marginTop: 12 }}>
                <CustomText
                  style={[styles.RequestTypeStyle, { color: '#00000060' }]}
                  numberOflines={1}
                  ellipsizeMode={'tail'}
                  children={'Request Type : '}
                />

                <CustomText
                  style={[styles.RequestTypeStyle, { color: PRIMARY_COLOR }]}
                  numberOflines={1}
                  ellipsizeMode={'tail'}
                  children={item?.leaveTypeName}
                />

              </View> : null
            }


            {/* Line */}
            {item.type != 0 ? <View style={styles.line}></View> : null}
            {/* Desc View */}
            {/* <CustomText style={styles.descText} children={item?.reason} /> */}

            {item.type != 0 ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Reason Text */}

              <CustomText
                style={[styles.fromToText, styles.reasonText]}
                numberOflines={1}
                ellipsizeMode={'tail'}
                children={item?.reason}
              />

              {/* hour text */}
              {item.type != 0 ?
                <CustomText style={styles.hourText} children={getTimeAgo(item?.appliedOnDate)} /> : null
              }


              {/* Aprove Button */}

              {/* {item?.status == 1 ?
                <CustomButton
                  onPress={() => handleAproveClick(item)}
                  style={[styles.buttonStyle, styles.aproveButton, { borderRadius: 4 }]}
                  textStyle={styles.buttonTextStyle}
                  title={AppString.APPROVE}
                /> : item.status == 2 ? <CustomButton
                  onPress={() => handleCancelApproveLeaveClick(item)}
                  style={[styles.buttonStyle, { alignSelf: 'center' }, styles.aproveButton, { borderRadius: 4 }]}
                  textStyle={styles.buttonTextStyle}
                  title={AppString.CANCEL_LEAVE}
                /> : null
              } */}

              {/* {item?.status == 2 ?
              <CustomButton
                onPress={() => handleCancelApproveLeaveClick(item)}
                style={[styles.buttonStyle, { alignSelf: 'center' }, styles.aproveButton, { borderRadius: 4 }]}
                textStyle={styles.buttonTextStyle}
                title={AppString.CANCEL_LEAVE}
              /> : null
            } */}


            </View> : null}

            {/* Button View */}
            {/* {item?.status == 1 ?
          <View style={styles.buttonView}> */}

            {/* Aprove Button */}
            {/* <CustomButton
              onPress={() => handleAproveClick(item)}
              style={[styles.buttonStyle, styles.aproveButton, { borderRadius: 4 }]}
              textStyle={styles.buttonTextStyle}
              title={AppString.APPROVE}
            /> */}

            {/* Reject Button */}
            {/* <CustomButton
              onPress={() => handleRejectClick(item)}
              style={[styles.buttonStyle, styles.rejectButton, { borderRadius: 4 }]}
              textStyle={{ fontSize: FontSize(13), fontFamily: FontName.Gordita_Medium, color: PRIMARY_COLOR }}
              title={AppString.REJECT}
            /> */}




            {/* </View> : null} */}

            {/* {item?.status == 2 ?
          <CustomButton
            onPress={() => handleCancelApproveLeaveClick(item)}
            style={[styles.buttonStyle, { alignSelf: 'center' }, styles.aproveButton, { borderRadius: 4 }]}
            textStyle={styles.buttonTextStyle}
            title={AppString.CANCEL_LEAVE}
          /> : null
        } */}

          </View >

        </TouchableOpacity >
      </Swipeable >

    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <MeetingHomeHeader
        headerText={APPROVAL}
        filter={true}
        icon={'filter'}
        onFilterClick={toggleBottomFilterlModal}
        onPress={() => {
          buttonState = -1
          selectedItem = null
          searchedName = ''
          selectedStartDate = ''
          selectedEndDate = ''
          selectedModules = 1
          haveAttandanceRequest = false
          haveLeaveRequest = false
          setSelectedItems([])
          navigation.goBack()

        }}
      />

      {/* Search box */}
      <View style={{ marginTop: widthPercentageToDP(3) }}>
        <CustomSearchBox placeholder="Search" onPress={(searchedText) => {
          searchedName = searchedText
          //if (searchedName.trim().length > 0) {
          GET_MANAGER_LEAVE_REQUEST()
          //}
        }} />
      </View>


      <View style={{ flexDirection: 'row', marginHorizontal: widthPercentageToDP(2), marginTop: 10 }}>

        {/* <TouchableOpacity onPress={() => {
          setSelectedModule(1)
          setSelectedItems([]);
          setStatus(1)
          selectedModules = 1

        }}> */}

        <ApprovalType status={selectedModule == 1 ? 1 : 0} moduleType={'Leave'} moduleName={'Leave Approval'} isPendingRequest={haveLeaveRequest} />

        {/* </TouchableOpacity> */}

        {/* 
        <TouchableOpacity onPress={() => {
          setSelectedItems([]);
          setSelectedModule(2)
          setStatus(1)
          selectedModules = 2
        }}> */}

        <ApprovalType status={selectedModule == 2 ? 1 : 0} moduleType={'Attandence'} moduleName={'Atten. Approval'} isPendingRequest={haveAttandanceRequest} />

        {/* </TouchableOpacity> */}


      </View>



      <View style={{ flexDirection: 'row', marginTop: 15, marginHorizontal: 10, justifyContent: 'space-between' }}>

        <CustomText style={styles.approvalCountTextStyle} children={selectedModule == 1 ? 'LeaveApproval(' + numberOfRecord + ')' : selectedModule == 2 ? 'Attendence Approvals(' + numberOfRecord + ')' : 'All Approvals(' + numberOfRecord + ')'} />

        <TouchableOpacity style={{ justifyContent: 'flex-end' }} onPress={() => {
          setSideMenuVisible(!sideMenuvisible)
        }}>
          {selectedModules != -1 && rmLeaveData.length > 0 && selectedFilterData.status == 1 ? <ThreeDotIcon /> : null}




        </TouchableOpacity>

      </View>


      <View style={{ flex: Platform.OS == 'ios' ? 1 : 0 }}>
        <Pressable onPress={deSelectItems}>
          <FlatList
            style={{ marginBottom: Platform.OS == 'ios' ? 20 : 10, }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            renderItem={({ item }) => (

              <ListRenderItem onPress={() => handleOnPress(item)} onLongPress={() => { selectedModules != -1 ? handleLongPress(item) : null }} item={item} selected={getSelected(item)} />
            )}
            data={rmLeaveData}
            ListEmptyComponent={
              <View style={styles.norecordFoundStyle}>
                <CustomText children={'No Record Found'} style={{ alignSelf: 'center', fontSize: FontSize(14), color: GREY }} />
              </View>
            }
          />
        </Pressable>
      </View>
      <Snackbar
        style={{ backgroundColor: '#FFF0EB' }}
        visible={undoVisible}
        onDismiss={() => {

        }}
        action={{
          label: <CustomText style={{ color: '#1D1B1B' }} children={'Undo'} />,
          onPress: () => {

            setUndoVisible(true)
          },
        }}>
        <CustomText style={{ color: '#00000060' }} children={'1 Request Sent'} />
      </Snackbar>


      {/* <DropDownMessage /> */}
      <TaskModal
        isVisible={visible}
        text={getMessage()}
        onPress={() => {
          toggleBottomNavigationViewCancel()
          if (buttonState == 3) {

            SET_MANAGER_LEAVE_ACTION()

          } else if (buttonState == 2) {


            SET_MANAGER_LEAVE_ACTION()

          } else if (buttonState == 4) {
            SET_MANAGER_LEAVE_ACTION()

          }

        }}
        onCancel={() => {
          setSelectedItems([])
          toggleBottomNavigationViewCancel()
        }}
        type={buttonState == 4 ? AppString.CANCEL : AppString.SUCESS}

      />


      {/* <DropDownMessage /> */}
      <LeaveTaskModal
        isVisible={leaveTaskModelVisible}
        reason={reason}
        text={getMessage()}
        onChange={(text) => {
          setReason(text)
        }}
        onPress={() => {

          setLeaveTaskModelVisible(false)
          if (buttonState == 3) {

            SET_MANAGER_LEAVE_ACTION()

          } else if (buttonState == 2) {

            SET_MANAGER_LEAVE_ACTION()

          } else if (buttonState == 4) {

            SET_MANAGER_LEAVE_ACTION()

          }

        }}
        onCancel={() => {
          setSelectedItems([])
          setLeaveTaskModelVisible(false)
        }}

        type={buttonState == 4 ? AppString.CANCEL : AppString.SUCESS}
        buttonState={buttonState}

      />

      {console.log("sideMenudata==>", sideMenudata)}
      {/* <SideMenu /> */}
      <PopUpMenuApproval
        isVisible={sideMenuvisible}
        onPress={hideMenu}
        data={sideMenudata}
        setShowModal={() => setSideMenuVisible(false)}
      />


      <LeaveApprovalModal
        isVisible={leaveApprovalvisible}
        onBackButtonPress={toggleBottomApprovalModal}
        onPress={() => {

        }}
        data={selectedItemData}
        onCancel={(item) => {
          toggleBottomApprovalModal()

          console.log('status==>', item?.status)

          if (item?.status == 2) {
            setTimeout(() => {
              handleCancelApproveLeaveClick(item, 1)
            }, 500)
          }
        }}
        onApprove={(item) => {
          toggleBottomApprovalModal()
          setTimeout(() => {
            handleAproveClick(item, 1)
          }, 500);
        }}
        onDisApprove={(item) => {
          toggleBottomApprovalModal()
          setTimeout(() => {
            handleRejectClick(item, 1)
          }, 500);
        }}
        reason={reason}
        onChange={(text) => {
          setReason(text)
        }}
      />

      <AttendanceApprovalModal
        visible={AttandanceApprovalvisible}
        onBackButtonPress={() => {
          setAttandanceApprovalvisible(false)
        }}
        data={selectedItemData}
        onSelectAll={(isSelect) => {
          let data = selectedItemData
          data?.data.map((item) => {
            if (!isSelect) {
              if (item?.status == 1) {
                item.isSelected = true
              }
            } else {
              item.isSelected = false
            }

          })
          setselectedItemData(data)
        }}

        onCancel={() => {
          setAttandanceApprovalvisible(false)
        }}

        onCheckMark={(index1) => {
          let data1 = {
            ...selectedItemData
          }

          data1?.data.map((item, index) => {

            if (index == index1) {
              item.isSelected = !item.isSelected
            }

          })

          setselectedItemData(data1)
        }}

        onApprove={(item) => {


          var isSelect = false

          for (let i = 0; i < item?.data?.length; i++) {

            if (item?.data[i]?.isSelected) {
              isSelect = true
              break;
            }

          }


          if (!isSelect) {
            ShowToast('Please select date to approve regularize. ' + isSelect)
            return;
          } else {
            setAttandanceApprovalvisible(false)
            setTimeout(() => {
              handleAproveClick(item, 1)
            }, 500);
          }



        }}

        onReject={(item) => {

          var isSelect = false

          for (let i = 0; i < item?.data?.length; i++) {

            if (item?.data[i]?.isSelected) {
              isSelect = true
              break;
            }

          }


          if (!isSelect) {
            ShowToast('Please select date to reject regularize.')
          } else {
            setTimeout(() => {
              setAttandanceApprovalvisible(false)
              handleRejectClick(item, 1)
            }, 500);
          }



        }}
      />


      <FilterManageRequest
        visible={filterVisible}
        list={filterList}
        onBackButtonPress={toggleBottomFilterlModal}
        onBackdropPress={toggleBottomFilterlModal}
        selectedFilterData={selectedFilterData}
        onApplyClick={(selectedData) => {


          setSelectedFilterData(selectedData)
          toggleBottomFilterlModal()
          if (selectedData.status == undefined) {
            setStatus(1)
          } else {
            setStatus(selectedData.status)
          }
          if (selectedData.startDate != undefined) {
            selectedStartDate = selectedData.startDate
          }

          if (selectedData.endDate != undefined) {
            selectedEndDate = selectedData.endDate
          }

          //GET_MANAGER_LEAVE_REQUEST()

          if (selectedData.approvalId == 1) {
            setSelectedModule(1)
            selectedModules = 1

          } else if (selectedData.approvalId == 2) {
            setSelectedModule(2)
            selectedModules = 2
            setRmLeaveData([])
            setNumberOfRecord(0)

          } else if (selectedData.approvalId == 3) {
            setSelectedModule(3)
            selectedModules = 3

          }


        }}
        onClearFilter={(data) => {
          toggleBottomFilterlModal()
          setSelectedFilterData(data)
          setStatus(1)
          setSelectedModule(1)
          selectedModules = 1
        }}


      />


      <AppLoader isLoading={loading} />



    </SafeAreaView >
  );
}
