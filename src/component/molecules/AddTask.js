import { StyleSheet, Text, View } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import Plus from '../../../assets/images/SVG/plus.svg'
import { BLACK, GREY, LIGHTGREY, WHITE } from '../../theme/Colors'
import { FontName, FontSize } from '../../theme/Fonts'

const AddTask= ({label})=> {
    return(
        <View style= {styles.conatiner}>
            <Text style= {styles.text}>{label}</Text>
            <Plus height={18} width={18}/>
        </View>
    )
}

export default AddTask

const styles= StyleSheet.create({
    conatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: heightPercentageToDP(2),
        borderBottomWidth: 1,
        borderBottomColor: LIGHTGREY,
        backgroundColor: WHITE
    },
    text: {
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '500',
        fontSize: FontSize(13),
        color: GREY,
    },
    addIcon: {
        tintColor: BLACK,
        height:heightPercentageToDP(2),
        width: heightPercentageToDP(2)
    }
})