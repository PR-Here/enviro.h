import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LINE_COLOR, WHITE } from '../../../theme/Colors';
import { FontName, FontSize } from '../../../theme/Fonts';


export const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
    },
    flatlist: {
        marginBottom: hp(2)
    },
    renderItemView: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: WHITE,
        marginHorizontal: hp(3),
        padding: hp(2),
        marginVertical: hp(1),
        borderRadius: hp(1),
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: { height: 18, width: 18, resizeMode: 'contain' },
    descView: {
        flexDirection: 'row',
        marginTop: hp(2),
        justifyContent: 'flex-start',
        alignItems: "center"
    },
    titleText: {
        fontSize: FontSize(16),
        fontFamily: FontName.Gorditas_Bold,
        fontWeight: '700'
    },
    descText: {
        fontSize: FontSize(13),
        marginHorizontal: hp(2),
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '400'
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
        marginTop: hp(2),
        alignItems: 'center',
        justifyContent: "space-between",
        fontFamily: FontName.Gordita_Regular
    },
    date: {
        marginLeft: hp(1),
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Regular
    },
    dateText: {
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Regular
    }
})