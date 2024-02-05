import React, { useEffect, useState } from "react"
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import LinearGradient from 'react-native-linear-gradient'
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"
import ClockOrange from '../../../assets/images/SVG/clock-orange.svg'
import Course from '../../../assets/images/SVG/desktop.svg'
import PlayIcon from '../../../assets/images/SVG/play.svg'
import PresentationIcon from '../../../assets/images/SVG/presentation.svg'
import CustomButton from "../../component/atoms/CustomButton"
import CustomText from "../../component/atoms/CustomText"
import MeetingHomeHeader from "../../component/header/MeetingHeader"
import useApiEffect from "../../hooks/useApiEffect"
import { GURUKUL_DASHBOARD_LIST } from "../../services/ApiEndPoint"
import { GREY, LIGHTWHITE, PRIMARY_COLOR, WHITE } from "../../theme/Colors"
import { FontName } from "../../theme/Fonts"
import AppLoader from "../../utils/AppLoader"
import NavString from "../../utils/NavString"

const Courses = ({ navigation }) => {
    const { makeApiRequest, loading } = useApiEffect()
    const [continueLearningData, setContinueLearningData] = useState([])
    const [allCoursesData, setAllCoursesData] = useState([])
    const [popularCoursesData, setPopularCoursesData] = useState([])
    const [mandatoryCoursesData, setMandatoryCoursesData] = useState([])
    const [savedCoursesData, setSavedCoursesData] = useState([])
    const [recommendedCoursesData, setRecommendedCoursesData] = useState([])

    useEffect(() => {
        GURUKUL_DASHBOARD_LIST_API()
    }, [])

    async function GURUKUL_DASHBOARD_LIST_API() {

        const apiData = await makeApiRequest({ url: GURUKUL_DASHBOARD_LIST, method: 'POST', isToken: true });
        console.log('-------->', JSON.stringify(apiData));
        if (apiData?.status == true) {
            setContinueLearningData(apiData?.data?.continue_learning)
            setAllCoursesData(apiData?.data?.all_courses)
            setPopularCoursesData(apiData?.data?.popular_courses)
            setMandatoryCoursesData(apiData?.data?.mandatory_courses)
            setSavedCoursesData(apiData?.data?.saved_courses)
            setRecommendedCoursesData(apiData?.data?.recommended_courses)

        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    return (

        <View style={styles.container}>
            <MeetingHomeHeader headerText={'Courses'} />
            <View style={{ marginHorizontal: 16, flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>
                    {/* Continue Learning */}

                    {continueLearningData.length !== 0 &&
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                                <CustomText children={'Continue Learning'} style={styles.header} />
                                <TouchableOpacity onPress={() => navigation.navigate(NavString.CONTINUE_LEARNING)}>
                                    <CustomText children={'View All'} style={styles.viewAll} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: 10 }}
                                horizontal
                                data={continueLearningData}
                                renderItem={({ item }) =>
                                    <ContinueLearning item={item} />
                                }
                            />
                        </>
                    }

                    {/* All coure */}

                    {allCoursesData.length !== 0 &&
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 15 }}>
                                <CustomText children={'All Courses'} style={styles.header} />
                                <TouchableOpacity onPress={() => navigation.navigate(NavString.ALL_COURSES)}>
                                    <CustomText children={'View All'} style={styles.viewAll} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: 10 }}
                                horizontal
                                data={allCoursesData}
                                renderItem={({ item }) =>
                                    <AllCourses item={item} navigation={navigation} />
                                }
                            />
                        </>
                    }

                    {/* Popular Courses */}

                    {popularCoursesData.length !== 0 &&
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 15 }}>
                                <CustomText children={'Popular Courses'} style={styles.header} />
                                <TouchableOpacity onPress={() => navigation.navigate(NavString.ALL_COURSES)}>
                                    <CustomText children={'View All'} style={styles.viewAll} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: 10 }}
                                horizontal
                                data={popularCoursesData}
                                renderItem={({ item }) =>
                                    <AllCourses item={item} navigation={navigation} />
                                }
                            />
                        </>
                    }

                    {/* Mandatory courses */}

                    {mandatoryCoursesData.length !== 0 &&
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 15 }}>
                                <CustomText children={'Mandatory courses'} style={styles.header} />
                                <TouchableOpacity onPress={() => navigation.navigate(NavString.ALL_COURSES)}>
                                    <CustomText children={'View All'} style={styles.viewAll} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: 10 }}
                                horizontal
                                data={mandatoryCoursesData}
                                renderItem={({ item }) =>
                                    <AllCourses item={item} navigation={navigation} />
                                }
                            />
                        </>
                    }

                    {/* Saved courses */}

                    {savedCoursesData.length !== 0 &&
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 15 }}>
                                <CustomText children={'Saved courses'} style={styles.header} />
                                <TouchableOpacity onPress={() => navigation.navigate(NavString.ALL_COURSES)}>
                                    <CustomText children={'View All'} style={styles.viewAll} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: 10 }}
                                horizontal
                                data={savedCoursesData}
                                renderItem={({ item }) =>
                                    <AllCourses item={item} navigation={navigation} />
                                }
                            />
                        </>
                    }

                    {/* Recommended courses */}

                    {/* {recommendedCoursesData?.length !== 0 &&
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 15 }}>
                                <CustomText children={'Recommended courses'} style={styles.header} />
                                <TouchableOpacity onPress={() => navigation.navigate(NavString.ALL_COURSES)}>
                                    <CustomText children={'View All'} style={styles.viewAll} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: 10 }}
                                horizontal
                                data={recommendedCoursesData}
                                renderItem={({ item }) =>
                                    <AllCourses item={item} navigation={navigation} />
                                }
                            />
                        </>
                    } */}

                </ScrollView>

            </View>
            <AppLoader isLoading={loading} />
        </View>
    )
}

const ContinueLearning = ({ item }) => {
    return (
        <View>
            <View style={styles.itemStyle}>
                <LinearGradient colors={['#F17C1D', '#45C1FF87']} style={{ paddingVertical: 28, borderRadius: 10 }}>
                    <View style={{ alignSelf: "center" }}>
                        <Course />
                    </View>
                </LinearGradient>
                <View style={{ padding: 15 }}>
                    <CustomText children={item?.title} style={{ marginTop: 10, fontWeight: '500', fontFamily: FontName.Gordita_Medium, fontSize: 14, color: WHITE }} />

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <PlayIcon />
                            <CustomText children={item?.total_modules == null ? '0 Module' : `${item?.total_modules} Modules`} style={styles.textStyle} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ClockOrange />
                            <CustomText children={item?.duration} style={styles.textStyle} />
                        </View>
                    </View>
                    <CustomButton
                        title={'Continue to learn'}
                        style={styles.buttonStyle}
                    />
                </View>
            </View>
        </View>
    )
}

const AllCourses = ({ item, navigation }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(NavString.CATEGORIES, { course_id: item?.course_id })}>
            <View style={styles.itemStyle}>
                <Image source={{ uri: item?.image }} style={{ width: widthPercentageToDP(80), height: 200, borderRadius: 10 }} />
                <View style={{ padding: 15 }}>
                    <CustomText children={item?.title} style={{ marginTop: 10, fontWeight: '500', fontFamily: FontName.Gordita_Medium, fontSize: 14, marginVertical: 20, color: WHITE }} />
                    <CustomText children={item?.description} style={{ marginTop: 10, fontWeight: '400', fontFamily: FontName.Gordita_Regular, fontSize: 14, color: WHITE }} />

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <PresentationIcon />
                            <CustomText children={item?.total_modules == null ? '0 Module' : `${item?.total_modules} Modules`} style={styles.textStyle} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ClockOrange />
                            <CustomText children={item?.duration} style={styles.textStyle} />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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
        color: WHITE,
        marginLeft: 10
    },
    itemStyle: {
        width: widthPercentageToDP(80),
        elevation: 7,
        shadowColor: GREY,
        shadowOffset: 3,
        shadowRadius: 10,
        backgroundColor: WHITE,
        borderRadius: 10,
        marginRight: 15,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: PRIMARY_COLOR
    },
    viewAll: {
        color: '#9E9E9E',
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '500'
    },
    header: {
        fontSize: 16,
        fontFamily: FontName.Gordita_Medium,
        fontWeight: '500'
    },
    buttonStyle: {
        alignSelf: 'center',
        marginTop: heightPercentageToDP(2),
        borderColor: WHITE,
        backgroundColor: PRIMARY_COLOR,
        paddingLeft: 20,
        paddingRight: 20, borderRadius: 5, width: '100%',
        borderColor: WHITE, borderWidth: 2
    }
})

export default Courses
