//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Header from '../../../component/header/Header';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { TextInput } from 'react-native-paper';
import CustomText from '../../../component/atoms/CustomText';
import { BACKGROUND_COLOR_DASHBOARD, BLACK, BLUE, GREEN, GREY, LIGHTGREY, PRIMARY_COLOR, RED, WHITE } from '../../../theme/Colors';
import { FontName, FontSize } from '../../../theme/Fonts';
import Ruppes from '../../../../assets/images/SVG/WalletIcons/rupee.svg'
import WalletIcon from '../../../../assets/images/SVG/WalletIcons/wallet.svg'
import Contact from '../../../../assets/images/SVG/WalletIcons/contact.svg'
import QRCode from '../../../../assets/images/SVG/WalletIcons/qr_code.svg'
import History from '../../../../assets/images/SVG/WalletIcons/history.svg'
import PaidRupee from '../../../../assets/images/SVG/WalletIcons/paidrupee.svg'
import Invoice from '../../../../assets/images/SVG/WalletIcons/invoice.svg'
import Upload from '../../../../assets/images/SVG/WalletIcons/upload.svg'
import AppString from '../../../utils/AppString';
import FilterImage from '../../../../assets/images/SVG/filter.svg'
import Search from '../../../../assets/images/SVG/search.svg';
import { ShowToast } from '../../../utils/Constant';
import FilterHistory from '../historyFilter/FilterHistory';

// create a component
const WalletHistory = () => {
    const [isFilterSheetVisible, setIsFilterSheettVisible] = useState(false);
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

    const renderItemPayment = (recentItem) => {
        return (
            <View style={{
                marginTop: moderateScale(5), backgroundColor: WHITE, height: moderateScale(112),
                marginHorizontal: moderateScale(10),
                borderRadius: 8, marginBottom: moderateScale(5)
            }}>
                <View style={{ marginTop: moderateScale(10), flexDirection: 'row' }}>
                    <PaidRupee width={60} height={60} style={{ marginStart: 4, marginEnd: 4 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: moderateScale(10) }}>
                        <View>
                            <CustomText children={recentItem?.item?.title} style={styles.cellTextStyle} fontSize={FontSize(14)} />
                            <CustomText children={recentItem?.item?.time} style={[styles.cellTextTimeStyle, { marginTop: 8 }]} fontSize={FontSize(12)} />
                        </View>
                        <View>
                            <View style={styles.cellSubInnerView}>
                                <Ruppes width={20} height={20} style={{ marginTop: 3, alignItems: 'center', marginHorizontal: 'center', justifyContent: 'center' }} />
                                <CustomText children={recentItem?.item?.amount} style={styles.cellTextAmountStyle} fontSize={FontSize(14)} />
                            </View>
                            <CustomText children={recentItem?.item?.leftAmount} style={[styles.cellTextTimeStyle, { marginTop: 8 }]} fontSize={FontSize(12)} />
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: moderateScale(11) }}>
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

    const handleFilter = () => {
        setIsFilterSheettVisible(true);
    }

    const handleBottomNavigationPopup = () => {
        setIsFilterSheettVisible(false);
    }

    return (
        <View style={styles.container}>
            <Header title={AppString.HISTORY} />
            <View style={{
                backgroundColor: WHITE, marginHorizontal: moderateScale(14), height: moderateScale(57),
                justifyContent: 'center',
                borderRadius: 8
            }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: moderateScale(15) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <WalletIcon width={30} height={30} style={{ marginEnd: 10 }} />
                        <Text style={{ color: BLACK, fontSize: 16, fontFamily: FontName.Gordita_Medium, fontWeight: '500' }}>Total Wallet Balance</Text>
                    </View>
                    <View style={[styles.subInnerView, { marginTop: -3 }]}>
                        <Ruppes width={20} height={20} style={{ marginTop: 2, alignItems: 'center', marginHorizontal: 'center', justifyContent: 'center' }} />
                        <CustomText children={"1500"} style={[styles.textStyle, { fontFamily: FontName.Gordita_Medium, fontWeight: '500' }]} fontSize={FontSize(16)} />
                    </View>
                </View>
            </View>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: moderateScale(15),
                marginTop: moderateScale(25),
                alignItems: 'center'

            }}>
                <Text style={{ color: BLACK, fontFamily: FontName.Gordita_Medium, fontSize: 20 }}>Recent Bookings</Text>
                <TouchableOpacity onPress={() => { handleFilter() }}>
                    <FilterImage width={24} height={24} style={{ marginEnd: 1 }} />
                </TouchableOpacity>
                {isFilterSheetVisible ? (<FilterHistory showFilterVisible={isFilterSheetVisible} handleBottomNavigationPopup={handleBottomNavigationPopup} />) : null}
            </View>

            <View style={styles.Searchcontainer}>
                <View style={[styles.searchBar, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: WHITE, }]}>
                    <TextInput
                        style={{
                            marginRight: moderateScale(8), fontFamily: FontName.Gordita_Regular,
                            fontSize: 15,
                            fontWeight: '500',
                            backgroundColor: 'rgba(0,0,0,0)',
                            flex: 1,
                        }}
                        activeUnderlineColor='transparent'
                        // underlineColorAndroid='transparent'
                        placeholder="Search"
                        underlineColor="transparent"
                        placeholderTextColor={LIGHTGREY}
                    />
                    <View style={{
                        height: moderateScale(25),
                        width: moderateScale(25), borderRadius: 12.5,
                        backgroundColor: '#D9D9D9',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Search width={30} height={30} />
                    </View>
                </View>

            </View>
            <FlatList
                vertical
                showsHorizontalScrollIndicator={false}
                data={RecentPaymentData}
                renderItem={renderItemPayment}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: 10 }}
            />
        </View >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR_DASHBOARD
    },
    searchBar: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    Searchcontainer: {
        // flex: 1,
        padding: 10,
        height: moderateScale(45)
    },
    subInnerView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: -15
    },
    cellTextAmountStyle: {
        color: PRIMARY_COLOR,
        fontFamily: FontName.Gorditas_Bold,
        fontWeight: '400',
        marginStart: 2,
    },
    cellSubInnerView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 0
    }, cellTextTimeStyle: {
        color: GREY,
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '400',
        marginStart: 2,
    },
    cellTextStyle: {
        color: BLACK,
        fontFamily: FontName.Gordita_Medium,
        fontWeight: '500',
        marginStart: 2,
    },
});

export default WalletHistory;
