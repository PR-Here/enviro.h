import { BLACK, LIGHTWHITE, PRIMARY_COLOR, SECONDARY_COLOR, SELECTED_INNER_COLOR, SELECTED_OUTER_COLOR, TERNARY_COLOR, WHITE } from "../../../theme/Colors";
import { FontName, FontSize } from "../../../theme/Fonts";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const { StyleSheet, Platform } = require("react-native");


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //paddingBottom: wp(20)
    },
    innercontainer: {
        alignItems: 'stretch',
        paddingHorizontal: wp(3),
        flex: 1
    },
    searchResultTextStyle: {
        alignSelf: 'flex-start',
        marginHorizontal: wp(4),
        marginVertical: hp(1),
        fontSize: FontSize(16),
        fontFamily: FontName.Gordita_Regular,
        fontWeight: 400,
        color: PRIMARY_COLOR
    },
    serachUserResultList: {

    },
    searchTypeListStyle: {
        padding: wp(1),
        backgroundColor: 'red',
        marginStart: wp(1),
        marginTop: wp(6),
    },

    scrollViewStyle: {
        alignSelf: 'baseline',

    },

    searchResultContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#DEDEDE',
        borderWidth: wp(0.3),
        borderRadius: wp(2),
        marginTop: wp(3),
        padding: wp(3),
        alignItems: 'center'

    },

    border: {
        borderRadius: hp(100),
        borderColor: WHITE,
        borderWidth: wp(1)
    },

    userNameStyle: {
        fontSize: FontSize(15),
        color: PRIMARY_COLOR,
        fontWeight: 'normal',
        textAlignVertical: 'center',
        fontFamily: FontName.Gordita_Regular,
        fontWeight: 400

    },

    userDesignationStyle: {
        fontSize: FontSize(14),
        color: SECONDARY_COLOR,
        fontWeight: 'normal',
        fontFamily: FontName.Gordita_Regular,
        fontWeight: 400,
        marginVertical: Platform.OS == 'ios' ? 5 : 0

    },

    userLocationStyle: {
        fontSize: FontSize(13),
        color: TERNARY_COLOR,
        fontFamily: FontName.Gordita_Regular,
        fontWeight: 400
    },

    userTypeText: {
        marginStart: wp(1),
        fontSize: FontSize(13),
        fontWeight: 'normal',
        alignSelf: 'center',
    },

    resultItemInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    userCircleImage: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: hp(7.5),
        width: hp(7.5)
    },

    userDetailsContainer: {
        marginStart: wp(3),
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '77%',

    },

    rightArrowImageStyle: {
        justifyContent: 'center',
        alignSelf: 'center'

    },

    searchListTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingEnd: wp(1),
        borderRadius: wp(1)
    },

    searchTypeTextStyle: {
        paddingVertical: wp(2),
        paddingHorizontal: wp(2),
        borderRadius: wp(10)
    },
    downArrowStyle: {
        padding: wp(1),
        height: wp(4),
        width: wp(4),
        alignSelf: 'center'
    },
    filterViewStyle: {
        backgroundColor: SELECTED_INNER_COLOR,
        alignItems: 'center',
        flexDirection: 'row', borderColor: SELECTED_OUTER_COLOR, borderWidth: 1, borderRadius: 100,
        paddingStart: wp(4), paddingEnd: wp(2), marginRight: wp(2), paddingVertical: wp(1),
        marginTop: wp(2),

    },
    filterText: { fontSize: FontSize(12), color: SELECTED_OUTER_COLOR, fontFamily: FontName.Gordita_Regular },
    icon: {
        width: wp(3),
        height: wp(3),
        tintColor: SELECTED_OUTER_COLOR,
        marginStart: wp(2)

    },

    emptyText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchTypeStyle: {
        flexDirection: 'row',
        paddingVertical: wp(2),
        paddingVertical: wp(2),
        paddingHorizontal: wp(4)
    }
})