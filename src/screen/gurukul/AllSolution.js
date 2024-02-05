
import React, { useEffect, useState } from "react"
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { heightPercentageToDP } from "react-native-responsive-screen"
import CheckBoxGreen from '../../../assets/images/SVG/check_box_tick_green.svg'
import Checked from '../../../assets/images/SVG/radio-green.svg'
import Uncheck from '../../../assets/images/SVG/radio-uncheck.svg'
import CheckBoxRed from '../../../assets/images/SVG/x-square.svg'
import CustomText from "../../component/atoms/CustomText"
import MeetingHomeHeader from "../../component/header/MeetingHeader"
import useApiEffect from "../../hooks/useApiEffect"
import { GURUKUL_JSON, GURUKUL_QUIZ_DETAILS } from "../../services/ApiEndPoint"
import { GREY, WHITE } from "../../theme/Colors"
import AppLoader from "../../utils/AppLoader"

const AllSolution = () => {

    const [data, setData] = useState([])

    const { makeApiRequest, loading } = useApiEffect()

    useEffect(() => {
        GURUKUL_QUIZ_DETAILS_API();
    }, []);


    async function GURUKUL_JSON_API() {
        const apiData = await makeApiRequest({ url: GURUKUL_JSON, method: 'GET', isToken: true });
        if (apiData?.status == true) {
            apiData?.data.map((item) =>
                setData(item?.quiz)
            )
        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    async function GURUKUL_QUIZ_DETAILS_API() {
        const payload = {
            "course_id": 2,
            "withAnswers": true,
            "module_id": 14,
            "lesson_id": 4
        }
        const apiData = await makeApiRequest({ url: GURUKUL_QUIZ_DETAILS, method: 'POST', isToken: true, data: payload });
        console.log('-=GURUKUL_JSON', JSON.stringify(apiData));

        if (apiData?.status == true) {
            setData(apiData?.data?.quiz)
        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    return (
        <View style={styles.container}>
            <MeetingHomeHeader
                headerText={'Solution'}
                filter={true}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 22 }}>
                <View style={styles.itemStyle}>
                    <FlatList

                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({ item, index }) =>
                            <AllQuestions item={item} index={index} />
                        }
                    />
                </View>
                <View style={{ height: heightPercentageToDP(10) }} />

            </ScrollView>
            <AppLoader loading={loading} />
        </View>
    )
}

const AllQuestions = ({ item, index }) => {
    const [selected, setSelected] = useState([]);

    const isCorrectAns = (text) => {
        if (item.type === 2) {
            return item?.correct_answer?.includes(text);
        } else {
            // return item.correct_answer || item.correct_answer.some((answer) => !item.options.includes(answer));
            return item?.correct_answer?.includes(text);
        }
        return false;
    }

    return (
        <View >
            <CustomText children={`${index += 1}. ${item?.questions}`} style={{ marginTop: 20, lineHeight: 20 }} />
            <View  >
                {item?.type === 2 ?
                    item?.options?.map((option) =>
                        <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} >
                            {isCorrectAns(option) ? <CheckBoxGreen height={20} width={20} /> : <CheckBoxRed height={20} width={20} />}
                            <CustomText children={option} style={{ fontWeight: '400', marginLeft: 22 }} />
                        </TouchableOpacity>
                    )
                    :
                    item?.options?.map((option) =>
                        <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} >
                            {
                                isCorrectAns(option) ? <Checked height={20} width={20} /> : <Uncheck height={20} width={20} />
                            }
                            <CustomText children={option} style={{ fontWeight: '400', marginLeft: 22 }} />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        backgroundColor: '#FAFCFD',
    },

    itemStyle: {
        marginTop: 10,
        marginHorizontal: 16,
        elevation: 7,
        shadowColor: GREY,
        shadowRadius: 10,
        backgroundColor: WHITE,
        borderRadius: 10,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        padding: 10,
        flex: 1

    },
    greenBorder: {
        flexDirection: 'row',
        borderColor: '#2ACF27',
        borderWidth: 0.5,
        marginTop: 10,
        padding: 10,
        borderRadius: 5
    },
    redBorder: {
        borderColor: '#FB3022',
        borderWidth: 0.5,
        marginTop: 10,
        padding: 10,
        borderRadius: 5
    }
})

export default AllSolution
