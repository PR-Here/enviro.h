import { StyleSheet, View } from "react-native"
import { BLACK, WHITE } from "../../theme/Colors"
import ConnectionLostIcon from '../../../assets/images/SVG/connection-lost.svg'
import CustomButton from "../atoms/CustomButton"
import CustomText from "../atoms/CustomText"
import { FontName, FontSize } from "../../theme/Fonts"
import { heightPercentageToDP } from "react-native-responsive-screen"


function ConnectionLost() {
    return (
        <View style={styles.container}>
            <ConnectionLostIcon />
            <CustomText style={styles.title}>
                Connection Lost
            </CustomText>
            <CustomText style={styles.subTitle}>
                Please check your internet connection
            </CustomText>
            <CustomButton title={'Check Connection'} style={styles.button} textStyle={styles.buttonText} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        borderRadius: 4,
        position: 'absolute',
        bottom: '5%'
    },
    buttonText: {
        fontWeight: '500',
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(18),
        lineHeight: 25.65,
        color: WHITE
    },
    title: {
        fontFamily: FontName.Gorditas_Bold,
        fontWeight: '700',
        fontSize: FontSize(24),
        lineHeight: 34.2,
        color: BLACK,
        letterSpacing: 0.51,
        marginTop: heightPercentageToDP(5)
    },
    subTitle: {
        fontFamily: FontName.Gordita_Regular,
        fontSize: FontSize(16),
        fontWeight: '100',
        lineHeight: 22.8,
        color: BLACK,
        width: '70%',
        textAlign: 'center',
        letterSpacing: 0.51,
        marginTop: heightPercentageToDP(3)
    },
    verticalSpace: {
        marginVertical: heightPercentageToDP(5)
    }
})


export default ConnectionLost