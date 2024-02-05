
import React, { useEffect, useState } from "react"
import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from "react-native"
import MeetingHomeHeader from "../../component/header/MeetingHeader"
import { GREY, TEXT_COLOR_GREY, WHITE } from "../../theme/Colors"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"
import HelpCircle from '../../../assets/images/SVG/help-circle.svg';
import ClockIcon from '../../../assets/images/SVG/clock.svg';
import RightArrow from '../../../assets/images/SVG/rightarrow-white.svg';
import CustomText from "../../component/atoms/CustomText"
import { FontName } from "../../theme/Fonts"
import NavString from "../../utils/NavString"
import AssetsImages from "../../utils/AssetsImages"
import { GURUKUL_QUIZ_DETAILS } from "../../services/ApiEndPoint"
import useApiEffect from "../../hooks/useApiEffect"
import AppLoader from "../../utils/AppLoader"

const MarketingLeadership = ({ navigation }) => {

    const { makeApiRequest, loading } = useApiEffect()
    const [data, setData] = useState()

    useEffect(() => {
        GURUKUL_QUIZ_DETAILS_API();
    }, []);

    async function GURUKUL_QUIZ_DETAILS_API() {
        const payload = {
            "course_id": 2,
            "withAnswers": false,
            "module_id": 14,
            "lesson_id": 4
        }
        const apiData = await makeApiRequest({ url: GURUKUL_QUIZ_DETAILS, method: 'POST', isToken: true, data: payload });
        if (apiData?.status == true) {
            setData(apiData?.data)
        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    return (
        <View style={styles.container}>
            <MeetingHomeHeader
                headerText={'Marketing Leadership'}
                filter={true}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignSelf: 'center' }}>
                    <Image source={AssetsImages.ILLUSTRATION} />
                </View>
                <View style={styles.itemStyle}>
                    <CustomText children={data?.courseDetails?.title} style={{ fontSize: 24, fontWeight: '700', alignSelf: 'center' }} />
                    <CustomText children={data?.courseDetails?.description} style={{ textAlign: 'center', fontSize: 16, alignSelf: 'center', color: '#8F8F8F', marginTop: 10, lineHeight: 24 }} />
                    <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', marginTop: 20 }}>
                        <HelpCircle />
                        <CustomText children={`${data?.total_questions} ${data?.total_questions > 1 ? 'Questions' : 'Question'}`} style={{ fontSize: 12, fontWeight: '400', fontFamily: FontName.Gordita_Regular, marginLeft: 10 }} />
                    </View>

                    <TouchableOpacity style={{ backgroundColor: '#000000', height: 60, width: 60, justifyContent: 'center', alignItems: 'center', padding: 20, borderRadius: 40, position: 'absolute', bottom: -30, alignSelf: 'center' }} onPress={() => navigation.navigate(NavString.MARKETING_QUESTION)}>
                        <RightArrow />
                    </TouchableOpacity>
                </View>
                <View style={{ height: heightPercentageToDP(20) }} />

            </ScrollView>

            <AppLoader isLoading={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        backgroundColor: '#FAFCFD',
    },
    itemStyle: {
        marginHorizontal: 33,
        elevation: 7,
        shadowColor: GREY,
        shadowOffset: 3,
        shadowRadius: 10,
        backgroundColor: WHITE,
        borderRadius: 10,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 20,
        justifyContent: 'center',
        height: heightPercentageToDP(35),
        padding: 15

    },


    stepperItemContainer: {
        flexDirection: 'row'
    },
    stepperItemInnerContainer: {
        justifyContent: 'center'
    },
    stepperItemCircle: {
        height: widthPercentageToDP(2.3),
        width: widthPercentageToDP(2.3),
        borderRadius: 100,
        backgroundColor: 'black',
    },
    stepperItemLine: {
        flex: 1,
        width: widthPercentageToDP(0.3),
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
    },
    stepperItemTextContainer: {
        marginStart: widthPercentageToDP(6),
        paddingBottom: heightPercentageToDP(3),

    },
    stepperTopText: {
        color: 'black',
        fontSize: 12,
        fontFamily: FontName.Gordita_Medium
    },
    stepperMiddleText: {
        color: 'black',
        fontSize: 12,
        fontFamily: FontName.Gordita_Regular,
        marginTop: heightPercentageToDP(1)
    },
    stepperBottomText: {
        fontSize: 12,
        color: TEXT_COLOR_GREY,
        fontFamily: FontName.Gordita_Regular,
        marginTop: heightPercentageToDP(1)
    },
})

export default MarketingLeadership

