import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

import { FontName, FontSize } from '../../../theme/Fonts';
import CustomText from '../../../component/atoms/CustomText';
import { BLACK, BLUE, LEAVESTATUSCOLOR, LIGHT_BLUE, SECONDARY_COLOR, WHITE } from '../../../theme/Colors';
import CustomButton from '../../../component/atoms/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DeleteImg from '../../../../assets/images/SVG/PlanGo/deleteIcon.svg';
import DownloadIcon from '../../../../assets/images/SVG/PlanGo/download.svg';


const PGAirtportDetailView = ({ navigation, route, item, activeTab }) => {
    const handleDeleteClick = () => { };
    const handleActionPress = () => {
        // navigation.navigate(NavString.PG_DETAILS_LIST)
    };

    const handleDownload = () => {
        const url = "https://www.africau.edu/images/default/sample.pdf"
        Linking.openURL(url)
    };

    return (
        <View style={styles.dateSectionStyle}>
            {activeTab != 'Saved Draft' ?
                <View style={styles.columnStyle}>
                    <CustomText
                        children={item?.airportName}
                        fontSize={FontSize(13)}
                        style={{ fontFamily: FontName.Gordita_Regular, color: SECONDARY_COLOR }}
                    />
                    <CustomText
                        children={item?.terminalName}
                        fontSize={FontSize(13)}
                        style={{ fontFamily: FontName.Gordita_Medium }}
                    />
                </View> : <View />}

            {
                activeTab == undefined
                    ?
                    <TouchableOpacity style={{
                        height: moderateVerticalScale(36), width: moderateScale(130), backgroundColor: BLACK,
                        borderRadius: 4,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: moderateScale(5)
                    }}
                        onPress={handleDownload}
                    >
                        {item?.isShowDownloadIcon ?
                            <DownloadIcon style={{ marginEnd: 2, alignItems: 'center', marginHorizontal: 'center', justifyContent: 'center' }} /> : null}

                        <CustomText children={item?.buttonName} style={[styles.cellTextStyle, { color: WHITE, marginStart: 5 }]} fontSize={FontSize(13)} />
                    </TouchableOpacity>
                    : activeTab == 'Requested'
                        ? <View style={styles.startViewStyle}>
                            <CustomText
                                children={item?.bookingStatus}
                                fontSize={FontSize(14)}
                                style={{ alignSelf: 'center', fontFamily: FontName.Gordita_Medium, color: LEAVESTATUSCOLOR }}
                            />
                            <TouchableOpacity
                                onPress={handleDeleteClick}
                                style={{ marginLeft: 5 }}>
                                <DeleteImg />
                            </TouchableOpacity>
                        </View>

                        : activeTab == 'Past Booking'
                            ?
                            <View style={{ backgroundColor: WHITE }}>
                                <CustomButton
                                    title={item.buttonName}
                                    textStyle={{ fontFamily: FontName.Gordita_Medium, fontSize: FontSize(13), color: LIGHT_BLUE }}
                                    onPress={handleActionPress}
                                    style={[styles.buttonPastStyle, { backgroundColor: WHITE }]} />
                            </View>

                            :
                            <View style={styles.savedDraftButtonStyle}>
                                <CustomButton
                                    title={'Continue Booking '}
                                    textStyle={{ fontFamily: FontName.Gordita_Medium, fontSize: FontSize(13) }}
                                    // onPress={handleActionPress}
                                    style={styles.buttonBlueStyle} />
                                <TouchableOpacity
                                    onPress={handleDeleteClick}
                                    style={{ marginLeft: 5 }}>
                                    <DeleteImg />
                                </TouchableOpacity>
                            </View>


            }

        </View >

    );
};


// define your styles
const styles = StyleSheet.create({
    dateSectionStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: hp(5),
        alignContent: 'center',
        marginTop: 10
    },
    columnStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        height: hp(3),
        marginTop: 10,
        marginStart: 5
        // backgroundColor: WHITE

    },
    startViewStyle: {
        alignItems: 'center',
        flexDirection: 'row',

    },
    savedDraftButtonStyle: {
        // marginRight: 10,
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: wp(91)
    },
    buttonStyle: {
        width: wp(30),
        // marginTop: wp(4),
        height: 36,

    },
    buttonBlueStyle: {
        width: wp(40),
        height: 36,
        // color: LIGHT_BLUE,
        // backgroundColor: WHITE
    },
    buttonPastStyle: {
        width: wp(24),
        height: 36,
        color: BLUE
    },
    cellTextStyle: {
        color: BLACK,
        fontFamily: FontName.Gordita_Medium,
        marginStart: 2,
        // marginEnd: 10
    },

});
export default PGAirtportDetailView;

