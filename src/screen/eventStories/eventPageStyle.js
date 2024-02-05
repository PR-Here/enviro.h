import { StyleSheet, Platform } from 'react-native';
import { FontName, FontSize } from '../../theme/Fonts';
import { BLACK, BLUE, BUTTON_BACKGROUND, GREY_LIGHT, WHITE } from '../../theme/Colors';
import { metrics } from '../../theme/metrics';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        elevation: 5,
        borderRadius: 20,
        margin: 10,
        flex: 1,
        // padding: 20,
        backgroundColor: WHITE,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 }
    },
    closeButtonTouchStyle: { position: 'absolute', right: wp(2), top: hp(2) },
    closeImageStyle: { tintColor: BLACK },
    eventTextStyle: { fontWeight: '900', fontSize: FontSize(16), marginTop: hp(2), marginHorizontal: wp(3) },
    eventTimeStyle: { color: GREY_LIGHT, fontSize: FontSize(12), marginHorizontal: wp(3), marginTop: Platform.OS == 'ios' ? 5 : 0 },
    titleTextStyle: {
        marginTop: Platform.OS == 'ios' ? 5 : 0,
        fontSize: FontSize(45),
        marginHorizontal: wp(3),
        fontWeight: 'bold', fontFamily: FontName.Gorditas_Bold,
        lineHeight:45
    },
    imageStyle1: {
        aspectRatio: 1,
        alignSelf: 'center',
        height: metrics.screenHeight * 0.25,
        width: '100%', tintColor: BLACK
    },
    postedTextStyle: { marginHorizontal: wp(3), color: GREY_LIGHT, fontSize: FontSize(11) },
    imageStyle2: {
        marginTop: hp(1),
        alignSelf: 'center',
        height: hp(45),
        width: '94%',
    },
    textStyle1: {
        marginTop: hp(1), fontFamily: FontName.Geo_Auto_Regular, fontWeight: 'bold', color: BLACK, fontSize: FontSize(12)
    },
    textStyle2: {
        marginBottom: hp(2), marginHorizontal: wp(3),
        marginTop: 15, fontFamily: FontName.Geo_Auto_Regular, color: BLACK, fontSize: FontSize(12),
        lineHeight: 17,
    }, footerTextStyle: {
        color: GREY_LIGHT, fontSize: FontSize(14), marginTop: hp(2), marginHorizontal: wp(3)
    },
    clickLinkTextStyle: {
        color: BLUE, fontSize: FontSize(16),
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        textDecorationColor: BLUE, fontFamily: FontName.Gordita_Medium,
    },
    buttonTextStyle: {
        fontSize: FontSize(14),
        color: WHITE, fontWeight: 'bold',
        fontFamily: FontName.Gorditas_Bold,
    },
    submitButtonStyle: {
        backgroundColor: BUTTON_BACKGROUND,
        borderRadius: 5,
        width: wp(35),
        height: hp(4.5)
    },
    attachmentStyle: { flexDirection: 'row', alignItems: 'center', marginVertical: hp(2.5), marginHorizontal: wp(3), },
    clickLinkStyle: { flexDirection: 'row', alignItems: 'center', flex: 1 },

});