import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { FontName, FontSize } from "../../../theme/Fonts";
import { BLACK, GREY, WHITE } from "../../../theme/Colors";

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        marginBottom: heightPercentageToDP(2)
    },
    pollConatiner: {
        marginHorizontal: 15,
    },
    presentersHeading: {
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(18),
        color: BLACK,
        fontWeight: '400',
    },
    pollQ: {
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(18),
        color: BLACK,
        fontWeight: '500',
        marginTop: heightPercentageToDP(2)
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
    },
})

export default styles