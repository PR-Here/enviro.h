import { View, StyleSheet, Image, Text } from 'react-native'
import AssetsImages from '../../utils/AssetsImages'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { BLACK, LIGHTGREY, WHITE } from '../../theme/Colors'
import { FontName, FontSize } from '../../theme/Fonts'

const ShareButton= ({label = 'Share Actionables'})=> {
    return(
        <View style= {styles.container}>
            <Image source={AssetsImages.SHARE} style= {styles.share}/>
            <Text style= {styles.label}>{label}</Text>
        </View>
    )
}

export default ShareButton

const styles= StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: heightPercentageToDP(0.2),
        borderWidth: 1,
        backgroundColor:WHITE,
        borderColor: LIGHTGREY,
        padding: heightPercentageToDP(1)
    },
    label: {
        fontFamily: FontName.Gordita_Medium,
        fontWeight: '500',
        fontSize: FontSize(12),
        lineHeight: FontSize(22),
        color: BLACK,
        marginLeft: heightPercentageToDP(1)
    },
    share: {
        height: heightPercentageToDP(1.4),
        width: heightPercentageToDP(1.4),
        tintColor: BLACK
    }
})