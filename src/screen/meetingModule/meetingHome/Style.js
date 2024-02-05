import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BLACK, BLACK60, BORDER_COLOR, GREY, LIGHTWHITE, LINE_COLOR, PAGE_BACKGROUND, PRIMARY_COLOR, WHITE } from "../../../theme/Colors";
import { FontName, FontSize } from "../../../theme/Fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PAGE_BACKGROUND,
        paddingBottom: hp(2),
    },
    myMeetingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: hp(2),
        justifyContent: 'space-between',
        marginTop: hp(2)
    },
    myMeetngText: {
        fontSize: FontSize(16), fontFamily: FontName.Gordita_Medium, fontWeight: '500'
    },
    rightView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBackground: {
        height: 40,
        width: 40,
        borderRadius: 44,
        backgroundColor: LIGHTWHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    calenderIcon: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginRight: hp(2)
    },
    createView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: BORDER_COLOR,
        justifyContent: 'center',
        padding: hp(1),
        borderRadius: 5,
        backgroundColor: PRIMARY_COLOR,
        marginLeft: 15
    },
    plusImage: {},
    createText: {
        marginLeft: hp(1),
        alignSelf: 'center',
        marginTop: 0,
        fontSize: FontSize(13),
        fontFamily: FontName.Gordita_Regular,
        color: WHITE
    },
    flatList: {
        marginTop: hp(2),
        backgroundColor: WHITE,
        borderRadius: hp(1),
        marginHorizontal: hp(1),
        maxHeight: hp(25)
    },
    myMeetingItem: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        padding: hp(1),
    },
    meetingTitle: {
        width: wp(25),
        fontSize: FontSize(14),
        color: BLACK,
        fontWeight: '400',
        fontFamily: FontName.Gordita_Regular

    },
    meetingTime: {
        fontSize: FontSize(13),
        alignSelf: 'center',
        // width: wp(40),
        textAlign: 'center',
        color: BLACK60,
        fontWeight: '400',
        fontFamily: FontName.Gordita_Regular,
        flex: 1

    },
    imageMyMeetingView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // width: '20%',
        // marginRight: 7,
    },
    userProfileImage: {
        borderRadius: 100 / 2,
        width: 20,
        height: 20,
        marginLeft: -10,

    },
    imageContainer: {
        alignSelf: 'center'
    },
    badge: {
        backgroundColor: WHITE,
        borderRadius: 100 / 2,
        marginLeft: -10,
        right:-5,
    },
    rightArrow: {
        position: 'absolute',
        right: 2,
        alignSelf: 'center'
    },
    line: {
        height: 1,
        width: '95%',
        backgroundColor: LINE_COLOR,
        paddingVertical: hp(0.1),
        alignSelf: 'center'
    },
    myBookingView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: hp(2),
        backgroundColor: WHITE,
        borderRadius: 10,
        marginTop: hp(1),
        height: 50,
        paddingLeft: hp(2)
    },
    myBookingText: {
        marginLeft: hp(2),
        fontSize: FontSize(13)
    },
    horizontalFlatlist: {
        marginTop: hp(2),
        marginHorizontal: hp(2)
    },
    horizontalItem: {
        borderWidth: 1,
        borderColor: GREY,
        borderRadius: hp(1),
        width: wp(33),
        alignItems: 'center',
        justifyContent: 'center',
        padding: hp(4),
        marginEnd: wp(3),
    },
    horizontalTitle: {
        width: wp(25),
        fontSize: FontSize(14),
        color: BLACK,
        marginTop: hp(2),
        textAlign: 'center',
        fontFamily: FontName.Gordita_Medium
    },
    CheckboxImage: {
        alignSelf: 'center',
    },
    myMinutestItem: {
        justifyContent: 'space-between',
        backgroundColor: WHITE,
        borderRadius: hp(1)
    },
    myMinutesTitle: {
        width: wp(40),
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Regular
    },
    myMinutesTime: {
        alignSelf: 'center',
        textAlign: 'left',
        fontSize: FontSize(13)
    }

})