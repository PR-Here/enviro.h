import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Linking } from 'react-native';
import PagerView from 'react-native-pager-view';
import { saveAnnouncement, getAnnouncement, removeAnnouncement } from '../../redux/slices/OnboardingSlice';
import { useDispatch, useSelector } from 'react-redux';
import EventPage from './eventPage';


const EventStory = ({ navigation, route }) => {
    const storeIds = useSelector((state) => state.onboarding.announcement)


    const dispatch = useDispatch()

    const [lastIndex, setLastIndex] = useState(0)

    const { events } = route?.params

    const onBackHandler = () => {
        navigation.goBack()
    }

    const openUrl = (url) => {
        Linking.openURL(url)
    }

    const getFooterText = (pos) => {
        if (events.length == 1) {
            return ""
        } else if (pos < events.length - 1) {
            return "Swipe Right to Read More Event"
        } else {
            return "Swipe Left to Go Back"
        }
    }

    useEffect(() => {
        getZeroIndexData()
    }, [])


    const getZeroIndexData = () => {
        //console.log('hello last index====>', lastIndex)
        if (events[lastIndex]?.is_visibility === 1) {
            if (events[lastIndex].type == 'Announcement') {
                if (!storeIds.some(value => value == events[lastIndex].event_id)) {
                    //console.log('hello new')
                    dispatch(saveAnnouncement(events[lastIndex].event_id))
                }
            }
        }
    }


    const onPageScroll = async (index) => {
        if (lastIndex != index?.nativeEvent?.position) {
            setLastIndex(index?.nativeEvent?.position)
            if (events[lastIndex]?.is_visibility === 1) {
                if (events[lastIndex].type == 'Announcement') {
                    if (!storeIds.some(value => value == events[lastIndex].event_id)) {
                        dispatch(saveAnnouncement(events[lastIndex].event_id))
                    }
                }
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* <Image source={AssetsImages.CLOSE} /> */}
                <PagerView style={{ flex: 1 }} onPageScroll={onPageScroll}>
                    {events?.map((item, index) => {
                        return (
                            <View key={index}>
                                <EventPage
                                    item={item}
                                    footerTitle={getFooterText(index)}
                                    onPress={onBackHandler}
                                    onDownloadClick={() => {
                                        openUrl(item?.attachment ? item?.attachment : '')
                                    }}
                                    onClickLink={() => {
                                        openUrl(item?.url ? item?.url : '')
                                    }}
                                />
                            </View>
                        )
                    })}
                </PagerView>
            </View>
        </SafeAreaView>
    );
};

export default EventStory;
