//import liraries
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { FontName, FontSize } from '../../../theme/Fonts';
import { TextInput } from 'react-native-paper';
import { BLACK, GREY, WHITE } from '../../../theme/Colors';
import Header from '../../../component/header/Header';
import AppString from '../../../utils/AppString';
import CustomText from '../../../component/atoms/CustomText';
import Search from '../../../../assets/images/SVG/search.svg';
import Car from '../../../../assets/images/SVG/WalletIcons/car.svg'
import { SvgFromUri } from 'react-native-svg';

export const MobileData = [
    {
        id: 1,
        title: 'Car',
        image: <Car width={60} height={60} />,
    },
    {
        id: 2,
        title: 'McDonald’s',
        image: <Car width={60} height={60} />
    },
]
// create a component
const RecentPayment = () => {
    return (
        <View style={styles.container}>
            <Header title={AppString.TO_MOBILE_OR_CONTACT} style={{ fontFamily: FontName.Gordita_Medium }} />
            <CustomText children={"Enter New Mobile Number"} style={[styles.cellTextStyle, { marginHorizontal: moderateScale(15) }]} fontSize={FontSize(14)} />
            <View style={styles.Searchcontainer}>
                <View style={[styles.searchBar, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: WHITE }]}>
                    <TextInput
                        style={{
                            marginRight: moderateScale(8), fontFamily: FontName.Gordita_Regular,
                            fontSize: 15,
                            fontWeight: '500',
                            backgroundColor: 'rgba(0,0,0,0)',
                            flex: 1,
                        }}
                        activeUnderlineColor='transparent'
                        placeholder="Search"
                        underlineColor="transparent"
                        placeholderTextColor={GREY}
                    />
                    <View style={{
                        height: moderateScale(25),
                        width: moderateScale(25), borderRadius: 12.5,
                        backgroundColor: '#D9D9D9',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Search width={30} height={30} />
                    </View>
                </View>
            </View>
            <View style={{}}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={MobileData}
                    renderItem={recentPaymentComponet}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
};

const recentPaymentComponet = (recentItem) => {
    //console.log(recentItem?.item?.image)
    return (
        <View style={{
            marginTop: moderateScale(12),
            alignItems: 'center', justifyContent: 'center', flex: 1, paddingStart: 10, paddingEnd: 10
        }}>
            {/* <SvgFromUri
        width={60} height={60}
        uri={recentItem?.item?.image}
      />*/}

            <Car width={60} height={60} />
            <Text style={{ color: BLACK, marginTop: moderateScale(10), marginLeft: moderateScale(0), textAlign: 'center' }}>{recentItem?.item?.title}</Text>
        </View>
    );

}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    cellTextStyle: {
        color: BLACK,
        fontFamily: FontName.Gordita_Medium,
        fontWeight: '500',
    },
});

//make this component available to the app
export default RecentPayment;
