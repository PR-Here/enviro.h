import React, { useState } from "react"
import { StyleSheet, View, TextInput, TouchableOpacity, FlatList } from "react-native"
import MeetingHomeHeader from "../../component/header/MeetingHeader"
import { GREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors"
import { heightPercentageToDP } from "react-native-responsive-screen"
import Uncheck from '../../../assets/images/SVG/radio-uncheck.svg';
import Checked from '../../../assets/images/SVG/radio-checked.svg';
import CustomText from "../../component/atoms/CustomText"
import AppString from "../../utils/AppString"
import CustomButton from "../../component/atoms/CustomButton"


const MarketingQuestion = () => {

    const data = [
        {
            title: 'What is product road mapping?',
        },
        {
            title: 'What is product road mapping?',
        },
    ]

    return (
        <View style={styles.container}>
            <MeetingHomeHeader
                headerText={'Product Design v1.0'}
                filter={true}
            />
            <View style={styles.itemStyle}>
                <FlatList

                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={({ item }) =>
                        <AllQuestions item={item} />
                    }
                />
            </View>
            <View style={styles.buttonView}>
                <CustomButton
                    style={styles.modalCancelButton}
                    title={AppString.CANCEL}
                />
                <CustomButton
                    style={styles.modalConfirmButton}
                    title={AppString.SUBMIT}
                />
            </View>

            <View style={{ height: heightPercentageToDP(10) }} />
        </View>
    )
}

const AllQuestions = ({ item }) => {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(0)

    questionArray = ['road mapping of features', 'it is the strategy for features launch', 'priority based feature', 'none']
    return (
        <View >
            <CustomText children={item.title} style={{ marginTop: 20 }} />
            <TextInput
                style={styles.input}
                onChangeText={setSearch}
                value={search}
                placeholder="Search"
            />
            <CustomText children={item.title} style={{ marginTop: 50 }} />
            <View  >
                {
                    questionArray.map((item, index) =>
                        <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} onPress={() => setSelected(index)}>
                            {selected == index ? <Checked /> : <Uncheck />}
                            <CustomText children={item} style={{ fontWeight: '400', marginLeft: 22 }} />
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
        marginRight: 12,
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
        flex: 1

    },
    buttonView: {
        flexDirection: 'row',
        marginTop: heightPercentageToDP(2),
        marginHorizontal: 16,

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
})

export default MarketingQuestion
