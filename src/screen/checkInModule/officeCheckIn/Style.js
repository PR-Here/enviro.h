import { StyleSheet } from 'react-native';
import { FontName, FontSize } from '../../../theme/Fonts';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { BLACK, BUTTON_BACKGROUND, LIGHT_GREY, RED, TEXT_COLOR_GREY, WHITE } from '../../../theme/Colors';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: hp(4),
        marginTop: hp(2),
    },

    punchIn_Details: {
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    punchInView: {

    },
    punchInText: {
        fontSize: FontSize(15)
    },
    punchInTimeText: {
        fontSize: FontSize(13),
        marginTop: hp(1),
    },

    line: {
        width: 1,
        height: '100%',
        backgroundColor: '#E9E9E9'
    },
    punchOutText: { fontSize: FontSize(15), color: BLACK },
    punchOutTimeText: {
        fontSize: FontSize(13),
        marginTop: hp(1),
        color: BLACK,
    },

    totalHourText: {
        fontSize: FontSize(13),
        marginTop: hp(1),
        textAlign: 'center',
        marginTop: hp(2),
    },
    locationText: {
        textAlign: 'left',
        marginTop: hp(3),
        fontFamily: FontName.Gordita_Regular,
        fontSize: FontSize(9),
        fontWeight: '500',
        lineHeight: 15,
        color: TEXT_COLOR_GREY
    }


});
