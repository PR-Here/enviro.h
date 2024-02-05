import { Platform, StyleSheet } from "react-native";
import { BLACK, BUTTON_BACKGROUND, GREY, GREY_LIGHT, PAGE_BACKGROUND, PRIMARY_COLOR, RED, WHITE } from "../../../theme/Colors";
import { FontName, FontSize } from "../../../theme/Fonts";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: PAGE_BACKGROUND },
    imageStyle: {
        width: 18,
        height: 18,
    },
    textFieldStyle: {
        
    },
    separatorStyle: { backgroundColor: '#0002', height: 1, width: '100%' },
    buttonTextStyle: {
        fontSize: FontSize(14), fontWeight: 'bold',
        fontFamily: FontName.Gorditas_Bold,
        color:WHITE
    },
    checkboxTextStyle: { color: BLACK, fontFamily: FontName.Geo_Auto_Regular, fontSize: FontSize(14) },
    submitButtonStyle: {
        alignSelf: 'center',
        marginTop: hp(4), paddingLeft: 20,
        paddingRight: 20, borderRadius: 5, width: '100%',
    },
    addLinkButtonStyle: {
        marginTop: hp(2),
        marginBottom: Platform.OS == 'ios' ? hp(1) : 3,
        backgroundColor: BUTTON_BACKGROUND, paddingLeft: 20,
        paddingRight: 20, borderRadius: 5, width: '30%',
        height: hp(4.5),
    },
    linkViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor: WHITE, marginTop: hp(2), borderColor: GREY_LIGHT,
        borderWidth: 1, paddingHorizontal: wp(3),
        paddingVertical: wp(2), color: BLACK, borderRadius: 5,
    },
    linkTextStyle: {
        borderColor: GREY_LIGHT,
        fontWeight: '100',
        fontSize: FontSize(12),
    },
    submitButtonStyle2: {
        alignSelf: 'center',
        marginTop: hp(2),
        borderColor:PRIMARY_COLOR,
        backgroundColor:WHITE,
        paddingLeft: 20,
        paddingRight: 20, borderRadius: 5, width: '100%',
        borderColor: BLACK, borderWidth: 2
    },
    confirmButtonStyle: {
        alignSelf: 'center',
        //position: 'absolute',
        //bottom: hp(13),
        marginTop: wp(2),
        backgroundColor: BUTTON_BACKGROUND, paddingLeft: 20,
        paddingRight: 20, borderRadius: 5, width: '90%',
    },
    locationViewStyle: {
        flexDirection: 'row', alignItems: 'center', paddingTop: 25,
        paddingBottom: 10
    },
    textStyleLocation: {
        marginStart: 7, fontSize: 10, padding: 5, borderRadius: 5,
        borderWidth: 1, borderColor: GREY, color: BLACK, fontFamily: FontName.Gordita_Regular,
    },
    listLabelView: {
        marginTop: hp(2),
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subTitle: {
        fontSize: 14, fontFamily: FontName.Gorditas_Bold, fontWeight: 'bold',
        color: BLACK
    },
    viewAllTextStyle: { fontSize: 12, fontFamily: FontName.Gordita_Regular, color: BLACK },
    filterViewStyle: {
        backgroundColor: '#FFE2CB',
        alignItems: 'center',
        flexDirection: 'row', borderColor: '#E49273', borderWidth: 1, borderRadius: 100,
        paddingStart: 15, paddingEnd: 10, marginRight: 10, paddingVertical: 3,
        marginBottom: 10,

    },
    filterText: { fontSize: 12, color: '#E49273', fontFamily: FontName.Gordita_Regular },
    icon: {
        width: 12, height: 12,
        tintColor: BLACK,
        marginStart: 10

    },
    noRecordView: { height: hp(30), marginHorizontal: wp(30), flexDirection: 'column', justifyContent: 'center' },
    flatListSearchStyle: {
        minHeight: 0,
        maxHeight: 140
    },
    searchResultContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#DEDEDE',
        borderRadius: wp(2),
        marginTop: wp(1),
        padding: wp(1)

    },
    resultItemInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImageCircle: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: hp(5),
        width: hp(5)
    },
    userDetailsContainer: {
        marginStart: wp(2),
        justifyContent: 'center'
    },
    userDesignationStyle: {
        fontSize: FontSize(13),
        color: 'rgba(0,0,0, 0.75)',
        fontWeight: 'normal'
    },
});