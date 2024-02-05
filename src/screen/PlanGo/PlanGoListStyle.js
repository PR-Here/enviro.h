import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR_SETTING } from '../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    marginStart: 5,
    marginEnd: 10,
    backgroundColor: BACKGROUND_COLOR_SETTING
  },
  endViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
