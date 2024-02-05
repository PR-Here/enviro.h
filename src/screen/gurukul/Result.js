
import React from "react"
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, Text } from "react-native"
import MeetingHomeHeader from "../../component/header/MeetingHeader"
import { BLACK, GREY, PRIMARY_COLOR, TEXT_COLOR_GREY, WHITE } from "../../theme/Colors"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"
import HelpCircle from '../../../assets/images/SVG/help-circle.svg';
import ClockIcon from '../../../assets/images/SVG/clock.svg';
import RightArrow from '../../../assets/images/SVG/rightarrow-white.svg';
import Congratulations from '../../../assets/images/SVG/congratulations.svg';
import CustomText from "../../component/atoms/CustomText"
import { FontName } from "../../theme/Fonts"
import NavString from "../../utils/NavString"
import AssetsImages from "../../utils/AssetsImages"
import AppString from "../../utils/AppString"
import CustomButton from "../../component/atoms/CustomButton"

const Result = ({ navigation }) => {

    return (
        <View style={styles.container}>

            <MeetingHomeHeader
                headerText={'Result'}
                filter={true}
            />

            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>
                <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
                    <Congratulations />
                    <CustomText children={'Congratulations'} style={{ fontSize: 24, fontWeight: '700', fontFamily: FontName.Gordita_Medium, marginTop: 30 }} />
                    <CustomText children={'Your Score'} style={{ fontSize: 14, fontWeight: '400', fontFamily: FontName.Gordita_Regular, marginTop: 20 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CustomText children={' 1 '} style={{ fontSize: 30, fontWeight: '700', fontFamily: FontName.Gordita_Medium, marginTop: 20, color: '#E49273' }} />
                        <CustomText children={'/ 4'} style={{ fontSize: 16, fontWeight: '400', fontFamily: FontName.Gordita_Regular, marginTop: 20, color: '#E49273' }} />
                    </View>
                    <CustomText children={'Your did a great job, Learn more by taking another quiz'} style={{ fontSize: 14, fontWeight: '400', fontFamily: FontName.Gordita_Regular, marginTop: 20, color: '#8F8F8F', textAlign: 'center', lineHeight: 24 }} />
                </View>

                <View style={{ marginHorizontal: 16 }}>
                    <CustomButton title={'View solution'}
                        onPress={() => navigation.navigate(NavString.ALL_SOLUTION)}
                        textStyle={styles.buttonStyle}
                        style={styles.submitButtonStyle}
                    />

                    <CustomButton title={'Re-attempt'}
                        onPress={() => navigation.navigate(NavString.MARKETING_LEADERSHIP)}
                        textStyle={[styles.buttonStyle, { color: BLACK }]}
                        style={styles.cancelButtonStyle}
                    />

                    <CustomButton title={'Certificate download'}
                        onPress={() => navigation.navigate(NavString.CERTIFICATE)}
                        textStyle={[styles.buttonStyle, { color: BLACK }]}
                        style={styles.cancelButtonStyle}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        backgroundColor: '#FAFCFD',
    },
    buttonStyle: {
        fontSize: 14, fontWeight: 'bold',
        fontFamily: FontName.Gorditas_Bold,
        color: WHITE

    },
    submitButtonStyle: {
        alignSelf: 'center',
        marginTop: heightPercentageToDP(4), paddingLeft: 20,
        paddingRight: 20, borderRadius: 5, width: '100%',
    },
    cancelButtonStyle: {
        alignSelf: 'center',
        marginTop: heightPercentageToDP(2),
        borderColor: PRIMARY_COLOR,
        backgroundColor: WHITE,
        paddingLeft: 20,
        paddingRight: 20, borderRadius: 5, width: '100%',
        borderColor: BLACK, borderWidth: 2
    },
})

export default Result

