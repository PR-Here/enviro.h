import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PRIMARY_COLOR, WHITE } from '../../../theme/Colors';
import { FontSize } from '../../../theme/Fonts';



export const styles = StyleSheet.create({
    calenderView: {
        backgroundColor: WHITE,
        elevation: 1,
        maxHeight: 360,
        marginTop: hp(2),
        paddingTop: hp(1.5),
        marginHorizontal: hp(1)
    },
    calenderContainer: {
        backgroundColor: PRIMARY_COLOR,
        width: '100%',
        height: 55,
        alignSelf: 'center',
        borderRadius: 3,
        justifyContent: 'center',
        paddingVertical: 3,
    },
    monthAndYearView: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row"
    },
    monthText: {
        fontSize: FontSize(13),
        marginBottom: hp(2),
        marginStart: hp(2),
    },
    dayHeaderStyle: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    calendarCellTextStyle: {
        fontSize: FontSize(8),
    }

})