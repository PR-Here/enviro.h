import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import CheckBox from 'react-native-check-box'
import { ScrollView } from 'react-native-gesture-handler'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../component/atoms/CustomButton'
import CustomText from '../../component/atoms/CustomText'
import CustomToast from '../../component/atoms/CustomToast'
import HistorySwitch from '../../component/atoms/HistorySwitch'
import ScheduleMeetingSearch from '../../component/atoms/ScheduleMeetingSearch'
import TimeSelect from '../../component/atoms/TimeSelect'
import MeetingHomeHeader from '../../component/header/MeetingHeader'
import RoomItem from '../../component/listItems/RoomItem'
import AvailModal from '../../component/modal/AvailModal'
import FilterModal from '../../component/modal/FilterModal'
import useApiEffect from '../../hooks/useApiEffect'
import { CHECK_ROOM_AVALIBILITY, DELETE_ROOM, GET_MEETING_ROOM_LIST, GET_USERSSERACH_LIST, MEETING_ROOM_BOOKED } from "../../services/ApiEndPoint"
import { BLACK, GREY, LIGHT_BLUE } from '../../theme/Colors'
import AppLoader from '../../utils/AppLoader'
import AppString from '../../utils/AppString'
import AssetsImages, { SEARCH, USER_Ellipse } from '../../utils/AssetsImages'
import { ShowToast, capitalizeFirstLetter, convertLocalToUTC, convertTimeToUTC, getLocalTimeZone, showUTCToLocal } from '../../utils/Constant'
import NavString from '../../utils/NavString'
import styles from './Style'
import TaskModal from '../../component/modal/TaskModal'
import moment from 'moment'
import Cross from '../../../assets/images/SVG/charm_cross.svg'


// import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { googleMeetAccessToken } from "../../redux/slices/GoogleMeetSlice";
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { onTabBarSroll } from '../../redux/slices/TabBarSlice'
import { handleGoogleSignIn, signOutGoogle } from '../../utils/GoogleMeetConstant'

const MeetingBookRoom = (data) => {
    const loginUserData = useSelector((state) => state?.auth?.loginUser);

    const editableData = data?.route?.params?.data
    const selectedLocationName = editableData?.Meetingroom?.Meetingroomfloor?.BuildingModel?.Location
    const [isSelected, setSelected] = useState(false)
    const [searchSlected, setSearchSelected] = useState(false)
    const [visible, setVisible] = useState(false) // toggle for filter modal
    const [isVisible, setIsVisible] = useState(false) // toggle for availability modal
    const [isToast, setIsToast] = useState(false) // visibility for CustomToast
    const [isTaskOn, setIsTaskOn] = useState(false) // toggle for task modal
    const [isHomeRedirect, setIsHomeRedirect] = useState(false) // visibility for CustomToast
    const [showDeletePopup, setShowDeletePopup] = useState(false); // Cancel Meeting model state

    const { makeApiRequest, loading } = useApiEffect()
    const [title, setTitle] = useState(editableData?.meeting_title)
    const [selectedFilterName, setSelectedFilterName] = useState()

    const [startTime, setStartTime] = useState(editableData?.bookedfrom === undefined ? convertLocalToUTC(moment()) : editableData?.bookedfrom)
    const [endTime, setEndTime] = useState(editableData?.bookedto === undefined ? convertLocalToUTC(moment().add(1, 'hours')) : editableData?.bookedto)
    const [selectedRoomData, setSelectedRoomData] = useState()
    const [bookRoomId, setBookRoomId] = useState(editableData?.book_room_id == undefined ? 0 : editableData?.book_room_id)
    const [meetingRoomNameId, setMeetingRoomNameId] = useState(editableData?.meeting_room_name_id)


    const [roomData, setRoomData] = useState([]);
    const [filterData, setFilterData] = useState(selectedLocationName === undefined ? [] : [selectedLocationName?.location_name]);
    const [allDayMeeting, setAllDayMeeting] = useState(editableData?.all_day === 1 ? true : false)
    const [selectedRoom, setSelectedRoom] = useState(-1)

    {/*PAGINATION */ }
    const [page, setPage] = useState(0);
    const [maxResource, setMaxResource] = useState(0);
    const [usersList, setUsersList] = useState([]);
    const [selectedUserList, setSelectedUserList] = useState(editableData?.guest.length === undefined ? [] : editableData?.guest);
    const [userSearchText, setUserSearchText] = useState('');

    const [bottomLoading, setBottomLoading] = useState(false)
    const [meetingDate, setMeetingDate] = useState(editableData?.bookedfrom === undefined ? moment().format('dddd, D MMM YYYY') : moment(editableData?.bookedfrom).format('dddd, D MMM YYYY'))

    const [roomBookMsg, setRoomBookMsg] = useState('');

    let searchedName = ""
    const navigation = useNavigation();


    const dispatch = useDispatch();
    let googleMeetToken = useSelector(state => state?.googleMeet?.meetAccessToken);


    useEffect(() => {
        dispatch(onTabBarSroll(true))
        if (googleMeetToken == null) {
            promptShow()
        }
    }, [])

    const promptShow = async () => {
        await handleGoogleSignIn((token) => {
            dispatch(googleMeetAccessToken(token))
            if (!isFirstTime) {
                ShowToast('Token generated Successfully.')
            }
        });
    }

    // Function to update search results based on the input text
    const handleSearch = (text) => {
        setUserSearchText(text)
        setSearchSelected(true)
        searchedName = text

        setPage(0)
        if (searchedName.length >= 3) {
            GET_USERSSEARCH_API(0)
        } else if (searchedName.length == 0) {
            setSearchSelected(false)
        }
    };

    {/* User Search Api */ }
    async function GET_USERSSEARCH_API(page) {
        setBottomLoading(true)
        const apiData = await makeApiRequest({ url: GET_USERSSERACH_LIST, method: 'POST', isToken: true, data: { page: page, name: searchedName }, showProgress: page == 0 ? true : false });
        setUsersList([])
        if (apiData?.status == true) {
            var filterData = []
            filterData.push(...apiData?.data?.rows?.filter((item, index) => item.email != loginUserData?.email))
            setUsersList(filterData)

            setMaxResource(apiData.data?.count)
        }
        setBottomLoading(false)
    }


    let userData = useSelector(state => state?.auth?.loginUser);
    const [selectedFilter, setSelectedFilter] = useState({ location_id: editableData?.meeting_room_name_id === undefined ? [userData?.location_id] : [selectedLocationName?.location_id] })

    const handleFilterModalApply = (selectedData) => {
        setSelectedRoom(-1)
        const cleanedData = {};

        const dataArray = [
            selectedData.location_name,
            selectedData.building_name,
            selectedData.floor_name,
        ];

        const transformedData = {
            location_id: [selectedData.location_id],
            floor_id: [selectedData.floor_id],
            building_id: [selectedData.building_id],
        };

        const filteredArray = dataArray.filter(item => item !== undefined);

        for (const key in transformedData) {
            if (Array.isArray(transformedData[key])) {
                const filteredArray = transformedData[key].filter((value) => value !== undefined);
                if (filteredArray.length > 0) {
                    cleanedData[key] = filteredArray;
                }
            } else {
                cleanedData[key] = transformedData[key];
            }
        }

        setFilterData(filteredArray);
        setSelectedFilter(cleanedData);
        setSelectedFilterName(selectedData)
        setVisible(false)

    };

    const removeFilter = (indexToRemove) => {
        const updatedFilterData = [...filterData];
        const removedFilter = updatedFilterData.splice(indexToRemove, 1)[0];

        setFilterData(updatedFilterData);

        const updatedSelectedFilter = { ...selectedFilter };

        if (removedFilter === selectedFilterName?.location_name) {
            delete updatedSelectedFilter?.location_id;
        } else if (removedFilter === selectedFilterName?.building_name) {
            delete updatedSelectedFilter?.building_id;

        } else if (removedFilter === selectedFilterName?.floor_name) {
            delete updatedSelectedFilter?.floor_id;
        }
        const transformedData = {
            location_id: [userData?.location_id],
        };
        setSelectedFilter(indexToRemove == 0 ? transformedData : updatedSelectedFilter);

    };


    const onDateApply = (selectedDate, startTime, endTime) => {
        setIsVisible(false)
        setMeetingDate(moment(selectedDate).format('dddd, D MMM YYYY'))
        setStartTime(startTime)
        setEndTime(endTime)

        const st = `${moment(selectedDate, 'dddd, D MMM YYYY').format('YYYY-MM-DD')}T${allDayMeeting == true ? '00:00' : moment(startTime, 'yyyy-MM-DDTHH:mm:ss:z').format('HH:mm')}:00`
        const et = `${moment(selectedDate, 'dddd, D MMM YYYY').format('YYYY-MM-DD')}T${allDayMeeting == true ? '23:59' : moment(endTime, 'yyyy-MM-DDTHH:mm:ss:z').format('HH:mm')}:59`
        GET_MEETING_ROOM_LIST_API(st, et)
    };

    useEffect(() => {
        GET_MEETING_ROOM_LIST_API(
            `${moment(meetingDate, 'dddd, D MMM YYYY').format('YYYY-MM-DD')}T${allDayMeeting == true ? '00:00' : moment(startTime, 'yyyy-MM-DDTHH:mm:ss:z').format('HH:mm')}:00`,
            `${moment(meetingDate, 'dddd, D MMM YYYY').format('YYYY-MM-DD')}T${allDayMeeting == true ? '23:59' : moment(endTime, 'yyyy-MM-DDTHH:mm:ss:z').format('HH:mm')}:59`
        )
    }, [selectedFilter]);

    useEffect(() => {
        roomData?.map((item, index) => {
            if (item?.room_id === data?.route?.params?.data?.Meetingroom?.room_id) {
                setSelectedRoomData(item)
                setSelectedRoom(index)
            }
        })
    }, [roomData]);

    async function GET_MEETING_ROOM_LIST_API(bookedfrom, bookedto) {
        setRoomData([])

        const payload = {
            ...selectedFilter,
            type: editableData ? 1 : 0,
            bookedfrom: bookedfrom,
            bookedto: bookedto
        }
        const apiData = await makeApiRequest({
            url: GET_MEETING_ROOM_LIST, method: 'POST', isToken: true,
            data: payload,

        });
        if (apiData?.status == true) {
            // setSelectedRoomData(data)
            var filterData = []

            filterData.push(...apiData?.data?.filter((item, index) => item.room_id == data?.route?.params?.data?.Meetingroom?.room_id))
            filterData.push(...apiData?.data?.filter((item, index) => item.room_id != data?.route?.params?.data?.Meetingroom?.room_id))
            setRoomData(filterData)

        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    const handleDeletePopup = () => {
        setShowDeletePopup(false);
        navigation.goBack()
        DELETE_ROOM_API()
    };

    //Delete Room API
    async function DELETE_ROOM_API() {
        setBottomLoading(true)

        const apiData = await makeApiRequest({ url: DELETE_ROOM, method: 'POST', isToken: true, data: { book_room_id: bookRoomId, status: 0 } });
        if (apiData?.status == true) {
            ShowToast(`${apiData?.message}`)
        } else {
            setBottomLoading(false)
        }
    }

    const validateForm = () => {
        if (googleMeetToken == null) {
            promptShow()
            return false
        }
        if (!title) {
            ShowToast('Please enter a title.')
            return false
        }

        if (!allDayMeeting) {
            if (startTime == '00:00' && endTime == '00:00') {
                ShowToast('Please select time.')
                return false
            }
        }

        if (!meetingRoomNameId) {
            ShowToast('Please book a room.')
            return false
        }

        // if (selectedUserList.length == 0) {
        //     ShowToast('Please select people to invite.')
        //     return false
        // }
        return true;
    };

    const validateFormRoomCheck = (data, index) => {
        if (!title) {
            ShowToast('Please enter a title.')
            return false
        }
        if (startTime === '00:00' && endTime === '00:00' && allDayMeeting != true) {
            ShowToast('Please select booking time.')
            return false
        } else {
            if (index != -1) {
                setSelectedRoomData({ data: data, index: index })
                //setIsTaskOn(true)
                CHECK_ROOM_AVALIBILITY_API(data, index)
            } else {
                setSelectedRoom(index)
                setMeetingRoomNameId(data?.room_id)
                setSelectedRoomData(null)
            }
        }
        return true
    }

    const handleSubmit = () => {
        if (validateForm()) {
            ROOM_BOOKCONFRIM_API();
        }
    };


    async function ROOM_BOOKCONFRIM_API() {
        if (!selectedUserList.includes(loginUserData?.email)) {
            selectedUserList.push(loginUserData?.email)
        }

        const payload = {
            googleMeetAccessToken: googleMeetToken,
            book_room_id: bookRoomId,
            meeting_room_name_id: meetingRoomNameId,
            meeting_title: title,
            guest: selectedUserList,
            all_day: allDayMeeting == true ? 1 : 0,
            notification_status: isSelected ? 1 : 0,
            //timeZone: getLocalTimeZone(),
            status: 1,
            bookedfrom: `${moment(meetingDate, 'dddd, D MMM YYYY').format('YYYY-MM-DD')}T${allDayMeeting == true ? '00:00' : moment(startTime, 'yyyy-MM-DDTHH:mm:ss:z').format('HH:mm')}:00`, ///2024-01-05T09:49:15.847Z
            bookedto: `${moment(meetingDate, 'dddd, D MMM YYYY').format('YYYY-MM-DD')}T${allDayMeeting == true ? '23:59' : moment(endTime, 'yyyy-MM-DDTHH:mm:ss:z').format('HH:mm')}:59`
        }

        const apiData = await makeApiRequest({ url: MEETING_ROOM_BOOKED, method: 'POST', isToken: true, data: payload });
        if (apiData?.status == true) {
            setIsHomeRedirect(true)
            setIsToast(true)
            setRoomBookMsg(apiData?.message)
        } else {
            if (apiData?.eventerror === true) {
                ShowToast('Token expire please SignIn again')
                isFirstTime = false
                signOutGoogle()
                promptShow()
            } else {
                setIsHomeRedirect(false)
                setRoomBookMsg(apiData?.message)
                setIsToast(true)
            }
        }
    }


    async function CHECK_ROOM_AVALIBILITY_API(data, index) {
        const payload = {
            meeting_room_name_id: data?.room_id,
            all_day: allDayMeeting == true ? 1 : 0,
            bookedfrom: `${moment(meetingDate, 'dddd, D MMM YYYY').format('YYYY-MM-DD')}T${allDayMeeting == true ? '00:00' : moment(startTime, 'yyyy-MM-DDTHH:mm:ss:z').format('HH:mm')}:00`,
            bookedto: `${moment(meetingDate, 'dddd, D MMM YYYY').format('YYYY-MM-DD')}T${allDayMeeting == true ? '23:59' : moment(endTime, 'yyyy-MM-DDTHH:mm:ss:z').format('HH:mm')}:59`
        }
        const apiData = await makeApiRequest({ url: CHECK_ROOM_AVALIBILITY, method: 'POST', isToken: true, data: payload });
        if (apiData?.status == true) {
            if (apiData?.data.available == true) {
                setSelectedRoom(index)
                setMeetingRoomNameId(data?.room_id)
            } else {
                setSelectedRoomData(null)
                setIsToast(true)
                setRoomBookMsg(apiData?.message)
            }
        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    {/* Users List Item */ }
    const ResultItem = ({ item }) => {

        const onPress = () => {
            if (!selectedUserList.includes(item.email)) {
                setSelectedUserList([...selectedUserList, item.email])
                setUserSearchText('')
            } else {
                setSelectedUserList(selectedUserList.filter((selected) => selected !== item));
            }
            setSearchSelected(false)
        }

        return (
            <>
                < TouchableOpacity onPress={onPress} activeOpacity={0.5} >
                    <View style={styles.searchResultContainer}>
                        <View style={styles.resultItemInnerContainer}>
                            <Image style={[styles.border, styles.userImageCircle, { borderRadius: 100 }]} source={item.profile_image === null || item.profile_image === '' ? AssetsImages.DUMMY : { uri: item.profile_image }}></Image>

                            <View style={styles.userDetailsContainer}>
                                <CustomText children={item?.email} style={styles.userDesignationStyle} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity >
            </>
        );
    }
    const renderModals = () => {
        return (
            <>
                <FilterModal
                    visible={visible}
                    onBackButtonPress={() => setVisible(false)}
                    onBackdropPress={() => setVisible(false)}
                    onApplyClick={handleFilterModalApply}
                    list={filterData}
                    locationName={selectedLocationName?.location_name}
                />
                <AvailModal
                    visible={isVisible}
                    isAllDay={allDayMeeting}
                    onBackButtonPress={() => setIsVisible(false)}
                    onBackdropPress={() => setIsVisible(false)}
                    onDone={onDateApply}
                    meetingDate={meetingDate}
                    bookedFrom={startTime}
                    bookedTo={endTime}
                />
                <TaskModal
                    isVisible={isTaskOn}
                    onPress={() => {
                        setIsTaskOn(false)
                        CHECK_ROOM_AVALIBILITY_API(selectedRoomData?.data, selectedRoomData?.index)
                    }}
                    onCancel={() => setIsTaskOn(false)}
                    text={`Are you sure you want to book ${selectedRoomData?.data?.Meetingroomfloor?.BuildingModel?.building_name}, ${selectedRoomData?.data?.Meetingroomfloor?.floor_name}, ${selectedRoomData?.data?.Meetingroomfloor?.BuildingModel?.Location?.location_name}`}
                    type={AppString.SUCESS}
                />
                <CustomToast text={roomBookMsg} type={isHomeRedirect} isVisible={isToast} onPress={() => {
                    if (isHomeRedirect) {
                        setIsToast(false)
                        navigation.navigate(NavString.MEETING_HOME, { update: true })
                    } else {
                        setIsToast(false)
                    }
                }} />
            </>
        )
    }

    return (
        <View style={styles.container}>
            <MeetingHomeHeader
                headerText={'Book Room'}
                filter={true}
                onFilterClick={() => setVisible(true)}
                icon={'filter'}
            />

            <KeyboardAvoidingView behavior={'height'} keyboardVerticalOffset={25} style={{}} >
                <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>
                    <ScheduleMeetingSearch title={AppString.ADD_TITLE}
                        style={styles.textFieldStyle}
                        containerStyle={{ marginHorizontal: 15 }}
                        value={title}
                        onChangeText={(text) => {
                            setTitle(text)
                        }}
                    />
                    <HistorySwitch
                        containerStyle={{ marginHorizontal: 15, marginTop: 10 }}
                        title="All day"
                        image={AssetsImages.HISTORY}
                        status={allDayMeeting}
                        onChange={(isOn) => {
                            setAllDayMeeting(isOn)
                            setSelectedRoom(-1)
                            setSelectedRoomData(null)
                        }} />

                    <View style={styles.verticalMargin} />

                    <TimeSelect isAllDay={!allDayMeeting} containerStyle={{ marginHorizontal: 10 }}
                        time={`${showUTCToLocal(startTime)} - ${showUTCToLocal(endTime)}`}
                        date={meetingDate}
                        onPress={() => setIsVisible(true)}
                    />

                    <View style={styles.verticalMargin} />

                    <View style={styles.listView}>


                        {filterData &&
                            <View style={{
                                paddingHorizontal: 5,
                                marginTop: 15,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}>
                                {filterData.map((item, index) => {
                                    return (
                                        <View style={styles.filterViewStyle} key={index}>
                                            <Text style={styles.filterText}>{capitalizeFirstLetter(item)}</Text>
                                            <TouchableOpacity onPress={() => {
                                                removeFilter(index)
                                            }}>
                                                {filterData.length == 1 && <Cross />}
                                                {selectedLocationName?.location_name !== item && selectedFilterName?.location_name != item ? <Cross /> : null}

                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                        }

                        <View style={styles.listLabelView}>
                            <Text style={styles.subTitle}>Rooms Available</Text>
                        </View>

                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            style={{ marginTop: 10 }}
                            horizontal
                            data={roomData}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => {
                                return (
                                    <View key={index}>
                                        <RoomItem data={item} index={index} selectedIndex={selectedRoom} room_id={editableData?.Meetingroom?.room_id} onPress={(index, data) => {
                                            validateFormRoomCheck(data, index)
                                        }} />
                                    </View>
                                )
                            }}
                            ListEmptyComponent={
                                <View style={{ height: heightPercentageToDP(30), marginHorizontal: widthPercentageToDP(30), flexDirection: 'column', justifyContent: 'center' }}>
                                    <CustomText children={'No Rooms Available'} style={{ alignSelf: 'center' }} />
                                </View>
                            }
                        />

                        <View style={{ marginVertical: 10 }} >
                            <ScheduleMeetingSearch
                                placeholder="Search"
                                title={AppString.PEOPLE_TO_INVITE}
                                icon={SEARCH} style={styles.textFieldStyle}
                                onChangeText={handleSearch}
                                value={userSearchText}
                            />

                            {selectedUserList ?
                                <View style={{
                                    paddingHorizontal: 5,
                                    marginTop: 15,
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                }}>
                                    {selectedUserList?.map((item, index) => {
                                        return (
                                            <View style={styles.filterViewStyle} key={index}>
                                                <Text style={styles.filterText}>{item}</Text>
                                                <TouchableOpacity onPress={() => {
                                                    setSelectedUserList(selectedUserList.filter((removeItem) => removeItem !== item))
                                                }}>
                                                    <View style={{ paddingLeft: 5 }}>
                                                        <Cross />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })}
                                </View>
                                : null
                            }
                            <ScrollView style={{ maxHeight: 150 }}>
                                {usersList.length > 0 && searchSlected && (
                                    usersList.map((item, index) =>
                                        <View key={index}>
                                            <ResultItem item={item} />
                                        </View>
                                    )
                                )}
                            </ScrollView>

                        </View>

                        <CheckBox
                            style={{ flex: 1, paddingBottom: 10 }}
                            onClick={() => {
                                setSelected(!isSelected)
                            }}
                            uncheckedCheckBoxColor={GREY}
                            checkedCheckBoxColor={LIGHT_BLUE}
                            isChecked={isSelected}
                            rightText={"Notify people on Email of this meeting?"}
                            rightTextStyle={styles.checkboxTextStyle}
                        />

                        <CustomButton title={editableData ? 'Update' : 'Confirm'} style={[styles.button,]} onPress={handleSubmit} />

                        <CustomButton title={"Cancel Room"}
                            textStyle={[styles.buttonTextStyle, { color: BLACK }]}
                            style={styles.submitButtonStyle2} onPress={() => {

                                { editableData ? setShowDeletePopup(true) : navigation.goBack() }
                            }} />
                        <View style={styles.verticalMargin} />

                    </View>
                </ScrollView >
            </KeyboardAvoidingView>
            {
                renderModals()
            }

            < AppLoader isLoading={loading} />

            <TaskModal
                onPress={handleDeletePopup}
                text="Are you sure you want to cancel this room?"
                isVisible={showDeletePopup}
                onCancel={() => setShowDeletePopup(false)}
                type={AppString.DELETE}
            />
        </View >
    )

}



export default MeetingBookRoom