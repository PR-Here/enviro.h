import React, { useEffect, useState } from "react"
import { ImageBackground, Platform, Text, TouchableOpacity, View } from "react-native"

import { ScrollView } from "react-native-gesture-handler"
import ArrowLeft from '../../../assets/images/SVG/guruKul-arrow-left.svg'
import Bookmark from '../../../assets/images/SVG/guruKulbookmark.svg'
import BookmarKSAVE from '../../../assets/images/SVG/bookmarkSave.svg';
import ShareIcon from '../../../assets/images/SVG/shareIcon.svg'
// import Rectangle from '../../../assets/images/rectangle.png'
import LinearGradient from "react-native-linear-gradient"
import { heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import Beginner from '../../../assets/images/SVG/Beginner.svg'
import Clock from '../../../assets/images/SVG/grayClock.svg'
import Presentation from '../../../assets/images/SVG/guruKulpresentation.svg'
import Star from '../../../assets/images/SVG/starfill.svg'
import TimerIcon from '../../../assets/images/SVG/timer.svg'
import useApiEffect from "../../hooks/useApiEffect"
import { GURUKUL_COURSE_BOOKMARK, GURUKUL_COURSE_DETAILS } from "../../services/ApiEndPoint"
import { BLACK } from "../../theme/Colors"
import { FontName } from "../../theme/Fonts"
import AppLoader from "../../utils/AppLoader"
import CategoriesTab from "./CategoriesTab"
import Share from 'react-native-share';
import { ShowToast } from "../../utils/Constant"
import { useSelector } from "react-redux"

const Categories = ({ navigation, route }) => {

    const { makeApiRequest, loading } = useApiEffect()

    const [defaultHandleTab, setDefaultHandleTab] = useState(false);
    const [data, setData] = useState()
    const [rating, setRating] = useState()
    const [recommendedCourse, setRecommendedCourse] = useState([])
    const [isBookmarked, setIsBookmarked] = useState()

    let userData = useSelector(state => state?.auth?.loginUser);

    const shareLink = async () => {
        try {
            const options = {
                title: 'Share your course',
                message: 'Check out this amazing course!',
                url: 'https://example.com',
            };
            await Share.open(options);
        } catch (error) {
            console.error('Error sharing link:', error.message);
        }
    };

    useEffect(() => {
        GURUKUL_COURSE_DETAILS_API();
    }, []);


    async function GURUKUL_COURSE_DETAILS_API() {
        const apiData = await makeApiRequest({ url: GURUKUL_COURSE_DETAILS + `${route?.params?.course_id}`, method: 'GET', isToken: true });
        if (apiData?.status == true) {
            setData(apiData?.data?.course_detail)
            setRecommendedCourse(apiData?.data?.recommended_courses)
            setIsBookmarked(apiData?.data?.course_detail?.course_bookmark)
            apiData?.data?.course_detail?.Gurukul_courses_ratings.map((item) =>
                setRating(item?.rating)
            )
            console.log('---->', JSON.stringify(apiData));
        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    const BOOKMARKED_API = async () => {
        const apiData = await makeApiRequest({
            url: GURUKUL_COURSE_BOOKMARK, method: 'POST', isToken: true, showProgress: false,
            data: {
                "course_id": route?.params?.course_id,
                "user_id": 3194, //userData?.user_id,//"3194",
                'status': isBookmarked == 1 ? 0 : 1
            }
        })
        console.log('----.GURUKUL_COURSE_BOOKMARK', JSON.stringify(apiData));
        if (apiData?.status == true) {
            GURUKUL_COURSE_DETAILS_API()
            ShowToast(apiData?.message)
        } else {
            console.log("API ERROR: ", apiData)
        }

    }

    return (
        <View style={{ flex: 1, }}>

            <ImageBackground source={{ uri: data?.image }} style={{ height: hp(30), width: "100%", }} resizeMode='cover'>
                <LinearGradient colors={['#00000080', '#00000000']} style={{ flex: 1, }} >
                    <View style={{ height: hp(10), marginVertical: hp(4), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: wp(11), paddingLeft: wp(4) }}>
                                <ArrowLeft style={{ marginBottom: Platform.OS === 'ios' ? hp(0.5) : 0 }} />
                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontWeight: '500', fontFamily: FontName.Gordita_Regular, fontSize: 16 }}>Categories</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ width: wp(10) }} onPress={shareLink}>
                                <ShareIcon />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: wp(7.5) }} onPress={BOOKMARKED_API}>
                                {isBookmarked == 1 ? <BookmarKSAVE /> : <Bookmark />}
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ marginVertical: hp(3), marginHorizontal: hp(2) }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 17, fontWeight: '700', fontFamily: FontName.Gordita_Medium, color: BLACK }}>{data?.title}</Text>

                        {rating && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Star />
                            <Text style={{ fontSize: 12, fontWeight: '400', fontFamily: FontName.Gordita_Regular, marginLeft: 5, marginTop: Platform.OS === 'ios' ? hp(0.5) : 0 }}>{rating}</Text>
                        </View>}

                    </View>
                    <Text style={{ fontSize: 12, fontWeight: '400', fontFamily: FontName.Gordita_Regular, marginTop: hp(1.5), color: '#000', lineHeight: 17 }}>
                        {data?.description}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: hp(2) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: widthPercentageToDP(23) }}>
                        <Presentation />

                        <Text style={{ color: '#000000', fontSize: 12, fontWeight: '400', fontFamily: FontName.Gordita_Regular, alignItems: 'center' }}> {data?.lessons?.length} lessons</Text>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: hp(5.5), justifyContent: 'center' }}>
                        <Beginner />
                        <Text style={{ color: '#000000', fontSize: 12, fontWeight: '400', fontFamily: FontName.Gordita_Regular, }}> {data?.Gurukul_level?.level_name}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: hp(2), marginVertical: hp(2) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: widthPercentageToDP(20) }}>
                        <Clock />
                        <Text style={{ color: '#000000', fontSize: 12, fontWeight: '400', fontFamily: FontName.Gordita_Regular }}> {data?.duration}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: hp(6.9) }}>
                        <TimerIcon />
                        <Text style={{ color: '#000000', fontSize: 12, fontWeight: '400', fontFamily: FontName.Gordita_Regular }}> {data?.deadline}</Text>
                    </View>
                </View>
                <View style={{ height: 0.5, backgroundColor: '#D9D9D9', marginBottom: hp(1), marginHorizontal: wp(2) }}></View>

                <CategoriesTab tabClick={(tabId) => setDefaultHandleTab(false)} data={data} recommendedCourse={recommendedCourse} />

            </ScrollView>
            <AppLoader isLoading={loading} />
        </View>
    )
}

export default Categories;