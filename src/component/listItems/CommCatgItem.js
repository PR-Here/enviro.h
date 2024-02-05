import { StyleSheet, Text, View } from "react-native";
import CustomText from "../atoms/CustomText";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { FontName, FontSize } from "../../theme/Fonts";
import { BLACK, PRIMARY_COLOR, WHITE } from "../../theme/Colors";

function CommCatgItem({ style, title = 'Bird Watchers', location = 'Delhi', members = '584 Members' }) {

    return (
        <View style={[styles.conatiner, style]}>
            <View style={styles.subConatiner}>
                <CustomText style={styles.titleStyle}>{title}</CustomText>
                <CustomText style={styles.locationTextStyle}>{location}</CustomText>
            </View>
            <CustomText style={styles.membersTextStyle}>{members}</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#F4F4F4',
        padding: heightPercentageToDP(2),
        borderRadius: heightPercentageToDP(0.7),
        borderWidth: 1,
        borderColor: '#D1D1D1'
    },
    subConatiner: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: FontSize(14),
        fontWeight: '500',
        fontFamily: FontName.Gordita_Medium,
        color: BLACK
    },
    locationTextStyle: {
        fontSize: FontSize(14),
        fontWeight: '400',
        marginLeft: 10,
        fontFamily: FontName.Gordita_Regular,
        color: BLACK
    },
    membersTextStyle: {
        fontSize: FontSize(11),
        fontWeight: '400',
        color: '#E49273'
    }
})

export default CommCatgItem