import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Linking } from 'react-native';
import PagerView from 'react-native-pager-view';
import Page from '../../component/intro/page';
import { saveAnnouncement } from '../../redux/slices/OnboardingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { openUrl } from '../../utils/Constant';


const Onboarding = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const storeIds = useSelector((state) => state.onboarding.announcement)

  const [lastIndex, setLastIndex] = useState(0)

  const { announcement } = route?.params

  const onBackHandler = () => {
    navigation.goBack()
  }

  const getFooterText = (pos) => {
    if (announcement.length == 1) {
      return ""
    } else if (pos < announcement.length - 1) {
      return "Swipe Right to Read More Announcement"
    } else {
      return "Swipe Left to Go Back"
    }
  }

  useEffect(() => {
    getZeroIndexData()
  }, [])


  const getZeroIndexData = () => {
    if (announcement[lastIndex]?.is_visibility === 1) {
      if (!storeIds.some(value => value == announcement[lastIndex].announcement_id)) {
        dispatch(saveAnnouncement(announcement[lastIndex].announcement_id))
      }
    }
  }


  const onPageScroll = async (index) => {
    if (lastIndex != index?.nativeEvent?.position) {
      setLastIndex(index?.nativeEvent?.position)
      if (announcement[index?.nativeEvent?.position]?.is_visibility === 1) {
        if (!storeIds.some(value => value == announcement[index?.nativeEvent?.position].announcement_id)) {
          dispatch(saveAnnouncement(announcement[index?.nativeEvent?.position].announcement_id))
        }
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* <Image source={AssetsImages.CLOSE} /> */}
        <PagerView style={{ flex: 1 }} onPageScroll={onPageScroll}>
          {announcement?.map((item, index) => {
            return (
              <View key={index}>
                <Page
                  item={item}
                  footerTitle={getFooterText(index)}
                  onPress={onBackHandler}
                  onDownloadClick={() => {
                    openUrl(item?.attachment ? item?.attachment : '')
                  }}
                  onClickLink={() => {
                    openUrl(item?.annoucement_link_url ? item?.annoucement_link_url : '')
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

export default Onboarding;
