import {heightPercentageToDP} from 'react-native-responsive-screen';
import {WHITE} from '../../theme/Colors';
import {FontSize} from '../../theme/Fonts';

const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  registerText: {
    fontSize: FontSize(30),
    alignSelf: 'center',
    marginTop: heightPercentageToDP(6),
  },
  textInputView: {
    marginTop: heightPercentageToDP(3),
  },
  BackButtonView: {
    position: 'absolute',
    bottom: heightPercentageToDP(5),
    alignSelf: 'center',
  },
});
