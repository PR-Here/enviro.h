import { WHITE } from "../../theme/Colors";
import { FontName, FontSize } from "../../theme/Fonts";


const { StyleSheet } = require("react-native");
const { heightPercentageToDP } = require("react-native-responsive-screen");

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        //margin: heightPercentageToDP(1),
        backgroundColor: WHITE
    },
    catgItem: {
        marginTop: heightPercentageToDP(0.5)
    },
    heading: {
        fontFamily: FontName.Gorditas_Bold,
        fontSize: FontSize(15),
        marginVertical: heightPercentageToDP(1)
    },
    commExploreItem: {
        marginBottom: heightPercentageToDP(1)
    },
    footer: {
        height: heightPercentageToDP(10)
    }
})

export default styles