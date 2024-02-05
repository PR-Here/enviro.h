import * as React from "react";
import { View, Text, SafeAreaView, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native'
import styles from "./styles";
import EventItem from "../../../component/listItems/EventItem";
import PresenterItem from "../../../component/listItems/PresenterItem";
import { useDispatch } from "react-redux";
import { onScrollHandler } from "../../../utils/Constant";
import { onTabBarSroll } from "../../../redux/slices/TabBarSlice";
import { heightPercentageToDP } from "react-native-responsive-screen";
import CustomText from "../../../component/atoms/CustomText";
import AssetsImages from "../../../utils/AssetsImages";
import Collapsible from 'react-native-collapsible';
import EventForm from "../../../component/molecules/EventForm";

function EventFormScreen(props) {
    //console.log(props, 'props')
    const params = props.route.params // params getting from the event home screen

    const dispatch = useDispatch()

    //auto hide tab bar on scroll
    const onScroll = (e) => {
        const hideTabBar = onScrollHandler(e)
        dispatch(onTabBarSroll(hideTabBar))
    }

    return (
        <SafeAreaView style={styles.conatiner}>
            <ScrollView onScroll={e => onScroll(e)}>
                <EventItem cover={params.cover} />

                <View style={styles.presenterConatiner}>


                    <EventForm />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default EventFormScreen
