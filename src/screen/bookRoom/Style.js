import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { BLACK, BUTTON_BACKGROUND, LIGHTGREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors";
import { FontName, FontSize } from "../../theme/Fonts";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    subTitle: {
        fontSize: FontSize(16),
        color: BLACK,
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '500'
    },
    listView: {
        borderTopWidth: 1,
        borderColor: LIGHTGREY,
        marginHorizontal: 10
    },
    listLabelView: {
        marginTop: heightPercentageToDP(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    verticalMargin: {
        height: heightPercentageToDP(3),
    },
    textFieldStyle: {
        padding: 10,
        borderBottomColor: BLACK,
        borderBottomWidth: 0.5,
        fontSize: 14,
        fontFamily: FontName.Gordita_Regular,
        marginHorizontal: 10
    },
    addGuestText: {
        fontFamily: FontName.Gordita_Regular,
        fontSize: FontSize(14),
        lineHeight: FontSize(24),
        color: BLACK
    },
    guestIcon: {
        height: 20,
        width: 20,
        tintColor: BLACK
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
        alignSelf: 'center',
        marginTop: heightPercentageToDP(3),
        // marginBottom: heightPercentageToDP(20)
    },
    buttonTextStyle: {
        fontSize: FontSize(14), fontWeight: 'bold',
        fontFamily: FontName.Gorditas_Bold,
        color: WHITE
    },
    submitButtonStyle2: {
        alignSelf: 'center',
        marginTop: heightPercentageToDP(2),
        borderColor: PRIMARY_COLOR,
        backgroundColor: WHITE,
        borderRadius: 5,
        borderColor: BLACK, borderWidth: 2,
        marginBottom: heightPercentageToDP(8),
    },
    checkboxTextStyle: { color: BLACK, fontFamily: FontName.Gordita_Regular, fontSize: 14 },
    filterViewStyle: {
        backgroundColor: '#FFF0EB',
        alignItems: 'center',
        flexDirection: 'row', borderColor: '#E49273', borderWidth: 1, borderRadius: 100,
        paddingStart: 15, paddingEnd: 10, marginRight: 10, paddingVertical: 2,
        marginBottom: 10,
    },
    filterText: { fontSize: 12, color: '#E49273', fontFamily: FontName.Gordita_Regular },
    icon: {
        width: 12, height: 12,
        tintColor: BLACK,
        marginStart: 10,
        fontSize: 12

    },
    userImageCircle: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: heightPercentageToDP(5),
        width: heightPercentageToDP(5)
    },
    searchResultContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#DEDEDE',
        // borderWidth: widthPercentageToDP(0.3),
        borderRadius: widthPercentageToDP(2),
        marginTop: widthPercentageToDP(1),
        padding: widthPercentageToDP(1)

    },
    resultItemInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    border: {
        borderRadius: heightPercentageToDP(100),
        borderColor: WHITE,
        borderWidth: widthPercentageToDP(1)
    },
    userDetailsContainer: {
        marginStart: widthPercentageToDP(2),
        justifyContent: 'center'

    },
    userNameStyle: {
        fontSize: FontSize(14),
        color: 'black',
        fontWeight: 'normal'

    },
    userDesignationStyle: {
        fontSize: FontSize(13),
        color: 'rgba(0,0,0, 0.75)',
        fontWeight: 'normal'

    },
    flatListSearchStyle: {
        // height: "1as.5%",
        minHeight: 0,
        maxHeight: 140
        // maxHeight: "50%",
    },

    tickImageStyle: {
        marginLeft: 10,
        height: heightPercentageToDP(2.5),
        width: heightPercentageToDP(2.5)
    },


})

export default styles