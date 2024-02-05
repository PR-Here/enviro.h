import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  BLACK,
  GREY,
  LIGHTGREY,
  LIGHTWHITE,
  LINE_COLOR,
  PRIMARY_COLOR,
  RED,
  SELECTED_INNER_COLOR,
  SELECTED_OUTER_COLOR,
  TERNARY_COLOR,
  WHITE,
} from '../../../../theme/Colors';
import { FontName, FontSize } from '../../../../theme/Fonts';

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  listContainer: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: LIGHTGREY,
    margin: 7,
    borderRadius: 10,
    padding: 5
  },
  header: {
    backgroundColor: WHITE,
    padding: 5,
    // elevation: 1,
    // borderRadius: 10,
    marginTop: 1,
    // shadowColor: BLACK,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 1,
  },
  title: {
    fontSize: FontSize(14),
    color: BLACK,
    fontFamily: FontName.Gordita_Medium
  },
  hobbiesText: {
    fontSize: FontSize(14),
    color: BLACK,
    position: 'absolute',
    height: 26,
    backgroundColor: 'transparent',
    zIndex: 2,
    marginLeft: heightPercentageToDP(0.5)

  },
  viewStyle: {
    padding: 5,
    borderRadius: 10,
    marginEnd: 10,
    marginStart: 10,
    marginTop: 5,
    backgroundColor: WHITE,
  },
  viewRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  headerText: {
    fontSize: FontSize(14),
    fontFamily: FontName.Gordita_Medium,
    color: PRIMARY_COLOR,
  },
  border: {
    borderRadius: 100,
    borderColor: WHITE,
    borderWidth: 3,
  },
  circularImage: {
    width: 150,
    height: 150,
  },
  editContainer: {
    width: 50,
    height: 50,
  },
  smallImage: {
    width: 30,
    height: 30,
  },

  largeImage: {
    width: 50,
    height: 50,
  },
  item: {
    backgroundColor: WHITE,
    borderBottomColor: GREY,
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: 'normal',
    color: GREY,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  viewButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(4)
  },
  modalCancelButton: {
    backgroundColor: WHITE,
    width: widthPercentageToDP(95),
    height: heightPercentageToDP(6),
    justifyContent: 'center',
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: heightPercentageToDP(1)
  },
  textCancelColor: {
    color: PRIMARY_COLOR,
    alignItems: 'center',
    fontFamily: FontName.Gordita_Medium,
    fontSize: FontSize(14),
  },
  modalSaveButton: {
    backgroundColor: PRIMARY_COLOR,
    width: widthPercentageToDP(95),
    height: heightPercentageToDP(6),
    justifyContent: 'center',
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 4,
  },
  textSaveColor: {
    color: WHITE,
    alignItems: 'center',
    fontFamily: FontName.Gordita_Medium,
    fontSize: FontSize(14),
  },
  selectMultiStyle: {

    chipContainer: {
      backgroundColor: TERNARY_COLOR,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: PRIMARY_COLOR,
      marginTop: heightPercentageToDP(0),


    },
    chipText: {
      color: BLACK,
    },
    chipIcon: {
      color: BLACK,

    },
    button: {
      backgroundColor: PRIMARY_COLOR,
    },
    selectToggle: {
      fontSize: 1
    },
    selectToggleText: {
      color: WHITE,
      borderWidth: 0,
      borderRadius: 25,
      borderColor: WHITE,
      padding: 0,
      paddingLeft: 15,
    },

  },
  separatorBottom: {
    height: 0.5,
    backgroundColor: LIGHTGREY,
    marginTop: 5,
  },
  separatorMultiBottom: {
    height: 0.5,
    backgroundColor: '#808080',
  },
  flatListView: {
    marginTop: heightPercentageToDP(2),
  },
  flatListCertificate: {
    justifyContent: 'center',
    marginTop: heightPercentageToDP(1),

  },
  addNewButtonStyle: {
    fontSize: FontSize(16),
    color: SELECTED_OUTER_COLOR,
    fontFamily: FontName.Gordita_Regular
  },
  addNewCertifateButtonStyle: {
    fontSize: FontSize(16),
    color: SELECTED_OUTER_COLOR,
    fontFamily: FontName.Gordita_Regular,
    height: 30,
    marginTop: 15
  },
  viewDateBottomStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    width: widthPercentageToDP(99),
    marginTop: heightPercentageToDP(1)
  },
  viewColumStyle: {
    width: widthPercentageToDP(50),
    marginTop: heightPercentageToDP(0.3),

  },
  viewEndColumStyle: {
    marginStart: 5,
    width: widthPercentageToDP(50),
    padding: 2,
  },
  viewStartDateStyle: {
    flexDirection: 'row',
    marginTop: heightPercentageToDP(0.4),
  },
  imageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  separatorStartDate: {
    height: 0.5,
    backgroundColor: '#808080',
    width: widthPercentageToDP(40),
    marginTop: 4

  },
  subDateTitle: {
    color: BLACK,
    backgroundColor: WHITE,
    width: widthPercentageToDP(35),
    fontSize: FontSize(13),
    fontFamily: FontName.Gordita_Regular,
    textAlignVertical: 'center',
    textAlign: 'left',
    alignSelf: 'center'

  },
  textInputStyle: {
    marginTop: -14
  },
  textInput: {
    marginStart: -8,
    borderWidth: 0,
    paddingHorizontal: heightPercentageToDP(1),
    color: TERNARY_COLOR,
    fontFamily: FontName.Gordita_Regular,
    fontSize: FontSize(15),
    fontWeight: "400"
  },

  textActiveInput: {
    marginStart: -8,
    borderWidth: 0,
    paddingHorizontal: heightPercentageToDP(1),
    color: PRIMARY_COLOR,
    fontFamily: FontName.Gordita_Regular,
    fontSize: FontSize(15),
    fontWeight: "400"
  },

  SkillsAndHobbiesContainer: {
    paddingHorizontal: heightPercentageToDP(2),
    paddingVertical: heightPercentageToDP(0.9),
    borderWidth: 1,
    borderColor: '#C1C0C0',
    backgroundColor: WHITE,
    borderRadius: heightPercentageToDP(10),
    margin: heightPercentageToDP(1),
    marginStart: 0,
  },
  SkillsAndHobbiesItemText: {
    fontSize: FontSize(12),
    color: '#C1C0C0',
    fontFamily: FontName.Gordita_Regular
  },
  textStyle: {
    alignSelf: 'flex-start',
    color: PRIMARY_COLOR,
    marginTop: heightPercentageToDP(1),
    fontFamily: FontName.Gordita_Regular,
    fontWeight: '400',
  },
  eduTextStyle: {
    alignSelf: 'flex-start',
    color: PRIMARY_COLOR,
    padding: 3,
    fontFamily: FontName.Gordita_Regular,
    marginTop: heightPercentageToDP(1)
  },
  aboutText: {
    borderWidth: 0,
    lineHeight: 20,
    fontFamily: FontName.Gordita_Regular,
    marginLeft: heightPercentageToDP(-1),
    marginTop: 5,
    padding: 0,
    fontSize: FontSize(14),
    marginStart: 3
  },
  acheivmentText: { color: GREY, marginTop: 5, fontFamily: FontName.Gordita_Regular },
  hobbiesView: {
    padding: heightPercentageToDP(1),
    borderWidth: 1,
    borderColor: SELECTED_OUTER_COLOR,
    backgroundColor: SELECTED_INNER_COLOR,
    borderRadius: heightPercentageToDP(10),
    marginTop: heightPercentageToDP(0.5),
    marginBottom: heightPercentageToDP(0.5),
    marginEnd: heightPercentageToDP(2),
    paddingStart: heightPercentageToDP(2),
    paddingEnd: heightPercentageToDP(2),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  hobbiesName: {
    fontFamily: FontName.Gordita_Regular,
    fontSize: FontSize(12),
    fontWeight: 'normal',
    color: SELECTED_OUTER_COLOR,
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  hobbiesTextInput: {
    borderWidth: 0,
    paddingHorizontal: 0,

  },
  hobbiesListName: {
    fontFamily: FontName.Gordita_Regular,
    fontSize: FontSize(14),
    fontWeight: 'normal',
    color: PRIMARY_COLOR,
    textTransform: 'capitalize',
    textAlign: 'left',
    padding: 4
  },
  crossButton: {
    marginLeft: heightPercentageToDP(0.5)
  },
  textInputView: {
    flexDirection: 'row',
    height: heightPercentageToDP(6),
    marginTop: 10
  },
  addHobbiesButton: {
    position: 'absolute',
    right: 30,
    alignSelf: 'center',
    borderWidth: 1,
    borderBlockColor: GREY,
    paddingHorizontal: heightPercentageToDP(1),
    borderRadius: 100 / 2
  },
  plusText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: FontSize(12)
  },
  line: { width: '100%', height: 1, backgroundColor: LINE_COLOR },
  noDataAdded: {
    fontSize: FontSize(12),
    marginTop: 10
  }
});
