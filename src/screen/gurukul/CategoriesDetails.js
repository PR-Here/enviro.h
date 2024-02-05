import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import AiImage from '../../../assets/images/SVG/AI.svg';
import Course from '../../../assets/images/SVG/course.svg';
import RightWhiteArrow from '../../../assets/images/SVG/rightWhiteArrow.svg';
import Star from '../../../assets/images/SVG/starfill.svg';
import { BLACK, BUTTON_BACKGROUND } from '../../theme/Colors';
import { FontName } from '../../theme/Fonts';
import NavString from '../../utils/NavString';
import { FontFamily } from '../settings/GlobalStyles';
import DetailTabs from './DetailTabs';
import GurukulHeader from './GurukulHeader';
import LeftArrow from '../../../assets/images/SVG/left-icon.svg'

// create a component
const CategoriesDetails = ({ navigation, route }) => {
    const [defaultHandleTab, setDefaultHandleTab] = useState(false);

    const [isPaused, setIsPaused] = useState(false);
    const [nextTap, setNextTap] = useState(false);

    const handleVideoPause = () => {
        setIsPaused(true);
    };

    console.log('route----', route?.params?.attachment_data);
    useFocusEffect(
        React.useCallback(() => {
            setIsPaused(false);
        }, [])
    );


    const recommended = [

        {
            img: <AiImage height={110} width={160} style={{ marginHorizontal: wp(2), marginVertical: hp(1) }} />,
            title: 'Ai Trends',
            subTitle: 'By: Ray Villalobos',
        },

        {
            img: <Course height={110} width={160} style={{ marginHorizontal: wp(2), marginVertical: hp(1) }} />,
            title: 'UX Foundations: Style G...',
            subTitle: 'By: Ray Villalobos',
        },

        {
            img: <AiImage height={110} width={160} style={{ marginHorizontal: wp(2), marginVertical: hp(1) }} />,
            title: 'Ai Trends',
            subTitle: 'By: Ray Villalobos',
        },

        {
            img: <Course height={110} width={160} style={{ marginHorizontal: wp(2), marginVertical: hp(1) }} />,
            title: 'UX Foundations: Style G...',
            subTitle: 'By: Ray Villalobos',
        },

    ]
    const introArr = [
        {
            time: '0:20',
            desc: 'Importance of having a strong Work Ethics. It is essential to maintain a strong work ethic at the Workplace. At AGL, We aim to establish guidelines and expectations for employees to maintain high standard of Professionalism, Integrity, and accountability at the workplace.'
        },
        {
            time: '0:40',
            desc: 'The right dress code is an integral part of a respectful working environment.'
        },
        {
            time: '1.07',
            desc: 'As said, timeliness is crucial for smooth operations.'
        },
        {
            time: '1.37',
            desc: 'Employees should communicate with colleagues, clients, and stakeholders politely and professionally.'
        },
        {
            time: '2:45',
            desc: 'Any Infractions should be reported to the proper authorities per our reporting Procedures'
        },
    ]


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <GurukulHeader headerText={'Marketing Leadership'} />

            <Video
                // source={AssetsImages.VIDEO_URL}
                source={{ uri: route?.params?.attachment_data }}
                style={{ width: '100%', height: 250, backgroundColor: BLACK }}
                paused={isPaused}
                controls={true}
                resizeMode='contain'
            />

            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 20, marginTop: hp(2) }}>
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: '700',
                        fontFamily: FontName.Gordita_Medium,
                        color: BLACK,
                        flex: 1
                    }}>
                    Compliance Training
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Star />
                    <Text style={{ fontSize: 12, fontWeight: '400', fontFamily: FontName.Gordita_Regular, marginLeft: 5 }}>4.8</Text>
                </View>

            </View>
            <View style={{ height: 0.5, backgroundColor: '#D9D9D9', marginVertical: hp(2), marginHorizontal: hp(1) }} />
            {/* <View style={{ backgroundColor: 'red' }}> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <DetailTabs tabItemOnPress={(item, type) => {
                    selectedType = type
                    setLeaveData(item)
                    //console.log(type)
                    if (type != 'Lesson') {
                        setVisible(!visible);
                    }
                }} setDefaultHandleTab={defaultHandleTab} tabClick={(tabId) => setDefaultHandleTab(false)} />
                <View style={{ marginHorizontal: wp(2), marginVertical: wp(5) }}>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: '500',
                            fontFamily: FontName.Gordita_Medium,
                            color: BLACK
                        }}>
                        Read further

                    </Text>
                    <View style={{ marginVertical: hp(2) }}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: '400',
                            fontFamily: FontName.Gordita_Regular, color: '#8F8F8F',
                            marginVertical: hp(0.5)
                        }}>
                            For more information on Google Analytics, please visit:

                        </Text>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: '400',
                            fontFamily: FontName.Gordita_Regular, color: '#8F8F8F'
                        }}>
                            . Customer journey mapping: The path to loyalty

                        </Text>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: '400',
                            fontFamily: FontName.Gordita_Regular, color: '#8F8F8F',
                            marginVertical: hp(0.5)

                        }}>
                            . Adopt new data strategies for better marketing

                        </Text>
                    </View>

                    {/* <View style={{
                        backgroundColor: '#F17C1D', height: hp(6), width: wp(25),
                        justifyContent: 'center', borderRadius: 5,
                        alignSelf: 'center',


                    }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                            handleVideoPause();
                            navigation.navigate(NavString.MARKETING_LEADERSHIP)
                        }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={{ color: 'white', fontSize: 17.5, }}>
                                Quiz
                            </Text>
                            <RightWhiteArrow style={{ marginLeft: wp(1) }} />
                        </TouchableOpacity>
                    </View> */}

                    <View style={{ flexDirection: 'row' }}>

                        {nextTap ?
                            <View style={{
                                backgroundColor: BUTTON_BACKGROUND, height: hp(6), width: wp(25),
                                justifyContent: 'center', borderRadius: 5,
                                alignSelf: 'center',


                            }}>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(NavString.MARKETING_LEADERSHIP)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                                    <Text style={{ color: 'white', fontSize: 17.5, }}>
                                        Quiz
                                    </Text>
                                    <RightWhiteArrow style={{ marginLeft: wp(1) }} />
                                </TouchableOpacity>
                            </View>
                            :
                            <>
                                <View style={{
                                    backgroundColor: BUTTON_BACKGROUND, height: hp(6), width: wp(25),
                                    justifyContent: 'center', borderRadius: 5,
                                    alignSelf: 'center',


                                }}>
                                    <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                                        <LeftArrow style={{ marginLeft: wp(1) }} />

                                        <Text style={{ color: 'white', fontSize: 17.5, }}>
                                            Previous
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    backgroundColor: BUTTON_BACKGROUND, height: hp(6), width: wp(25),
                                    justifyContent: 'center', borderRadius: 5,
                                    alignSelf: 'center',
                                    marginLeft: 16

                                }}>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => setNextTap(true)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                                        <Text style={{ color: 'white', fontSize: 17.5, }}>
                                            Next
                                        </Text>
                                        <RightWhiteArrow style={{ marginLeft: wp(1) }} />
                                    </TouchableOpacity>

                                </View>
                            </>
                        }

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp(5) }}>
                        <Text style={{ fontFamily: FontName.Gordita_Medium, fontWeight: '700', fontSize: 16, color: BLACK }}>Recommended Courses</Text>
                    </View>
                    <View style={{ height: 0.5, backgroundColor: '#D9D9D9', marginVertical: hp(2) }}></View>
                    <FlatList
                        data={recommended}
                        numColumns={2}
                        renderItem={({ item }) =>
                            <RecommendedCourse data={item} />
                        }
                    />

                    <View style={{ height: hp(12) }} />
                </View>
            </ScrollView>
            {/* <View style={{ height: 30 }}></View> */}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});


const IntroductionComponet = ({ item, index }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column' }}>

                <View style={{ height: 10, width: 10, backgroundColor: 'black', borderRadius: 5, marginLeft: 5, }}></View>
                <View style={{
                    borderStyle: 'dotted',
                    borderWidth: 1,
                    borderRadius: 1,
                    width: 1,
                    marginLeft: 9,
                    flex: 1,

                }}>
                </View>
            </View>

            <Text style={{ marginHorizontal: wp(2) }}>{item?.time}</Text>
            <View style={{ marginLeft: wp(2), marginRight: wp(6), flex: 1 }}>
                {
                    index === 0 ? <Text tyle={{ fontSize: 12, fontWeight: '700', fontFamily: FontName.Gordita_Regular, }} >Introduction</Text> : null
                }

                <Text style={{ fontSize: 13, fontWeight: '400', fontFamily: FontName.Gordita_Regular, color: '#8F8F8F', marginVertical: 5 }} >
                    {/* Hi, I’m Justin Cutroni. And I’m Krista Seiden. We’re
                        Analytics Advocates at Google. Welcome to Google Analytics
                        for Beginners. In this course we’ll
                        take you through a basic understanding of Google Analytics. */}
                    {`${item?.desc} `}
                </Text>
                <View style={{ height: 20 }}></View>
            </View>
        </View>
    )
}
const RecommendedCourse = ({ data }) => {
    return (
        <View>


            <View style={{ marginVertical: hp(0.5), marginHorizontal: wp(0.9) }}>
                <View style={{
                    borderWidth: 0.5, borderColor: '#D9D9D9',
                    height: 174, width: 174,
                    borderRadius: 10,
                    alignItems: 'center'
                }}>
                    {data.img}
                    <Text style={{ alignSelf: 'flex-start', marginHorizontal: wp(2), fontFamily: FontFamily.gordita, fontSize: 12, fontWeight: '500', marginTop: hp(1) }}>
                        {data.title}
                    </Text>
                    <Text style={{ alignSelf: 'flex-start', marginHorizontal: wp(2), fontFamily: FontFamily.gordita, fontSize: 10, fontWeight: '400', color: '#8F8F8F', marginTop: hp(0.5) }}>
                        {data.subTitle}
                    </Text>
                    {/* </View> */}
                </View>
            </View>

        </View>
    )
}

//make this component available to the app
export default CategoriesDetails;
