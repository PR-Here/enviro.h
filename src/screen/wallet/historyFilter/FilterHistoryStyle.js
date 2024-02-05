import { StyleSheet } from 'react-native';
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../../theme/Fonts';
import { BLACK, GREY, WHITE, LIGHTGREY, PRIMARY_COLOR } from '../../../theme/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleBottomTxtStyle: {
        margin: FontSize(14),
        alignContent: 'flex-start',
        justifyContent: 'space-around',
        fontSize: 20,
        color: BLACK,
        fontFamily: FontName.Gorditas_Bold
    },
    iconStyle: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: 20,
        tintColor: BLACK
    },
    viewTextFilterStyle: {
        marginEnd: 15,
        marginStart: 15,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    verticleLine: {
        height: 1,
        width: 'auto',
        backgroundColor: GREY,
    },
    viewCellStyle: {
        flexDirection: 'row',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: LIGHTGREY,
        backgroundColor: WHITE,
        borderRadius: 8,
        marginEnd: 2,
        marginStart: 3,
        justifyContent: 'center',
        width: widthPercentageToDP(26),
        
    },
    viewCellActiveStyle: {
        color: BLACK,
        fontSize: FontSize(13),
        fontFamily: FontName.Gordita_Regular,
        paddingTop: 10,
        paddingBottom: 10,
    },
    viewStyle: {
        margin: 5
    },
    viewDateBottomStyle: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        height: heightPercentageToDP(10),
        width: widthPercentageToDP(99),
        marginTop: heightPercentageToDP(2),
        marginStart: heightPercentageToDP(0),
    },
    viewStartDateStyle: {
        flexDirection: 'row',
        paddingBottom: 0,
    },
    subDateTitle: {
        fontWeight: "normal",
        color: BLACK,
        marginTop: heightPercentageToDP(1),
        backgroundColor: WHITE,
        width: widthPercentageToDP(35),
        fontSize: FontSize(13),
        height: 40,
        fontFamily: FontName.Geo_Auto_Regular,
        textAlignVertical: 'center',
        marginStart: 5
    },
    imageStyle: {
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignSelf: 'center'
    },
    viewEndColumStyle: {
        height: heightPercentageToDP(7),
        marginStart: 0,
        width: widthPercentageToDP(45),
        padding: 2,
        borderWidth: 1,
        borderColor: LIGHTGREY,
        marginEnd: 5,
        borderRadius: 8
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: widthPercentageToDP(100),
    },
    saveButton: {
        backgroundColor: PRIMARY_COLOR,
        fontSize: FontSize(12),
        justifyContent: 'center',
        borderRadius: 10
    },
    customTextViewStyle: {
        marginStart: 10, color: GREY, fontFamily: FontName.Gorditas_Bold,
    },
});