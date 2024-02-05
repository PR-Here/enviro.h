import { StyleSheet } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import { FontSize, FontName } from "../../../theme/Fonts";
import { BLACK, LINE_COLOR, WHITE } from "../../../theme/Colors";
import { Color } from "../../settings/GlobalStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    renderItemView: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: WHITE,
        marginHorizontal: hp(3),
        padding: hp(2),
        marginVertical: hp(1),
        borderRadius: hp(1)
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    descView: {
        flexDirection: 'row',
        marginTop: hp(2),
        justifyContent: 'flex-start',
        //alignItems: "center"
    },
    titleText: {
        fontSize: FontSize(14)
    },
    descText: {
        fontSize: FontSize(12),
        marginLeft: hp(2),
        //width: '60%'
        fontFamily: FontName.Gordita_Regular,
    },
    line: {
        height: 1,
        width: '90%',
        backgroundColor: LINE_COLOR,
        paddingVertical: hp(0.1),
        alignSelf: 'center',
        marginVertical: hp(2)
    },
    dateTimeView: {
        flexDirection: 'row',
        marginTop: hp(1),
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    date: {
        marginLeft: hp(2),
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Regular,
        color: BLACK
    },
    dateText: {
        position: 'absolute',
        right: hp(0),
        fontSize: FontSize(12),
        textAlign: 'left',
        width: 130,
        fontFamily: FontName.Gordita_Regular,
        color: '#00000060'
    },
    transcriptsUser: {
        fontSize: FontSize(12),
        color: '#000000',
        flex:1
    },
    transcriptsTime: {
        fontSize: FontSize(12),
        color: '#00000060',
        paddingHorizontal:10,
    },
    transcriptsDesc: {
        fontSize: FontSize(12),
        color: '#00000060',
        marginVertical:5,
        fontFamily: FontName.Gordita_Regular,
        flex:1,
    }
});