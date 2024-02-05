import { WHITE } from "../../../theme/Colors";

const { StyleSheet } = require("react-native");
const { heightPercentageToDP } = require("react-native-responsive-screen");

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        //margin: heightPercentageToDP(1),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: WHITE,
    },
    eventItem: {
        borderRadius: heightPercentageToDP(1),
        backgroundColor: WHITE
    },
    footer: {
        height: heightPercentageToDP(5)
    }
})

export default styles