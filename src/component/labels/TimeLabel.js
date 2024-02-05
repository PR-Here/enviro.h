import { Image, StyleSheet, View } from "react-native";
import AssetsImages from "../../utils/AssetsImages";
import CustomText from "../atoms/CustomText";
import { FontName, FontSize } from "../../theme/Fonts";
import { BLACK, GREY, LIGHTGREY, WHITE } from "../../theme/Colors";
import { heightPercentageToDP } from "react-native-responsive-screen";
import TimeIcon from '../../../assets/images/SVG/clock_event.svg'

function TimeLabel({ startTime = '05:30', endTime = '00:00 PM', containerStyle }) {
    return (
        <View style={[styles.container, containerStyle]}>
            <TimeIcon preserveAspectRatio="none" style={styles.icon} />
            <CustomText style={styles.dateFont} >{`${startTime} - ${endTime}`}</CustomText>
        </View>
    )
}

export default TimeLabel

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
        color: '#373737',
        marginLeft: heightPercentageToDP(1),
        lineHeight: 19.95,
    },
    icon: {
        color: BLACK
    }
})