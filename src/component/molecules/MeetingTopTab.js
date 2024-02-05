import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"
import { PRIMARY_COLOR, WHITE } from "../../theme/Colors"
import { FontName, FontSize } from "../../theme/Fonts"
import CustomText from "../atoms/CustomText"

const MeetingTopTab = (props) => {

    const headers = ['Actionable', 'All Notes', 'Transcript']
    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSetSelectedIndex = (index) => {
        props.getIndex(index)
        setSelectedIndex(index)
    }

    return (
        <View style={styles.container}>
            {
                headers.map((el, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => onSetSelectedIndex(index)}
                            key={index}>
                            <Text style={[styles.text,
                            {
                                backgroundColor: selectedIndex == index ? PRIMARY_COLOR : WHITE,
                                color: selectedIndex == index ? WHITE : PRIMARY_COLOR
                            }
                            ]}>
                                {el}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default MeetingTopTab

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: heightPercentageToDP(1),
        backgroundColor: WHITE,
        borderRadius: heightPercentageToDP(0.7),
        elevation: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    text: {
        borderRadius: heightPercentageToDP(0.7),
        paddingHorizontal: widthPercentageToDP(5),
        paddingVertical: widthPercentageToDP(2),
        fontSize: FontSize(13),
        fontFamily:FontName.Gordita_Medium
    }
})