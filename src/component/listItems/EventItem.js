/* event item component for event module */
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable, Platform } from "react-native"
import CustomText from "../atoms/CustomText"
import AssetsImages from "../../utils/AssetsImages"
import { FontName, FontSize } from "../../theme/Fonts"
import { BLACK, PRIMARY_COLOR, WHITE, } from "../../theme/Colors"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"
import DateLabel from "../labels/DateLabel"
import TimeLabel from "../labels/TimeLabel"
import LocationLabel from "../labels/LoactionLabel"
import ReactionTab from "../molecules/ReactionTab"
import { useEffect, useState } from "react"

function EventItem({ cover = AssetsImages.WORKSHOP, title, content, date, startTime, endTime
  , location, onPress, containerStyle, participation_type, description, eventId }) {

  const [wordLimit, setWordLimit] = useState(150)
  const [viewMore, setViewMore] = useState(false)

  function renderViewMore() {
    return (
      <Text style={styles.moreText} onPress={() => { setWordLimit(-1) }}>more...</Text>
    )
  }

  useEffect(() => {

  }, [viewMore, wordLimit])

  function renderViewMore() {
    return (
      <Text
        style={styles.moreText}
        onPress={() => {
          setViewMore(!viewMore)
          setWordLimit(-1)
        }}>
        more...
      </Text>
    )
  }

  function renderViewLess() {
    return (
      <Text
        style={styles.moreText}
        onPress={() => {
          setViewMore(!viewMore)
          setWordLimit(-1)
        }}>
        more...
      </Text>
    )
  }


  return (
    <View style={[styles.conatiner, containerStyle]}>

      <View style={styles.subContainer}>
        <CustomText style={styles.title}>{title}</CustomText>
        <TouchableOpacity onPress={onPress} style={styles.eventImageContainer}
        >
          <Image source={cover} style={styles.eventImage} resizeMode={Platform.OS == 'android' ? 'contain' : 'fit'} />
        </TouchableOpacity>
        {
          description ?

            <Text style={styles.content} >
              {description.slice(0, wordLimit)}{' '}
              {
                description.length > 150 && !viewMore ?
                  <Text
                    style={styles.moreText}
                    onPress={() => {
                      setViewMore(!viewMore)
                      setWordLimit(-1)
                    }}>
                    more...
                  </Text>
                  :
                  null
              }

            </Text>
            :
            null
        }
        <View style={styles.verticalMargin} />
        <DateLabel containerStyle={styles.labels} date={date} />
        <TimeLabel containerStyle={styles.labels} startTime={startTime} endTime={endTime} />
        <LocationLabel containerStyle={styles.labels} />
      </View>
      <ReactionTab participation_type={participation_type} eventId={eventId} />
    </View>
  );
}

export default EventItem

const styles = StyleSheet.create({
  conatiner: {
    height: 'auto',
    width: widthPercentageToDP(95),
    alignSelf: 'center'
  },
  subContainer: {
    marginHorizontal: 15,
    width: 'auto'
  },
  title: {
    fontFamily: FontName.Gordita_Medium,
    fontSize: FontSize(18),
    fontWeight: '500',
    lineHeight: FontSize(25.65),
    color: BLACK,
    marginVertical: heightPercentageToDP(2),
  },
  content: {
    fontSize: FontSize(14),
    fontWeight: '500',
    lineHeight: FontSize(19.95),
    fontFamily: FontName.Gordita_Regular,
    color: BLACK,
    marginTop: heightPercentageToDP(2)
  },
  moreText: {
    fontSize: FontSize(14),
    fontWeight: '500',
    lineHeight: FontSize(19.95),
    fontFamily: FontName.Gordita_Medium,
    color: '#E49273',
  },
  verticalMargin: {
    marginTop: heightPercentageToDP(2)
  },
  eventImage: {
    borderRadius: 5,
    height: '100%',
    width: '100%',
  },
  eventImageContainer: {
    height: heightPercentageToDP(27),
    width: '100%',
    flex: 1,
    alignItems: 'center'
  },
  labels: {
    marginBottom: heightPercentageToDP(2)
  },
})