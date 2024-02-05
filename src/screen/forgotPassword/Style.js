import {StyleSheet} from 'react-native';
import {WHITE} from '../../theme/Colors';
import { FontSize } from '../../theme/Fonts';
import { heightPercentageToDP, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  forgotPassText:{
    fontSize:FontSize(30),
    alignSelf:'center',
    marginTop:hp(10)
  },
  textInput:{
    marginTop:heightPercentageToDP(10)
  },
  textInputView:{},
  BackButtonView:{
    position:'absolute',
    bottom:hp(5),
    alignSelf:'center'
  }
});
