import { Image, StyleSheet, View } from "react-native";
import AssetsImages from "../../utils/AssetsImages";
import CustomText from "../atoms/CustomText";
import { FontName, FontSize } from "../../theme/Fonts";
import { BLACK, GREY, LIGHTGREY, WHITE } from "../../theme/Colors";
import { heightPercentageToDP } from "react-native-responsive-screen";
import MapPin from '../../../assets/images/SVG/map-pin.svg'

function LocationLabel({ location = 'AGL Building-1, Grou, Gurugram', containerStyle }) {
    return (
        <View style={[styles.container, containerStyle]}>
            <MapPin style={styles.icon} />
            <CustomText style={styles.dateFont}>{location}</CustomText>
        </View>
    )
}

export default LocationLabel

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto'
    },
    dateFont: {
        fontFamily: FontName.Gordita_Medium,
        fontWeight: '400',
        fontSize: FontSize(14),
        marginLeft: heightPercentageToDP(1),
        lineHeight: 19.95,
        color: '#373737'
    },
    icon: {
        color: BLACK
    }
})