import * as React from "react";
import { SafeAreaView, ScrollView } from 'react-native'
import styles from "./styles";
import EventItem from "../../../component/listItems/EventItem";
import { useDispatch, useSelector } from "react-redux";
import { onScrollHandler } from "../../../utils/Constant";
import { onTabBarSroll } from "../../../redux/slices/TabBarSlice";
import EventFooterItem from "../../../component/molecules/EventFooterItem";
import PresentersList from "../eventLists/PresentersList";
import EventPollScreen from "../eventPollScreen/EventPollScreen";
import { EVENT_API } from "../../../services/ApiEndPoint";
import useApiEffect from "../../../hooks/useApiEffect";
import AssetsImages from "../../../utils/AssetsImages";
import { ActivityIndicator } from "react-native-paper";

function EventDetailsScreen(props) {
   // console.log(props.route.params)
    const eventId = props.route.params.eventId

    // presenters list collapse/expand state
    const [collapse, setCollapse] = React.useState(false)
    const [eventDetails, setEventDetails] = React.useState(null)

    const dispatch = useDispatch()
    //const eventDetails = useSelector((state) => state.event.eventDetails) // accessing redux state for event module
    //console.log(eventDetails.title, 'aksghdkasgdkasgdhgsd')

    // auto hide tab bar on scroll
    const onScroll = (e) => {
        const hideTabBar = onScrollHandler(e)
        dispatch(onTabBarSroll(hideTabBar))
    }
    const { makeApiRequest, loading } = useApiEffect() // hook call for api effects

    // fetching events details from events api
    const apiReq = async () => {
        const response = await makeApiRequest({ url: `${EVENT_API}${24}`, method: 'GET', isToken: true })
        if (response.status) {
            dispatch(setEventDetails(response.data))
            setEventDetails(response.data)
        }
       // console.log(response)
    }

    React.useEffect(() => {
        apiReq()
    }, [])

    React.useEffect(() => {
       // console.log('event local state', eventDetails?.EventQuestions)
    }, [eventDetails, eventDetails?.EventQuestions])


    return (
        <SafeAreaView style={styles.conatiner}>
            {
                loading || !eventDetails ?
                    <ActivityIndicator />
                    :
                    <ScrollView onScroll={e => onScroll(e)}>
                        <EventItem cover={eventDetails?.image ? { 'uri': eventDetails?.image } : AssetsImages.WORKSHOP}
                            title={eventDetails?.title}
                            date={eventDetails?.date}
                            startTime={eventDetails?.start_time}
                            endTime={eventDetails?.end_time}
                            participation_type={eventDetails?.participation_type}
                        />
                        {
                            eventDetails?.EventModules.length > 0 ?
                                <PresentersList
                                    collapse={collapse}
                                    onCollapse={() => {
                                        setCollapse(!collapse)
                                    }}

                                    presenList={eventDetails?.EventModules}
                                />
                                :
                                null
                        }
                        {
                            eventDetails?.EventQuestions.length > 0 ?
                                <EventPollScreen sections={eventDetails?.EventQuestions} />
                                :
                                null
                        }


                        <EventFooterItem />
                    </ScrollView>
            }


        </SafeAreaView>
    );
}

export default EventDetailsScreen
