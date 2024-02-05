import React, { useEffect, useState } from "react"
import { StyleSheet, View, TextInput, TouchableOpacity, FlatList, ScrollView, Platform } from "react-native"
import MeetingHomeHeader from "../../component/header/MeetingHeader"
import { BLACK, GREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors"
import { heightPercentageToDP } from "react-native-responsive-screen"
import Uncheck from '../../../assets/images/SVG/radio-uncheck.svg';
import Checked from '../../../assets/images/SVG/radio-checked.svg';
import CustomText from "../../component/atoms/CustomText"
import AppString from "../../utils/AppString"
import CustomButton from "../../component/atoms/CustomButton"
import { FontName, FontSize } from "../../theme/Fonts"
import NavString from "../../utils/NavString"
import { GURUKUL_JSON, GURUKUL_QUIZ_DETAILS } from "../../services/ApiEndPoint"
import useApiEffect from "../../hooks/useApiEffect"
import CheckBoxIcon from '../../../assets/images/SVG/check_box_wihite.svg'
import CheckBoxOrange from '../../../assets/images/SVG/check_box_tick_orange.svg'
import AppLoader from "../../utils/AppLoader"

const AllQuestion = ({ navigation }) => {

    const [data, setData] = useState([])

    const { makeApiRequest, loading } = useApiEffect()

    async function GURUKUL_JSON_API() {
        const apiData = await makeApiRequest({ url: GURUKUL_JSON, method: 'GET', isToken: true });
        console.log('-=GURUKUL_JSON', JSON.stringify(apiData));
        if (apiData?.status == true) {
            apiData?.data.map((item) =>
                setData(item?.quiz)

            )
        } else {
            console.log("API ERROR: ", apiData)
        }
    }

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.itemStyle}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({ item, index }) =>
                            <AllQuestions item={item} index={index} />
                        }
                    />
                </View>
            </ScrollView>

            <View style={{
                marginHorizontal: 16, marginBottom: 10,
                borderTopWidth: Platform.OS == 'android' ? 1 : 0, borderTopColor: '#CED2D6',
                shadowColor: '#ddd', shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 1, shadowRadius: 3, elevation: 3
            }}>
                <CustomButton title={AppString.SUBMIT}
                    onPress={() => navigation.navigate(NavString.GURUKUL_RESULT)}
                    textStyle={styles.buttonStyle}
                    style={styles.submitButtonStyle}
                />

                <CustomButton title={AppString.CANCEL}
                    textStyle={[styles.buttonStyle, { color: BLACK }]}
                    style={styles.cancelButtonStyle}
                    onPress={() => navigation.goBack()}
                />

            </View>
            <AppLoader loading={loading} />
        </View>
    )
}

const AllQuestions = ({ item, index }) => {
    const [selected, setSelected] = useState([]);
    const [radioSelected, setRadioSelected] = useState();

    const toggleSelection = (index) => {
        if (selected.includes(index)) {
            setSelected(selected.filter((itemIndex) => itemIndex !== index));
        } else {
            setSelected([...selected, index]);
        }
    };

    return (
        <View >
            <CustomText children={`${index += 1}. ${item?.questions}`} style={{ marginTop: 20, lineHeight: 20 }} />

            <CustomText children={item?.subTitle} style={{}} />
            <View  >
                {
                    item?.options?.map((data, index) =>
                        <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} onPress={() => { item?.type === 2 ? toggleSelection(index) : setRadioSelected(index) }}>

                            {item?.type === 2 ?
                                selected.includes(index) ? <CheckBoxOrange height={20} width={20} /> : <CheckBoxIcon height={20} width={20} /> :
                                radioSelected == index ? <Checked height={20} width={20} /> : <Uncheck height={20} width={20} />
                            }
                            <CustomText children={data} style={{ fontWeight: '400', marginLeft: 22 }} />
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
    input: {
        borderWidth: 0.5,
        borderColor: '#D1D1D1',
        height: heightPercentageToDP(6),
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginTop: 20,
        paddingLeft: 10
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
        flex: 1,
        marginBottom: 20

    },
    buttonStyle: {
        fontSize: FontSize(14), fontWeight: 'bold',
        fontFamily: FontName.Gorditas_Bold,
        color: WHITE

    },
    modalCancelButton: {
        backgroundColor: '#A09F9E',
        borderRadius: 5,
        fontSize: 14,
        height: heightPercentageToDP(5),
        marginTop: 0,
        alignSelf: 'center',
        flex: 1,
        marginRight: 15,
    },
    modalConfirmButton: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 5,
        fontSize: 14,
        height: heightPercentageToDP(5),
        marginTop: 0,
        alignSelf: 'center',
        flex: 1,
    },
    submitButtonStyle: {
        alignSelf: 'center',
        marginTop: heightPercentageToDP(2), paddingLeft: 20,
        paddingRight: 20, borderRadius: 5, width: '100%'
    },
    cancelButtonStyle: {
        alignSelf: 'center',
        marginTop: heightPercentageToDP(2),
        borderColor: PRIMARY_COLOR,
        backgroundColor: WHITE,
        paddingLeft: 20,
        paddingRight: 20, borderRadius: 5, width: '100%',
        borderColor: BLACK, borderWidth: 2
    },
})

export default AllQuestion
