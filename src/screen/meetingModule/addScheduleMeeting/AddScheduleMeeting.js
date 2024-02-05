import moment from "moment";
import { useEffect, useState } from "react";
import { Clipboard, FlatList, Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CheckBox from 'react-native-check-box';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import CapacityOrange from '../../../../assets/images/SVG/capacity-orange.svg';
import CopyCode from '../../../../assets/images/SVG/copyCode.svg';
import Globe from '../../../../assets/images/SVG/globe.svg';
import MapPin from '../../../../assets/images/SVG/map-pin.svg';
import PaperClip from '../../../../assets/images/SVG/paperclip.svg';
import Rotate from '../../../../assets/images/SVG/rotate-cw.svg';
import BlankSpace from "../../../component/atoms/BlankSpace";
import CustomButton from "../../../component/atoms/CustomButton";
import CustomText from "../../../component/atoms/CustomText";
import CustomToast from "../../../component/atoms/CustomToast";
import HistorySwitch from "../../../component/atoms/HistorySwitch";
import ScheduleMeetingSearch from "../../../component/atoms/ScheduleMeetingSearch";
import TimeSelect from "../../../component/atoms/TimeSelect";
import AvailModal from "../../../component/modal/AvailModal";
import MeetingRepeatModel from "../../../component/modal/MeetingRepeatModel";
import TaskModal from "../../../component/modal/TaskModal";
import useApiEffect from '../../../hooks/useApiEffect';
import { onTabBarSroll } from "../../../redux/slices/TabBarSlice";
import { CREATE_MEETING, GET_USERSSERACH_LIST } from "../../../services/ApiEndPoint";
import { BLACK, GREY, LIGHT_BLUE, ORANGE } from "../../../theme/Colors";
import { FontName, FontSize } from "../../../theme/Fonts";
import AppLoader from "../../../utils/AppLoader";
import AppString from "../../../utils/AppString";
import AssetsImages, { DUMMY_CLIENT, DummyUsersPic, SEARCH, USER_Ellipse } from "../../../utils/AssetsImages";
import { ShowToast, calculateDuration, convertLocalToUTC, convertTimeToUTC, createFormData, getFileNameFromUrl, getLocalTimeZone, onScrollHandler, showUTCToLocal } from "../../../utils/Constant";
import NavString from '../../../utils/NavString';
import { styles } from "./Style";

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Cross from '../../../../assets/images/SVG/charm_cross.svg';
import MeetingHomeHeader from "../../../component/header/MeetingHeader";
import { googleMeetAccessToken } from "../../../redux/slices/GoogleMeetSlice";
import { handleGoogleSignIn, signOutGoogle } from "../../../utils/GoogleMeetConstant";


const AddScheduleMeeting = ({ navigation, route }) => {

    let googleMeetToken = useSelector(state => state?.googleMeet?.meetAccessToken);
    let lastUpdatedTime = useSelector(state => state?.googleMeet?.lastUpdatedTime);
    const loginUserData = useSelector((state) => state?.auth?.loginUser);
    var editData = route?.params?.item
    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState(false)
    const meetingId = editData == undefined ? 0 : editData?.schedule_meeting_id == null ? 0 : editData?.schedule_meeting_id
    const meetingRoomId = editData == undefined ? 0 : editData?.book_room_id == null ? 0 : editData?.book_room_id

    const [allDayMeeting, setAllDayMeeting] = useState(editData == undefined ? false : editData?.all_day)
    const [isSelected, setSelected] = useState(editData == undefined ? false : editData?.notification_status) //Notification 
    const [showDeletePopup, setShowDeletePopup] = useState(false); // Cancel Meeting model state
    const [isVisible, setIsVisible] = useState(false) // toggle for availability modal
    const [isToast, setIsToast] = useState(false) // visibility for Toast 
    const [isMeetingRepeat, setIsMeetingRepeat] = useState(false) // visibility for Meeting frequency
    const [isHomeRedirect, setIsHomeRedirect] = useState(false) // visibility for CustomToast
    const [roomBookMsg, setRoomBookMsg] = useState('');
    const isLinkCreated = editData == undefined ? false : editData?.meeting_link !== null // visibility for Meet Link 
    const linkUrl = editData == undefined ? '' : editData?.meeting_link;
    const meetEventId = editData == undefined ? null : editData?.eventId;

    var [isDelete, setIsDelete] = useState(0)

    const getFrequencyPosition = (frequency) => {
        if (frequency == 'DNR') {
            return 0
        } else if (frequency == 'DAILY') {
            return 1
        } else if (frequency == 'WEEKLY') {
            return 2
        } else if (frequency == 'MONTHLY') {
            return 3
        }
    }

    const getFrequency = (frequency) => {
        if (frequency == 'DNR') {
            return 'Does not repeat'
        } else if (frequency == 'DAILY') {
            return 'Every Day'
        } else if (frequency == 'WEEKLY') {
            return 'Every Week'
        } else if (frequency == 'MONTHLY') {
            return 'Every Month'
        }
    }

    const [meetingRepeat, setMeetingRepeat] = useState(editData == undefined ? "DNR" : editData?.meeting_frequency)//
    // const [meetingRepeatTitle, setMeetingRepeatTitle] = useState(getFrequency(editData == undefined ? "DNR" : editData?.meeting_frequency))
    const [selectedUserList, setSelectedUserList] = useState(editData == undefined ? [] : JSON.parse(editData.guest));
    const [usersList, setUsersList] = useState([]);
    const [searchComplete, setSearchComplete] = useState(false)
    const [selectedRoomData, setSelectedRoomData] = useState(null)
    const [attachment, setAttachment] = useState(editData == undefined ? null : editData?.attachments)

    const [date, setDate] = useState(moment(editData == undefined ? moment() : editData?.bookedfrom.replace(".000Z", "")).format('dddd, D MMM YYYY'))//.format('dddd,Do MMM YYYY')

    const [searchedName, setSearchedName] = useState("")
    const [title, setTitle] = useState(editData?.meeting_title)

    //var start = moment(editData?.bookedfrom.replace(".000Z", "")).format('HH:mm')
    //var end = moment(editData?.bookedto.replace(".000Z", "")).format('HH:mm')
    const [startTime, setStartTime] = useState(editData === undefined ? convertLocalToUTC(moment()) : editData?.bookedfrom)
    const [endTime, setEndTime] = useState(editData === undefined ? convertLocalToUTC(moment().add(1, 'hours')) : editData?.bookedto)

    //const [startTime, setStartTime] = useState(editData == undefined ? moment().format('HH:mm') : start)
    //const [endTime, setEndTime] = useState(editData == undefined ? moment().add(1, 'hours').format('HH:mm') : end)
    const { makeApiRequest, loading } = useApiEffect()
    let isFirstTime = true

    useEffect(() => {
        dispatch(onTabBarSroll(true))
        //const hours = calculateDuration(lastUpdatedTime, moment().format())
        //console.log('googleMeetToken----------->', googleMeetToken);
        //console.log('lastUpdatedTime----------->', lastUpdatedTime);
        //console.log('hours and minutes----------->', hours.hours, hours.minutes);
        if (googleMeetToken == null) {
            promptShow()
        }
        //  else if (hours.hours >= 1) {
        //     ShowToast('Token expire please SignIn again')
        //     promptShow()
        // }
    }, [])

    const promptShow = async () => {
        await handleGoogleSignIn((token) => {
            console.log('promptShow handleGoogleSignIn token => ', token);
            //ShowToast(`token --->${token}`)
            dispatch(googleMeetAccessToken(token))
            //ShowToast('Token generated Successfully.')
            if (!isFirstTime) {
                ShowToast('Token generated Successfully.')
            }
        });
    }

    useEffect(() => {
        //console.log('route?.params?.item------', route?.params?.item);
        if (editData !== undefined) {
            setIsEdit(true)
            MeetingDetailsAPI(editData.schedule_meeting_id)
        }
    }, [route?.params?.item]);

    useEffect(() => {
        route.params?.data && setSelectedRoomData(JSON.parse(route.params?.data))
    }, [route.params?.data]);


    const onDateApply = (selectedDate, startTime, endTime) => {
        setIsVisible(false)
        setDate(moment(selectedDate).format('dddd, D MMM YYYY'))
        setStartTime(startTime)
        setEndTime(endTime)
    };

    // Function to update search results based on the input text
    const handleSearch = (text) => {
        setSearchedName(text)
    };

    useEffect(() => {
        if (searchedName.length >= 3) {
            setSearchComplete(false)
            GET_USERSSEARCH_API(0, searchedName)
        } else {
            setUsersList([])
        }
    }, [searchedName])

    {/* Get Meeting Details API */ }
    async function MeetingDetailsAPI(id) {
        const apiData = await makeApiRequest({ url: CREATE_MEETING + '/' + id, method: 'GET', isToken: true });
        if (apiData?.status == true && apiData?.data !== null) {
            const data = apiData?.data
            if (data?.meeting.MeetingRoomBooked !== undefined) {
                setSelectedRoomData(data?.meeting?.MeetingRoomBooked?.Meetingroom)
            }
        }
    }

    const handleDeletePopup = () => {
        setShowDeletePopup(false);
        DELETE_MEETING_API()
    };

    { /* Delete Meeting API */ }
    async function DELETE_MEETING_API() {
        const payload = {
            googleMeetAccessToken: googleMeetToken,
            meetingId: meetingId,
        }
        const apiData = await makeApiRequest({ url: CREATE_MEETING + '/delete', method: 'POST', isToken: true, data: payload });
        if (apiData?.status == true) {
            setIsHomeRedirect(true)
            setRoomBookMsg(apiData?.message)
            setIsToast(true)
        } else {
            if (apiData?.eventerror === true) {
                ShowToast('Token expire please SignIn again')
                isFirstTime = false
                promptShow()
            } else {
                setIsHomeRedirect(false)
                setRoomBookMsg(apiData?.message)
                setIsToast(true)
            }
        }
    }

    {/* User Search Api */ }
    async function GET_USERSSEARCH_API(page, text) {
        const apiData = await makeApiRequest({ url: GET_USERSSERACH_LIST, method: 'POST', isToken: true, data: { page: page, name: text } });
        setUsersList([])
        if (apiData?.status == true) {
            //setUsersList((prevUserState) => [...prevUserState, ...apiData?.data?.rows]);
            var filterData = []
            filterData.push(...apiData?.data?.rows?.filter((item, index) => item.email != loginUserData?.email))
            setUsersList(filterData)
        }
        setSearchComplete(true)
    }

    const validateForm = (checkLink = false) => {
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
                ShowToast('Please select meeting time.')
                return false
            }
        }
        if (selectedUserList.length == 0) {
            ShowToast('Please select people to invite.')
            return false
        }
        // if (checkLink && !isLinkCreated) {
        //     ShowToast('Please add meeting link.')
        //     return false
        // }
        return true;
    };

    const handleSubmit = () => {
        if (validateForm(true)) {
            CREATE_MEETING_API()
        }
    }

    async function CREATE_MEETING_API() {
        // if (!selectedUserList.includes(loginUserData?.email)) {
        //     selectedUserList.push(loginUserData?.email)
        // }

        const roomValue = selectedRoomData?.room_id ? {
            meeting_room_name_id: selectedRoomData?.room_id,
            location_id: selectedRoomData?.Meetingroomfloor?.BuildingModel?.location_id
        } : {}
        const eventId = meetEventId != null ? { eventId: meetEventId } : {}
        const payload = {
            ...roomValue,
            ...eventId,
            googleMeetAccessToken: googleMeetToken,
            schedule_meeting_id: meetingId, //In case of Edit
            book_room_id: meetingRoomId, //In case of Edit
            meeting_title: title,
            guest: JSON.stringify(selectedUserList),
            all_day: allDayMeeting,
            notification_status: isSelected,
            is_delete: isDelete,
            status: 1,
            meeting_frequency: meetingRepeat,
            bookedfrom: `${moment(date, 'dddd, D MMM YYYY').format('YYYY-MM-DD')}T${allDayMeeting == true ? '00:00' : moment(startTime, 'yyyy-MM-DDTHH:mm:ss:z').format('HH:mm')}:01`, ///2024-01-05T09:49:15.847Z
            bookedto: `${moment(date, 'dddd, D MMM YYYY').format('YYYY-MM-DD')}T${allDayMeeting == true ? '23:59' : moment(endTime, 'yyyy-MM-DDTHH:mm:ss:z').format('HH:mm')}:59`
        }

        //console.log('payload ', payload);
        const formData = createFormData('attachments', attachment !== null ? JSON.stringify(attachment)?.includes('https:') ? null : attachment : null, payload)
        //console.log('payload ', JSON.stringify(formData));
        //return
        const apiData = await makeApiRequest({ url: CREATE_MEETING, method: 'POST', data: formData, isImageUpload: true });

        console.log('apiData', apiData);
        if (apiData?.status == true) {
            setIsHomeRedirect(true)
            setRoomBookMsg(apiData?.message)
            setIsToast(true)
        } else {
            if (apiData?.eventerror === true) {
                ShowToast('Token expire please SignIn again')
                isFirstTime = false
                signOutGoogle()
                promptShow()
            } else if (typeof apiData?.error === 'object') {
                setIsHomeRedirect(false)
                setRoomBookMsg(apiData?.error?.message)
                setIsToast(true)
            } else {
                setIsHomeRedirect(false)
                setRoomBookMsg(apiData?.message)
                setIsToast(true)
            }
        }
    }


    const ImageTextRow = (props) => {
        return (
            <TouchableOpacity onPress={props.onPress ? props.onPress : null} activeOpacity={props.onPress ? 0.2 : 1}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <Image source= style={[styles.imageStyle, { tintColor: props.tintColor }]} /> */}
                    {props.image}
                    <CustomText children={props.title} style={{
                        paddingTop: 10, paddingBottom: 10, fontSize: FontSize(14),
                        paddingStart: 8,
                        fontFamily: props.fontType ? props.fontType : FontName.Gordita_Regular,
                        fontWeight: '400',
                        color: props.tintColor ? props.tintColor : BLACK,
                        flex: 1
                    }} />
                    {props.cancel && <TouchableOpacity onPress={() => {
                        props.onCancel()
                    }}><View style={{ justifyContent: 'center', alignItems: 'flex-end' }}><Cross /></View></TouchableOpacity>}
                </View>
            </TouchableOpacity>
        )
    }

    {/* Users List Item */ }
    const ResultItem = ({ item }) => {
        const onPress = () => {
            if (!selectedUserList.includes(item.email)) {
                setSelectedUserList([...selectedUserList, item.email])
            } else {
                setSelectedUserList(selectedUserList.filter((selected) => selected !== item));
            }
            setSearchComplete(false)
            setSearchedName("")
        }

        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.5} >
                <View style={styles.searchResultContainer}>
                    <View style={styles.resultItemInnerContainer}>
                        <Image style={[styles.border, styles.userImageCircle, { borderRadius: 100 }]} source={item.profile_image === null || item.profile_image === '' ? AssetsImages.DUMMY : { uri: item.profile_image }}></Image>
                        <View style={styles.userDetailsContainer}>
                            <CustomText children={item?.email} style={styles.userDesignationStyle} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
        );
    }

    const requestCameraPermission = async () => {
        try {
            const result = await DocumentPicker.pickSingle({ presentationStyle: 'fullScreen' });
            //setIsDelete(0)
            setAttachment({
                assets: [{
                    uri: result.uri,
                    type: result.type, // mime type
                    fileName: result.name,
                }]
            })
        } catch (err) {
            console.log('err in file pick=>', err);
        }
    }

    const copyToClipboard = () => {
        Clipboard.setString(linkUrl);
        //    ClipboardModule.copyToClipboard("Hello I am "); 
        ShowToast('Link copied to Clipboard!')
    };


    return (
        <View style={styles.container}>

            <MeetingHomeHeader headerText={editData == undefined ? "Schedule Meeting" : 'My Meeting'} />

            <ScrollView
                showsVerticalScrollIndicator={false} //onScroll={onScroll}
            >

                <View style={{ padding: 12 }}>

                    <ScheduleMeetingSearch title={AppString.ADD_TITLE}
                        containerStyle={styles.textFieldStyle}
                        value={title}
                        onChangeText={(text) => {
                            setTitle(text)
                        }}
                    />

                    <HistorySwitch
                        containerStyle={{ marginTop: 15, marginBottom: 10 }}
                        title="All day" image={AssetsImages.HISTORY}
                        status={allDayMeeting} onChange={(isOn) => {
                            // if (isOn) {
                            //     setStartTime(convertLocalToUTC(moment()))
                            //     setEndTime(convertLocalToUTC(moment().add(1, 'hours')))
                            // }
                            setAllDayMeeting(isOn)
                        }} />

                    <TimeSelect
                        fromMeeting={true}
                        isAllDay={!allDayMeeting}
                        time={`${showUTCToLocal(startTime)} - ${showUTCToLocal(endTime)}`}
                        date={date} containerStyle={{
                            marginTop: 10,
                            marginBottom: 10,
                        }} onPress={() => {
                            setIsVisible(!isVisible)
                        }} />

                    {!allDayMeeting ?
                        <View>
                            <ImageTextRow title={AppString.INDIA_STANDARD_TIME} image={<Globe />} />
                        </View> : null
                    }

                    <ImageTextRow title={getFrequency(meetingRepeat)}
                        fontType={FontName.Gordita_Medium}
                        image={<Rotate />} tintColor={ORANGE} onPress={() => {
                            //setIsMeetingRepeat(!isMeetingRepeat)
                        }} />

                </View>

                <View style={styles.separatorStyle}></View>

                <View style={{ padding: 12 }}>

                    <ScheduleMeetingSearch
                        value={searchedName}
                        placeholder="Search"
                        title={AppString.PEOPLE_TO_INVITE}
                        icon={SEARCH} style={styles.textFieldStyle}
                        onChangeText={handleSearch} />

                    {searchComplete && usersList.length > 0 && (
                        <FlatList
                            nestedScrollEnabled
                            style={styles.flatListSearchStyle}
                            data={usersList}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <ResultItem item={item} />}
                            onEndReachedThreshold={0.5}
                        />
                    )}

                    {isLinkCreated ?
                        <View style={styles.linkViewStyle} >
                            <CustomText children={linkUrl} style={styles.linkTextStyle}
                            />
                            <TouchableOpacity onPress={copyToClipboard}>
                                <CopyCode />
                            </TouchableOpacity>
                        </View>
                        : <></>
                    }

                    {/* <Spacer style={{ marginTop: heightPercentageToDP(2)}}/> */}
                    <View style={{ marginTop: 10 }} />

                    {/* <ImageTextRow title="Pre Approve Guest Entry" image={<User />} /> */}

                    {selectedUserList &&
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginTop: 10
                        }}>
                            {selectedUserList.map((item, index) => {
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
                    }

                    <ImageTextRow title={`Book room ${selectedRoomData != null ? ' - ' + selectedRoomData.Meetingroomfloor.BuildingModel.building_name + ', ' + selectedRoomData.Meetingroomfloor.floor_name : ''}`}
                        image={<CapacityOrange />}
                        tintColor={ORANGE}
                        cancel={selectedRoomData && true}
                        onCancel={() => {
                            setSelectedRoomData(null)
                        }}
                        fontType={FontName.Gordita_Medium}
                        onPress={() => {
                            if (!title) {
                                ShowToast('Please enter a title.')
                            } else if (allDayMeeting === true) {
                                console.log();
                                navigation.navigate(NavString.SELECT_BOOK_ROOM, {
                                    isEdit: isEdit,
                                    item: selectedRoomData,
                                    isAllDay: allDayMeeting,
                                    bookedFrom: `${moment(date, 'dddd, D MMM YYYY').format('YYYY-MM-DD')}T00:00:00`,
                                    bookedTo: `${moment(date, 'dddd, D MMM YYYY').format('YYYY-MM-DD')}T23:59:00`,
                                    onReturn: (item) => {
                                        setSelectedRoomData(item)
                                    }
                                })
                            } else if (startTime !== '00:00' && endTime !== '00:00') {
                                navigation.navigate(NavString.SELECT_BOOK_ROOM, {
                                    isEdit: isEdit,
                                    editData: editData,
                                    item: selectedRoomData,
                                    isAllDay: allDayMeeting,
                                    bookedFrom: `${moment(date, 'dddd, D MMM YYYY').format('YYYY-MM-DD')}T${moment(startTime, 'yyyy-MM-DDTHH:mm:ss:z').format('HH:mm')}:00`,
                                    bookedTo: `${moment(date, 'dddd, D MMM YYYY').format('YYYY-MM-DD')}T${moment(endTime, 'yyyy-MM-DDTHH:mm:ss:z').format('HH:mm')}:59`,
                                    onReturn: (item) => {
                                        setSelectedRoomData(item)
                                    }
                                })
                            } else {
                                ShowToast('Please select booking time.')
                            }
                        }}
                    />

                    {selectedRoomData != null ? <ImageTextRow title={`${selectedRoomData.Meetingroomfloor.BuildingModel.Location.location_name}`} image={<MapPin />} /> : null}

                    <ImageTextRow title={`${attachment == null ? 'Attachment' : typeof attachment === 'string' ? getFileNameFromUrl(attachment) : attachment?.assets[0]?.fileName}`}
                        //image={attachment == null ? <PaperClip /> : <PaperClipOrange />}
                        image={<PaperClip />}
                        //tintColor={attachment && ORANGE}
                        onPress={() => {
                            if (typeof attachment !== 'string') {
                                requestCameraPermission()
                            }
                        }}
                        cancel={attachment && true}
                        onCancel={() => {
                            if (isEdit && typeof attachment === 'string') {
                                setIsDelete(1)
                            }
                            setAttachment(null)
                        }}
                    />

                    <CheckBox
                        style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}
                        onClick={() => {
                            setSelected(!isSelected)
                        }}
                        uncheckedCheckBoxColor={GREY}
                        checkedCheckBoxColor={LIGHT_BLUE}
                        isChecked={isSelected}
                        rightText={"Notify people on Email of this meeting?"}
                        rightTextStyle={styles.checkboxTextStyle}
                    />

                    <CustomButton title={isEdit ? AppString.SAVE_MEETING : AppString.CREATE_MEETING}
                        textStyle={styles.buttonTextStyle}
                        style={styles.submitButtonStyle} onPress={handleSubmit} />

                    <CustomButton title={AppString.CANCEL_MEETING}
                        textStyle={[styles.buttonTextStyle, { color: BLACK }]}
                        style={styles.submitButtonStyle2} onPress={() => {
                            if (isEdit) {
                                setShowDeletePopup(true)
                            } else {
                                navigation.goBack()
                            }
                        }} />

                    <BlankSpace />
                </View>

                <AvailModal
                    visible={isVisible}
                    isAllDay={allDayMeeting}
                    onBackButtonPress={() => setIsVisible(false)}
                    onBackdropPress={() => setIsVisible(false)}
                    onDone={onDateApply}
                    meetingDate={date}
                    bookedFrom={startTime}
                    bookedTo={endTime}
                />

                <MeetingRepeatModel
                    visible={isMeetingRepeat}
                    selectedPosition={getFrequencyPosition(meetingRepeat)}
                    onDone={(item, index) => {
                        setIsMeetingRepeat(!isMeetingRepeat)
                        setMeetingRepeat(item.key)
                    }
                    }
                />

                <CustomToast text={roomBookMsg} type={isHomeRedirect} isVisible={isToast} onPress={() => {
                    if (isHomeRedirect) {
                        setIsToast(false)
                        navigation.navigate(NavString.MEETING_HOME, { update: true })
                    } else {
                        setIsToast(false)
                    }
                }} />

                <TaskModal
                    onPress={handleDeletePopup}
                    text="Are you sure you want to Cancel this Meeting?"
                    isVisible={showDeletePopup}
                    onCancel={() => setShowDeletePopup(false)}
                    type={AppString.DELETE}
                />
            </ScrollView  >
            <AppLoader isLoading={loading} />
        </View>
    )
}

export default AddScheduleMeeting;
