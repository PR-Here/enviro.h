import React, { useState, useEffect } from 'react';
// import { GiftedChat } from 'react-native-gifted-chat';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler'
// import { Freshchat, FreshchatConfig, ConversationOptions } from "react-native-freshchat-sdk";
import { View } from 'react-native-animatable';
import { styles } from './login/Style';
// Initialize Freshchat
let botResponse = [];
export const freshChatInitialize = () => {
  const freshchatConfig = new FreshchatConfig(
    "dfbd605f-87c0-490e-bf99-7bd0785208b2",
    "5bd4099f-dfef-4526-93ad-4a3c023cf7d6"
  );
  freshchatConfig.domain = "msdk.in.freshchat.com";
  Freshchat.init(freshchatConfig);

}

// Show conversations filtered by a specific tag
export const showFilteredConversations = () => {
  var conversationOptions = new ConversationOptions();
  conversationOptions.tags = ["inbox"];
  Freshchat.showConversations(conversationOptions);
}
const chatBoat = () => {
  // const [messages, setMessages] = useState([]);



  useEffect(() => {

    // Initialize the chat with default messages
    //   const defaultMessages = [
    //     {
    //         _id: Math.round(Math.random() * 1000000),
    //         text: 'Please select one of the following options:',
    //         quickReplies: {
    //           type: 'radio', // Display options as radio buttons
    //           values: [
    //             {
    //               title: 'Option 1',
    //               value: 'Option 1',
    //             },
    //             {
    //               title: 'Option 2',
    //               value: 'Option 2',
    //             },
    //             {
    //               title: 'Option 3',
    //               value: 'Option 3',
    //             },
    //           ],
    //         },
    //         createdAt: new Date(),
    //         user: { _id: 'bot', name: 'Bot' },
    //       },
    //     {
    //       _id: 1,
    //       text: 'Hello! How can I assist you?',
    //       createdAt: new Date(),
    //       user: { _id: 'bot', name: 'Bot' },
    //     },

    //   ];

    //   setMessages(defaultMessages);
  }, []);

  // const [messages, setMessages] = useState([]);

  //     const initialMessages = [
  //         {
  //           _id: 1,
  //           text: 'Hello! Please select an option:',
  //           createdAt: new Date(),
  //           user: {
  //             _id: 'bot',
  //             name: 'Bot',
  //           },
  //           quickReplies: {
  //             type: 'radio', // Display options as radio buttons
  //             values: [
  //               {
  //                 title: 'Option 1',
  //                 value: 'Option 1',
  //               },
  //               {
  //                 title: 'Option 2',
  //                 value: 'Option 2',
  //               },
  //               {
  //                 title: 'Option 3',
  //                 value: 'Option 3',
  //               },
  //             ],
  //           },
  //         },
  //       ];

  //       // Initialize state with the initial messages
  //        const [msg, setMessages] = useState(initialMessages);


  //        const handleSend = (newMessages) => {
  //         // Add user messages to the chat
  //         setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

  //         // Handle user message and generate a custom bot response
  //         const userMessage = newMessages[0].text;
  //         const botResponse = generateBotResponse(userMessage);

  //         // Add the bot's response to the chat
  //         setMessages((prevMessages) => GiftedChat.append(prevMessages, botResponse));
  //       };

  //       const generateBotResponse = (userMessage) => {
  //         // Implement custom logic to generate bot responses based on user messages
  //         // Provide three predefined options for the user to choose from



  //         if (userMessage.toLowerCase().includes('options')) {
  //           botResponse = [
  //             {
  //               _id: Math.round(Math.random() * 1000000),
  //               text: 'Please select one of the following options:',
  //               quickReplies: {
  //                 type: 'radio', // Display options as radio buttons
  //                 values: [
  //                   {
  //                     title: 'Option 1',
  //                     value: 'Option 1',
  //                   },
  //                   {
  //                     title: 'Option 2',
  //                     value: 'Option 2',
  //                   },
  //                   {
  //                     title: 'Option 3',
  //                     value: 'Option 3',
  //                   },
  //                 ],
  //               },
  //               createdAt: new Date(),
  //               user: { _id: 'bot', name: 'Bot' },
  //             },
  //           ];
  //         } else if (userMessage.toLowerCase() === 'option 1') {
  //           // Handle Option 1
  //           botResponse = [
  //             {
  //               _id: Math.round(Math.random() * 1000000),
  //               text: 'You selected Option 1. This is the response for Option 1.',
  //               createdAt: new Date(),
  //               user: { _id: 'bot', name: 'Bot' },
  //             },
  //           ];
  //         } else if (userMessage.toLowerCase() === 'option 2') {
  //           // Handle Option 2
  //           botResponse = [
  //             {
  //               _id: Math.round(Math.random() * 1000000),
  //               text: 'You selected Option 2. This is the response for Option 2.',
  //               createdAt: new Date(),
  //               user: { _id: 'bot', name: 'Bot' },
  //             },
  //           ];
  //         } else if (userMessage.toLowerCase() === 'option 3') {
  //           // Handle Option 3
  //           botResponse = [
  //             {
  //               _id: Math.round(Math.random() * 1000000),
  //               text: 'You selected Option 3. This is the response for Option 3.',
  //               createdAt: new Date(),
  //               user: { _id: 'bot', name: 'Bot' },
  //             },
  //           ];
  //         } else {
  //           botResponse = [
  //             {
  //               _id: Math.round(Math.random() * 1000000),
  //               text: "I'm not sure how to respond to that.",
  //               createdAt: new Date(),
  //               user: { _id: 'bot', name: 'Bot' },
  //             },
  //           ];
  //         }

  //         return botResponse;
  //       };

  //     const onDefaultMessageTap = (defaultMessage) => {
  //         // Handle tap on a default message here
  //         console.log('Default message tapped:', defaultMessage);

  //         // Check if the tapped message contains options
  //         const messageOptions = defaultMessage.quickReplies?.values;
  //         if (messageOptions) {
  //           // Display messages for each option
  //           const resultMessages = messageOptions.map((option) => ({
  //             _id: Math.random().toString(36).substring(7),
  //             text: `You selected ${option.title}. Here is some information.`,
  //             createdAt: new Date(),
  //             user: {
  //               _id: 'bot',
  //               name: 'Bot',
  //             },
  //           }));

  //           // Append result messages to the chat
  //           setMessages((prevMessages) =>
  //             GiftedChat.append(prevMessages, resultMessages)
  //           );
  //         }
  //       };




  //   const renderMessage1 = () => {

  //     if (msg.quickReplies) {
  //       // If the message has quick replies, wrap it with a TouchableOpacity
  //       return (
  //         <TouchableOpacity onPress={() => onDefaultMessageTap(msg)}>
  //           <GiftedChat.messages {...msg} />
  //         </TouchableOpacity>
  //       );
  //     }
  //     // If it's not a default message with quick replies, render it normally
  //      return <GiftedChat.messages {...msg} />;
  //   };


  // // Function to handle tapping on a message
  // const onMessageTap = (message) => {
  //     // Perform custom logic based on the tapped message
  //     if (message.quickReplies) {
  //       // Handle default message with quick replies
  //       const quickReplies = message.quickReplies.map((reply) => reply.title);
  //       // Show the quick replies as options or perform other actions
  //       console.log('Tapped on default message with quick replies:', quickReplies);
  //     } else {
  //       // Handle other types of default messages or perform custom actions
  //       console.log('Tapped on a different default message:', message.text);
  //     }
  //   };

  //   // Function to render messages with tap handlers
  //   const renderMessage = (message) => {
  //     return (
  //       <GiftedChat.Message
  //         {...message}
  //         onPress={() => onMessageTap(message)}
  //       />
  //     );
  //   };

  return (
    <View style={{ flex: 1, paddingBottom: 150 }}>

    </View>
  );
};




export default chatBoat;




