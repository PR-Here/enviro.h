import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { BLACK, GREY, LIGHTGREY, PRIMARY_COLOR, WHITE } from "../../../theme/Colors";
import { FontSize, FontName } from "../../../theme/Fonts";

const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
    viewMainBottomStyle: {
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        width: widthPercentageToDP(100),
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: GREY,
        height: widthPercentageToDP(15),
        justifyContent: 'center'
    },
    DetailsTitle: {
        fontSize: FontSize(16),
        fontWeight: "500",
        color: PRIMARY_COLOR,
        fontFamily: FontName.Gordita_Medium
    },
    close: {
        tintColor: BLACK,
        position: 'absolute',
        right: 20,
        width: heightPercentageToDP(2.8),
        height: heightPercentageToDP(2.8),
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewBottomStyle: {
        padding: 5,
        marginTop: 10,
        marginStart: 5,
        backgroundColor: WHITE,
        width: widthPercentageToDP(97.5),
        borderWidth: 1,
        borderColor: BLACK,
        flexDirection: 'row',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewDateTimeStyle: {
        padding: 5,
        margin: 5,
        marginStart: 10,
        backgroundColor: WHITE,
        width: widthPercentageToDP(95),
        borderWidth: 1,
        borderColor: BLACK,
        flexDirection: 'row',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: FontSize(15),
        fontWeight: 'normal',
        color: BLACK,
    },
    textInputStyle: {
        backgroundColor: WHITE,
        borderColor: WHITE,
        borderWidth: 0,
        marginStart: 0,
        height: heightPercentageToDP(5),
        width: widthPercentageToDP(87),
    },
    viewLocationStyle: {
        flexDirection: 'row',
        width: widthPercentageToDP(100),
    },
    label: {
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(14),
        ineHeight: 24,
        marginLeft: 10,
        color: BLACK
    },
    input: {
        width: widthPercentageToDP(35),
        height: 'auto',
        borderRadius: 2,
        borderColor: BLACK,
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(14),
        lineHeight: FontSize(24),
        color: BLACK,
        borderWidth: 1,
        padding: 10,
        marginStart: 5,
        marginTop: 5,
    },
    button: {
        alignSelf: 'center',
        marginTop: 10,
        width: widthPercentageToDP(97),
    },
    reqButtonText: {
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(18),
        lineHeight: FontSize(25),
        color: WHITE,
    },
    viewCellStyle: {
        flexDirection: 'row',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: LIGHTGREY,
        backgroundColor: WHITE,
        borderRadius: 8,
        marginEnd: 2,
        marginStart: 3,
        justifyContent: 'center',
        width: widthPercentageToDP(32),
        marginTop: 10
    },
    viewCellActiveStyle: {
        color: BLACK,
        fontSize: FontSize(13),
        fontFamily: FontName.Gordita_Medium,
        paddingTop: 10,
        paddingBottom: 10,
    },
})