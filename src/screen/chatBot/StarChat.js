import React, { useEffect, useState } from "react"
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import ChatIcon from '../../../assets/images/SVG/chat-black.svg'
import CustomText from "../../component/atoms/CustomText"
import { FontName } from "../../theme/Fonts"
import { BUTTON_BACKGROUND, DELETE_BACK, LIGHTWHITE } from "../../theme/Colors"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"
import { useNavigation } from "@react-navigation/native"
import NavString from "../../utils/NavString"
import useApiEffect from "../../hooks/useApiEffect"
import { CHATBOT } from "../../services/ApiEndPoint"
import StarFill from '../../../assets/images/SVG/starfill.svg'
import { Swipeable } from "react-native-gesture-handler"
import AppLoader from "../../utils/AppLoader"

const StarChat = ({ starredChat, onDelete }) => {
    const { makeApiRequest, loading } = useApiEffect()
    async function CHATBOT_HISTORY_UNSTAR_API(id) {

        const apiData = await makeApiRequest({ url: CHATBOT + '/' + id, method: 'PATCH', isToken: true, data: { 'isStarred': 0 } });

        if (apiData?.status == true) {
            onDelete()
        } else {
            console.log("API ERROR: ", apiData);
        }
    }

    let filteredData = starredChat?.filter(item => item.isStarred === "1")


    return (
        <View style={{ marginTop: 18, marginHorizontal: 16, flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredData}
                renderItem={({ item }) =>
                    <Swipeable renderRightActions={() =>
                        <RightSwipe
                            onClickStar={() => CHATBOT_HISTORY_UNSTAR_API(item._id)}
                        />
                    } >
                        <StarChatHistory data={item} />
                    </Swipeable>
                }
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: heightPercentageToDP(18) }}>
                        <CustomText children={'No record found'} />
                    </View>
                }
            />
            < AppLoader isLoading={loading} />

        </View>
    )
}

const StarChatHistory = ({ data }) => {
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

const RightSwipe = ({ onClickStar }) => {

    return (
        <View
            activeOpacity={0.6}
            style={styles.deleteBox}>
            <View style={styles.deleteBtnView}>
                <TouchableOpacity onPress={onClickStar} style={styles.starRedButton}>
                    <StarFill height={21} width={21} />
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
    starRedButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconBG: {
        paddingHorizontal: widthPercentageToDP(3),
        paddingVertical: widthPercentageToDP(3),
        borderRadius: widthPercentageToDP(100),
        alignSelf: 'center',
        backgroundColor: LIGHTWHITE
    }
})


export default StarChat