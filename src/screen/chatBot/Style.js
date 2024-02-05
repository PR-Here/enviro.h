import { heightPercentageToDP } from 'react-native-responsive-screen';
import { FontName, FontSize } from '../../theme/Fonts';
import { BLACK, GREY, LINE_COLOR, PAGE_BACKGROUND, WHITE } from '../../theme/Colors';

const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PAGE_BACKGROUND
  },

  textInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    bottom: 10,
    marginBottom: heightPercentageToDP(8),
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontFamily: FontName.Geo_Auto_Regular,
  },
  textView: {
    borderRadius: 8,
    padding: 5,
  },
  itemView: {
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingTop: 8
  },
  chatMessage: {
    fontSize: FontSize(14),
    fontFamily: FontName.Gordita_Regular,
    fontWeight: '400',
    color: BLACK,
    lineHeight: 20

  },
  chatMessageTime: {
    fontSize: FontSize(10),
    marginTop: 5
  },

  suggestionButton: {
    padding: heightPercentageToDP(1),
    backgroundColor: WHITE,
    marginHorizontal: heightPercentageToDP(1),
    marginTop: 10,
    borderRadius: 5
  },
});
