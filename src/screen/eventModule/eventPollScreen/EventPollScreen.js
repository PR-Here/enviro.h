import * as React from "react";
import { View, SafeAreaView } from 'react-native'
import styles from "./styles";
import { heightPercentageToDP } from "react-native-responsive-screen";
import CustomText from "../../../component/atoms/CustomText";
import PollItem from "../../../component/listItems/PollItem";
import useApiEffect from "../../../hooks/useApiEffect";
import { EVENT_API } from "../../../services/ApiEndPoint";

function EventPollScreen({ sections, eventId }) {

  const [eventPolls, setEventPolls] = React.useState([])
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const [selectedArray, setSelectedArray] = React.useState([])
  const [selectedOption, setSelectedOption] = React.useState([])
  const [shortAns, setShortAns] = React.useState('')

  const { makeApiRequest, loading } = useApiEffect() // hook call for api effects


  //api req
  const apiReq = async (userAns) => {
    //console.log('here')
    const response = await makeApiRequest({ url: `${EVENT_API}${eventId}/user/answer`, method: 'POST', isToken: true, data: userAns })
    //console.log('response', response)
  }

  // list of questions
  React.useEffect(() => {
    let arr = []
    sections?.map(el => {
      arr.push({
        question: el.question,
        data: el.EventAnswers,
        type: el.answer_type,
        id: el.id
      })
    })
    setEventPolls(arr)
    //console.log(eventPolls, 'eventPol')
  }, [sections])


  // on clicking checkbox
  const onCheckBox = (item, ques_id) => {
    const array = selectedArray
    const index = array.findIndex((val) => {
      return val === item
    })
    if (index === -1) {
      array.push(item);
    } else {
      array.splice(index, 1)
    }
    setSelectedArray(array)
    //console.log('selectedArray', selectedArray)
    const userAns = {
      question_id: ques_id,
      answer_id: selectedArray,
    }
    apiReq(userAns)
  }

  // on clicking radio button/circular checkbox
  const onRadioCheckBox = (item, ques_id) => {
    let arr = []
    arr.push(item)
    setSelectedOption(arr)
    const userAns = {
      question_id: ques_id,
      answer_id: selectedOption,
    }
    apiReq(userAns)
  }

  // on end typing short answer/user response
  const onEndEditing = (ques_id) => {
    const userAns = {
      question_id: ques_id,
      answer_id: [],
      short_answer: shortAns
    }
    apiReq(userAns)
  }


  // render options
  const renderItem = (item, type, ques_id, index) => {
    //console.log('render poll item', item)
    return (
      <PollItem
        label={item.answer}
        ans_id={item.id}
        containerStyle={{ marginTop: heightPercentageToDP(2) }}
        multiSelect={true}
        type={type}
        ques_id={ques_id}
        index={index}
        onToggle={() => {
          setSelectedIndex(index)
          onRadioCheckBox(item.id, ques_id)
        }}
        radioChecked={selectedIndex == index ? true : false}
        onCheckBox={() => {
          onCheckBox(item.id, ques_id)
        }}
        onChangeText={(val) => setShortAns(val)}
        onEndEditing={() => onEndEditing(ques_id)}
        shortAns={shortAns}
      />
    )
  }

  // render questions
  const renderSectionHeader = (el) => {
    return (
      <CustomText style={styles.pollQ}>
        {el.question}
      </CustomText>
    )
  }

  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={styles.pollConatiner}>
        {
          eventPolls.map((el, index) => {
            return (
              <View>
                {renderSectionHeader(el)}
                {el.data.map((e, index) => {
                  return (
                    renderItem(e, el.type, el.id, index)
                  )
                })}
              </View>
            )
          })
        }
      </View>
    </SafeAreaView>
  );
}

export default EventPollScreen
