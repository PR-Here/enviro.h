import { PRIMARY_COLOR, WHITE, BLACK, GREEN, GREY, LIGHTGREY, EXTRA_LIGHT_GREY } from "../../../theme/Colors";
import { FontName, FontSize } from "../../../theme/Fonts";

const { StyleSheet } = require("react-native");
const { heightPercentageToDP, widthPercentageToDP } = require("react-native-responsive-screen");

const styles = StyleSheet.create({
    tabBarStyle: {
        marginHorizontal: heightPercentageToDP(1),
        borderTopLeftRadius: heightPercentageToDP(1),
        borderTopRightRadius: heightPercentageToDP(1),
        backgroundColor: BLACK,
        overflow: 'hidden',
        elevation: 0,
        shadowOffset: 0,
        shadowColor: GREY,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: EXTRA_LIGHT_GREY,
    },
    tabBarLabelStyle: {
        textTransform: 'capitalize',
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Medium,
        //width: heightPercentageToDP(15),

    },
    tabBarIndicatorStyle: {
        backgroundColor: WHITE,
        height: '100%',
    }
})

export default styles