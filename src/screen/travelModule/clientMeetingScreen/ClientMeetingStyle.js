import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { BLACK, GREY, LIGHTGREY, PRIMARY_COLOR, WHITE } from "../../../theme/Colors";

const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
    container: { padding: 16 },
    dropdown: {
        height: heightPercentageToDP(5),
        backgroundColor: 'transparent',
        borderBottomColor: GREY,
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    },
})