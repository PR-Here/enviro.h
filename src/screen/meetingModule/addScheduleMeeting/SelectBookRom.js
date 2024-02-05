import { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import Cross from '../../../../assets/images/SVG/charm_cross.svg'
import CustomButton from '../../../component/atoms/CustomButton'
import CustomText from '../../../component/atoms/CustomText'
import CustomToast from '../../../component/atoms/CustomToast'
import MeetingHomeHeader from '../../../component/header/MeetingHeader'
import RoomItem from '../../../component/listItems/RoomItem'
import FilterModal from '../../../component/modal/FilterModal'
import TaskModal from '../../../component/modal/TaskModal'
import useApiEffect from '../../../hooks/useApiEffect'
import { CHECK_ROOM_AVALIBILITY, GET_MEETING_ROOM_LIST } from "../../../services/ApiEndPoint"
import AppLoader from '../../../utils/AppLoader'
import AppString from '../../../utils/AppString'
import { ShowToast } from '../../../utils/Constant'
import { styles } from './Style'

const SelectBookRom = ({ navigation, route }) => {
    const location = route?.params?.item?.Meetingroomfloor?.BuildingModel?.Location
    var room_id = route?.params?.item?.room_id
    var isEdit = route?.params?.isEdit

    const [visible, setVisible] = useState(false);
    const [isTaskOn, setIsTaskOn] = useState(false) // toggle for task modal
    const [isToast, setIsToast] = useState(false) // visibility for Toast

    const { makeApiRequest, loading } = useApiEffect()
    const [roomData, setRoomData] = useState([]);
    const [filterData, setFilterData] = useState(location === undefined ? [] : [location.location_name]);
    const [selectedFilterName, setSelectedFilterName] = useState()
    const [selectedRoom, setSelectedRoom] = useState(-1)
    const [selectedRoomData, setSelectedRoomData] = useState(route?.params?.item === undefined ? null : route?.params?.item)
    const [roomBookMsg, setRoomBookMsg] = useState('');

    let userData = useSelector(state => state?.auth?.loginUser);
    const [selectedFilter, setSelectedFilter] = useState({ location_id: [location == undefined ? userData?.location_id : location?.location_id] })

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the filter modal
        setVisible(!visible);
    };

    useEffect(() => {
        GET_MEETING_ROOM_LIST_API()
    }, [selectedFilter]);

    useEffect(() => {
        roomData?.map((item, index) => {
            if (item.room_id === route?.params?.item?.room_id) {
                setSelectedRoomData(item)
                setSelectedRoom(index)
            }
        })
    }, [roomData]);

    async function GET_MEETING_ROOM_LIST_API() {
        setRoomData([])

        const payload = {
            ...selectedFilter,
            type: isEdit ? 1 : 0,
            bookedfrom: `${route?.params?.bookedFrom}`,
            bookedto: `${route?.params?.bookedTo}`
        }
        setSelectedRoom(-1)
        const apiData = await makeApiRequest({ url: GET_MEETING_ROOM_LIST, method: 'POST', isToken: true, data: payload });

        if (apiData?.status == true) {
            var filterData = []

            filterData.push(...apiData?.data?.filter((item, index) => item.room_id == route?.params?.item?.room_id))
            filterData.push(...apiData?.data?.filter((item, index) => item.room_id != route?.params?.item?.room_id))

            setRoomData(filterData)
            //setSelectedRoomData(item)
        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    async function CHECK_ROOM_AVALIBILITY_API(data, index) {

        const payload = {
            meeting_room_name_id: data.room_id,
            all_day: route?.params?.isAllDay == true ? 1 : 0,
            bookedfrom: `${route?.params?.bookedFrom}`,
            bookedto: `${route?.params?.bookedTo}`
        }
        // console.log('payload', payload);
        const apiData = await makeApiRequest({ url: CHECK_ROOM_AVALIBILITY, method: 'POST', isToken: true, data: payload });
        // console.log('---->>>', apiData);
        if (apiData?.status == true) {
            if (apiData?.data.available == true) {
                setSelectedRoomData(data)
                setSelectedRoom(index)
            } else {
                setIsToast(true)
                setRoomBookMsg(apiData?.message)
            }
        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    const removeFilter = (indexToRemove) => {
        const updatedFilterData = [...filterData];
        const removedFilter = updatedFilterData.splice(indexToRemove, 1)[0];
        setFilterData(updatedFilterData);

        const updatedSelectedFilter = { ...selectedFilter };

        if (removedFilter === selectedFilterName?.location_name) {
            delete updatedSelectedFilter?.location_id;
        } else if (removedFilter === selectedFilterName?.building_name) {
            delete updatedSelectedFilter.building_id;
        } else if (removedFilter === selectedFilterName?.floor_name) {
            delete updatedSelectedFilter?.floor_id;
        }

        const transformedData = {
            location_id: [userData?.location_id],
        };
        setSelectedFilter(indexToRemove == 0 ? transformedData : updatedSelectedFilter);


        GET_MEETING_ROOM_LIST_API();
    };

    const handleFilterModalApply = (selectedData) => {
        setSelectedRoom(-1)
        const cleanedData = {};

        const dataArray = [
            selectedData.location_name,
            selectedData.building_name,
            selectedData.floor_name,
        ];

        const transformedData = {
            location_id: [selectedData?.location_id],
            floor_id: [selectedData?.floor_id],
            building_id: [selectedData?.building_id],
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

    return (
        <View style={styles.container}>

            <MeetingHomeHeader
                headerText={'Book Room'}
                filter={true}
                onFilterClick={() => toggleBottomNavigationView()}
                icon={'filter'} />

            <View style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}>
                {filterData.map((item, index) => {
                    return (
                        <View style={styles.filterViewStyle} key={index}>
                            <CustomText children={item} style={styles.filterText} />
                            <TouchableOpacity onPress={() => {
                                removeFilter(index)
                            }}>
                                {filterData.length == 1 && <Cross />}

                                {location?.location_name !== item && selectedFilterName?.location_name != item ? <View style={{ paddingLeft: 5 }}>
                                    <Cross />
                                </View> : null}
                                {/* <Image source={AssetsImages.CLOSE} style={styles.icon} /> */}
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>

            <View style={styles.listLabelView}>
                <CustomText children={'Rooms Available'} style={styles.subTitle} />
                {/* <Text style={styles.viewAllTextStyle}>View All</Text> */}
            </View>

            <FlatList
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 10 }}
                horizontal
                data={roomData}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                    return (
                        <RoomItem
                            room_id={room_id}
                            data={item} index={index} selectedIndex={selectedRoom} onPress={(index, data) => {
                                //console.log('selected Room ====> ', index, data)
                                if (index == -1) {
                                    setSelectedRoomData(null)
                                    setSelectedRoom(-1)
                                } else {
                                    CHECK_ROOM_AVALIBILITY_API(data, index)
                                }
                            }} />
                    )
                }}
                ListEmptyComponent={
                    <View style={styles.noRecordView}>
                        <CustomText children={'No Rooms Available'} style={{ alignSelf: 'center' }} />
                    </View>
                }
            />
            <CustomButton title={AppString.CONFIRM}
                textStyle={styles.buttonTextStyle}
                style={styles.confirmButtonStyle}
                onPress={() => {
                    // if (selectedRoomData != undefined) {
                    //     setIsTaskOn(true)
                    // } else {
                    //     ShowToast('Select room first.')
                    // }
                    route.params?.onReturn(selectedRoomData);
                    navigation.goBack()
                }} />

            <FilterModal
                visible={visible}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}
                onApplyClick={handleFilterModalApply}
                list={filterData}
                locationName={location?.location_name}
            />

            <TaskModal
                isVisible={isTaskOn}
                onPress={() => {
                    route.params?.onReturn(selectedRoomData);
                    navigation.goBack()
                    //console.log('editData--------->', editData);
                    //navigation.navigate(NavString.ADD_SCHEDULE_MEETING, { data: JSON.stringify(selectedRoomData), item: editData })
                }}
                onCancel={() => setIsTaskOn(false)}
                text={`Are you sure you want to book ${selectedRoomData?.Meetingroomfloor?.BuildingModel?.building_name}, ${selectedRoomData?.Meetingroomfloor?.floor_name}, ${selectedRoomData?.Meetingroomfloor?.BuildingModel?.Location?.location_name}`}
                type={AppString.SUCESS}
            />

            <CustomToast text={roomBookMsg} type={false} isVisible={isToast} onPress={() => {
                setIsToast(false)
            }} />

            <AppLoader isLoading={loading} />
        </View>
    )
}

export default SelectBookRom