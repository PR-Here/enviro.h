import React, { useEffect, useState } from "react"
import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity, FlatList, Image } from "react-native"
import MeetingHomeHeader from "../../component/header/MeetingHeader"
import { BLACK, GREY, LIGHTGREY, LIGHTWHITE, PAGE_BACKGROUND, PRIMARY_COLOR, WHITE } from "../../theme/Colors"
import { heightPercentageToDP } from "react-native-responsive-screen"
import Filter from '../../../assets/images/SVG/filter.svg';
import SearchIcon from '../../../assets/images/SVG/search.svg';
import CrossIcon from '../../../assets/images/SVG/cros.svg';
import ClockIcon from '../../../assets/images/SVG/clock.svg';
import Course from '../../../assets/images/SVG/course.svg';
import Course1 from '../../../assets/images/SVG/course1.svg';
import Course2 from '../../../assets/images/SVG/course2.svg';
import PresentationGray from '../../../assets/images/SVG/presentation-gray.svg';
import BookmarkIcon from '../../../assets/images/SVG/bookmark.svg';
import BookmarKSAVE from '../../../assets/images/SVG/bookmarkSave.svg';
import StarIcon from '../../../assets/images/SVG/star.svg';
import StarFill from '../../../assets/images/SVG/fill_rating_star.svg';
import CustomText from "../../component/atoms/CustomText"
import { FontName } from "../../theme/Fonts"
import AssetsImages from "../../utils/AssetsImages"
import FilterBottomSheet from "./FilterBottomSheet"
import FilterItem from "../../component/listItems/FilterItem"
import NavString from "../../utils/NavString"
import { useNavigation } from '@react-navigation/native';
import CustomSearchBox from "../../component/atoms/CustomSearchBox"
import useApiEffect from "../../hooks/useApiEffect"
import { GURUKUL_CATEGORIES_LIST, GURUKUL_COURSE_BOOKMARK, GURUKUL_COURSE_LIST } from "../../services/ApiEndPoint"
import { useSelector } from "react-redux"
import { ShowToast } from "../../utils/Constant"


const AllCourses = () => {
    const [search, setSearch] = useState('');
    const [showFilter, setShowFilter] = useState(false)
    const [selectedTab, setSelectedTab] = useState(0)
    const { makeApiRequest, loading } = useApiEffect()
    const loginUserId = useSelector((state) => (state.auth?.loginUser?.user_id))
    const filterData = ['Rating', 'Hours', 'Popular', 'Mandatory']
    const [categoryId, setCategoryId] = useState(0)
    const [page, setPage] = useState(1)

    const selectedFilter = (selectedFilter) => {
        GURUKUL_COURSE_LIST_API(categoryId, selectedFilter)
    };

    const [tabData, setTabData] = useState([])
    const [listData, setListData] = useState([])

    useEffect(() => {
        GURUKUL_CATEGORIES_LIST_API()
        GURUKUL_COURSE_LIST_API(categoryId)
    }, [categoryId])

    async function GURUKUL_CATEGORIES_LIST_API() {

        const apiData = await makeApiRequest({ url: GURUKUL_CATEGORIES_LIST, method: 'GET', isToken: true });
        if (apiData?.status == true) {
            const newArray = [{ "category_id": 0, "category_name": "All" }, ...apiData?.data];
            setTabData(newArray)
        } else {
            console.log("API ERROR: ", apiData)
        }
    }


    async function GURUKUL_COURSE_LIST_API(categoryId, selectedFilter = "") {

        const apiData = await makeApiRequest({
            url: GURUKUL_COURSE_LIST, method: 'POST', isToken: true, data: { "page": page, "category_id": categoryId, "type": selectedFilter.toLocaleLowerCase() }
        });
        if (apiData?.status == true) {
            console.log("Data: ", apiData)
            setListData(apiData?.data)
        } else {
            console.log("API ERROR: ", apiData)
        }
    }
    const bookmaredCalled = async (item, index, bookMarkedId = null) => {
        const apiData = await makeApiRequest({
            url: GURUKUL_COURSE_BOOKMARK, method: 'POST', isToken: true, showProgress: false,
            data: {
                "course_id": item?.course_id,
                "user_id": "2835",
                "status":bookMarkedId,
            }
        })
        console.log('----.', JSON.stringify(apiData));
        if (apiData?.data != undefined)
            if (apiData?.status == true) {
                ShowToast(`${apiData?.message}`)
                updateValue(bookMarkedId, index)
            }

    }
    // update index after click on bookmark icon
    const updateValue = (newValue, index) => {
        var newObject = [...listData];
        newObject[index].course_bookmark = newValue;
        setListData(newObject);
    };

    const CoursesDataList = ({ item, index }) => {
        const navigation = useNavigation();
        return (
            <TouchableOpacity activeOpacity={0.7} style={styles.itemStyle} onPress={() => navigation.navigate(NavString.CATEGORIES, { course_id: item?.course_id })}>
                <Image source={{ uri: item?.image }} style={styles.listImage} />
                <View style={{ flex: 1, marginHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CustomText children={item?.title} style={{ marginTop: 10, fontWeight: '500', fontFamily: FontName.Gordita_Medium, fontSize: 14, flex: 116 }} />
                        <TouchableOpacity
                            onPress={() => {
                                bookmaredCalled(item, index, item?.course_bookmark == 1 ? 0 : 1)
                            }}
                        >
                            {item?.course_bookmark ? <BookmarKSAVE /> : <BookmarkIcon />}
                        </TouchableOpacity>
                    </View>

                    <CustomText children={item?.User?.full_name} numberOflines={2} style={{ marginTop: 10, fontWeight: '400', color: '#212121', marginVertical: 8, fontFamily: FontName.Gordita_Regular, fontSize: 12, lineHeight: 16 }} />

                    <View style={{ flexDirection: 'row', marginTop: 10, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <PresentationGray height={16} width={16} />
                            <CustomText numberOflines={1} children={item?.total_modules + " Lessons"} style={styles.textStyle} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, flex: 1 }}>
                            <ClockIcon height={16} width={16} />
                            <CustomText numberOflines={1} children={item?.duration} style={[styles.textStyle, { marginTop: 3 }]} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 20, }}>
                            {item?.rating > 0 ? <StarFill height={16} width={16} /> : <StarIcon height={16} width={16} />}
                            <CustomText numberOflines={1} children={item?.rating} style={[styles.textStyle, { marginTop: 3 }]} />
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <MeetingHomeHeader
                headerText={'All Courses'}
                filter={true}
            />
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 16, alignItems: 'center', marginLeft: 0 }}>
                    <View style={{ flex: 1 }}>
                        <CustomSearchBox onPress={() => { }} />
                    </View>
                    <TouchableOpacity style={styles.filterView} onPress={() => setShowFilter(true)}>
                        <Filter width={30} height={25} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 20, marginBottom: 10, borderRadius: 7 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {/* {console.log('Tab data----.', JSON.stringify(tabData))} */}
                        {tabData != [] && tabData?.map((item, index) => (
                            <TouchableOpacity activeOpacity={0.7} style={{ marginRight: 8 }} key={index}
                                onPress={() => { setSelectedTab(index), setCategoryId(item?.category_id) }}>
                                <FilterItem
                                    text={item?.category_name}
                                    key={index}
                                    containerStyle={{
                                        backgroundColor: index == selectedTab ? PRIMARY_COLOR : WHITE,
                                        borderColor: index == selectedTab ? PAGE_BACKGROUND : PAGE_BACKGROUND
                                    }}
                                    textStyle={{ color: index == selectedTab ? WHITE : BLACK, padding: 15 }}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}> */}

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: 10 }}
                        data={listData}
                        renderItem={({ item, index }) =>
                            <CoursesDataList item={item} index={index} />
                        }
                    />
                {/* </ScrollView> */}

            </View>
            <FilterBottomSheet visible={showFilter} data={filterData} onCancel={() => setShowFilter(false)} onApplyClick={selectedFilter} />

        </View>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        backgroundColor: '#FAFCFD',
    },
    input: {
        height: 45,
        marginRight: 12,
        borderWidth: 0.5,
        borderColor: '#D1D1D1',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    filterView: {
        backgroundColor: LIGHTWHITE,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50

    },
    buttonStyle: {
        backgroundColor: '#FFEEE0',
        borderRadius: heightPercentageToDP(1),
        height: heightPercentageToDP(6),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    textStyle: {
        fontSize: 12,
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '500',
        color: '#88898A',
        marginLeft: 2,
        marginTop: 2
    },
    itemStyle: {
        marginTop: 10,
        marginHorizontal: 16,
        elevation: 7,
        shadowColor: GREY,
        shadowOffset: 3,
        shadowRadius: 10,
        backgroundColor: WHITE,
        borderRadius: 10,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        flexDirection: 'row',
        padding: 10
    },
    viewAll: {
        color: '#9E9E9E',
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '500'
    },
    header: {
        fontSize: 16,
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '500'
    },
    listImage: {
        width: 70,
        height: 80,
        borderRadius: 10
    }
})

export default AllCourses
