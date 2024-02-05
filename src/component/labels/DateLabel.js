import { Image, StyleSheet, View } from "react-native";
import CustomText from "../atoms/CustomText";
import { FontName, FontSize } from "../../theme/Fonts";
import { BLACK, GREY, LIGHTGREY, WHITE } from "../../theme/Colors";
import { heightPercentageToDP } from "react-native-responsive-screen";
import moment from "moment";
import CalendarIcon from '../../../assets/images/SVG/calendar-new.svg'

function DateLabel({ date, containerStyle }) {
    return (
        <View style={[styles.container, containerStyle]}>
            <CalendarIcon style={{ color: BLACK }} />
            <CustomText style={styles.dateFont}>{moment(date).format('ll')}</CustomText>
        </View>
    )
}

export default DateLabel

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
        lineHeight: 19.95
    },
    icon: {
        height: heightPercentageToDP(1.4),
        width: heightPercentageToDP(1.4),
    }
})