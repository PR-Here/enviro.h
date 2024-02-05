import { FlatList, Image, View, ScrollView, TouchableOpacity, Alert, BackHandler } from "react-native";
import { useEffect, useRef, useState } from 'react'
import { styles } from "./Style";
import CustomSearchBox from "../../../component/atoms/CustomSearchBox";
import { CLOSE, DOWN_ARROW, DUMMY, PLACEHOLDER } from "../../../utils/AssetsImages";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import AppString from "../../../utils/AppString";
import CustomText from "../../../component/atoms/CustomText";
import NavString from "../../../utils/NavString";
import SearchUserModal from "../../../component/modal/SearchUserModal";
import { GET_DEPARTMENT_MASTERS, GET_DESIGNATION_MASTERS, GET_LOCATION_MASTERS, GET_SKILLS_MASTERS, GET_USERSSERACH_LIST } from "../../../services/ApiEndPoint";
import useApiEffect from '../../../hooks/useApiEffect';
import AppLoader from "../../../utils/AppLoader";
import { ActivityIndicator } from "react-native-paper";
import { BUTTON_BACKGROUND, PRIMARY_COLOR, WHITE } from "../../../theme/Colors";
import { useSelector, useDispatch } from "react-redux";
import NotificationHeader from "../../../component/header/NotificationHeader";
import { ShowToast, capitalizeFirstLetter, onScrollHandler } from "../../../utils/Constant";
import { FontName } from "../../../theme/Fonts";
import RightArrow from '../../../../assets/images/SVG/right_arrow_large.svg'
import { onTabBarSroll } from '../../../redux/slices/TabBarSlice';
import UserProfileModal from "../../../component/modal/ProfileImageModal";
import { userProfileData } from "../../../redux/slices/AuthSlice";
import analytics from '@react-native-firebase/analytics';
import { useRoute } from "@react-navigation/native";

let searchedName = ""
let isFirstTime = true

const SearchUsers = ({ navigation }) => {
    const [selectedId, setSelectedId] = useState(1)
    const [visible, setVisible] = useState(false); // toggle for filter
    const { makeApiRequest, loading } = useApiEffect()
    const [departmentData, setDepartmentData] = useState([]);
    const [showProfilePopup, setShowProfilePoup] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState(false);
    const loginUserData = useSelector((state) => state?.auth?.loginUser);
    const [locationVisible, setLocationVisible] = useState(false); // toggle for filter
    const [locationData, setLocationData] = useState([])
    const [designationVisible, setDesignationVisible] = useState(false); // toggle for filter
    const [designationData, setDesignationData] = useState([])
    const [skillsVisible, setSkillsVisible] = useState(false); // toggle for filter
    const [skillsData, setSkillsData] = useState([])
    const [items, setItems] = useState([]);
    const [filterTextString, setFilterTextString] = useState([]);


    //console.log('login UserData-------------', useSelector((state) => state?.auth?.loginUser))

    {/*PAGINATION */ }
    const [page, setPage] = useState(-1);
    const [maxResource, setMaxResource] = useState(0);
    const [usersList, setUsersList] = useState([]);
    const [bottomLoading, setBottomLoading] = useState(false)
    const dispatch = useDispatch()

    const route = useRoute();
    const onScroll = (e) => {
        const hideTabBar = onScrollHandler(e, navigation)
        dispatch(onTabBarSroll(hideTabBar))
    }

    useEffect(() => {
        setUsersList([])
        setUsersList((prev) => [])
        setMaxResource(0)
        setPage(0)
        if (page == 0) {
            if (items.length > 0 || searchedName.trim().length > 0) {
                GET_USERSSEARCH_API(0)
            }
        }

    }, [items])



    useEffect(() => {

        const backAction = () => {

            if (navigation.isFocused()) {

                handleBackPress()
            }

            return true
        }


        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove()

    }, [])


    useEffect(() => {

        if (page > -1) {
            if (items.length > 0 || searchedName.trim().length > 0) {
                GET_USERSSEARCH_API(page)
            }

        }
    }, [page])

    // Firebase Analytics Basket for Search Item on MyDirectory_Basket
    const setSearchInfo = async (searchString) => {
        try {
            await analytics().logEvent('MyDirectory_Basket', {
                search_by_name: searchString,
            })
        } catch (error) {
            console.error('Error logging custom event:', error);
        }
    }

    // Firebase Analytics Basket for Search Item on MyDirectory_Basket
    const setDepartmentInfo = async (name, department, location) => {
        console.log('name,department,location--->', name, department, location);
        try {
            await analytics().logEvent('MyDirectory_Basket', {
                user_info: name + ', ' + department + ', ' + location
                // department_name: department,
                // location_name: location
            })
        } catch (error) {
            console.error('Error logging custom event:', error);
        }
    }

    {/* Toggling the visibility state of the filter modal Department */ }
    const toggleBottomNavigationView = () => {

        setVisible(!visible);
    };

    {/* Toggling the visibility state of the filter modal Location */ }
    const toggleBottomNavigationViewLocation = () => {
        //Toggling the visibility state of the filter modal
        setLocationVisible(!locationVisible);
    };

    {/* Toggling the visibility state of the filter modal Designation */ }
    const toggleBottomNavigationViewDesignation = () => {
        //Toggling the visibility state of the filter modal
        setDesignationVisible(!designationVisible);
    };

    {/* Toggling the visibility state of the filter modal Skills */ }
    const toggleBottomNavigationViewSkills = () => {
        //Toggling the visibility state of the filter modal
        setSkillsVisible(!skillsVisible);
    };

    const Data = [
        {
            id: 4,
            name: 'Location',
            isMultiSelection: true

        },
        {
            id: 2,
            name: 'Department',
            isMultiSelection: true
        },
        {
            id: 3,
            name: 'Designation',
            isMultiSelection: true

        },
        {
            id: 5,
            name: 'Skills',
            isMultiSelection: true
        }
    ]


    {/* Users List Item */ }
    const ResultItem = ({ item }) => {
        return (
            < TouchableOpacity onPress={() => {
                setDepartmentInfo(item.first_name + ' ' + item?.last_name, item?.Designation?.designation_name, item?.Location?.location_name)
                dispatch(userProfileData(null))
                if (item?.user_id == loginUserData?.user_id) {
                    navigation.navigate(NavString.MY_PROFILE, { loginRole: 'loginUser' })
                } else {


                    var roleIds = loginUserData?.role_id
                    let roles = roleIds?.split(',')

                    if (roles?.length == 1 && roles?.includes('1')) {
                        navigation.navigate(NavString.MY_PROFILE, { loginRole: 'hr', userId: item?.user_id })
                    } else {
                        navigation.navigate(NavString.MY_PROFILE, { loginRole: 'manager', userId: item?.user_id })
                    }

                }

            }} activeOpacity={0.5} >
                <View style={styles.searchResultContainer}>
                    <View style={styles.resultItemInnerContainer}>
                        <TouchableOpacity onPress={() => {
                            setShowProfilePoup(true)
                            setProfileImageUrl(item?.profile_image == null || item?.profile_image == '' ? "https://bournemouth.foodbank.org.uk/wp-content/uploads/sites/64/2023/03/506-5067022_sweet-shap-profile-placeholder-hd-png-download.png" : item?.profile_image)
                        }}>
                            <Image style={[styles.border, styles.userCircleImage]} source={item?.profile_image == null || item?.profile_image == '' ? DUMMY : { uri: item?.profile_image }} ></Image>
                        </TouchableOpacity>
                        <View style={styles.userDetailsContainer}>
                            <CustomText children={capitalizeFirstLetter(item.first_name + ' ' + item?.last_name)} style={styles.userNameStyle} />
                            <CustomText children={item?.Designation?.designation_name == null ? 'No Data Added' : capitalizeFirstLetter(item?.Designation?.designation_name)} style={styles.userDesignationStyle} />
                            <CustomText children={item?.Location?.location_name == null ? 'No Data Added' : capitalizeFirstLetter(item?.Location?.location_name)} style={styles.userLocationStyle} />
                        </View>
                    </View>

                    <RightArrow />
                </View>
            </TouchableOpacity >
        );
    }

    // Notification id == both 
    // delete = id status == "delete=1/starred=0"




    // {/* Users List Item with OnPress */ }
    // const renderResultItem = ({ item }) => {
    //     console.log('dataitems---------------------------------', item)
    //     return (
    //         <ResultItem
    //             item={item}
    //             onPress={() => {
    //                 navigation.navigate(NavString.MY_PROFILE, { isEditable: true })
    //             }}
    //         />

    //     );
    // }


    {/* Search Filter List Item */ }
    const SearchType = ({ item, index }) => {
        const backgroundColor = item.id === selectedId ? PRIMARY_COLOR : WHITE;
        const fontFamily = item.id === selectedId ? FontName.Gordita_Medium : FontName.Gordita_Regular;
        const fontWeight = item.id === selectedId ? 500 : 400;
        const color = item.id === selectedId ? WHITE : PRIMARY_COLOR;
        const imageTintColor = item.id === selectedId ? WHITE : PRIMARY_COLOR;

        return (
            <TouchableOpacity onPress={
                () => {
                    setSelectedId(item.id)

                    if (item.id == 2) {
                        if (departmentData.length == 0) {
                            GET_DEPARTMENTS_API()
                        } else {
                            setVisible(!visible)
                        }
                    } else if (item.id == 4) {
                        if (locationData.length == 0) {
                            GET_LOCATIONS_API()
                        } else {
                            setLocationVisible(!locationVisible)
                        }
                    } else if (item.id == 3) {
                        // if (designationData.length == 0) {
                        //     GET_DESIGNATION_API()
                        // } else {
                        //     setDesignationVisible(!designationVisible)
                        // }
                        GET_DESIGNATION_API()
                    } else {
                        if (skillsData.length == 0) {
                            GET_SKILLS_API()
                        } else {
                            setSkillsVisible(!skillsVisible)
                        }
                    }

                }
            }>
                <View style={[styles.searchListTextContainer, { backgroundColor: backgroundColor }]}>
                    <CustomText children={item.name} style={[styles.userTypeText, styles.searchTypeTextStyle, { fontFamily: fontFamily, fontWeight: fontWeight, color: color }]} />
                    {item.isMultiSelection ? <Image style={[styles.downArrowStyle, { tintColor: imageTintColor }]} source={DOWN_ARROW} /> : null}
                </View>
            </TouchableOpacity>
        )
    }


    {/* Get Department Master Api */ }
    async function GET_DEPARTMENTS_API() {

        const apiData = await makeApiRequest({ url: GET_DEPARTMENT_MASTERS, method: 'GET', isToken: true });
        if (apiData?.status == true) {
            setVisible(!visible)
            setDepartmentData(filterDepartmentListKeyModify(apiData?.data))
        } else {
            console.log("PROFILE API ERROR: ", apiData)
        }
    }

    {/* Get Location Master Api */ }
    async function GET_LOCATIONS_API() {

        const apiData = await makeApiRequest({ url: GET_LOCATION_MASTERS, method: 'GET', isToken: true });
        if (apiData?.status == true) {
            setLocationVisible(!locationVisible)
            // console.log('LocationData:----------------------------', apiData?.data)
            setLocationData(filterLocationListKeyModify(apiData?.data))
        } else {
            console.log("PROFILE API ERROR: ", apiData)
        }
    }

    {/* Get Designation Master Api based on Department */ }
    async function GET_DESIGNATION_API() {

        const departments = []

        items.map(item => {
            if (item.type == 'Department') {
                departments.push(item.id)
            }
        })


        let department = departments.length > 0 ? { departments: departments } : {}



        const apiData = await makeApiRequest({ url: GET_DESIGNATION_MASTERS, method: 'POST', isToken: true, data: { ...department } });
        if (apiData?.status == true) {
            setDesignationVisible(!designationVisible)
            setDesignationData(filterDesignationListKeyModify(apiData?.data))
        } else {
            console.log("PROFILE API ERROR: ", apiData)
            ShowToast(`${apiData?.message.replaceAll('\"', "")}`)
        }
    }

    {/* Get Skills Master Api */ }
    async function GET_SKILLS_API() {

        const apiData = await makeApiRequest({ url: GET_SKILLS_MASTERS, method: 'GET', isToken: true });
        if (apiData?.status == true) {
            setSkillsVisible(!skillsVisible)
            setSkillsData(filterSkillsListKeyModify(apiData?.data))
        } else {
            console.log("PROFILE API ERROR: ", apiData)
        }
    }


    {/* User Search Api */ }
    async function GET_USERSSEARCH_API(page) {
        setBottomLoading(true)

        const filterString = []
        const locations = []
        const department = []
        const designation = []
        const skills = []

        items.map(item => {
            filterString.push(capitalizeFirstLetter(item?.name))
            if (item.type == "Department") {

                department.push(item.id)
            } else if (item.type == "Location") {
                locations.push(item.id)
            } else if (item.type == "Designation") {
                designation.push(item.id)
            } else {
                skills.push(item.id)
            }
        })
        setFilterTextString(filterString)

        let location = locations.length > 0 ? { location: locations } : {}
        let departments = department.length > 0 ? { department: department } : {}
        let designations = designation.length > 0 ? { designation: designation } : {}
        let skill = skills.length > 0 ? { skill: skills } : {}
        let searchName = searchedName.trim().length > 0 ? { name: searchedName } : {}

        const body = {
            ...location,
            ...departments,
            ...designations,
            ...skill,
            pageno: page,
            ...searchName,
        }



        const apiData = await makeApiRequest({ url: GET_USERSSERACH_LIST, method: 'POST', isToken: true, data: body, showProgress: isFirstTime });
        isFirstTime = false
        if (apiData?.status == true) {
            console.log(apiData?.data)
            setUsersList(previousData => {
                return [...previousData, ...apiData?.data?.rows]
            });
            setMaxResource(apiData.data?.count)
            setBottomLoading(false)

        } else {
            console.log("PROFILE API ERROR: ", apiData)
            setBottomLoading(false)
        }
    }



    {/* Conversion Of Department Array */ }
    const filterDepartmentListKeyModify = (list) => {
        const departments = []

        list.map(item => {
            departments.push({
                id: item.department_id,
                name: item.department_name,
                status: item.status,
            })
        })

        return departments
    }

    {/* Conversion Of Location Array */ }
    const filterLocationListKeyModify = (list) => {
        const locations = []

        list.map(item => {
            locations.push({
                id: item.location_id,
                name: item.location_name,
                status: item.status,
            })
        })

        return locations
    }

    {/* Conversion Of Designation Array */ }
    const filterDesignationListKeyModify = (list) => {
        const designations = []

        list.map(item => {
            designations.push({
                id: item.designation_id,
                name: item.designation_name,
                status: item.status,
            })
        })

        return designations
    }

    {/* Conversion Of Skills Array */ }
    const filterSkillsListKeyModify = (list) => {
        const skills = []

        list.map(item => {
            skills.push({
                id: item.skill_id,
                name: item.skill_name,
                status: item.status,
            })
        })

        return skills
    }



    const handleBackPress = () => {
        setUsersList([])
        setUsersList((prev) => [])
        setItems([])
        searchedName = ""
        isFirstTime = true
        navigation.goBack()
    }




    // Profile Image Popup
    const handleProfilePopupClose = () => {
        setShowProfilePoup(false)
    }

    return (
        //Search User Container
        <View style={styles.container}>
            {/* Header */}
            <NotificationHeader
                onActionPress={() => {

                }}
                headerText="My Directory"
                handleBackPress={handleBackPress}
            />
            {/* Search box */}
            <View style={{ marginTop: widthPercentageToDP(3) }}>
                <CustomSearchBox placeholder="Search by Name/Email" onPress={(searchedText) => {
                    // setSearchInfo(searchedText)
                    setUsersList([])
                    setUsersList((prev) => [])
                    setMaxResource(0)
                    setPage(0)
                    searchedName = searchedText
                    if (items.length > 0 || searchedName.trim().length > 0) {
                        GET_USERSSEARCH_API(0)
                    }
                }} />
            </View>
            <View style={{ maxHeight: heightPercentageToDP(10), marginTop: 10, }} >
                <ScrollView ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.scrollView.scrollToEnd({ animated: true });
                    }}>
                    <View style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                        {items.map((item, index) => {
                            return (
                                <View style={styles.filterViewStyle} key={index}>
                                    <CustomText children={capitalizeFirstLetter(item.name)} style={styles.filterText} numberOflines={1} />
                                    <TouchableOpacity onPress={() => {
                                        setItems(() => items.filter(todo => todo.name != item.name))
                                        setFilterTextString(() => filterTextString.filter(todo => todo != item.name))
                                    }}>
                                        <Image source={CLOSE} style={styles.icon} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            {/* Filter Types List */}
            <View style={styles.searchTypeStyle}>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}>{Data.map((item) => <SearchType item={item} />)}
                </ScrollView>
            </View>
            {/* Search Result Text */}
            <CustomText children={AppString.SEARCH_RESULT + `(${maxResource})`} style={styles.searchResultTextStyle} />
            <View style={styles.innercontainer}>

                {/* Users List */}
                <FlatList
                    onScroll={onScroll}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    data={usersList}
                    renderItem={({ item }) => <ResultItem item={item} />}
                    keyExtractor={item => item.id}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (!bottomLoading) {
                            if (usersList.length < maxResource) {
                                //console.log(page)
                                setBottomLoading(true)
                                setPage(page + 1)
                            }
                        }
                    }}
                    ListEmptyComponent={
                        <View style={styles.emptyText}>
                            <CustomText children={'No Record Found'} style={{ alignSelf: 'center', fontFamily: FontName.Gordita_Medium }} />
                        </View>
                    }
                    ListFooterComponent={
                        <View style={{ height: widthPercentageToDP(5) }}>
                            {bottomLoading &&
                                <ActivityIndicator style={{ color: BUTTON_BACKGROUND, marginBottom: 10 }} />
                            }
                        </View>
                    }
                />
            </View>


            {/* DepartMent Search Filter */}
            <SearchUserModal
                visible={visible}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}
                data={departmentData}
                filterTextString={filterTextString}
                onPress={(id, name) => {
                    //console.log('id----------------------', id, name)
                    const newItems = items.filter(todo => todo.name != name)
                    newItems.push({ id: id, name: name, type: 'Department' })
                    setItems(newItems)
                    toggleBottomNavigationView()
                }}
                type="Department"
            />

            {/* Location Search Filter */}
            <SearchUserModal
                visible={locationVisible}
                onBackButtonPress={toggleBottomNavigationViewLocation}
                onBackdropPress={toggleBottomNavigationViewLocation}
                data={locationData}
                filterTextString={filterTextString}
                onPress={(id, name) => {
                    //console.log('id----------------------', id, name)

                    const newItems = items.filter(todo => todo.name != name)
                    newItems.push({ id: id, name: name, type: 'Location' })
                    setItems(newItems)
                    toggleBottomNavigationViewLocation()
                }}
                type="Location"
            />


            {/* Designation Search Filter */}
            <SearchUserModal
                visible={designationVisible}
                onBackButtonPress={toggleBottomNavigationViewDesignation}
                onBackdropPress={toggleBottomNavigationViewDesignation}
                data={designationData}
                filterTextString={filterTextString}
                onPress={(id, name) => {
                    const newItems = items.filter(todo => todo.name != name)
                    newItems.push({ id: id, name: name, type: 'Designation' })
                    setItems(newItems)
                    toggleBottomNavigationViewDesignation()
                }}
                type="Designation"
            />


            {/* Skills Search Filter */}
            <SearchUserModal
                visible={skillsVisible}
                onBackButtonPress={toggleBottomNavigationViewSkills}
                onBackdropPress={toggleBottomNavigationViewSkills}
                data={skillsData}
                filterTextString={filterTextString}
                onPress={(id, name) => {
                    //console.log('id----------------------', id, name)
                    const newItems = items.filter(todo => todo.name != name)

                    newItems.push({ id: id, name: name, type: 'Skills' })
                    setItems(newItems)
                    toggleBottomNavigationViewSkills()
                }}
                type="Skills"
            />

            <AppLoader isLoading={loading} />
            {showProfilePopup && <UserProfileModal isVisible={showProfilePopup}
                onClose={handleProfilePopupClose}
                imageUri={profileImageUrl} />}

        </View>
    );


}

export default SearchUsers;