/* user reaction tab for event module */
import { View, Text, Image, StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { BLACK, GREY, LIGHTGREY, WHITE } from "../../theme/Colors";
import { FontName, FontSize } from "../../theme/Fonts";
import ThumbsUp from '../../../assets/images/SVG/thumbs-up.svg'
import CheckCircle from '../../../assets/images/SVG/check-circle.svg'
import XCircle from '../../../assets/images/SVG/x-circle.svg'
import Participant from '../../../assets/images/SVG/participant_icon.svg'
import HandIcon from '../../../assets/images/SVG/hand_icon.svg'
import { TouchableOpacity } from "react-native-gesture-handler";
import useApiEffect from "../../hooks/useApiEffect";
import { EVENT_API } from "../../services/ApiEndPoint";

function ReactionTab({ likes = 23, hands = 23, participation_type, eventId }) {

  const { makeApiRequest, loading } = useApiEffect() // hook call for api effects

  // api req
  const apiReq = async (userAns) => {
   // console.log('here')
    const response = await makeApiRequest({ url: `${EVENT_API}${eventId}/user/response`, method: 'POST', isToken: true, data: userAns })
    //console.log(response)
  }

  return (
    <View style={styles.actionTab}>

      <TouchableOpacity
        onPress={() => {
          const payload = {
            event_id: eventId,
            type: 1
          }
          apiReq(payload)
        }}
        style={styles.actionLabels}>
        <ThumbsUp style={styles.icon} />
        <Text style={styles.count}>{likes}</Text>
      </TouchableOpacity>
      {
        participation_type == 1 ?
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={[styles.actionLabels]}
            >

              <Participant />

              <Text style={styles.count}>{'Participant'}</Text>

            </TouchableOpacity>
          </View>
          : participation_type == 2 ?
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={[styles.actionLabels]}
                onPress={() => {
                  const payload = {
                    event_id: eventId,
                    type: 4
                  }
                  apiReq(payload)
                }}
              >

                <HandIcon />

                <Text style={styles.count}>{'Interested'}</Text>
              </TouchableOpacity>
            </View>
            : participation_type == 3 ?
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  style={[styles.actionLabels]}
                  onPress={() => {
                    const payload = {
                      event_id: eventId,
                      type: 2
                    }
                    apiReq(payload)
                  }}
                >
                  <CheckCircle style={styles.icon} />
                  <Text style={styles.count}>{'Yes'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    apiReq({
                      event_id: eventId,
                      type: 3
                    })
                  }}
                  style={[styles.actionLabels, { marginLeft: widthPercentageToDP(10) }]}
                >
                  <XCircle style={styles.icon} />
                  <Text style={styles.count}>{'No'}</Text>
                </TouchableOpacity>
              </View>

              :
              null
      }
    </View>
  );
}

export default ReactionTab

const styles = StyleSheet.create({
  actionTab: {
    padding: heightPercentageToDP(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: LIGHTGREY,
    borderTopColor: LIGHTGREY
  },
  actionLabels: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#1D1B1B'
  },
  count: {
    fontFamily: FontName.Gordita_Medium,
    color: '#1D1B1B',
    fontSize: FontSize(14),
    fontWeight: '400',
    marginLeft: heightPercentageToDP(1)
  }
})