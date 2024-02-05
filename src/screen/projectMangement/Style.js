import { RollInLeft } from "react-native-reanimated";
import { BLACK, GREEN, GREY, GREY_LIGHT, LIGHTGREY, LIGHT_BLUE, PRIMARY_COLOR, RED, TEXT_COLOR_GREY, WHITE } from "../../theme/Colors";
import { FontName, FontSize } from "../../theme/Fonts";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    },

    headingText: {
        fontSize: FontSize(16),
        fontFamily: FontName.Gordita_Medium,
        marginTop: wp(5),
        marginStart: wp(5)
    },
    projectItemConatiner: {
        marginStart: 10,
        padding: wp(2),
        paddingBottom: wp(3),
        borderRadius: wp(3)
    },
    projectItemInner: {
        height: wp(25),
        width: wp(25),
        padding: wp(5),
        borderRadius: wp(5),
        alignItems: 'center',
        justifyContent: 'center'

    },
    firstLetterStyle: {
        fontSize: FontSize(25),
        fontFamily: FontName.Gordita_Medium,
        color: WHITE
    },
    projectNameStyle: {
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Medium,
        color: BLACK,
        alignSelf: 'center',
        marginTop: 10
    },
    projectStatusContainer: {
        height: wp(30),
        width: wp(30),
        backgroundColor: WHITE,
        marginStart: 5,
        borderRadius: wp(3),
        padding: 10,
        justifyContent: 'space-between'
    },
    projectStatusNameStyle: {
        fontSize: FontSize(14),
        justifyContent: 'flex-start',
        color: '#626262'
    },
    projectStatusNumberStyle: {
        fontSize: FontSize(25),
        marginTop: 10,
        color: '#626262',
        marginBottom: 10,
        alignSelf: 'center'
    },

    kanbanContainer: {
        alignItems: 'center',
        marginStart: 10,
        backgroundColor: '#F5F6F8',
        padding: wp(3),
        borderRadius: wp(4),
        minWidth: wp(60)

    },
    kanbanStatusTextStyle: {
        fontSize: FontSize(14),
        color: BLACK,
        marginStart: 3
    },
    planNameStyle: {
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Medium,
        justifyContent: 'flex-start'
    },
    planName2Style: {
        fontSize: FontSize(10),
        fontFamily: FontName.Gordita_Regular,
        justifyContent: 'flex-start',
    },
    planOptionStyle: {
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Regular,
        justifyContent: 'flex-start',
    },
    designStatusStyle: {
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Regular,
        color: WHITE
    },
    optionStyle: {
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Regular,
        color: BLACK,
        marginEnd: 10
    },
















    tablecontainer: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: {
        height: 60,
        backgroundColor: PRIMARY_COLOR,
        borderBottomColor: GREY_LIGHT,
        alignSelf: 'center'

    },
    textheader: {
        textAlign: 'center',
        paddingVertical: wp(2.5),
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Medium,
        lineHeight: wp(5),
        textAlign: 'center'
    },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' }


})