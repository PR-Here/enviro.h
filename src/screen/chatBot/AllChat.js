import React, { useState } from "react"
import { View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import ChatIcon from '../../../assets/images/SVG/chat-black.svg'
import CustomText from "../../component/atoms/CustomText"
import { FontName } from "../../theme/Fonts"
import { BUTTON_BACKGROUND, DELETE_BACK, LIGHTWHITE } from "../../theme/Colors"
import { widthPercentageToDP } from "react-native-responsive-screen"
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from "@react-navigation/native"
import NavString from "../../utils/NavString"
import Star from '../../../assets/images/SVG/star-black.svg'
import StarFill from '../../../assets/images/SVG/starfill.svg'
import Delete from '../../../assets/images/SVG/delete.svg'
import { CHATBOT } from "../../services/ApiEndPoint"
import useApiEffect from "../../hooks/useApiEffect"
import TaskModal from "../../component/modal/TaskModal"
import AppString from "../../utils/AppString"

const AllChat = ({ recentChat, onDelete }) => {

    const { makeApiRequest, loading } = useApiEffect()
    const [isVisible, setIsVisible] = useState(false)
    const [id, setId] = useState()

    const deleteChat = (id) => {
        Alert.alert(
            '',
            'Are you sure you want to delete this chat?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel button pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => CHATBOT_HISTORY_DELETE_API(id),

                }
            ]
        );
    }

    async function CHATBOT_HISTORY_DELETE_API() {

        const apiData = await makeApiRequest({ url: CHATBOT + '/' + id, method: 'DELETE', isToken: true });
        if (apiData?.status == true) {
            setIsVisible(false)
            onDelete()
        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    async function CHATBOT_HISTORY_STAR_API(id, isStarred) {

        const apiData = await makeApiRequest({
            url: CHATBOT + '/' + id,
            method: 'PATCH',
            isToken: true,
            data: { 'isStarred': isStarred == 1 ? 0 : 1 }
        });

        if (apiData?.status == true) {
            onDelete()

        } else {
            console.log("API ERROR: ", apiData);
        }
    }

    return (
        <View style={{ marginTop: 18, marginHorizontal: 16, flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={recentChat}
                renderItem={({ item, index }) =>
                    <Swipeable
                        key={item._id}
                        renderRightActions={() =>
                            <RightSwipe
                                deleteChat={() => { setId(item._id); setIsVisible(true) }}
                                starClick={() => CHATBOT_HISTORY_STAR_API(item._id, item.isStarred)}
                                isStarred={item.isStarred}
                            />
                        } >
                        <AllChatHistory data={item} />
                    </Swipeable>
                }
            />
            <TaskModal isVisible={isVisible} onPress={CHATBOT_HISTORY_DELETE_API} onCancel={() => setIsVisible(false)} text='Are you sure you want to delete this chat?' type={AppString.DELETE} />
        </View>
    )
}

const AllChatHistory = ({ data }) => {
    const navigation = useNavigation()


    let index = data?.chat?.findIndex((item) => item.text == 'Thank you for chatting with Kola. Wishing you a wonderful day ahead!')
    let title = ''
    let answer = ''
    if (index != -1) {
        title = data?.chat && data?.chat[data?.chat?.length - 5].text
    }
    if (index != -1) {
        answer = data?.chat && data?.chat[data?.chat?.length - 4].text
    }

    return (
        <>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(NavString.CHAT_BOT, { data: data?.chat })} style={{ flexDirection: 'row', marginTop: 18 }}>
                <View style={styles.iconBG}>
                    <ChatIcon height={20} width={20} />
                </View>
                <View style={{ flex: 1 }}>
                    < CustomText children={title} style={styles.title} numberOflines={3} />
                    <CustomText children={answer} style={styles.policyText} numberOflines={1} />
                </View>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: '#EEEEEE', marginTop: 20 }} />

        </>
    )
}

const RightSwipe = ({ deleteChat, isStarred, starClick }) => {

    return (

        <View
            activeOpacity={0.6}
            style={styles.deleteBox}>
            <View style={styles.deleteBtnView}>
                <TouchableOpacity onPress={starClick} style={styles.starRedButton}>
                    {isStarred == 1 ? <StarFill height={21} width={21} /> : <Star />}
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteChat}>
                    <Delete />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        color: '#1D1B1B',
        fontSize: 13,
        fontWeight: '500',
        fontFamily: FontName.Gordita_Medium,
        marginHorizontal: 10,
        lineHeight: 16
    },
    policyText: {
        padding: 10,
        color: BUTTON_BACKGROUND,
        fontSize: 12,
        borderRadius: 5,
        flex: 1,
        marginTop: 5,
        fontWeight: '400',
        fontFamily: FontName.Gordita_Regular,

    },
    deleteBox: {
        backgroundColor: DELETE_BACK,
        alignItems: 'center',
        width: widthPercentageToDP(20),
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    deleteBtnView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    iconBG: {
        paddingHorizontal: widthPercentageToDP(3),
        paddingVertical: widthPercentageToDP(3),
        borderRadius: widthPercentageToDP(100),
        alignSelf: 'center',
        backgroundColor: LIGHTWHITE
    }

})


export default AllChat