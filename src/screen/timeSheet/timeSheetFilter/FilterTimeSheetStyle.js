import { StyleSheet } from 'react-native';
import { BLACK, BUTTON_BACKGROUND, GREY, LIGHT_GREY, WHITE } from '../../../theme/Colors';
import { FontName, FontSize } from '../../../theme/Fonts';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {

    backgroundColor: WHITE, // Background color for the bottom sheet
  },
  title: {
    fontSize: 20,
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
    margin: 8,
    borderColor: GREY,
    borderWidth: 1,
    padding: 1,
    borderRadius: 8
  },
  viewSelectStyle: {
    backgroundColor: BLACK,
    margin: 8,
    borderColor: GREY,
    borderWidth: 1,
    padding: 1,
    borderRadius: 8
  },
  textStyle: {
    fontSize: 15,
    fontFamily: FontName.Gordita_Regular,
    padding: 5,
    color: BLACK,
    marginEnd: 10,
    marginStart: 10
  },
  verticalLine: {
    borderColor: LIGHT_GREY,
    borderWidth: 0.3,
    marginStart: 5,
    marginEnd: 5,
    marginBottom: 15

  },
  header: {
    flexDirection: 'row',
    width: widthPercentageToDP(100),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: GREY,
    height: widthPercentageToDP(15),
    justifyContent: 'center'
  },
  close: {
    tintColor: BLACK,
    position: 'absolute',
    right: 20,
    width: heightPercentageToDP(2.8),
    height: heightPercentageToDP(2.8),
    alignItems: 'center',
    justifyContent: 'center',
  },
});