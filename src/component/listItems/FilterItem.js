import { StyleSheet, View } from "react-native";
import { FontName, FontSize } from "../../theme/Fonts";
import CustomText from "../atoms/CustomText";
import { BUTTON_BACKGROUND, LIGHTGREY, WHITE } from "../../theme/Colors";
import { capitalizeFirstLetter } from "../../utils/Constant";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const FilterItem = ({
    containerStyle, textStyle, text, fromTime = "", toTime = "" }) => {
    return (
        <View style={[styles.container, containerStyle]} >
            <CustomText style={[styles.text, textStyle]} children={text} />
            {fromTime == "" && toTime == "" ? null : <CustomText children={fromTime + ' To ' + toTime} style={styles.timeStyle} />}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        minWidth: wp(20),
        minHeight: wp(8),
        backgroundColor: BUTTON_BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(1),
        borderWidth: wp(0.2)
    },
    text: {
        fontFamily: FontName.Geo_Auto_Regular,
        fontSize: FontSize(14),
        color: WHITE,
    },
    timeStyle: {
        fontFamily: FontName.Geo_Auto_Regular,
        fontSize: FontSize(10),
        color: LIGHTGREY,
        marginTop: wp(0.4)
    }
})

export default FilterItem