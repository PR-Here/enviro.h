import * as React from "react";
import { SafeAreaView, ScrollView } from 'react-native'
import styles from "./styles";
import EventItem from "../../../component/listItems/EventItem";
import { useDispatch } from "react-redux";
import { onScrollHandler } from "../../../utils/Constant";
import { onTabBarSroll } from "../../../redux/slices/TabBarSlice";
import EventFooterItem from "../../../component/molecules/EventFooterItem";
import PresentersList from "../eventLists/PresentersList";
import EventPollScreen from "../eventPollScreen/EventPollScreen";


function EventPresenterScreen({ cover, title, date, startTime, endTime,
  sections, presenList, onPress, participation_type, description, file, link, url, eventId }) {

  // presenters list collapse/expand state
  const [collapse, setCollapse] = React.useState(false)

  const dispatch = useDispatch()

  // auto hide tab bar on scroll
  const onScroll = (e) => {
    const hideTabBar = onScrollHandler(e)
    dispatch(onTabBarSroll(hideTabBar))
  }

  return (
    <SafeAreaView style={styles.conatiner}>
      <ScrollView onScroll={e => onScroll(e)}>
        <EventItem cover={cover}
          title={title}
          date={date}
          startTime={startTime}
          endTime={endTime}
          onPress={onPress}
          participation_type={participation_type}
          description={description}
          eventId={eventId}
        />
        {
          presenList?.length > 0 ?
            <PresentersList
              collapse={collapse}
              onCollapse={() => {
                setCollapse(!collapse)
              }}
              presenList={presenList}
            />
            :
            null
        }
        {
          sections.length > 0 ? <EventPollScreen sections={sections} eventId={eventId} /> : null
        }
        {
          file || link ? <EventFooterItem file={file} link={link} url={url} /> : null
        }
      </ScrollView>

    </SafeAreaView>
  );
}

export default EventPresenterScreen
