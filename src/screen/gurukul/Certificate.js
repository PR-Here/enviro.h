
import React from "react"
import { StyleSheet, View, Image } from "react-native"
import MeetingHomeHeader from "../../component/header/MeetingHeader"
import { BLACK, PRIMARY_COLOR, WHITE } from "../../theme/Colors"
import { heightPercentageToDP } from "react-native-responsive-screen"
import { FontName } from "../../theme/Fonts"
import CustomButton from "../../component/atoms/CustomButton"
import AssetsImages from "../../utils/AssetsImages"

const Certificate = () => {
    return (
        <View style={styles.container}>

            <MeetingHomeHeader
                headerText={'Certificate'}
                filter={true}
            />

            <View style={{ alignItems: 'center', flex: 1, marginTop: 10 }}>
                <Image source={AssetsImages.CERTIFICATE} style={{ height: 300, width: '100%' }} />
            </View>


            <View style={{ marginHorizontal: 16 }}>
                <CustomButton title={'Certificate download'}
                    textStyle={styles.buttonStyle}
                    style={styles.submitButtonStyle}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default Certificate

