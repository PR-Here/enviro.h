import { AppState, BackHandler, SafeAreaView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './Style';
import BannerHeader from './BannerHeader';
import DashboardList from './DashboardList';
import useApiEffect from '../../hooks/useApiEffect'
import { DASHBOARD, DASHBOARD_PERMISSION } from '../../services/ApiEndPoint';
import NavString from '../../utils/NavString';
import AppLoader from '../../utils/AppLoader';
import { useSelector } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import { useIsFocused } from '@react-navigation/native';
import { calculateAge } from '../../utils/Constant';
import { checkVersion } from "react-native-check-version";
import DeviceInfo from 'react-native-device-info';
import { Linking, Platform, Alert } from 'react-native'; // Import Alert from 'react-native'
import AppLockModal from '../../component/modal/AppLockModal';

var isFirstTime = true

const Dashboard = ({ navigation }) => {
  const { makeApiRequest, loading } = useApiEffect()
  const storeIds = useSelector((state) => state.onboarding.announcement)
  const [eventData, setEventData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [notificationData, setNotification] = useState(null)
  const [sectionListData, setSectionList] = useState(null)
  const [searchClear, setSearchClear] = useState(false);
  //console.log('isFirstTime outer', isFirstTime);
  const [isUpdate, setIsUpdate] = useState(false);

  /**
   * checking announcement store ids with api response 
   */
  function filterApiResponseByIds(ids, response) {
    return response.filter(item => !ids.includes(item.announcement_id));
  }
  const isFocused = useIsFocused();
  const [appState, setAppState] = useState(AppState.currentState);

  // Api call
  useEffect(() => {
    //console.log('isFocused', isFocused);
    if (isFocused) {
      setIsUpdate(false)
      checkAppVersion();
      callAPI()
      callPermissionAPI()

      const handleAppStateChange = (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          // App has come from the background to the foreground
          console.log('App is in the foreground!');
          setIsUpdate(false)
          checkAppVersion();
        }
        setAppState(nextAppState);
      };

      // Subscribe to app state changes
      const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

      // Clean up the subscription when the component is unmounted
      return () => {
        appStateSubscription.remove();
      };
    }
  }, [isFocused, appState]);

  const checkAppVersion = async () => {
    try {

      const version = await checkVersion();
      //console.log("DeviceInfo version:", DeviceInfo.getVersion());
      // console.log("Got version version:", version.version);

      if (version?.version != null && DeviceInfo.getVersion() != version?.version) {
        setIsUpdate(true)
      } else {
        // App is up-to-date; proceed with the app
        console.log("No need to update");
      }
    } catch (error) {
      // Handle error while checking app version
      console.error('Error checking app version:', error);
    }
  };

  const callAPI = async () => {
    const apiData = await makeApiRequest({ url: DASHBOARD, method: 'POST', isToken: true });
    if (apiData?.status == true) {
      setSearchClear(true)
      setEventData(apiData?.data?.event)
      setNotification(apiData?.data?.notification_count)
      //console.log('isFirstTime---->', isFirstTime);
      const filteredData = filterApiResponseByIds(storeIds, apiData?.data?.announcement);
      setFilteredData(filteredData)
      if (isFirstTime) {
        if (filteredData.length != 0) {
          //console.log('if');
          isFirstTime = false
          navigation.navigate(NavString.AUTH_STACK, {
            screen: NavString.ONBOARDING,
            params: { announcement: filteredData }
          })
        }
      }
    } else {
      console.log("Dashboard Api Error: ", apiData);
    }
  }

  const callPermissionAPI = async () => {
    const apiDataPermission = await makeApiRequest({ url: DASHBOARD_PERMISSION, method: 'POST', isToken: true });
    if (apiDataPermission?.status == true) {
      // Group the data by group_name
      const groupedData = apiDataPermission?.data.reduce((result, item) => {
        const groupName = item.moduleGroup.group_name;

        // Create a group if it doesn't exist
        if (!result[groupName]) {
          result[groupName] = [];
        }

        // Add the item to the group
        result[groupName].push(item);

        return result;
      }, {});

      // Step 2: Sort each group's array based on "status" key
      for (const groupName in groupedData) {
        if (groupedData.hasOwnProperty(groupName)) {
          groupedData[groupName].sort((a, b) => {
            // If "status" is 1, prioritize it by placing it first
            if (a.status === 1 && b.status !== 1 || a.is_mobile === 1 && b.is_mobile !== 1) {
              return -1;
            } else if (b.status === 1 && a.status !== 1 || b.is_mobile === 1 && a.is_mobile !== 1) {
              return 1;
            }

            // For other cases, sort based on "status" in ascending order
            return a.status - b.status || a.is_mobile - b.is_mobile;
          });
        }
      }
      // Convert the grouped data into an array of objects
      const groupedArray = Object.keys(groupedData).map(groupName => ({
        groupName,
        data: [{ list: groupedData[groupName] }],
      }));
      setSectionList(groupedArray)
    } else {
      console.log("Dashboard Permission Api Error: ", apiDataPermission);
    }
  }

  return (
    <>
      <SafeAreaView style={[styles.container, styles.imgBackground]}>
        {/** Set Banner Header Image and event in Dashboad Screen using Component */}
        <BannerHeader notificationCount={notificationData} />
        {/** Set event list and section list data in Dashboad Screen using Component */}
        <DashboardList searchClear={searchClear} events={eventData} announcement={filteredData} sectionListDetails={sectionListData} />
        {/** App Loader Set Response for data using dashboard Api */}
        <AppLoader isLoading={loading} style={{ marginTop: 18 }} />
      </SafeAreaView>
      <View>
        <AppLockModal
          message='Update Required ! A new version of the app is available. Please update to continue using the app.'
          buttonText='Update Now'
          visible={isUpdate}
          onDone={() => {
            setIsUpdate(false)
            Linking.openURL(
              Platform.OS === 'ios'
                ? 'https://apps.apple.com/in/app/'
                : 'https://play.google.com/store/apps/details?id=com.enviro&hl=us'
            );
          }
          }
        />
      </View>
    </>

  );
};
export default Dashboard;
