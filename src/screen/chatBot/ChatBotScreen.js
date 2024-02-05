import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { styles } from './Style';
import CustomText from '../../component/atoms/CustomText';
import { BLACK, PRIMARY_COLOR, WHITE } from '../../theme/Colors';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { FontName } from '../../theme/Fonts';
import MeetingHomeHeader from '../../component/header/MeetingHeader';
import { useSelector } from 'react-redux';
import AssetsImages from '../../utils/AssetsImages';
import CustomButton from '../../component/atoms/CustomButton';
import useApiEffect from '../../hooks/useApiEffect'
import { CHATBOT, CHATBOT_SAVE } from '../../services/ApiEndPoint';
import AppLoader from '../../utils/AppLoader';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";

let lastQuestion = ''
let level1Data1 = []

const ChatBot = (data) => {

  const flatListRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [tappedSuggestions, setTappedSuggestions] = useState({});
  const [chatBotJsonData, setChatBotJsonData] = useState([])
  const { makeApiRequest, loading } = useApiEffect()

  const profile_image = useSelector((state) => state?.auth?.profileImage);

  const isFocused = useIsFocused();
  const navigation = useNavigation()
  useEffect(() => {
    if (isFocused) {
      if (data?.route?.params?.data == undefined) {
        CHATBOT_START_API()
      } else {
        setMessages(data?.route?.params?.data)
      }
    }
  }, [isFocused]);

  async function CHATBOT_START_API() {
    setMessages([])
    const apiData = await makeApiRequest({ url: CHATBOT, method: 'GET', isToken: true });
    if (apiData?.status == true) {
      setChatBotJsonData(apiData?.data)
      setTimeout(() => {
        apiData?.data?.forEach((message, index) => {
          setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, message]);
            if (index === chatBotJsonData.length - 1) {
              if (flatListRef.current) flatListRef.current.scrollToEnd();
            }
          }, (index + 1) * 500);
        });
      }, 500);
    } else {

      console.log("API ERROR: ", apiData)
    }
  }

  async function CHATBOT_SAVE_API() {

    const apiData = await makeApiRequest({ url: CHATBOT_SAVE, method: 'POST', isToken: true, data: { 'chat': level1Data1 } });

    if (apiData?.status == true) {
      // setMessages([]);
      // newChatStart()
      if (data?.route?.params?.data == undefined) {
        setTimeout(() => {
          navigation.goBack()
        }, 1000)
      }
    } else {
      console.log("API ERROR: ", apiData)
    }
  }

  const newChatStart = () => {
    setTappedSuggestions({});
    setMessages([])
    chatBotJsonData?.forEach((message, index) => {
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, message]);
        if (index === chatBotJsonData.length - 1) {
          if (flatListRef.current) flatListRef.current.scrollToEnd();
        }
      }, (index + 1) * 500);
    });
  }

  const RenderItem = ({ item, parentIndex }) => (
    <View style={{ marginBottom: 20 }}>
      {item.user ?
        <View style={{ flexDirection: 'row-reverse', margin: 15 }}>
          <Image source={profile_image == null ? AssetsImages.DUMMY : { uri: profile_image }} style={{ marginLeft: 10, height: 40, width: 40, borderRadius: 400 / 2 }} />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row-reverse' }}>
              <Text style={{ borderRadius: 5, backgroundColor: PRIMARY_COLOR, marginStart: 20, padding: 10, color: WHITE, alignSelf: "center" }}>{item?.text} </Text>
            </View>
          </View>
        </View>
        : <View style={{ flexDirection: 'row' }}>
          <Image source={AssetsImages.CHAT_BOT} style={{ height: 40, width: 40, marginLeft: 5 }} />

          <View style={{ backgroundColor: '#F1F1F1', marginHorizontal: 15, marginVertical: 5, flex: 1 }}>
            <View
              style={[styles.itemView, { flexDirection: 'row' }]}>
              <View
                style={styles.textView}>
                <CustomText
                  style={styles.chatMessage}
                  children={item?.text}
                />
              </View>
            </View>
            {!item.user &&
              <View style={{ paddingBottom: 10 }}>
                {item?.data?.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (parentIndex == messages.length - 1) {
                        handleSuggestionClick(suggestion, parentIndex)
                      }
                    }}
                    style={{ padding: heightPercentageToDP(1), backgroundColor: tappedSuggestions[suggestion.question] == parentIndex ? 'black' : WHITE, marginHorizontal: heightPercentageToDP(1), marginTop: 10, borderRadius: 5 }}>
                    <Text style={{ color: tappedSuggestions[suggestion.question] == parentIndex ? WHITE : BLACK, alignSelf: "center", fontFamily: FontName.Gordita_Regular, fontSize: 14 }}>{suggestion?.question} </Text>
                  </TouchableOpacity>
                ))}
              </View>
            }
          </View>
        </View>}
      {/* {item?.text == "Thank You" && data?.route?.params?.data == undefined &&
        <CustomButton title={'Want to ask more?'} onPress={() => {

          CHATBOT_SAVE_API()
        }} style={{ alignSelf: 'center', marginVertical: 25 }} />
      } */}
    </View>
  );

  useEffect(() => {
    if (data?.route?.params?.data == undefined) {

      level1Data1 = []
      messages.map((item) => {
        if (item.user == true) {
          level1Data1.push(item)
        } else {
          const { user, text } = item;
          let innerData = []
          item.data?.map((inner) => {
            const { question, answer, data } = inner
            innerData.push({
              question: question,
              answer: answer,
            })
          })
          const dat = innerData.length == 0 ? {} : { data: innerData }
          level1Data1.push({
            user: user,
            text: text,
            ...dat
          })
        }
      })
      if (messages.length > 1) {
        let mess = messages[messages.length - 1].text
        if (mess === 'Thank you for chatting with Kola. Wishing you a wonderful day ahead!') {
          CHATBOT_SAVE_API()
        }
      }
    }
  }, [messages])

  const handleSuggestionClick = (suggestion, parentIndex) => {

    const userMessage = { text: suggestion.question, user: true, timestamp: new Date() }
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setTappedSuggestions((prevTappedSuggestions) => ({
      ...prevTappedSuggestions,
      [suggestion.question]: parentIndex,
    }));
    setTimeout(() => {
      if (suggestion?.question == 'Main Menu') {
        const botMessage = {
          text: chatBotJsonData[1].text,
          user: false,
          timestamp: new Date(),
          data: chatBotJsonData[1].data
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else if (suggestion?.question == 'Yes') {
        if (lastQuestion === 'Others') {
          const botMessage = {
            text: chatBotJsonData[1].text,
            user: false,
            timestamp: new Date(),
            data: chatBotJsonData[1].data
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
          chatBotJsonData[1].data?.map((item) => {
            if (item.question === lastQuestion) {
              const botMessage = {
                text: item?.answer,
                user: false,
                timestamp: new Date(),
                data: item?.data,
              };
              setMessages((prevMessages) => [...prevMessages, botMessage]);
            }
          });
        }
      } else if (suggestion?.question == 'No') {
        const botMessage = {
          text: "Thank you for chatting with Kola. Wishing you a wonderful day ahead!",
          user: false,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
      else {
        if (suggestion.level == 1) {
          lastQuestion = suggestion.question
        }
        const botMessage = {
          text: suggestion?.answer,
          user: false,
          timestamp: new Date(),
          data: suggestion?.data
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        if (suggestion?.data == undefined) {
          const botMessage = {
            text: 'Is there anything i can help you with?',
            user: false,
            timestamp: new Date(),
            data: [{
              question: 'Yes',
              answer: ''
            },
            {
              question: 'No',
              answer: ''
            },
            {
              question: 'Main Menu',
              answer: ''
            }
            ]
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      }
    }, 1000);
  };


  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={'height'} keyboardVerticalOffset={25} style={styles.container}>
        <MeetingHomeHeader headerText={'Chat'} icon={'chat-bot'} />
        <View style={{ height: 1, backgroundColor: '#DEDEDE', marginHorizontal: 16, marginBottom: 18 }} />

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <RenderItem item={item} parentIndex={index} />
          )}
          showsVerticalScrollIndicator={false}
          inverted={true}
          contentContainerStyle={{ flexDirection: 'column-reverse' }}
        />

      </KeyboardAvoidingView>
      < AppLoader isLoading={loading} />

    </View>
  );
};

export default ChatBot;