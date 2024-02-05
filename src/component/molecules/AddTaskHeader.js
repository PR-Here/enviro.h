import { View, Text, StyleSheet } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { BLACK, EXTRA_LIGHT_GREY, GREY, LIGHTGREY, WHITE } from '../../theme/Colors'
import ShareButton from '../atoms/ShareButton'
import { FontName, FontSize } from '../../theme/Fonts'

const AddTaskHeader= ()=> {
    return(
        <View style= {styles.conatiner}>
            <ShareButton />
            <Text style= {styles.text}>Add To Task Manager</Text>
        </View>
    )
}

export default AddTaskHeader

const styles= StyleSheet.create({
    conatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: heightPercentageToDP(1),
        borderBottomWidth: 1,
        borderBottomColor: LIGHTGREY
    },
    text: {
        fontFamily: FontName.Gordita_Medium,
        fontWeight: '500',
        fontSize: FontSize(12),
        lineHeight: FontSize(22),
        color: BLACK,
    }
})