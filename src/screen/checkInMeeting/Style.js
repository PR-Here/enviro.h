import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FontSize} from '../../theme/Fonts';
import {GREEN, WHITE} from '../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  calloutContainer: {
    position: 'absolute',
    bottom: 0,
    height: heightPercentageToDP(7),
    width: widthPercentageToDP(100),
  },
  timeText: {
    fontSize: FontSize(14),
    textAlign: 'center',
    color: WHITE,
  },
  checkInButton: {
    backgroundColor: GREEN,
    padding: heightPercentageToDP(1),
    height: heightPercentageToDP(7),
    width: widthPercentageToDP(100),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 100,
  },
  timerStyle: {
    marginBottom: heightPercentageToDP(1),
  },
});
