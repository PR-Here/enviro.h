import React from 'react';
import {
    StyleSheet
} from 'react-native';
import { BLACK, LIGHTGREY, PRIMARY_COLOR, RED, SELECTED_OUTER_COLOR, WHITE } from '../../../theme/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../../theme/Fonts';


export const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FAFCFD',
        flex: 1

    },
    textInputViewContainer: {
        paddingHorizontal: wp(1),
        paddingVertical: wp(3),
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: '#A0A2B2',
        alignItems: 'center',
        borderWidth: wp(0.2),
        borderRadius: wp(1),
        marginTop: wp(2.5),
        marginHorizontal: wp(2.5),
    },
    content: {
        flexDirection: 'row',
        paddingEnd: wp(1),
        paddingStart: wp(1),
        flex: 1,
        alignItems: 'center'
    },
    inputTextcontent: {
        flexDirection: 'row',
        paddingEnd: wp(1),
        paddingStart: wp(1),
        flex: 1,
    },
    leaveBalanceContent: {
        flexDirection: 'row',
        paddingEnd: wp(1),
        paddingStart: wp(1),

        alignItems: 'center'
    },

    selectDatesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    startDateView: {
        flex: 1
    },
    numberOfDaysView: {
        alignSelf: 'center',
        marginTop: wp(3),
        alignItems: 'center',
        marginEnd: wp(1)
    },
    numberOfDaysText: {
        fontSize: FontSize(14),
        color: BLACK,
        fontFamily: FontName.Gordita_Medium
    },
    daysText: {
        fontSize: FontSize(14),
        color: '#00000035',
        fontFamily: FontName.Gordita_Regular
    },
    submitButtonStyle: {
        backgroundColor: PRIMARY_COLOR,
        alignSelf: 'center',
        width: '96%',
        marginTop: wp(7),
        borderRadius: wp(1.5),

    },
    submitButtonTextStyle: {
        color: WHITE,
        fontSize: FontSize(16),
        fontFamily: FontName.Gordita_Medium,
        width: '96%',
        textAlign: 'center',
    },
    saveCancelButtonStyle: {
        flex: 1,
        backgroundColor: WHITE,
        alignSelf: 'center',
        borderRadius: wp(1),
        borderWidth: wp(0.4),
        borderColor: PRIMARY_COLOR,
        marginTop: wp(3),
        marginHorizontal: wp(2)
    },
    saveCancelButtonTextStyle: {
        color: PRIMARY_COLOR,
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Medium
    },


    textInputStartImage: {
        tintColor: '#F17C1D'
    },
    textInputTextStyle: {
        fontSize: FontSize(13),
        color: '#A0A2B2',
        marginStart: wp(1),
        alignSelf: 'center'
    },
    textInputDropDownImage: {
        tintColor: BLACK
    },



    leavesTableItemContainer: {
        flexDirection: 'row',
        paddingHorizontal: wp(3),
        paddingVertical: wp(4),
        borderBottomColor: LIGHTGREY
    },
    leaveTableDateItemText: {

        fontSize: FontSize(13),
        fontWeight: 'normal',
        color: BLACK,
        fontFamily: FontName.Geo_Auto_Regular
    },
    leaveTableDayItemText: {

        fontSize: FontSize(13),
        fontWeight: 'normal',
        color: BLACK,
        fontFamily: FontName.Geo_Auto_Regular
    },
    FullHalfDayLeaveItemContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        fontFamily: FontName.Geo_Auto_Regular
    },
    FullHalfDayLeaveItemText: {

        fontSize: FontSize(13),
        fontWeight: 'normal',
        color: BLACK,
        fontFamily: FontName.Geo_Auto_Regular
    },
    fullHalfDayLeaveItemImage: {
        marginStart: wp(2),
        marginEnd: wp(2),
        height: wp(5),
        width: wp(5),
    },

    leaveTableContainer: {
        borderRadius: wp(1),
        borderWidth: wp(0.3),
        borderColor: LIGHTGREY,
        margin: wp(3)
    },
    leaveTableColumnHeadingContainer: {
        flexDirection: 'row',
        padding: wp(2),
        paddingHorizontal: wp(3),
        borderTopLeftRadius: wp(1),
        borderTopRightRadius: wp(1),
        backgroundColor: LIGHTGREY,
        borderBottomColor: LIGHTGREY
    },
    leaveTableColumnHeading: {
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Medium,
        color: BLACK
    },
    leaveBalanceTableContainer: {
        backgroundColor: 'red',
        paddingHorizontal: wp(3),
        paddingVertical: wp(3),
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: wp(0.2),
        borderRadius: wp(1),
        marginHorizontal: wp(3),
        borderColor: SELECTED_OUTER_COLOR,
        marginTop: wp(8)
    },
    leaveBalanceTableImage: {
        tintColor: '#4C92FB',
        height: wp(6),
        width: wp(6)
    },
    leaveBalanceTableText: {
        fontSize: FontSize(14),
        fontWeight: 'normal',
        color: SELECTED_OUTER_COLOR,
        marginStart: wp(3),
        fontFamily: FontName.Geo_Auto_Regular
    },
    leaveBalanceTableArrow: {

        alignSelf: 'center'
    },

    multiLineInputTextStartImage: {
        // tintColor: '#F17C1D',
        // height: wp(6),
        // width: wp(6),
        marginTop: wp(1)
    },
    multiLineInputText: {
        backgroundColor: WHITE,
        textAlignVertical: 'top',
        flex: 1,
        borderWidth: 0,
        color: BLACK,
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Regular,
        height: 'auto',
        minHeight: wp(20),
        maxHeight: wp(40),

    },

    selectTimesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }





})

