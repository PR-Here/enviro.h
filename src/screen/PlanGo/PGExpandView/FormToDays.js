import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontName, FontSize } from '../../../theme/Fonts';
import CustomText from '../../../component/atoms/CustomText';
import { SECONDARY_COLOR } from '../../../theme/Colors';
const FormToDays = ({ item }) => {

    return (
        <View style={styles.dateSectionStyle}>

            <View style={styles.columnStyle}>
                <CustomText
                    children={'From'}
                    fontSize={FontSize(10)}
                    style={{ alignSelf: 'flex-start', fontFamily: FontName.Gordita_Regular, color: SECONDARY_COLOR }}
                />
                <CustomText
                    children={item?.startDate}
                    fontSize={FontSize(12)}
                    style={{ alignSelf: 'flex-start', fontFamily: FontName.Gordita_Medium }}
                />
            </View>

            <View style={[styles.columnStyle, styles.columnStyleMargin]}>
                <CustomText
                    children={'To'}
                    fontSize={FontSize(10)}
                    style={{ alignSelf: 'flex-start', fontFamily: FontName.Gordita_Regular, color: SECONDARY_COLOR }}
                />
                <CustomText
                    children={item?.endDate}
                    fontSize={FontSize(12)}
                    style={{ alignSelf: 'flex-start', fontFamily: FontName.Gordita_Medium }}
                />
            </View>

            <View style={[styles.columnStyle, styles.columnStyleMarginDays]}>
                <CustomText
                    children={'Days'}
                    fontSize={FontSize(10)}
                    style={{ alignSelf: 'flex-start', fontFamily: FontName.Gordita_Regular, color: SECONDARY_COLOR }}
                />
                <CustomText
                    children={item?.numberOfDays}
                    fontSize={FontSize(12)}
                    style={{ alignSelf: 'flex-start', fontFamily: FontName.Gordita_Medium }}
                />
            </View>
        </View >

    );
};


// define your styles
const styles = StyleSheet.create({
    dateSectionStyle: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15
    },
    columnStyle: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 10,
    },
    columnStyleMargin: {
        paddingHorizontal: 50,
    },
    columnStyleMarginDays: {
        marginHorizontal: 0,
        paddingLeft: 30,
    },
});
export default FormToDays;

