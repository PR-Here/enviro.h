import {
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import {
    BLACK,
    BLUE,
    GREY,
    LIGHTGREY,
    WHITE,
} from '../../../../theme/Colors';
import { FontName, FontSize } from '../../../../theme/Fonts';
const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        margin:5
    },
    title: {
        fontSize: 14,
        fontWeight: 400,
        color: BLACK,
        marginStart: 5,
    },
    subTitle: {
        fontSize: 12,
        fontWeight: '400',
        color: BLACK,
        marginStart: 5,
        marginEnd: 5,
    },
    viewStyle: {
        borderWidth: 1,
        borderColor: LIGHTGREY,
        padding: 20,
        borderRadius: 10,
        marginEnd: 10,
        marginStart: 10,
        marginTop: 5,
        shadowColor: BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        backgroundColor: WHITE,
    },
    seeMore: {
        color: 'red',
    },
    companyNameText: {
        flex: 1,
        fontSize: FontSize(16),
        lineHeight: 21,
        fontFamily: FontName.Gordita_Medium,
        marginLeft: 2,
        color: BLACK
    },
    flatListView: {
        padding: 0,
        paddingTop: 2,
        paddingBottom: 2,
        paddingStart: 6,
        paddingEnd: 6,
        justifyContent: 'center',
        marginTop: 8,
        marginStart: 0,
        marginBottom: 5,
        marginEnd: 5,
        shadowColor: BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        backgroundColor: WHITE,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: LIGHTGREY,
    },
    viewLinkStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    viewFirstStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imageStyle: {
        width: 25,
        height: 25,
        marginBottom: 5,
    },
    separatorBottom: {
        height: 0.5,
        backgroundColor: '#808080',
    },
    viewRowStyle: { flexDirection: 'row', borderWidth: 1, borderColor: BLACK },
    viewCircleStyle: {
        height: 8,
        width: 8,
        borderRadius: 100,
        backgroundColor: 'black',
    },
    viewLineStyle: {
        flex: 1,
        width: 1,
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
    },
    designationText: {
        color: BLACK, fontSize: 14, marginStart: heightPercentageToDP(0.5),
        fontFamily: FontName.Gordita_Regular,
        marginTop: heightPercentageToDP(1),
        lineHeight: 17
    },
    durationText: {
        color: GREY, fontSize: 12,
        marginStart: heightPercentageToDP(0.5),
        marginTop: heightPercentageToDP(1), fontFamily: FontName.Gordita_Regular,
        lineHeight: 17

    },
    projectDescText: { color: GREY, fontSize: 13, lineHeight: 17, marginTop: heightPercentageToDP(0.5), fontFamily: FontName.Gordita_Regular, },

    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flexWrap: 'wrap'
    },
    seeMore: {
        color: BLUE,
        fontFamily: FontName.Gordita_Regular,
        fontSize: FontSize(12),
        fontWeight: "400",

    },
    designationTextbottom: {
        marginStart: 10, paddingBottom: 5,
        marginTop: Platform.OS == 'android' ? heightPercentageToDP(-1) : 0,
    },
    roleText: {
        color: BLACK, fontSize: 14, fontFamily: FontName.Gordita_Regular,
    },
    dateStyle:{ color: GREY, fontSize: 12, fontFamily: FontName.Gordita_Regular, marginTop: heightPercentageToDP(1) }
});