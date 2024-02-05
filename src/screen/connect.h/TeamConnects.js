import React from "react"
import { FlatList, StyleSheet, View, ScrollView, Platform, TouchableOpacity } from "react-native"
import CustomText from "../../component/atoms/CustomText"
import { FontName, FontSize } from "../../theme/Fonts"
import { ALERTBG, WHITE } from "../../theme/Colors"
import { widthPercentageToDP } from "react-native-responsive-screen"
import { useNavigation } from "@react-navigation/native"
import NavString from "../../utils/NavString"

const TeamConnects = ({ parentIndex }) => {

    const teamConnectsArray = [
        {
            title: '#Diwali Brief - Mondelez',
            count: '5'
        },
        {
            title: '#Diwali Brief - Mondelez',
            count: '5'
        },
        {
            title: '#Diwali Brief - Mondelez',
            count: '5'
        },
        {
            title: '#Diwali Brief - Mondelez',
            count: '5'
        },
        {
            title: '#Diwali Brief - Mondelez',
            count: '5'
        },
    ]

    const directConnectsArray = [
        {
            title: 'Vinay Chandervanshi',
            time: '2:36 PM',
            desp: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
            color: '#8598FF'
        },
        {
            title: 'Vinay Chandervanshi',
            time: '2:36 PM',
            desp: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
            color: '#7FD671'
        },
        {
            title: 'Vinay Chandervanshi',
            time: '2:36 PM',
            desp: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
            color: '#8598FF'
        },
        {
            title: 'Vinay Chandervanshi',
            time: '2:36 PM',
            desp: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
            color: '#7FD671'
        },
        {
            title: 'Vinay Chandervanshi',
            time: '2:36 PM',
            desp: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
            color: '#8598FF'
        },
    ]

    const channelsArray = [
        {
            title: '# announcements',
            count: '1'
        },
        {
            title: '# groupheads',
            count: '4'
        },
        {
            title: '# hr',
            count: '1'
        },
    ]

    return (
        <View style={{ marginHorizontal: 16, marginTop: 10, flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* TeamConnects */}
                <CustomText children={parentIndex == 0 ? 'Team Connects' : 'Project Connects'} style={styles.title} />
                <View style={{ height: 1, backgroundColor: ALERTBG, marginTop: 5 }} />
                <FlatList
                    scrollEnabled={false}
                    data={teamConnectsArray}
                    renderItem={({ item }) =>
                        <TeamConnectComponment connectItem={item} parentIndex={parentIndex} />
                    }
                />

                {/* Direct Connects */}
                <CustomText children={'Direct Connects'} style={styles.title} />
                <View style={{ height: 1, backgroundColor: ALERTBG, marginTop: 5 }} />
                <FlatList
                    scrollEnabled={false}
                    data={directConnectsArray}
                    renderItem={({ item }) =>
                        <DirectConnects directItem={item} />
                    }
                />

                {/* Chennels */}
                {parentIndex == 0 &&
                    <>
                        <CustomText children={'Chennels'} style={styles.title} />
                        <View style={{ height: 1, backgroundColor: ALERTBG, marginTop: 5 }} />
                        <FlatList
                            scrollEnabled={false}
                            data={channelsArray}
                            renderItem={({ item }) =>
                                <Channels channelItem={item} parentIndex={parentIndex} />
                            }
                        />
                        <View style={{ height: 1, backgroundColor: ALERTBG, marginTop: 5 }} />

                        <CustomText children={'+  Add Channel'} style={{ color: '#5B5B5B', fontSize: FontSize(14), marginTop: 10, marginBottom: 30 }} />
                    </>
                }

            </ScrollView>
        </View>
    )
}

const TeamConnectComponment = ({ connectItem, parentIndex }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate(NavString.PROJECT_DETAILS)
        }}>
            <View style={{ padding: widthPercentageToDP(2), backgroundColor: parentIndex == 0 ? '#E1F5FF' : '#FFF1F1', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, borderRadius: 5, }}>
                <CustomText children={connectItem.title} style={{ fontSize: FontSize(14), fontFamily: FontName.Gordita_Regular, fontWeight: '400' }} />
                <View style={{ borderRadius: 20, justifyContent: 'center', height: 25, width: 35, backgroundColor: parentIndex == 0 ? '#8FDAFF' : '#F43B3B' }}>
                    <CustomText children={connectItem.count} style={{ fontSize: FontSize(13), alignSelf: 'center', marginTop: Platform.OS == 'ios' ? 3 : 0, marginHorizontal: 6, color: parentIndex == 0 ? '#000' : '#FFF' }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const DirectConnects = ({ directItem }) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ backgroundColor: directItem.color, height: 40, width: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                <CustomText children={'V'} style={{ color: WHITE, fontWeight: '500', marginTop: Platform.OS == 'ios' ? 5 : 0, }} />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <CustomText children={directItem.title} style={{ fontSize: FontSize(13), fontFamily: FontName.Gordita_Regular }} />
                    <CustomText children={directItem.time} style={{ color: '#A4A4A4', fontSize: FontSize(13), fontFamily: FontName.Gordita_Regular }} />
                </View>
                <CustomText children={directItem.desp} style={{ color: '#A4A4A4', fontSize: FontSize(12), fontWeight: '400', fontFamily: FontName.Gordita_Regular }} />
            </View>
        </View>
    )
}

const Channels = ({ channelItem, parentIndex }) => {
    return (
        <View style={{ paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <CustomText children={channelItem.title} style={{ fontSize: FontSize(15), fontFamily: FontName.Gordita_Regular, }} />
            <CustomText children={channelItem.count} style={{ marginHorizontal: 5, color: '#5B5B5B', fontSize: FontSize(15), }} />
        </View>
    )
}

export default TeamConnects

const styles = StyleSheet.create({
    title: {
        fontSize: FontSize(14),
        marginTop: 20
    }
});

