import {StyleSheet} from 'react-native';
import {BLACK, LIGHTGREY, WHITE} from '../../theme/Colors';
import FontSizes from '../../theme/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    justifyContent: 'center',
  },
  viewStyle: {
    flex: 1,
    margin: 1,
    backgroundColor: LIGHTGREY,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  imageThumbnail: {
    width: 60,
    height: 60,
  },
});
