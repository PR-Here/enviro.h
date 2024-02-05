import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { BLACK, WHITE, PRIMARY_COLOR, SELECTED_OUTER_COLOR } from '../../../../../../theme/Colors';
import { FontName, FontSize } from '../../../../../../theme/Fonts';

const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal:heightPercentageToDP(1)
  },
  viewStyle: {
    borderRadius: heightPercentageToDP(1),
    marginEnd: heightPercentageToDP(0.5),
    marginTop: heightPercentageToDP(2),
    backgroundColor: WHITE,
  },
  title: {
    fontSize: FontSize(15),
    fontWeight: "400",
    color: PRIMARY_COLOR,
    fontFamily: FontName.Gordita_Regular
  },
  subTitle: {
    fontSize: FontSize(14),
    fontWeight: "400",
    color: PRIMARY_COLOR,
    marginTop: 10,
    fontFamily: FontName.Gordita_Regular
  },
  projectDesc: {
    fontSize: FontSize(13),
    fontWeight: "400",
    color: PRIMARY_COLOR,
    fontFamily: FontName.Gordita_Regular,
    lineHeight: 20,
    marginTop: heightPercentageToDP(0.5)
  },
  subDateTitle: {
    color: PRIMARY_COLOR,
    marginTop: heightPercentageToDP(1),
    backgroundColor: WHITE,
    width: widthPercentageToDP(35),
    fontSize: FontSize(13),
    fontFamily: FontName.Gordita_Regular,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  viewDateBottomStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: heightPercentageToDP(2),
    justifyContent: 'center',
  },
  viewColumStyle: {
    width:'50%'
  },
  imageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignSelf: 'center'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: widthPercentageToDP(90),
    marginTop: heightPercentageToDP(0.4)
  },
  separatorStartDate: {
    height: 0.5,
    backgroundColor: '#808080',
    width: widthPercentageToDP(40),
    marginTop: heightPercentageToDP(0.4)
  },
  viewEndColumStyle: {
    width: widthPercentageToDP(50),
    alignItems: 'flex-start',
  },
  viewStartDateStyle: {
    flexDirection: 'row',

  },
  addExperienceStyle: {
    fontSize: FontSize(16),
    color: SELECTED_OUTER_COLOR,
    fontFamily: FontName.Gordita_Regular,
    marginVertical:heightPercentageToDP(2)
  },
  dateText: {
    fontSize: FontSize(12),
    fontWeight: "normal",
    fontFamily: FontName.Gordita_Regular,
    lineHeight: 20,
    marginTop: heightPercentageToDP(0.5)
  }
});
