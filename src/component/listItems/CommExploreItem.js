import { Image, StyleSheet, Text, View } from "react-native";
import CustomText from "../atoms/CustomText";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import CustomButton from "../atoms/CustomButton";
import { BLACK, GREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors";
import AssetsImages from "../../utils/AssetsImages";
import { FontName, FontSize } from "../../theme/Fonts";

function CommExploreItem({ style, title = 'Bird Watchers', location = 'Delhi', members = '584 Members' }) {

    return (
        <View style={[styles.conatiner, style]}>
            <View style={{ width: '20%' }}>
                <Image source={AssetsImages.COMM_PROFILE} style={styles.profileImage} />
            </View>
            <View style={{ width: '80%' }}>
                <View style={styles.headingView}>
                    <CustomText style={styles.heading}>{title}</CustomText>
                    <CustomText style={styles.members}>{members}</CustomText>
                </View>
                <CustomText style={styles.desc}>Do you enjoy Lord of the Rings or Game of thrones? Want to find more such books and connect to others like you? Then this is the place for you.</CustomText>
                <CustomButton style={styles.button} title={'Join'} textStyle={styles.buttonTextStyle} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //width: '100%',
        alignSelf: 'center',
        paddingBottom: heightPercentageToDP(3),
        paddingHorizontal: heightPercentageToDP(1),
        borderRadius: heightPercentageToDP(0.7),
        paddingTop: heightPercentageToDP(1),
        backgroundColor: WHITE,
        borderWidth: 1,
        borderColor: '#D1D1D1'
    },
    headingView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: BLACK,
        width: '25%',
        height: 'auto',
        paddingVertical: heightPercentageToDP(1),
        borderRadius: 4
    },
    heading: {
        fontWeight: '500',
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Medium,
        color: BLACK
    },
    members: {
        fontSize: FontSize(11),
        fontWeight: '400',
        color: '#E49273'
    },
    desc: {
        fontSize: FontSize(12),
        fontWeight: '400',
        flexWrap: 'wrap',
        marginVertical: heightPercentageToDP(1),
        lineHeight: FontSize(17),
        fontFamily: FontName.Gordita_Regular,
        color: BLACK
    },
    profileImage: {
        height: heightPercentageToDP(7.8),
        width: heightPercentageToDP(7.8)
    },
    buttonTextStyle: {
        fontSize: FontSize(13),
        fontWeight: '500',
        fontFamily: FontName.Gordita_Medium,
        color: WHITE
    }
})

export default CommExploreItem