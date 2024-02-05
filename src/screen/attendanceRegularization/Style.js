import {
    StyleSheet
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { INACTIVE_COLOR, PRIMARY_COLOR } from '../../theme/Colors';
import { FontName, FontSize } from '../../theme/Fonts';



export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFCFD',
        flex: 1,
    },
    
    tabBarContainer: {
        flexDirection: 'row',
        paddingHorizontal: hp(1),
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomColor: '#DEDEDE',
        borderBottomWidth: 1
      },
    
      tabButton: {
        paddingVertical: hp(1),
        height: hp(6),
        justifyContent: 'center',
        borderRadius: hp(0.5),
        marginLeft: hp(1),
      },
      activeTab: {
        borderBottomColor: PRIMARY_COLOR,
        borderBottomWidth: 2
      },
      activeTextColor: {
        color: PRIMARY_COLOR,
      },
      tabText: {
        color: 'black',
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Regular
      },
      content: {
        fontSize: FontSize(15),
        textAlign: 'center',
        marginTop: hp(2),
      },
      InactiveTextColor: {
        color: INACTIVE_COLOR,
      },
      activetabText: {
        color: 'black',
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Medium
      }

})