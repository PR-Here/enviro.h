import { RollInLeft } from "react-native-reanimated";
import { BLACK, GREEN, GREY, LIGHTGREY, LIGHT_BLUE, RED, TEXT_COLOR_GREY, WHITE } from "../../../theme/Colors";
import { FontName, FontSize } from "../../../theme/Fonts";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: hp(2)
    },
    aboutView: {
        flexDirection: 'column',
    },
    item: {
        backgroundColor: WHITE,
        flexDirection: 'row',
        padding: hp(2),
        justifyContent: 'space-between',
        borderColor: '#DEDEDE',
        borderWidth: 1,
        borderRadius: hp(2),
        marginTop: hp(2),
        paddingStart: hp(3),
    },
    linkView: {

        backgroundColor: 'red'
    },
    title: {
        fontSize: FontSize(14),
        fontWeight: 'normal',
        color: BLACK,
        alignSelf: 'center',
        fontFamily: FontName.Gordita_Regular
    },
    title2: {
        flex: 1,
        marginStart: hp(2),
        fontSize: FontSize(13),
        fontWeight: 'normal',
        color: 'rgba(0,0,0,0.6)',
        alignSelf: 'center',
        marginTop: hp(0),
        lineHeight: hp(2.5),
        fontFamily: FontName.Gordita_Regular
    },
    SkillsAndHobbiesContainer: {
        padding: hp(1),
        borderWidth: 1,
        borderColor: '#C1C0C0',
        backgroundColor: 'white',
        borderRadius: hp(10),
        marginTop: hp(1),
        marginEnd: hp(2),
        marginBottom: hp(1),
        paddingStart: hp(2),
        paddingEnd: hp(2),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    aboutText: { fontSize: FontSize(12), },
    text: {
        flex: 1,
        fontSize: FontSize(12),
        lineHeight: hp(3),
        fontFamily: FontName.Geo_Auto_Regular
    },
    seeMore: {
        color: LIGHT_BLUE,
        fontFamily: FontName.Geo_Auto_Regular
    },
    SkillsAndHobbiesItemText: {
        fontSize: FontSize(11),
        fontWeight: 'normal',
        color: '#8F8F8F',
        textTransform: 'capitalize',
        fontFamily: FontName.Gordita_Regular
    },
    profileListGridInnerContainer: {
        justifyContent: 'space-between',
        width: wp(80),
    },
    profileListGridTitleContainerStyle: {
        flexDirection: 'row'
    },
    profileListGridTitleValueStyle: {
        marginStart: wp(4),
        fontSize: FontSize(15),
        fontWeight: 'normal',
        color: '#8F8F8F'
    },
    scrollViewContainer: {
        flex: 1,
        marginTop: hp(1),
        padding: hp(2)
    },
    scrollViewInnerContainer: {
        paddingBottom: hp(10)
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
        color: 'black',
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Medium
    },
    stepperMiddleText: {
        color: 'black',
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Regular,
        marginTop: hp(1)
    },
    stepperBottomText: {
        fontSize: FontSize(12),
        color: TEXT_COLOR_GREY,
        fontFamily: FontName.Gordita_Regular,
        marginTop: hp(1)
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
        fontWeight: 'normal',
        color: BLACK,
        fontFamily: FontName.Gordita_Regular
    },
    noDataText: {
        color: GREY,
        marginLeft: hp(2),
        fontFamily: FontName.Gordita_Regular
    },
    linksLineStyle: {
        height: 1,
        backgroundColor: '#DEDEDE',
        marginVertical: 14
    }
})