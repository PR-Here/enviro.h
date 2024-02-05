import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavString from '../../utils/NavString';
import ChatBotHistory from '../../screen/chatBot/ChatBotHistory';
import { ChatBot } from '../../screen';

const Stack = createNativeStackNavigator();

function KolaChatStack() {
    return (

        <Stack.Navigator >
            <Stack.Screen name={NavString.CHAT_BOT_HISTORY} component={ChatBotHistory} options={{ headerShown: false }} />
            <Stack.Screen name={NavString.CHAT_BOT} component={ChatBot} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
}

export default KolaChatStack

