import {
  View,
  FlatList,
  TouchableOpacity,
  SectionList,
  TouchableHighlight,
  Animated,
  ScrollView,
  Image
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './Style';
import CustomText from '../../component/atoms/CustomText';
import NavString from '../../utils/NavString';
import { FontSize } from '../../theme/Fonts';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { INACTIVE_COLOR, LIGHTWHITE, PRIMARY_COLOR, WHITE } from '../../theme/Colors';
import CustomSearchBox from '../../component/atoms/CustomSearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { onTabBarSroll } from '../../redux/slices/TabBarSlice';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SvgFromUri } from 'react-native-svg';
import { DUMMY } from '../../utils/AssetsImages';
import { userProfileData } from '../../redux/slices/AuthSlice';
import analytics from '@react-native-firebase/analytics';
import { calculateAge } from '../../utils/Constant';



const DashboardList = ({ events, announcement, sectionListDetails, searchClear }) => {
  const [filterData, setFilterData] = useState(sectionListDetails);
  const storeIds = useSelector((state) => state.onboarding.announcement)
  const dispatch = useDispatch()
  const prevOffsetRef = useRef(0);
  const fadeAnim = new Animated.Value(searchVisible ? 1 : 0);
  const [scrollDirection, setScrollDirection] = useState('down');

  const navigation = useNavigation();
  const searchVisible = scrollDirection === 'up';
  let loginUser = useSelector(state => state?.auth?.loginUser);

  useEffect(() => {
    setFilterData(sectionListDetails);
  }, [sectionListDetails]);

  useEffect(() => {
    // Set screen view event
    analytics().logEvent('screen_view', {
      screen_name: 'Dashboard',
      screen_class: 'DashboardList',
    });

  }, []);

  const handleScrollwithDirection = (event) => {

    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > prevOffsetRef.current) {
      //setScrollDirection('down');
    } else if (offsetY < prevOffsetRef.current) {
      setScrollDirection('up');
    }

    // Update the previous offset
    prevOffsetRef.current = offsetY;

    // Apply fade animation based on scroll direction
    if (scrollDirection === 'up' && !searchVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1, // Fully visible
        duration: 300, // Adjust the duration as needed
      }).start();
    } else if (scrollDirection === 'down' && searchVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0, // Completely hidden
        duration: 300, // Adjust the duration as needed
      }).start();
    }
  };

  useFocusEffect(
    // to make bottom tab bar always visible on dashboard
    React.useCallback(() => {
      dispatch(onTabBarSroll(false));
    }, [])
  );

  // Handling for all Sceern For Perticuker Id's 
  //Id's is Final call to navigation perticuler screens
  // Id's Define Both Side (App and Server side) same Id Using both side 
  const itemToScreenMapping = {
    "punch_in": NavString.CHECK_IN_QR,
    "meetings": NavString.MEETING_HOME,
    "timesheet": NavString.TIMESHEET,
    "gurukul": NavString.GURUKU_BOTTOM_NNAVIGATION,
    "leave_balance": NavString.LEAVEBALANCE,
    "reimbursements": "",
    "attendance_regularise": NavString.ATTENDANCE_REGULARIZATION,
    "my_profile": NavString.MY_PROFILE,
    "my_directory": NavString.SEARCH_USER,
    "plan_go": NavString.PLAN_G0_LIST,
    "settings": NavString.SETTINGS,
    "my_calendar": "",
    "my_team": NavString.MY_TEAM,
    "hr_policy": NavString.POLICY,
    "attendance_report": NavString.ATTENDANCE_REPORT,
    "leave": NavString.LEAVE_DASHBOARD,
    "approval": NavString.RM_LEAVE_REQUEST,
    "wfh_policy": "",
    "my_project": "",
    "surveys": "",
    "form_16": "",
    "investment_declaration": "",
    "reimbursements": "",
    "text_report": "",
    "my_ctc": "",
    "salary_slip": "",
    "help_&_support": NavString.HELP_SUPPORT,
    "my_hr": "",
    "feedback": "",
    "onboarding": "",
    "alumni_directory": "",
    "resignation": "",
    "holiday_list": NavString.HOLIDAY_LIST,

  };

  const searchHandler = (value) => {
    if (value == "" || value == null) {
      setFilterData(sectionListDetails)
    } else {
      const results = filterSectionList(sectionListDetails, value);
      setFilterData(results)
    }
  }

  function filterSectionList(data, text) {
    const regex = new RegExp(text, 'i'); // 'i' flag for case-insensitive matching
    return data.reduce((filteredData, item) => {
      const filteredLists = item.data.map(group => ({
        ...group,
        list: group.list.filter(module => regex.test(module.module_name))
      })).filter(group => group.list.length > 0);

      if (filteredLists.length > 0) {
        filteredData.push({
          ...item,
          data: filteredLists
        });
      }
      return filteredData;
    }, []);
  }
  // Navigate to Screen
  const handleEventItemClick = (itemId) => {
    navigation.navigate(NavString.AUTH_STACK, {
      screen: NavString.STORIESVIEW
    })
  };

  // // Firebase Analytics Basket for Button Click Event on Dashboard
  // const setUserInfo = async (clickName) => {
  //   try {
  //     await analytics().logEvent(clickName)
  //   } catch (error) {
  //     console.error('Error logging custom event:', error);
  //   }
  // }

  // Firebase Analytics Basket for Button Click Event on Dashboard
  const setUserInfo = async (clickName) => {
    try {
      await analytics().logEvent('Click_Basket', {
        //Custom Definitons
        item_id: clickName,
      })
    } catch (error) {
      console.error('Error logging custom event:', error);
    }
  }

  // Firebase Analytics Basket for Search Item on Dashboard
  const setSearchInfo = async (searchString) => {
    try {
      await analytics().logEvent('Search_Basket', {
        search_name: searchString,
      })
    } catch (error) {
      console.error('Error logging custom event:', error);
    }
  }

  // Navigate to Screen
  const handleItemClick = slug => {
    const screenName = itemToScreenMapping[slug];
    setUserInfo(screenName)
    if (screenName) {
      if (screenName == NavString.MY_PROFILE) {
        dispatch(userProfileData(null))
        navigation.push(screenName, { loginRole: 'loginUser' })
      } else if (screenName == NavString.GURUKU_BOTTOM_NNAVIGATION) {
        navigation.navigate(screenName)
      } else
        navigation.push(screenName);
    }
  };

  // CategoryList
  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderSection = ({ item, index, section }) => {
    const isLastItemInSecondSection =
      section.title === 'Company Support' && index === section.data.length - 1;
    return (
      <FlatList
        data={item?.list}
        numColumns={4}
        renderItem={RenderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        style={{ marginBottom: isLastItemInSecondSection ? heightPercentageToDP(1) : 0 }}
      />
    );
  };

  // Category List view's
  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderItem = ({ item, index }) => {
    return (
      <View style={styles.viewStyle} key={item?.id}>
        {item?.is_mobile == 1 ? item?.status == 0 ? (
          <View style={styles.flatView}>
            <View style={styles.imageStyle}>
              <SvgFromUri
                width={32}
                height={32}
                uri={item?.blur_image}
              />
            </View>
            <CustomText
              style={[
                styles.categoryName,
                { color: INACTIVE_COLOR },
              ]}
              children={item?.module_name}
              fontSize={FontSize(12)}
            />
          </View>
        ) : (
          <TouchableHighlight
            underlayColor={LIGHTWHITE}
            activeOpacity={1}
            onPress={() => {
              handleItemClick(item?.slug);
            }}>
            <View style={styles.flatView}>

              <View style={styles.imageStyle}>
                <SvgFromUri
                  width={32}
                  height={32}
                  uri={item?.module_image}
                />
              </View>
              <CustomText
                style={[
                  styles.categoryName,
                  { color: PRIMARY_COLOR },
                ]}
                children={item?.module_name}
                fontSize={FontSize(12)}
              />
            </View>
          </TouchableHighlight>
        ) : null}
      </View>
    );
  };

  const EventItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.storyContainerStyle} activeOpacity={0.7} onPress={() => {
        const eventStories = []
        if (item?.announcement_id == undefined || item?.announcement_id == null) {
          item?.EventFeeds?.map(event => {
            eventStories.push(
              {
                type: 'Events',
                status: item?.status,
                event_id: item?.event_id,
                created_by: item?.created_by,
                title: event?.title,
                image: item?.image,
                thumbnail_title: item?.thumbnail_title,
                thumbnail_image: item?.thumbnail_image,
                start_date: item?.start_date,
                start_time: item?.start_time,
                end_date: item?.end_date,
                end_time: item?.end_time,
                time_zone: item?.time_zone,
                guest: item?.guest,
                event_type: item?.event_type,
                all_day: item?.all_day,
                notification_time: item?.notification_time,
                joining_mandatory: item?.joining_mandatory,
                rsvp_visibility: item?.rsvp_visibility,
                url: event?.link_url,
                link: event?.link_name,
                notification_duration_time: item?.notification_duration_time,
                notification_duration_type: item?.notification_duration_type,
                participation_type: item?.participation_type,
                attachment: event?.attachment,
                description: event?.description,
                meeting_link: item?.meeting_link,
                event_location: item?.event_location,
                createdAt: item?.createdAt,
                updatedAt: item?.updatedAt,
                first_name: item?.User?.first_name,
                last_name: item?.User?.last_name,
                feedId: event?.id,
                images: event?.images,
                is_send: event?.is_send,
                is_visibility: event?.is_visibility,
                createdAt: event?.createdAt,
                updatedAt: event?.updatedAt,
              }
            )
          })

        } else {
          eventStories.push(
            {
              type: 'Announcement',
              status: item?.status,
              event_id: item?.announcement_id,
              created_by: item?.created_by,
              title: item?.title,
              image: item?.image,
              thumbnail_title: '',
              thumbnail_image: '',
              start_date: '',
              start_time: '',
              end_date: '',
              end_time: '',
              time_zone: '',
              guest: '',
              event_type: '',
              all_day: '',
              notification_time: '',
              joining_mandatory: '',
              rsvp_visibility: '',
              url: item?.annoucement_link_url,
              link: item?.annoucement_link_title,
              notification_duration_time: '',
              notification_duration_type: '',
              participation_type: '',
              attachment: item?.attachment,
              description: item?.description,
              meeting_link: '',
              event_location: '',
              createdAt: item?.createdAt,
              updatedAt: item?.updatedAt,
              first_name: '',
              last_name: '',
              feedId: item?.announcement_id,
              images: item?.image,
              is_send: item?.is_send,
              is_visibility: item?.is_visibility,
            }
          )
        }
        navigation.navigate(NavString.AUTH_STACK, {
          screen: NavString.EVENTSTORIES,
          params: { events: eventStories }
        })
      }

      }>
        <View style={{
          borderRadius: widthPercentageToDP(100),
          borderColor: PRIMARY_COLOR,
          borderWidth: 2,
          padding: 1
        }}>
          <Image style={[styles.storyImageStyle]} source={item.announcement_id == undefined || item.announcement_id == null ? item?.thumbnail_image == null || item?.thumbnail_image == '' ? DUMMY : { uri: item?.thumbnail_image } : item?.image == null || item?.image == '' ? DUMMY : { uri: item?.image }} />
        </View>
        <CustomText children={item.announcement_id == undefined || item.announcement_id == null ? item?.thumbnail_title : item?.title} style={styles.avatarTextStyle} numberOflines={1} />
      </TouchableOpacity>
    );

  }


  // Horizontal List set Banner's List 
  // eslint-disable-next-line react/no-unstable-nested-components
  const InstaStoryEventListHeader = () => {

    const eventData = []

    // events.map(item => {
    //   let stories = []
    //   if (item?.EventFeeds?.length != 0) {
    //     item?.EventFeeds?.map(item => {
    //       stories.push({
    //         story_id: item?.id,
    //         story_image: item?.images,
    //         swipeText: ' ',
    //         onPress: () => {

    //         },
    //       })
    //     })
    //   } else {
    //     stories.push({
    //       story_id: item?.event_id,
    //       story_image: item?.thumbnail_image,
    //       swipeText: ' ',
    //       onPress: () => {

    //       },
    //     })
    //   }

    //   eventData.push(
    //     {
    //       user_id: item?.event_id,
    //       user_image: item?.thumbnail_image,
    //       user_name: item?.thumbnail_title,
    //       stories: stories
    //     }
    //   )

    // })

    announcement?.map(item => {
      //console.log('item------->', item);
      // if (!storeIds.includes(item?.announcement_id)) {
      eventData.push(item)
      // }
    })



    events?.map(item => {
      eventData.push(item)
    })


    return (
      <View style={{ height: heightPercentageToDP(16), backgroundColor: WHITE }}>
        {/* <InstaStory
          style={{
            marginEnd: heightPercentageToDP(2),
            marginStart: heightPercentageToDP(2),
          }}
          data={eventData}
          duration={10}
          avatarImageStyle={styles.storyImageStyle}
          avatarWrapperStyle={styles.storyContainerStyle}
          unPressedBorderColor={PRIMARY_COLOR}
          renderCloseComponent={({ item, onPress }) => (
            <TouchableOpacity style={{ backgroundColor: BLACK }} onPress={onPress}>
              <Image source={AssetsImages.CLOSE} tintColor={WHITE} />
            </TouchableOpacity>
          )}
          avatarTextStyle={styles.avatarTextStyle}
          storyImageStyle={{ resizeMode: 'contain' }}
          storyContainerStyle={{ height: '100%', width: '100%' }}
          unPressedAvatarTextColor={PRIMARY_COLOR}
          pressedAvatarTextColor={PRIMARY_COLOR}

        /> */}

        {/* Events List */}
        <FlatList
          style={{ flex: 1, marginHorizontal: widthPercentageToDP(4), marginEnd: widthPercentageToDP(6) }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={eventData}
          renderItem={({ item }) => <EventItem item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  // Title Header Name Set Categoary List Data
  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderSectionHeader = ({ section, index }) => {
    return (
      <View style={{ marginTop: 10, marginBottom: 8 }}>
        <CustomText
          children={section.groupName}
          style={[styles.headerTitle, { marginStart: index != 0 ? 16 : 0, marginTop: index != 0 ? 10 : 0, }]}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Use Animated.View to animate the search box */}
      {events.length == 0 && announcement.length == 0 ?
        null : <InstaStoryEventListHeader />
      }
      {/** Banner List and Category List data set SectionList View */}
      <ScrollView style={styles.flatViewStyle} onScroll={handleScrollwithDirection}>
        {searchVisible ?
          <CustomSearchBox onPress={(text) => searchHandler(text)}
            clear={searchClear} /> : null
        }

        {filterData ?
          <SectionList
            bounces={false}
            sections={filterData}
            nestedScrollEnabled={false}
            renderItem={RenderSection}
            renderSectionHeader={RenderSectionHeader}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            stickySectionHeadersEnabled={false}
          // onLayout={handleLayoutLoaded}
          />
          : null}
      </ScrollView>
    </View>
  );
};

export default DashboardList;
