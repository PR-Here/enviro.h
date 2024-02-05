const { StyleSheet } = require("react-native");
const { heightPercentageToDP } = require("react-native-responsive-screen");
const { FontName, FontSize } = require("../../theme/Fonts");
const { PRIMARY_COLOR, WHITE } = require("../../theme/Colors");

const styles = StyleSheet.create({
    tabBarStyle: {
        marginHorizontal: heightPercentageToDP(1),
        borderRadius: heightPercentageToDP(1),
        backgroundColor: WHITE,
    },
    tabBarLabelStyle: {
        textTransform: 'capitalize',
        fontSize: FontSize(16),
        fontWeight: '400',
        fontFamily: FontName.Gordita_Medium,
        width: heightPercentageToDP(15),

    },
    tabBarIndicatorStyle: {
        backgroundColor: PRIMARY_COLOR,
        height: '100%',
        borderRadius: heightPercentageToDP(1),
    }
})

export default styles