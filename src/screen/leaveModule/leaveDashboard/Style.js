import {
    StyleSheet
} from 'react-native';
import React from 'react';
import { LIGHTGREY, WHITE, BLACK, GREY_LIGHT, BUTTON_BACKGROUND, PRIMARY_COLOR, TERNARY_COLOR, INACTIVE_COLOR, SECONDARY_COLOR } from '../../../theme/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../../theme/Fonts';


export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFCFD',
        flex: 1,
    },
    dashboardItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: wp(6)
        //  borderWidth: 1,
    },
    listItemContainer: {
        marginHorizontal: wp(2),
        paddingEnd: wp(1),
        backgroundColor: WHITE,
        borderBottomColor: LIGHTGREY,
        paddingVertical: wp(2),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: wp(0.2),
        shadowColor: BLACK,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1

    },
    addLeaveSectionConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp(2),
        marginTop: wp(3)
    },
    leaveBalanceText: {
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Medium,
        color: BLACK,
        paddingBottom: wp(2),
        paddingTop: wp(2),
    },
    leaveRequestText: {
        backgroundColor: PRIMARY_COLOR,
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Medium,
        color: WHITE,
        paddingHorizontal: wp(2),
        paddingVertical: wp(2),
        borderRadius: wp(1),
        borderWidth: wp(0.5),
        alignSelf: 'center'
    },
    leaveTakenContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    SickLeaveContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: wp(2),
        borderBottomRightRadius: wp(2),
        shadowColor: BLACK,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
        backgroundColor: PRIMARY_COLOR
    },

    dashboardViewInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    dashboardViewTitle: {
        fontSize: FontSize(20),
        color: BLACK,
        fontFamily: FontName.Gordita_Medium,
    },
    // dashboardViewImage: {
    //     alignSelf: 'center',
    //     height: 20,
    //     width: 20,
    //     padding: 5
    // },
    dashboardViewValue: {
        fontSize: FontSize(12),
        color: WHITE,
        marginTop: wp(1),
        alignSelf: 'center',
        textAlign: 'center'
    },


    dashboardDataDateText: {
        fontSize: FontSize(14),
        color: PRIMARY_COLOR,
        flex: 1,
        paddingHorizontal: wp(1.5),
        fontFamily: FontName.Gordita_Medium
    },
    dashboardDataDate1Text: {
        fontSize: FontSize(12),
        fontWeight: 'normal',
        color: TERNARY_COLOR,
        flex: 1,
        paddingHorizontal: wp(1.5),
        fontFamily: FontName.Geo_Auto_Regular,
    },
    dashboardDataReasonStatusContainer: {
        flexDirection: 'row',
        flex: 1,
        //justifyContent: 'space-between'
    },
    dashboardDataReasonText: {
        fontSize: FontSize(14),
        color: PRIMARY_COLOR,
        fontFamily: FontName.Gordita_Medium,
        flex: 1,
        alignSelf: 'center',
    },
    dashboardDataStatusText: {
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Regular
    },
    dashboardDataDayContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dashboardDataDayText: {
        fontSize: FontSize(12),
        color: TERNARY_COLOR,
        fontFamily: FontName.Geo_Auto_Regular

    },
    dashboardDataReasonDayStatusContainer: {
        flex: 1,
        marginLeft: wp(2),

    },
    sectionHeaderStyle: {
        color: '#00000060',
        fontSize: FontSize(12),
        fontWeight: 'normal',
        marginHorizontal: wp(2),
        fontFamily: FontName.Geo_Auto_Regular
    },
    tabBarLabelStyle: {
        fontSize: FontSize(14),
        textTransform: 'capitalize'
    },
    tabBarIndicatorStyle: {
        backgroundColor: '#F17C1D',
        height: wp(1),
        borderRadius: wp(1)
    },

    pagerViewStyle: {
        backgroundColor: PRIMARY_COLOR,
        margin: wp(2),
        borderRadius: wp(2),
        // marginTop: wp(2),
        // shadowColor: BLACK,
        // shadowOpacity: 0.4,
        // shadowOffset: { width: 0, height: 4 },
        // elevation: 2,
    },
    pagerViewDividerStyle: {
        height: wp(10),
        backgroundColor: INACTIVE_COLOR,
        width: 0.5,
        marginVertical: 5,
        alignSelf: 'center'
    },
    pagerIndicatorStyle: {
        borderRadius: wp(32),
        width: wp(2.5),
        height: wp(2.5),
        borderColor: 'grey',
        marginStart: 5
    }

})