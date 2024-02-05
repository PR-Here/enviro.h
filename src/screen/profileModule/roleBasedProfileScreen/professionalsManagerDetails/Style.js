import { BLACK, BLUE, GRAY56, GREY, INACTIVE_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR_GREY, WHITE } from "../../../../theme/Colors";
import { FontName, FontSize } from "../../../../theme/Fonts";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    aboutView: {
        flexDirection: 'column',

    },
    aboutText: {
        flex: 1,
        fontSize: FontSize(11),
        fontWeight: 'normal',
        color: TEXT_COLOR_GREY,
        alignSelf: 'center',
        marginTop: hp(1),
        lineHeight: 15,
        fontWeight: '400',
        fontFamily: FontName.Gordita_Regular,
    },

    item: {
        backgroundColor: WHITE,
        flexDirection: 'row',
        padding: hp(2),
        justifyContent: 'space-between',
        borderColor: '#DEDEDE',
        borderWidth: 1,
        borderRadius: hp(2),
        paddingStart: hp(3),
        marginTop: hp(2)
    },
    linkView: {
        backgroundColor: 'red'
    },
    title: {
        fontSize: FontSize(14),
        fontWeight: '400',
        color: BLACK,
        alignSelf: 'center',
        fontFamily: FontName.Gordita_Medium
    },
    title2: {
        flex: 1,
        marginStart: hp(2),
        fontSize: FontSize(14),
        fontWeight: 'normal',
        color: 'rgba(0,0,0,0.6)',
        alignSelf: 'center',
        marginTop: hp(0),
        lineHeight: hp(2.5),
        fontWeight: '400',
        fontFamily: FontName.Gordita_Regular,
    },
    SkillsAndHobbiesContainer: {
        padding: hp(1),
        borderWidth: 1,
        borderColor: '#C1C0C0',
        backgroundColor: 'white',
        borderRadius: hp(10),
        marginTop: hp(1),
        marginBottom: hp(1),
        marginEnd: hp(2),
        paddingStart: hp(2),
        paddingEnd: hp(2),
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    text: {
        flex: 1,
        fontSize: FontSize(12),
        lineHeight: hp(3),
        fontFamily: FontName.Gordita_Regular
    },
    seeMore: {
        color: BLUE,
        fontFamily: FontName.Gordita_Regular,
        fontSize: FontSize(12),
        fontWeight: "400",

    },
    SkillsAndHobbiesItemText: {
        fontSize: FontSize(12),
        fontWeight: "400",
        color: GRAY56,
        textTransform: 'capitalize',
        textAlign: 'center'
    },
    profileListGridInnerContainer: {
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: wp(80),

        padding:10
        
    },
    profileListGridTitleContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
     
    },
    profileListGridTitleValueStyle: {
        marginStart: wp(4),
        fontSize: FontSize(15),
        fontWeight: 'normal',
        color: '#8F8F8F'
    },
    scrollViewContainer: {
        flex: 1,
        marginTop: hp(0),
        padding: hp(2)
    },
    scrollViewInnerContainer: {
        paddingBottom: hp(5),
    },

    stepperItemContainer: {
        flexDirection: 'row'
    },
    stepperItemInnerContainer: {
        justifyContent: 'center'
    },
    stepperItemCircle: {
        height: wp(2.3),
        width: wp(2.3),
        borderRadius: 100,
        backgroundColor: 'black',
    },
    stepperItemLine: {
        flex: 1,
        width: wp(0.3),
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
    },
    stepperItemTextContainer: {
        marginStart: wp(6),
        paddingBottom: hp(3),

    },
    stepperTopText: {
        color: PRIMARY_COLOR,
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Medium,
        fontWeight: "400"
    },
    stepperMiddleText: {
        color: SECONDARY_COLOR,
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Regular,
        marginTop: hp(1),
        fontWeight: "400"
    },
    stepperBottomText: {
        fontSize: FontSize(14),
        color: INACTIVE_COLOR,
        fontFamily: FontName.Gordita_Regular,
        marginTop: hp(1),
        fontWeight: "400"
    },
    socialLinkContainerStyle: {
        flex: 1, width: '100%',
    },
    socialLinkInnerContainerStyle: {
        flexDirection: 'row'
    },
    socialLinkImageStyle: {
        height: 20, width: 20
    },
    socialLinkTextStyle: {
        color: TEXT_COLOR_GREY,
        marginLeft: hp(4),
        fontSize: FontSize(14),
        marginTop: 0,
    },
    linkedTextStyle: {
        color: '#45C1FF',
        fontSize: 14
    },
    aboutTitleStyle: {
        fontSize: FontSize(14),
        fontWeight: '400',
        fontFamily: FontName.Gordita_Medium,
        color: PRIMARY_COLOR,
    },
    noDataText: {
        color: GREY,
        marginLeft: hp(2)
    },
    linksLineStyle: {
        height: 1,
        backgroundColor: '#DEDEDE',
        marginVertical: 14
    }
})