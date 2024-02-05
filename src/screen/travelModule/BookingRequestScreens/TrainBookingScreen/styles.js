import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { BLACK, LIGHTGREY, WHITE } from "../../../../theme/Colors";
import { FontName, FontSize } from "../../../../theme/Fonts";
import { FontFamily } from "../../../settings/GlobalStyles";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    container: {
        marginHorizontal: heightPercentageToDP(1),
        flex: 1,
    },
    locationView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        width: widthPercentageToDP(40),
        height: 'auto',
        borderRadius: 2,
        borderColor: LIGHTGREY,
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(14),
        lineHeight: FontSize(24),
        color: BLACK,
        borderWidth: 1,
        padding: 10

        // borderColor: GREY,
        // borderWidth: 1,
        // fontFamily: FontName.Gordita_Medium,
        // fontSize: FontSize(13),
        // color: BLACK,
        // width: "100%",
        // borderRadius: 5,
    },
    label: {
        fontFamily: FontName.Geo_Auto_Regular,
        fontWeight: '400',
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.6)'
    },
    verticalMargin: {
        marginVertical: heightPercentageToDP(1)
    },
    addLabel: {
        fontFamily: FontName.Geo_Auto_Regular,
        fontSize: FontSize(14),
        fontWeight: '400',
        lineHeight: FontSize(15.11),
        color: BLACK,
        marginLeft: 10
    },
    heading: {
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(16),
        lineHeight: FontSize(20),
        color: BLACK,
        marginVertical: heightPercentageToDP(2)
    },
    buttonText: {
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(13),
        lineHeight: FontSize(18),
        paddingVertical: 10
    },
    button: {
        alignSelf: 'center'
    },
    outlinedButton: {
        borderColor: BLACK,
        backgroundColor: WHITE,
        borderWidth: 1,
        borderRadius: 4,
        alignSelf: 'center'
    },
    reqButtonText: {
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(18),
        lineHeight: FontSize(25),
        color: WHITE
    },
    saveButtonText: {
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(18),
        lineHeight: FontSize(25),
        color: BLACK
    },
    placeholderTextStyle: {
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(14),
        lineHeight: FontSize(24),
        color: BLACK
    },
    label: {
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(14),
        ineHeight: 24,
        marginLeft: 10,
        color: BLACK
    }
})

export default styles