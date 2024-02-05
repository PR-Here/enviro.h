import { StyleSheet } from 'react-native';
import { BLACK, BUTTON_BACKGROUND, LIGHT_GREY, WHITE } from '../../../theme/Colors';
import { FontName, FontSize } from '../../../theme/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE, // Background color for the bottom sheet
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  datePickerContainer: {
    backgroundColor: WHITE, // Background color for the date picker area
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  buttonStyle: {
    borderRadius: 8,
    backgroundColor: BUTTON_BACKGROUND,
    marginTop: 10,
    fontFamily: FontName.Gorditas_Bold,
    fontSize: FontSize(16),
    alignSelf: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
    height: 42,
  },
  viewStyle: {
    backgroundColor: WHITE,
    marginTop: 5,
    marginEnd: 10,
    marginStart: 10
  },
  textStyle: {
    fontSize: 15,
    fontFamily: FontName.Gordita_Regular,
    padding: 5,
    color: BLACK,
    marginEnd: 20,
    marginStart: 20,
    lineHeight: 20

  },
  verticalLine: {
    borderColor: LIGHT_GREY,
    borderBottomWidth: 0.3,
    marginStart: 5,
    marginEnd: 5,
    marginBottom: 15

  },
});