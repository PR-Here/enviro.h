/* event with presenter component */
import { View, StyleSheet, Image } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import CustomText from "../atoms/CustomText";
import { FontName, FontSize } from "../../theme/Fonts";
import { BLACK, GREY, LIGHTGREY, WHITE } from "../../theme/Colors";
import TimeLabel from "../labels/TimeLabel";
import DateLabel from "../labels/DateLabel";
import LinkedinIcon from '../../../assets/images/SVG/devicon_linkedin.svg'

function PresenterItem({
  containerStyle,
  content,
  startTime,
  endTime,
  date,
  title,
  name,
  presenterImage
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <View style={styles.titleView}>
          <Image
            source={presenterImage}
            style={styles.presenterIcon}
          />
          <View style={styles.defaultHMargin}>
            {title ? <CustomText style={styles.title}>{title}</CustomText> : null}
            {name ? <CustomText style={styles.subTitle}>{name}</CustomText> : null}
          </View>
        </View>
        <LinkedinIcon style={styles.linkedinIcon} />
      </View>
      {
        content ?
          <CustomText style={styles.content}>
            {content}
          </CustomText>
          :
          null
      }
      <View style={styles.dateTimeView}>
        <TimeLabel startTime={startTime} endTime={endTime} />
        <View style={styles.defaultHMargin} />
        <DateLabel date={date} />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: 'auto',
    borderBottomWidth: 1,
    borderColor: LIGHTGREY,
    margin: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleView: {
    flexDirection: 'row',
    //alignItems: 'center',
    //backgroundColor: 'red'
  },
  presenterIcon: {
    height: heightPercentageToDP(4.5),
    width: heightPercentageToDP(4.5),
    borderRadius: heightPercentageToDP(4.5)
  },
  title: {
    fontFamily: FontName.Gordita_Medium,
    fontSize: FontSize(16),
    color: BLACK,
    fontWeight: '500',
    width: widthPercentageToDP(60),
    flexWrap: 'wrap'
  },
  subTitle: {
    fontFamily: FontName.Gordita_Medium,
    fontSize: FontSize(12),
    color: BLACK,
    fontWeight: '400',
    paddingTop: 5
  },
  defaultHMargin: {
    marginHorizontal: heightPercentageToDP(2)
  },
  linkedinIcon: {
    height: heightPercentageToDP(3),
    width: heightPercentageToDP(3)
  },
  content: {
    fontFamily: FontName.Gordita_Regular,
    fontSize: FontSize(12),
    color: BLACK,
    fontWeight: '300',
    marginTop: heightPercentageToDP(2)
  },
  dateTimeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: heightPercentageToDP(2),
    width: '100%'
  }
})

export default PresenterItem