import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Linking,
    Dimensions,
    Platform,

} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './Style';
import { USER, LINKEDIN, WEBSITE } from '../../../../utils/AssetsImages';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppString from '../../../../utils/AppString';
import CustomText from '../../../../component/atoms/CustomText';
import useApiEffect from '../../../../hooks/useApiEffect';
import { USER_PROFILE_DETAILS } from '../../../../services/ApiEndPoint';
import { useSelector, useDispatch } from 'react-redux';
import { GREY, WHITE } from '../../../../theme/Colors';
import { userProfileData, userSelectedHobbies, userSelectedSkill } from '../../../../redux/slices/AuthSlice';
import { ShowToast, isNullOrUndefinedOrBlank, onScrollHandler, safeParseJSON } from '../../../../utils/Constant';
import { onTabBarSroll } from '../../../../redux/slices/TabBarSlice';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';
import { useIsFocused } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

let hideTabBar = false;

const ProfessionalManagerDetail = ({ userId, loginRole }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const loginUserData = useSelector((state) => state?.auth?.profileData);
    const userLocalSkillData = useSelector((state) => state?.auth?.localSavedSkill);
    const [seeMore, setSeeMore] = useState(false);
    const { makeApiRequest, loading } = useApiEffect()
    const [data, setData] = useState(null);
    const [educationDetails, setEducationDetails] = useState(safeParseJSON(loginUserData?.education_detail))
    const [certificationDetails, setCertificationDetails] = useState(safeParseJSON(loginUserData?.certifications))
    const [experianceDetails, setExperianceDetails] = useState(safeParseJSON(loginUserData?.experiance)?.company);
    const [userSkillData, setUserSkillData] = useState(userLocalSkillData);
    const [userHobbiesData, setUserHobbiesData] = useState(loginUserData?.Userhobbies);

    let loginUserId = ''
    if (loginRole == 'manager') {
        loginUserId = userId;
    } else {
        loginUserId = useSelector((state) => state?.auth?.loginUser?.user_id);
    }

    const onScroll = (e) => {
        hideTabBar = onScrollHandler(e)
        dispatch(onTabBarSroll(hideTabBar))
    }

    const emailHandle = (email) => {
        Linking.openURL(`mailto:${email}?subject=SendMail&body=Description`);
    };

    const emailLongPressHandle = (emailPress) => {
        Clipboard.setString(emailPress)
        ShowToast('copy email address!!')
    }

    const phoneLongPressHandle = (phonePress) => {
        Clipboard.setString(phonePress)
        ShowToast('copy phone number!!')
    }
    {/** Phone call */ }
    const dialCall = number => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }
        Linking.openURL(phoneNumber);
    };

    const MyProfileList = ({ title, value }) => {
        return (
            <>
                {(title == AppString.CONTACT) ?
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            dialCall(value)
                        }}
                        onLongPress={() => { phoneLongPressHandle(value) }}
                        delayLongPress={1000}
                        style={{ backgroundColor: WHITE }}
                    >
                        <View style={styles.item}>
                            <CustomText style={styles.title}>{title}:</CustomText>
                            <CustomText style={styles.title2}>{value}</CustomText>
                        </View>
                    </TouchableOpacity>
                    : (title == AppString.EMAIL_ID) ?
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => {
                                emailHandle(value)
                            }}
                            onLongPress={() => { emailLongPressHandle(value) }}
                            delayLongPress={1000}
                            style={{ backgroundColor: WHITE }}
                        >
                            <View style={styles.item}>
                                <CustomText style={styles.title}>{title}:</CustomText>
                                <CustomText style={styles.title2}>{value}</CustomText>
                            </View>
                        </TouchableOpacity>
                        : <View style={styles.item}>
                            <CustomText style={styles.title}>{title}:</CustomText>
                            <CustomText style={styles.title2}>{value}</CustomText>
                        </View>}
            </>
        );
    };

    // FOR CERTIFICATE
    const CertificateListRender = (item) => {
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
                        children={moment(item?.issue_date, 'DD-MM-YYYY').format('MMM YYYY') + " - " + moment(item?.expire_date, 'DD-MM-YYYY').format('MMM YYYY')}
                        // children={`${item?.issue_date} - ${item?.expire_date}`}
                        style={styles.stepperBottomText}
                    />
                </View>
            </View>
        );
    };
    // EDUCATION LIST
    const EducationListRender = (item) => {
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
                        children={item?.course}
                        style={styles.stepperTopText}
                    />
                    <CustomText
                        children={item?.board}
                        style={styles.stepperMiddleText}
                    />
                    <CustomText
                        children={moment(item?.start_date, 'DD-MM-YYYY').format('YYYY') + " - " + moment(item?.end_date, 'DD-MM-YYYY').format('YYYY')}
                        // children={`${item?.start_date} - ${item?.end_date}`}
                        style={styles.stepperBottomText}
                    />
                </View>
            </View>
        );
    };

    // For Experience
    const RenderExperienceList = (item) => {
        return <View style={styles.SkillsAndHobbiesContainer}>
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
        return <View key={item?.id} style={[styles.SkillsAndHobbiesContainer, {
            // width: screenWidth / 4,
        }]}>
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


        // SORT CERTIFICATE DATA ACCORDING TO THE DATE
        const sortedCertificationsData = data?.certifications?.sort((a, b) => {
            const dateA = new Date(a.expire_date.split("-").reverse().join("-"));
            const dateB = new Date(b.expire_date.split("-").reverse().join("-"));
            return dateB - dateA;
        });

        return (
            <View style={[styles.item]}>
                <View style={styles.profileListGridInnerContainer}>
                    <View style={styles.profileListGridTitleContainerStyle}>
                        <CustomText style={[styles.title]}>{title}:</CustomText>
                        <CustomText style={styles.profileListGridTitleValueStyle}>
                            {data == null && title == AppString.EDUCATION ? AppString.NO_DATA_ADDED :
                                data?.certifications == null && title == AppString.CERTIFICATION ? AppString.NO_DATA_ADDED : null}
                        </CustomText>
                    </View>
                    {
                        title == AppString.EDUCATION ?
                            <FlatList
                                style={{ marginTop: 15 }}
                                data={data}
                                renderItem={({ item }) => EducationListRender(item)}
                                keyExtractor={(item, index) => `${index}`}
                                scrollEnabled={false}

                            />
                            :
                            <FlatList
                                style={{ marginTop: 15 }}
                                data={sortedCertificationsData}
                                renderItem={({ item }) => CertificateListRender(item)}
                                keyExtractor={(item, index) => `${index}`}
                                scrollEnabled={false}
                            />
                    }
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
                            {title}: {title == AppString.EXPERIENCE ? <CustomText style={[styles.title, { color: GREY }]}>{data?.total_experiance}</CustomText> : <></>}
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
                            keyExtractor={(item, index) => `${index}`}
                            numColumns={5}
                            scrollEnabled={false}
                        /> : title == 'Experience' ? <FlatList
                            columnWrapperStyle={{ flexWrap: 'wrap' }}
                            data={listData}
                            renderItem={({ item }) => (
                                RenderExperienceList(item)
                            )}
                            keyExtractor={(item, index) => `${index}`}
                            numColumns={5}
                            scrollEnabled={false}
                        /> : <FlatList
                            columnWrapperStyle={{ flexWrap: 'wrap' }}
                            data={listData}
                            renderItem={({ item }) => (
                                RenderSkillList(item)
                            )}
                            keyExtractor={(item, index) => `${index}`}
                            numColumns={5}
                            scrollEnabled={false}
                        />}
                </View>
            </View>
        );
    };

    // API CALLED USER PROFFESSIONAL DETAILS
    useEffect(() => {
        async function GET_PROFILE_DETAILS_API() {
            const apiData = await makeApiRequest({ url: USER_PROFILE_DETAILS, method: 'POST', isToken: true, data: { user_id: loginUserId + "" }, showProgress: false });
            if (apiData != undefined)
                if (apiData?.status == true) {
                    setData(apiData?.data);
                    dispatch(userProfileData(apiData?.data));
                    // HERE WE SAVED HOOBY AND SKILL DIFFERNTLY 
                    // BECAUSE USER CAN EDIT THEM AND  NEED TO PASS ID ARRAY IN USER EXPERINCE SCREEN;
                    const modifiedDataofHobbies = apiData?.data?.Userhobbies?.filter(item => item.Hobby && item.Hobby.hobbies_id)
                        .map(item => item.Hobby.hobbies_id);
                    dispatch(userSelectedHobbies(modifiedDataofHobbies));
                    const modifiedDataofSkills = apiData?.data?.Userskills?.filter(item => item.Skill && item.Skill.skill_id)
                        .map(item => item.Skill.skill_id);
                    dispatch(userSelectedSkill(modifiedDataofSkills));
                    // SET USER EDUCATION DETAILS WITH SORT DATA  ALSO
                    const educationDetails = JSON.parse(apiData?.data?.education_detail);

                    const sortedEducationDetails = educationDetails?.education?.sort((a, b) => {
                        const dateA = new Date(a.end_date.split("-").reverse().join("-"));
                        const dateB = new Date(b.end_date.split("-").reverse().join("-"));
                        return dateB - dateA;
                    });
                    setEducationDetails(sortedEducationDetails);
                    // SET CERTIFICATE DATA
                    const certificareDetails = JSON.parse(apiData?.data?.certifications);
                    setCertificationDetails(certificareDetails);

                    const experianceDetails1 = JSON.parse(apiData?.data?.experiance)?.company;
                    setExperianceDetails(experianceDetails1);


                } else {
                    console.log("PROFILE API ERROR: ", apiData)
                    ShowToast(`${apiData}`)
                    /* The above code is calling a function named GET_PROFILE_DETAILS_API(). */
                }
        }
        GET_PROFILE_DETAILS_API()
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                style={styles.scrollViewContainer}
                enableOnAndroid={true}
                onScroll={(e) => onScroll(e)}>
                <View style={styles.scrollViewInnerContainer}>
                    {/* About Section */}
                    <View style={[styles.item, styles.aboutView, { marginTop: 0 }]}>
                        <CustomText children={AppString.ABOUT} style={styles.aboutTitleStyle} />
                        <View style={styles.row}>
                            <Text numberOfLines={seeMore ? 0 : 2} style={[styles.aboutText]}>
                                {data?.about == null ? AppString.LET_US_KNOW_MORE_ABOUT_YOU : data?.about}
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
                    {certificationDetails?.certifications == undefined
                        ? null :
                        <MyProfileStepper
                            title={AppString.CERTIFICATION}
                            data={certificationDetails}
                        />}

                    {/* Skill List */}
                    <MyProfileListGrid
                        title={AppString.SKILLS}
                        listData={data?.Userskills}
                    />


                    {/* Experince */}
                    <MyProfileListGrid
                        title={AppString.EXPERIENCE}
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
                    <MyProfileList value={data?.phone_number} title={AppString.CONTACT} />

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

export default ProfessionalManagerDetail;
