import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { FontName, FontSize } from "../../../theme/Fonts";
import { BLACK, GREY, WHITE } from "../../../theme/Colors";

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: WHITE
    },
    presenterConatiner: {
        marginHorizontal: heightPercentageToDP(2),
        marginVertical: heightPercentageToDP(2)
    },
    presentersHeading: {
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(18),
        color: BLACK,
        fontWeight: '400',
    },
    presentersHeadingView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: heightPercentageToDP(1)
    },
    arrowIcon: {
        height: 20,
        width: 20,
        tintColor: GREY
    }
})

export default styles