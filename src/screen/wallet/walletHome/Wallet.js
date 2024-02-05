//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import CustomText from '../../../component/atoms/CustomText';
import { BACKGROUND_COLOR_LEAVE, BLACK, BLUE, GREEN, GREY, RED, WHITE } from '../../../theme/Colors';
import { FontName, FontSize } from '../../../theme/Fonts';
import Header from '../../../component/header/Header';
import AppString from '../../../utils/AppString';
import Ruppes from '../../../../assets/images/SVG/WalletIcons/rupee.svg'
import WalletIcon from '../../../../assets/images/SVG/PlanGo/wallet.svg'
import Contact from '../../../../assets/images/SVG/WalletIcons/contact.svg'
import QRCode from '../../../../assets/images/SVG/WalletIcons/qr_code.svg'
import History from '../../../../assets/images/SVG/WalletIcons/history.svg'
import PaidRupee from '../../../../assets/images/SVG/WalletIcons/paidrupee.svg'
import Invoice from '../../../../assets/images/SVG/WalletIcons/invoice.svg'
import Upload from '../../../../assets/images/SVG/WalletIcons/upload.svg'
import NavString from '../../../utils/NavString';

const Wallet = ({ navigation }) => {
    // const navigation = useNavigation(); 

    const horizontalData = [
        {
            id: 1,
            title: 'To Mobile or Contact',
            image: <Contact />
        },
        {
            id: 2,
            title: 'Scan & Pay',
            image: <QRCode />,
        },
        {
            id: 3,
            title: 'History',
            image: <History />,
        },
    ]

    const RecentPaymentData = [
        {
            id: 1,
            title: 'Paid to McDonald’s',
            time: '08:39 AM',
            amount: '1400',
            leftAmount: 'Balance left : 100',
            status: 'Approved',
            image: <Contact />
        },
        {
            id: 2,
            title: 'Paid to McDonald’s',
            time: '08:39 AM',
            amount: '1400',
            leftAmount: 'Balance left : 100',
            status: 'Not Uploaded',
            image: <QRCode />,
        },
        {
            id: 3,
            title: 'Paid to McDonald’s',
            time: '08:39 AM',
            amount: '1400',
            leftAmount: 'Balance left : 100',
            status: 'Not Approved',
            image: <History />,
        },
    ]

    const handleStackNavigation = (Id) => {
        if (Id == 1) {
            navigation.navigate(NavString.RECENT_PAYMENT)
        } else if (Id == 2) {
            navigation.navigate(NavString.PAYMENT_SCREEN)
        } else {
            navigation.navigate(NavString.WALLETHISTORY)
        }
    }

    const renderItemHorizontal = ({ item }) => {
        return <TouchableOpacity activeOpacity={0.7} key={item?.id} style={[styles.horizontalItem,
        { backgroundColor: BLACK }]}
            onPress={() => { handleStackNavigation(item?.id) }}>
            {item?.image}
            <CustomText style={[styles.horizontalTitle]} children={item?.title} />
        </TouchableOpacity>
    };

    const renderItemPayment = (recentItem) => {
        return (
            <View style={{
                marginTop: moderateScale(5), backgroundColor: WHITE, height: moderateScale(112),
                marginHorizontal: moderateScale(10),
                borderRadius: 8, marginBottom: moderateScale(5)
            }}>
                <View style={{ marginTop: moderateScale(10), flexDirection: 'row' }}>
                    <PaidRupee width={60} height={60} style={{ marginStart: 4, marginEnd: 4 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: moderateScale(10), marginTop: moderateScale(5) }}>
                        <View>
                            <CustomText children={recentItem?.item?.title} style={styles.cellTextStyle} fontSize={FontSize(14)} />
                            <CustomText children={recentItem?.item?.time} style={[styles.cellTextTimeStyle, { marginTop: 8 }]} fontSize={FontSize(12)} />
                        </View>
                        <View>
                            <View style={styles.cellSubInnerView}>
                                <Ruppes width={20} height={20} style={{ marginTop: 1, alignItems: 'center', marginHorizontal: 'center', justifyContent: 'center' }} />
                                <CustomText children={recentItem?.item?.amount} style={styles.cellTextAmountStyle} fontSize={FontSize(14)} />
                            </View>
                            <CustomText children={recentItem?.item?.leftAmount} style={[styles.cellTextTimeStyle, { marginTop: 8 }]} fontSize={FontSize(12)} />
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: moderateScale(11), marginTop: 8 }}>
                    <View style={{ flexDirection: 'row', marginLeft: moderateScale(10), marginTop: moderateScale(8) }}>
                        <Invoice width={20} height={20} style={{ marginTop: 0, alignItems: 'center', marginHorizontal: 'center', justifyContent: 'center' }} />
                        <CustomText children={"Invoice : "} style={[styles.cellTextStyle, { marginStart: 5 }]} fontSize={FontSize(14)} />
                        {recentItem?.item?.status == "Approved" ? <CustomText children={recentItem?.item?.status} style={[styles.cellTextStyle, { color: GREEN }]} fontSize={FontSize(14)} />
                            : recentItem?.item?.status == "Not Approved" ? <CustomText children={recentItem?.item?.status} style={[styles.cellTextStyle, { color: RED }]} fontSize={FontSize(14)} />
                                : <CustomText children={recentItem?.item?.status} style={[styles.cellTextStyle, { color: BLUE }]} fontSize={FontSize(14)} />
                        }
                    </View>
                    {recentItem?.item?.status == "Approved" ? <View /> :
                        <TouchableOpacity style={{
                            height: moderateVerticalScale(36), width: moderateScale(119), backgroundColor: BLACK,
                            borderRadius: 4,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: moderateScale(5)
                        }}>
                            <Upload width={20} height={20} style={{ marginTop: 0, alignItems: 'center', marginHorizontal: 'center', justifyContent: 'center' }} />
                            <CustomText children={"Upload"} style={[styles.cellTextStyle, { color: WHITE, marginStart: 5 }]} fontSize={FontSize(13)} />
                        </TouchableOpacity>}
                </View>

            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header title={AppString.WALLET} />
            <View style={styles.subView}>
                <WalletIcon style={{ marginStart: 15 }} />
                <View style={{ marginHorizontal: moderateScale(10) }}>
                    <CustomText children={"Total Wallet Balance"} style={styles.textStyle} fontSize={FontSize(16)} />
                    <Text style={styles.textStyle}></Text>
                    <View style={styles.subInnerView}>
                        <Ruppes width={20} height={20} style={{ marginTop: 6, alignItems: 'center', marginHorizontal: 'center', justifyContent: 'center' }} />
                        <CustomText children={"1500"} style={styles.textStyle} fontSize={FontSize(20)} />
                    </View>
                </View>
            </View>

            <View>
                <FlatList
                    style={styles.horizontalFlatlist}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={horizontalData}
                    renderItem={renderItemHorizontal}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <CustomText children={"Recent Payment"} style={[styles.textStyle, {
                marginStart: 15,
                marginTop: heightPercentageToDP(2)
            }]} fontSize={FontSize(20)} />
            <FlatList
                vertical
                showsHorizontalScrollIndicator={false}
                data={RecentPaymentData}
                renderItem={renderItemPayment}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};



// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR_LEAVE,
    },
    childView: {

    },
    subView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    subInnerView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: -15
    },
    horizontalFlatlist: {
        marginTop: heightPercentageToDP(2),
        marginHorizontal: heightPercentageToDP(2)
    },
    horizontalItem: {
        borderWidth: 1,
        borderColor: GREY,
        borderRadius: heightPercentageToDP(1),
        width: widthPercentageToDP(28.5),
        alignItems: 'center',
        justifyContent: 'center',
        padding: heightPercentageToDP(4),
        marginEnd: widthPercentageToDP(3),
        height: moderateVerticalScale(140)
    },
    horizontalTitle: {
        width: widthPercentageToDP(25),
        fontSize: FontSize(12),
        color: WHITE,
        marginTop: heightPercentageToDP(2),
        textAlign: 'center',
        fontFamily: FontName.Gordita_Medium,
        fontWeight: '500',
        lineHeight: 18
    },
    textStyle: {
        color: BLACK,
        fontFamily: FontName.Gordita_Medium,
        fontWeight: '500',
        marginStart: 2,

    },
    cellTextStyle: {
        color: BLACK,
        fontFamily: FontName.Gordita_Medium,
        fontWeight: '500',
        marginStart: 2,
    },
    cellTextTimeStyle: {
        color: GREY,
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '400',
        marginStart: 2,
    },
    cellTextAmountStyle: {
        color: GREY,
        fontFamily: FontName.Gordita_Medium,
        fontWeight: '400',
        marginStart: 2,
    },
    cellSubInnerView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 0
    },
});

//make this component available to the app
export default Wallet;
