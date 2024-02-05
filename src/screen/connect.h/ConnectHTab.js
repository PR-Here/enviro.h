import React, { useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"
import MeetingHomeHeader from "../../component/header/MeetingHeader"
import { BLACK, GREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors"
import CustomSearchBox from "../../component/atoms/CustomSearchBox"
import CustomText from "../../component/atoms/CustomText"
import { FontName, FontSize } from "../../theme/Fonts"
import TeamConnects from "./TeamConnects"


const ConnectHTab = ({ navigation }) => {

    const tabData = ['Team Connect', 'Client Connect']
    const [selectedIndex, setSelectedIndex] = useState(0)

    const screens = [
        {
            name: 'Team Connect',
        },
        {
            name: 'Client Connect',
        },
    ]

    return (
        <View style={styles.container}>
            <View >
                <View style={styles.buttonContainer}>
                    {screens.map((el, index) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setSelectedIndex(index)
                            }}
                                style={[styles.labelContainer, { backgroundColor: selectedIndex == index ? index == 0 ? '#45C1FF' : '#F43B3B' : WHITE }]}
                            >
                                <CustomText children={el.name} style={[styles.label,
                                { color: index == selectedIndex ? WHITE : BLACK, }
                                ]} />

                            </TouchableOpacity>
                        )
                    })}

                </View>
                <CustomSearchBox onPress={() => { }} />
            </View>
            <TeamConnects parentIndex={selectedIndex} />
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        backgroundColor: '#FAFCFD',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: widthPercentageToDP(5),
        marginVertical: widthPercentageToDP(4),
        padding: 5,
        borderRadius: 10,
        elevation: 23,
        shadowOffset: {
            width: 2, height: 4
        },
        shadowRadius: 23,
        backgroundColor: WHITE,
        shadowColor: GREY,
        shadowOpacity: 0.2,
    },
    label: {
        textTransform: 'capitalize',
        fontSize: FontSize(14),
        paddingVertical: heightPercentageToDP(1.5),
        paddingHorizontal: heightPercentageToDP(3),
        color: WHITE,
        textAlign:'center'
    },
    labelContainer: {
        flex:1,
        height: 'auto',
        width: 'auto',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 8
    },


})

export default ConnectHTab
