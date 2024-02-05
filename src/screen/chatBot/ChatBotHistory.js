import { useEffect, useState } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import MeetingHomeHeader from "../../component/header/MeetingHeader"
import CustomSearchBox from "../../component/atoms/CustomSearchBox"
import AppString from "../../utils/AppString"
import AllChat from "./AllChat"
import { heightPercentageToDP } from "react-native-responsive-screen"
import { BLACK, WHITE } from "../../theme/Colors"
import CustomText from "../../component/atoms/CustomText"
import NavString from "../../utils/NavString"
import CustomButton from "../../component/atoms/CustomButton"
import StarChat from "./StarChat"
import { useNavigation } from "@react-navigation/native"
import useApiEffect from "../../hooks/useApiEffect"
import { CHATBOT_HISTORY, CHATBOT_STAR } from "../../services/ApiEndPoint"
import { useIsFocused } from "@react-navigation/native";
import AssetsImages from "../../utils/AssetsImages"
import { FontName } from "../../theme/Fonts"
import AppLoader from "../../utils/AppLoader"

const ChatBotHistory = () => {
    const navigation = useNavigation()
    const { makeApiRequest, loading } = useApiEffect()
    const [recentChat, setRecentChat] = useState([]);
    const [allData, setAllData] = useState([]);
    const [clear, setClear] = useState(false)
    const isFocused = useIsFocused();

    const tabs = [
        { id: 'RecentChat', label: AppString.RECENT_CHAT },
        { id: 'Star', label: AppString.STARRED },
    ];

    const [activeTab, setActiveTab] = useState('RecentChat');

    const handleTabChange = tabId => {
        setActiveTab(tabId);
    };

    useEffect(() => {
        if (isFocused)
            CHATBOT_HISTORY_API();
    }, [activeTab, isFocused]);



    async function CHATBOT_HISTORY_API() {
        setClear(true)
        const apiData = await makeApiRequest({ url: CHATBOT_HISTORY, method: 'GET', isToken: true });
        setClear(false)
        if (apiData?.status == true) {
            setAllData(apiData?.data)
            setRecentChat(apiData?.data)
        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    return (
        <View style={styles.container}>

            <MeetingHomeHeader icon={'chat-bot'} onPress={() => navigation.navigate(NavString.DASHBOARD)} />

            {allData == '' ?
                <>
                    <View style={{ height: 1, backgroundColor: '#DEDEDE', marginHorizontal: 16, marginBottom: 18 }} />
                    <View style={{ alignItems: 'center', flex: 1, marginTop: 30 }}>
                        <Image source={AssetsImages.CHAT_BOT} style={{ height: 170, width: 170, marginTop: 14 }} />
                        <CustomText children={'Greetings !'} style={{ fontFamily: FontName.Gordita_Medium, fontSize: 25, fontWeight: '500' }} />
                        <CustomText children={'My name is Kola'} style={{ fontFamily: FontName.Gordita_Medium, fontSize: 21, fontWeight: '500', lineHeight: 30, marginTop: 50 }} />
                        <CustomText children={'How can I help you today?'} style={{ fontFamily: FontName.Gordita_Medium, fontSize: 18, fontWeight: '500', lineHeight: 30 }} />
                    </View>
                </>
                :
                <>
                    <CustomSearchBox
                        clear={clear}
                        placeholder="Search" onPress={(text) => {
                            let filtered = []
                            if (text === '') {
                                filtered = allData
                            } else {
                                allData.map((item) => {
                                    let index = item?.chat?.findIndex((item) => item.text == 'Thank you for chatting with Kola. Wishing you a wonderful day ahead!')
                                    let title = ''
                                    let ans = ''
                                    if (index != -1) {
                                        title = item?.chat && item?.chat[item?.chat?.length - 5].text
                                        ans = item?.chat && item?.chat[item?.chat?.length - 4].text
                                    }
                                    if (title.toLowerCase().includes(text.toLowerCase()) || (ans.toLowerCase().includes(text.toLowerCase()))) {
                                        filtered.push(item)
                                    }
                                }
                                );
                            }
                            setRecentChat(filtered);
                        }} />

                    <View style={styles.tabBarContainer}>
                        {tabs?.map(tab => (
                            <TouchableOpacity
                                key={tab.id}
                                style={[
                                    styles.tabButton,
                                    tab.id === activeTab ? styles.activeTab : null,
                                ]}
                                onPress={() => handleTabChange(tab.id)}>
                                <CustomText
                                    style={[
                                        styles.tabText,
                                        tab?.id == activeTab ? styles.activeTextColor : null,
                                    ]}
                                    children={tab.label}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            }


            {activeTab === 'RecentChat' ? <AllChat recentChat={recentChat} onDelete={() => CHATBOT_HISTORY_API()} />
                :
                <StarChat starredChat={recentChat} onDelete={() => CHATBOT_HISTORY_API()} />}
            <CustomButton title={'Connect with Kola'} onPress={() => navigation.navigate(NavString.CHAT_BOT)} style={styles.buttonStyle} />
            < AppLoader isLoading={loading} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    tabBarContainer: {
        flexDirection: 'row',
        paddingVertical: heightPercentageToDP(2),
        marginHorizontal: heightPercentageToDP(1.5),
        alignItems: 'center',
    },
    tabButton: {
        paddingVertical: heightPercentageToDP(1),
        paddingHorizontal: heightPercentageToDP(3),
        height: heightPercentageToDP(6),
        justifyContent: 'center',
        borderRadius: heightPercentageToDP(1),
        backgroundColor: WHITE,
        marginLeft: heightPercentageToDP(1),
        shadowColor: BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    activeTab: {
        backgroundColor: BLACK,
    },
    tabText: {
        color: 'black',
        fontSize: 12,
    },
    activeTextColor: {
        color: WHITE,
    },
    buttonStyle: {
        alignSelf: 'center',
        marginBottom: heightPercentageToDP(5),
    }
})

export default ChatBotHistory


