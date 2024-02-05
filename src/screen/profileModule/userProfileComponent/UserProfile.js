import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Linking
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './Style';
import { USER, LINKEDIN, WEBSITE } from '../../../utils/AssetsImages';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppString from '../../../utils/AppString';
import CustomText from '../../../component/atoms/CustomText';
import useApiEffect from '../../../hooks/useApiEffect';
import { USER_PROFILE_DETAILS } from '../../../services/ApiEndPoint';
import AppLoader from '../../../utils/AppLoader';
import { useSelector, useDispatch } from 'react-redux';
import { GREY } from '../../../theme/Colors';
import { userProfileData } from '../../../redux/slices/AuthSlice';
import { isNullOrUndefinedOrBlank, onScrollHandler, safeParseJSON } from '../../../utils/Constant';
import { onTabBarSroll } from '../../../redux/slices/TabBarSlice';
import moment from 'moment';

const UserProfile = ({ userId }) => {
  const dispatch = useDispatch();
  const [seeMore, setSeeMore] = useState(false);
  const { makeApiRequest, loading } = useApiEffect()
  const [data, setData] = useState(null);
  const [educationDetails, setEducationDetails] = useState(null)
  const [certificationDetails, setCertificationDetails] = useState(null)
  const [experianceDetails, setExperianceDetails] = useState(null)
  const loginUserData = useSelector((state) => state?.auth?.profileData);
  const websiteUrl = loginUserData?.websiteUrl;
  const linkedInUrl = loginUserData?.linkedinUrl;
  const profileImage = loginUserData?.profile_image

  const onScroll = (e) => {
    const hideTabBar = onScrollHandler(e)
    dispatch(onTabBarSroll(hideTabBar))
  }

  const MyProfileList = ({ title, value }) => {
    return (
      <View style={styles.item}>
        <CustomText style={styles.title}>{title}:</CustomText>
        <CustomText style={styles.title2}>{value}</CustomText>
      </View>
    );
  };

  // FOR CERTIFICATE
  const CertificateListRender = (item) => {

    const startYear = moment(item.issue_date, 'DD-MM-YYYY').format('YYYY');
    const endYear = moment(item?.expire_date, 'DD-MM-YYYY').format('YYYY');
    return (
      <View style={styles.stepperItemContainer}>
        <View style={styles.stepperItemInnerContainer}>
          <View
            style={styles.stepperItemCircle}
          />
          <View
            style={styles.stepperItemLine}
          />
        </View>

        <View
          style={styles.stepperItemTextContainer}>
          <CustomText
            children={item?.certification_name}
            style={styles.stepperTopText}
          />
          <CustomText
            children={item?.institute}
            style={styles.stepperMiddleText}
          />
          <CustomText
            children={startYear == endYear ? startYear : startYear + " - " + endYear}
            style={styles.stepperBottomText}
          />
        </View>
      </View>
    );
  };
  // EDUCATION LIST
  const EducationListRender = (item) => {

    const startYear = moment(item.start_date, 'DD-MM-YYYY').format('YYYY');
    const endYear = moment(item.end_date, 'DD-MM-YYYY').format('YYYY');

    return (
      <View style={styles.stepperItemContainer}>
        <View style={styles.stepperItemInnerContainer}>
          <View
            style={styles.stepperItemCircle}
          />
          <View
            style={styles.stepperItemLine}
          />
        </View>
        <View
          style={styles.stepperItemTextContainer}>
          <CustomText
            children={item.course}
            style={styles.stepperTopText}
          />
          <CustomText
            children={item.board}
            style={styles.stepperMiddleText}
          />
          <CustomText
            children={startYear == endYear ? startYear : startYear + " - " + endYear}
            style={styles.stepperBottomText}
          />
        </View>
      </View>
    );
  };

  // For Experience
  const RenderExperienceList = (item) => {
    return <View key={item?.id} style={styles.SkillsAndHobbiesContainer}>
      <CustomText style={styles.SkillsAndHobbiesItemText}>{item?.company_name}</CustomText>
    </View>
  };

  // For Hobbies
  const RenderHobbiesList = (item) => {
    return <View key={item?.id} style={styles.SkillsAndHobbiesContainer}>
      <CustomText style={styles.SkillsAndHobbiesItemText}>{item?.Hobby?.hobby_tittle}</CustomText>
    </View>
  };

  // for Skill List
  const RenderSkillList = (item) => {
    return <View key={item?.id} style={styles.SkillsAndHobbiesContainer}>
      <CustomText style={styles.SkillsAndHobbiesItemText}>{item?.Skill?.skill_name}</CustomText>
    </View>
  };

  {/* Links Section*/ }
  const MyProfileLink = ({ title, data }) => {
    return (
      <>
        <View style={[styles.item]}>
          <View style={styles.profileListGridInnerContainer}>
            <View style={[styles.profileListGridTitleContainerStyle]}>
              <CustomText style={[styles.title, {}]}>
                {title}
              </CustomText>
            </View>
            {
              data.map((item, index) => {
                return (
                  <View style={{}}>
                    <TouchableOpacity onPress={() => Linking.openURL(item?.socialLink)} style={styles.socialLinkContainerStyle}>
                      <View style={styles.socialLinkInnerContainerStyle}>
                        <Image source={item.img} style={styles.socialLinkImageStyle} />
                        <CustomText
                          children={item?.name}
                          style={styles.socialLinkTextStyle}
                        />
                      </View>
                      <CustomText
                        children={item?.linked}
                        style={styles.linkedText}
                      />
                    </TouchableOpacity>
                    {(item.linked !== 'Linked') ? <View style={styles.linksLineStyle} /> : null}
                  </View>)
              })}
          </View>
        </View>
      </>
    );
  };

  // EDUCATION LIST And CERTIFICATE FLATLIST HERE
  const MyProfileStepper = ({ title, data }) => {
    return (
      <View style={styles.item}>
        <View style={styles.profileListGridInnerContainer}>
          <View style={styles.profileListGridTitleContainerStyle}>
            <CustomText style={[styles.title]}>{title}:</CustomText>
            <CustomText style={styles.profileListGridTitleValueStyle}>
              {data?.education == null && title == AppString.EDUCATION ? AppString.NO_DATA_ADDED :
                data?.certifications == null && title == AppString.CERTIFICATION ? AppString.NO_DATA_ADDED : null}
            </CustomText>
          </View>
          {
            title == AppString.EDUCATION ?
              <FlatList
                style={{ marginTop: 15 }}
                data={data?.education}
                renderItem={({ item }) => EducationListRender(item)}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
              :
              <FlatList
                style={{ marginTop: 15 }}
                data={data?.certifications}
                renderItem={({ item }) => CertificateListRender(item)}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />}
        </View>
      </View>
    );
  };

  // SKILL, HOBBIES FLATLIST
  const MyProfileListGrid = ({ title, listData }) => {
    return (
      <View style={styles.item} id={title}>
        <View style={styles.profileListGridInnerContainer}>
          <View style={styles.profileListGridTitleContainerStyle}>
            <CustomText style={[styles.title]}>
              {title}: {title == AppString.EMPLOYEE_EXPERENCE ? <CustomText style={[styles.title, { color: GREY }]}>{data?.total_experiance}</CustomText> : <></>}
            </CustomText>
            <CustomText style={styles.noDataText}>{
              title == AppString.SKILLS && listData == null || listData == '' ? AppString.NO_DATA_ADDED : null
            }</CustomText>
          </View>

          {/* 3 Flatlist are here 
          for 1 is Hobbies List 
          2 for Experience List
          3 for User Skill List */}
          {title == 'Hobbies' ?
            <FlatList
              columnWrapperStyle={{ flexWrap: 'wrap' }}
              data={listData}
              renderItem={({ item }) => (
                RenderHobbiesList(item)
              )}
              keyExtractor={item => item.id}
              numColumns={3}
              scrollEnabled={false}
            /> : title == AppString.EMPLOYEE_EXPERENCE ? <FlatList
              columnWrapperStyle={{ flexWrap: 'wrap' }}
              data={listData}
              renderItem={({ item }) => (
                RenderExperienceList(item)
              )}
              keyExtractor={item => item.id}
              numColumns={3}
              scrollEnabled={false}
            /> : <FlatList
              contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
              data={listData}
              renderItem={({ item }) => (
                RenderSkillList(item)
              )}
              keyExtractor={item => item.id}
              numColumns={2}
              scrollEnabled={false}
            />}
        </View>
      </View>
    );
  };

  // Api Calling Here
  useEffect(() => {
    async function GET_PROFILE_DETAILS_API() {
      const apiData = await makeApiRequest({ url: USER_PROFILE_DETAILS, method: 'POST', isToken: true, data: { user_id: userId + "" } });

      if (apiData?.status == true) {
        setEducationDetails(safeParseJSON(apiData?.data?.education_detail));
        setCertificationDetails(safeParseJSON(apiData?.data?.certifications));
        const company = safeParseJSON(apiData?.data?.experiance)?.company
        setExperianceDetails(company)
        setData(apiData?.data)
        dispatch(userProfileData(apiData?.data))

      } else {
        // console.log("PROFILE API ERROR: ", apiData)
      }
    }
    GET_PROFILE_DETAILS_API()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollViewContainer}
        enableOnAndroid={true}
        onScroll={(e) => onScroll(e)}
      >
        <View style={styles.scrollViewInnerContainer}>
          {/* About Section */}
          <View style={[styles.item, styles.aboutView]}>
            <CustomText children={AppString.ABOUT} style={styles.aboutTitleStyle} />
            <View style={styles.row}>
              <Text numberOfLines={seeMore ? 0 : 2} style={[styles.title2, { marginStart: 0 }]}>
                {data?.about == null ? AppString.NO_DATA_ADDED : data?.about}
              </Text>
              {data?.about == null ? null :
                <Text onPress={() => setSeeMore(!seeMore)} style={styles.seeMore}>
                  {seeMore ? AppString.LESS : AppString.MORE}
                </Text>}
            </View>
          </View>

          {/* Educatation */}
          <MyProfileStepper
            title={AppString.EDUCATION}
            data={educationDetails}
          />

          {/* Certificate */}
          <MyProfileStepper
            title={AppString.CERTIFICATION}
            data={certificationDetails}
          />

          {/* Skill List */}
          <MyProfileListGrid
            title={AppString.SKILLS}
            listData={data?.Userskills}
          />

          {/* Experince */}
          <MyProfileListGrid
            title={AppString.EMPLOYEE_EXPERENCE}
            titleValue={data?.total_experiance}
            logo={USER}
            listData={experianceDetails}
          />

          {/* joined date */}
          <MyProfileList value={moment(data?.date_of_joining).format('MMM YYYY')} title={AppString.JOINED_SINCE} />

          {/* Acheivement */}
          <MyProfileList
            value={data?.achievements == null ? AppString.NO_DATA_ADDED : data?.achievements}
            title={AppString.ACHIEVEMENT}
          />

          {/* Date of birth */}
          <MyProfileList value={moment(data?.date_of_birth?.substring(0, 10)).format('DD MMM')} title={AppString.DOB} logo={USER} />

          {/* Email ID */}
          <MyProfileList
            value={data?.email}
            title={AppString.EMAIL_ID}
          />

          {/* Phone Number */}
          {/* <MyProfileList value={data?.phone_number} title={AppString.CONTACT} /> */}

          {/* Reporting Manager */}
          <MyProfileList
            value={data?.reporting_manager?.first_name + ' ' + data?.reporting_manager?.last_name}
            title={AppString.REPORTING_MANAGER}
          />

          {/* hobbies */}
          <MyProfileListGrid
            title={AppString.HOBBIES}
            logo={USER}
            listData={data?.Userhobbies}
          />


          {/* SOCIAL LINK */}
          {!isNullOrUndefinedOrBlank(data?.linkedin_url) &&
            !isNullOrUndefinedOrBlank(data?.website_url) &&
            <MyProfileLink
              title={AppString.LINKS}
              data={
                !isNullOrUndefinedOrBlank(data?.linkedin_url) ?
                  [
                    {
                      id: 1,
                      name: AppString.LINKEDIN,
                      img: LINKEDIN,
                      linked: AppString.LINKED,
                      socialLink: data?.linkedin_url
                    }] :
                  !isNullOrUndefinedOrBlank(data?.website_url) ? [
                    {
                      id: 2,
                      name: AppString.WEBSITE,
                      img: WEBSITE,
                      linked: AppString.LINKED,
                      socialLink: data?.website_url

                    },
                  ] : []} />
          }
        </View>
      </KeyboardAwareScrollView>

    </SafeAreaView>
  );
};

export default UserProfile;
