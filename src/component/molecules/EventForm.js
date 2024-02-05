import { StyleSheet, Text, View } from "react-native"
import CustomTextInput from "../atoms/CustomTextInput"
import { FontName, FontSize } from "../../theme/Fonts"
import { heightPercentageToDP } from "react-native-responsive-screen"
import { LIGHTGREY } from "../../theme/Colors"

function EventForm() {


    return (
        <View>
            <CustomTextInput style={styles.input}
                placeholder={'Type here'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    ques: {
        fontSize: FontSize(18),
        fontWeight: '500',
        fontFamily: FontName.Gordita_Regular,
        marginTop: heightPercentageToDP(2)
    },
    title: {
        fontSize: FontSize(18),
        fontWeight: '400',
        fontFamily: FontName.Gordita_Regular,

    },
    input: {
        width: '100%',
        height: heightPercentageToDP(9.1),
        borderRadius: heightPercentageToDP(0.5),
        borderColor: LIGHTGREY,
        marginTop: heightPercentageToDP(1.5),
        textAlignVertical: 'top'
    },
})

export default EventForm