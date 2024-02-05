import {
  View,
  Platform,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Keyboard,
  Text,
  LayoutAnimation,
  UIManager
} from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { styles } from './Style';
import CustomText from '../../../../component/atoms/CustomText';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../../../component/atoms/CustomButton';
import AppString from '../../../../utils/AppString';
import {
  GREY, PRIMARY_COLOR,
} from '../../../../theme/Colors';
import { FontSize } from '../../../../theme/Fonts';
import AddNewEducationBottomNav from '../../educationBottomSheet/EducationBottomSheet';
import AddNewCertificationBottomNav from '../../certificateBottomSheet/CertificateBottomSheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useApiEffect from '../../../../hooks/useApiEffect';
import AppLoader from '../../../../utils/AppLoader';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_NEW_HOBBIES, ADD_NEW_SKILL, HOBBIES, SKILLS, UPDATE_PROFILE, USER_PROFILE_DETAILS } from '../../../../services/ApiEndPoint';
import { onScrollHandler, safeParseJSON, ShowToast } from '../../../../utils/Constant';
import CustomTextInput from '../../../../component/atoms/CustomTextInput';
import { onTabBarSroll } from '../../../../redux/slices/TabBarSlice';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { userProfileData, userSelectedHobbies, userSelectedSkill, clickOnIsEditProfile, setLocalUserSkill, setLocalUserHobbies } from '../../../../redux/slices/AuthSlice';
import CalenderIcon from '../../../../../assets/images/SVG/calendar_days.svg'
import moment from 'moment';
import { CheckmarkIcon } from '../../../../component/atoms/CheckmarkIcon';
import backButtonHandler from '../../../../component/molecules/BackButtonHandler';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import UpArrow from '../../../../../assets/images/SVG/arrow-up.svg';
import DownArrow from '../../../../../assets/images/SVG/downarrow.svg';


{/** Using Array Depened Component Send and Recived Data */ }
let isCertificateDataEdit = [];
let isEducationDataEdit = [];
let last_id = 0

const ProfessionalInfo = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const loginUserData = useSelector((state) => state?.auth?.profileData);
  const flatListRef = useRef(null)
  const ref = useRef(null);
  const { makeApiRequest, loading } = useApiEffect()
  const [dataSkills, setDataSkills] = useState([])
  const [filterSkills, setFilterSkills] = useState([])
  const [loader, setLoader] = useState(false);
  const [dataHobbies, setDataHobbies] = useState([])
  const [filterHobbies, setFilterHobbies] = useState([])
  const [data, setData] = useState(null);
  const [date, setDate] = useState(loginUserData?.date_of_birth?.substring(0, 10));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [name, setName] = useState(loginUserData?.first_name + " " + loginUserData?.last_name);
  const [about, setAbout] = useState(loginUserData?.about)
  const [designation, setDesignation] = useState(loginUserData?.Designation?.designation_name);
  const [email, setEmail] = useState(loginUserData?.email);
  const [reportingManage, setReportingManage] = useState(loginUserData?.reporting_manager);
  const [contact, setContact] = useState(loginUserData?.phone_number);
  const [joinedDate, setJoinedDate] = useState(loginUserData?.date_of_joining);
  const [achievement, setAchievement] = useState(loginUserData?.achievements);
  const userExperiance = safeParseJSON(loginUserData?.experiance)
  const [employeeExperence, setEmployeeExperience] = useState(safeParseJSON(loginUserData?.experiance)?.company);
  const [isAddEducationVisible, setIsAddEducationVisible] = useState(false);
  const [isAddCertificationVisible, setIsAddCertificationVisible] = useState(false);
  const [educationDetails, setEducationDetails] = useState(safeParseJSON(loginUserData?.education_detail) || {});
  const [certificationDetails, setCertificationDetails] = useState(safeParseJSON(loginUserData?.certifications))
  const [isShowHobbiesList, setISShowHobbiesList] = useState(false);
  const [isShowSkillList, setISShowSkillList] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTextSkill, setSearchTextSkill] = useState("");
  const loginUserId = useSelector((state) => state?.auth?.loginUser?.user_id)
  const [img, setImg] = useState(false)

  // WHEN USER COME TO THE EDIT PROFILE SCREEN THEN WITH
  // THE HELP OF THIS FUNCTION HE CAN RENAME HOBBY-ID
  // KEY TO ID AND SHOW HOBBYIS PRE-FILLED
  const modifiedDataofHobbies = loginUserData?.Userhobbies?.filter(item => item?.Hobby && item?.Hobby?.hobbies_id)
    .map(item => item?.Hobby?.hobbies_id);
  const [hobbiesItems, setHobbiesItems] = useState(modifiedDataofHobbies || []);
  // WHEN USER COME TO THE EDIT PROFILE SCREEN THEN WITH
  // THE HELP OF THIS FUNCTION HE CAN RENAME SKILL-ID
  // KEY TO ID AND SHOW SKILL PRE-FILLED
  const modifiedDataofSkills = loginUserData?.Userskills?.filter(item => item?.Skill && item?.Skill?.skill_id)
    .map(item => item?.Skill?.skill_id);
  const [selectedItemsOfSkills, setSelectedItemsOfSkills] = useState(modifiedDataofSkills || []);

  {/** Skill Prom Profile Api */ }
  useEffect(() => {
    const getProfessionalInfoSkillsList = async () => {
      const apiSkillResponce = await makeApiRequest({ url: USER_PROFILE_DETAILS, method: 'POST', isToken: true, data: { user_id: loginUserId + "" }, showProgress: false });
      setSelectedItemsOfSkills(apiSkillResponce?.data?.Userskills)
    }
    getProfessionalInfoSkillsList();
  }, []);

  {/** Hobbies From Profile Api */ }
  useEffect(() => {
    const getProfessionalInfoHobbiesList = async () => {
      const apiDataHobbies = await makeApiRequest({ url: USER_PROFILE_DETAILS, method: 'POST', isToken: true, data: { user_id: loginUserId + "" }, showProgress: false });
      setHobbiesItems(apiDataHobbies?.data?.Userhobbies)
    }
    getProfessionalInfoHobbiesList();
  }, []);

  // Skill From Master Api
  useEffect(() => {
    getSkillDataFromMaster()
  }, [])

  // Skill From Master Api
  const getSkillDataFromMaster = async () => {
    const apiDataSkill = await makeApiRequest({ url: SKILLS, method: 'GET', isToken: true, showProgress: false });
    setDataSkills(apiDataSkill?.data)
  }

  // Hobby From Master Api
  useEffect(() => {
    getHobbiesDataFromMaster()
  }, [])

  // Hobby From Master Api
  const getHobbiesDataFromMaster = async () => {
    const apiDataHobbies = await makeApiRequest({ url: HOBBIES, method: 'GET', isToken: true, showProgress: false });
    setDataHobbies(apiDataHobbies?.data);
  }

  const handleEducationClose = () => {
    setIsAddEducationVisible(false);
  };

  // IF USER EDIT THE CERTIFICATE OR ADD NEW CERTICATE THIS FUNCTION WILL BE CALLED 
  const handleCertificationSubmit = (updateCertificateData) => {
    setIsAddCertificationVisible(false);

    // Check if certificationDetails is null or undefined
    if (!certificationDetails) {
      // Initialize certificationDetails if it's null or undefined
      setCertificationDetails({ certifications: [] });
    }

    // Create a new copy of certificationDetails with the updated certifications array
    setCertificationDetails((prevCertificationDetails) => {
      const updatedCertificationDetails = { ...prevCertificationDetails };

      // Check if the certifications property exists in certificationDetails
      if (!updatedCertificationDetails.certifications) {
        // Initialize the certifications property as an empty array if it doesn't exist
        updatedCertificationDetails.certifications = [];
      }

      // Check if the certificate already exists in certificationDetails
      const existingIndex = updatedCertificationDetails.certifications.findIndex(
        (cert) => cert.id === updateCertificateData.id
      );

      if (existingIndex !== -1) {
        // Update the existing certificate
        updatedCertificationDetails.certifications[existingIndex] = updateCertificateData;
      } else {
        // Add the new certificate to the end of the array
        updatedCertificationDetails.certifications.push(updateCertificateData);
      }

      return updatedCertificationDetails;
    });
  };

  const handleCertificationClose = () => {
    setIsAddCertificationVisible(false);
  }

  // Api Call for Add Single Hobbies
  const AddNewHobbies = async (name) => {
    const apiResponce = await makeApiRequest({ url: ADD_NEW_HOBBIES, method: "POST", isToken: true, data: { hobby_tittle: name }, showProgress: false });
    ShowToast(`${apiResponce?.message}`)
    if (apiResponce?.status == true) {
      setSearchText("");
      setISShowHobbiesList(false);
      const newHobby = {
        user_hobbies_id: 1153, // Some unique ID for the new hobby
        hobbies_id: apiResponce?.data?.hobbies_id, // ID of the new hobby
        user_id: loginUserId,
        status: 0,
        createdAt: apiResponce?.data?.createdAt,
        updatedAt: apiResponce?.data?.creatupdatedAtedAt,
        Hobby: {
          hobbies_id: apiResponce?.data?.hobbies_id,
          hobby_tittle: apiResponce?.data?.hobby_tittle, // Name of the new hobby
          status: 1,
          createdAt: apiResponce?.data?.createdAt,
          updatedAt: apiResponce?.data?.updatedAt
        },
      }
      setHobbiesItems((prevHobbies) => [newHobby, ...prevHobbies]);
    } else {
      ShowToast(`${apiResponce?.error?.message}`)
    }
  }

  // Api Call for Add Single  Skills
  const AddNewSkill = async (name) => {
    const apiResponce = await makeApiRequest({ url: ADD_NEW_SKILL, method: "POST", isToken: true, data: { skill_name: name }, showProgress: false });
    ShowToast(`${apiResponce?.message}`)
    if (apiResponce?.status == true) {
      setSearchTextSkill("");
      setISShowSkillList(false);
      const newSkill = {
        user_skills_id: 975, // Some unique ID for the new skill
        skill_id: apiResponce?.data?.skill_id, // ID of the new skill
        user_id: loginUserId,
        skill_level: null,
        status: 1,
        createdAt: apiResponce?.data?.createdAt,
        updatedAt: apiResponce?.data?.updatedAt,
        Skill: {
          skill_id: apiResponce?.data?.skill_id,
          skill_name: apiResponce?.data?.skill_name, // Name of the new skill
          status: 1,
          createdAt: apiResponce?.data?.createdAt,
          updatedAt: apiResponce?.data?.updatedAt,
        },
      };
      setSelectedItemsOfSkills((prevSkills) => [newSkill, ...prevSkills]);
    }
    else {
      ShowToast(`${apiResponce?.error?.message}`)
    }
  }

  // AFTER CLICK ON SAVE BUTTON
  const handleSubmitClick = async () => {
    let educationArray = []
    let educationObject = {}
    let experience = {}
    let projectsDetails = {}
    let company = []
    let projects = []
    setLoader(true)
    if (educationDetails?.education) {

      educationObject["id"] = educationDetails?.education[0]?.id
      educationObject["course"] = educationDetails?.education[0]?.course
      educationObject["board"] = educationDetails?.education[0]?.board
      educationObject["start_date"] = educationDetails?.education[0]?.start_date
      educationObject["end_date"] = educationDetails?.education[0]?.end_date
      educationArray.push(educationObject)

      experience["id"] = educationDetails?.education[0]?.id
      experience["company_name"] = educationDetails?.education[0]?.company_name
      experience["designation"] = educationDetails?.education[0]?.designation
      experience["from_date"] = educationDetails?.education[0]?.from_date
      experience["to_date"] = educationDetails?.education[0]?.to_date

      projectsDetails["id"] = educationDetails?.education[0]?.id
      projectsDetails["role"] = educationDetails?.education[0]?.role
      projectsDetails["start_date"] = educationDetails?.education[0]?.start_date
      projectsDetails["end_date"] = educationDetails?.education[0]?.end_date

      projectsDetails["description"] = educationDetails?.education[0]?.description
    } else {
      // Handle the case where educationDetails?.education[0] is undefined
      //console.log("educationDetails?.education[0] is undefined");
    }
    projects.push(projectsDetails)
    experience['projects'] = projectsDetails
    company.push(experience);

    const editData = {
      about: about ? about : '',
      achivements: achievement ? achievement : '',
      skills: selectedItemsOfSkills?.map(item => item.skill_id),
      hobbies: hobbiesItems?.map(item => item.hobbies_id),
      education_detail: educationDetails,
      experience: userExperiance,
      certifications: certificationDetails,
      contact: contact
    }

    // console.log("==========editData============= ",JSON.stringify(editData));

    // Update Profile Api Call
    // AND IF WE ARE SAVED HERE SELECTED SKILL ARRAY AND SELECTED HOBBIES ARRAY
    // WE CAN GET THESE ARRAY IN USER EXPERINCE SCREEN AND CAN PASS IN API REQUEST
    // WE ALREADY SAVED HOBBIES AND SKILL ARRAY IN GET PROFILE API RESPONCE
    // BUT IF USER EDIT HOBBIES AND SKILL (ADD OR REMOVE) THEN WE ARE REPLACING OLD DATA WITH NEW HERE
    const apiEditResponce = await makeApiRequest({ url: UPDATE_PROFILE, method: "POST", isToken: true, data: editData, showProgress: false });
    ShowToast(`${apiEditResponce?.message}`)
    if (apiEditResponce != undefined) {
      if (apiEditResponce?.status == true) {
        setLoader(false)
        // Saved Hobbies Array for show in Non-Edit Screen 
        dispatch(setLocalUserHobbies(hobbiesItems));
        // Saved Skills Array for show in Non-Edit Screen 
        dispatch(setLocalUserSkill(selectedItemsOfSkills));
        dispatch(userSelectedHobbies(hobbiesItems));
        dispatch(userSelectedSkill(selectedItemsOfSkills));

        dispatch(clickOnIsEditProfile(false))
        dispatch(userProfileData(apiEditResponce?.data))
      } else setLoader(false)
    } else setLoader(false)
  };

  // CANCEL BUTTON CLICK
  const handleCancel = () => {
    dispatch(clickOnIsEditProfile(false))
  };

  // Education FlatList Item Render
  const RenderItemEduction = (item, index) => {
    return (
      <TouchableOpacity onPress={() => {
        isEducationDataEdit = []
        isEducationDataEdit.push(item)
        setIsAddEducationVisible(true)
      }}>
        <View style={[styles.flatListView, { marginTop: index == 0 ? 0 : heightPercentageToDP(2) }]}>
          <CustomText
            children={item.course}
            fontSize={FontSize(15)}
            style={styles.eduTextStyle}
          />
          <View style={styles.separatorBottom} />
          <CustomText
            children={item.board}
            fontSize={FontSize(15)}
            style={styles.eduTextStyle}
          />
          <View style={styles.separatorBottom} />
          <CustomText
            // children={item.start_date + " - " + item?.end_date}
            children={moment(item.start_date, 'DD-MM-YYYY').format('MMM YYYY') + " - " + moment(item.end_date, 'DD-MM-YYYY').format('MMM YYYY')}
            fontSize={FontSize(15)}
            style={styles.eduTextStyle}
          />
          <View style={styles.separatorBottom} />
        </View>
      </TouchableOpacity>
    );
  };

  // Certification View
  const RenderItemCertification = (item, index) => {
    return (
      <>
        <TouchableOpacity onPress={() => {
          isCertificateDataEdit = []
          isCertificateDataEdit.push(item)
          setIsAddCertificationVisible(true)
        }} style={[styles.flatListCertificate, { marginTop: index == 0 ? 5 : heightPercentageToDP(2) }]}>
          <CustomText
            children={item?.certification_name}
            fontSize={FontSize(15)}
            style={styles.textStyle}
          />
          <View style={styles.separatorBottom} />
          <CustomText
            children={item?.institute}
            fontSize={FontSize(15)}
            style={styles.textStyle}
          />
          <View style={styles.separatorBottom} />
          <View style={styles.viewDateBottomStyle}>
            <View style={styles.viewColumStyle}>
              <CustomText children={AppString.ISSUE_DATE + ' :'} style={styles.title} />
              <View style={styles.viewStartDateStyle}>
                <CustomText children={item?.issue_date != "" ? moment(item?.issue_date, 'DD-MM-YYYY').format('MMM YYYY') : ""} style={styles.subDateTitle} />
                <CalenderIcon />
              </View>
              <View style={styles.separatorStartDate} />
            </View>
            <View style={styles.viewColumStyle}>
              <CustomText children={AppString.EXPIRY_DATE + ' :'} style={styles.title} />
              <View style={styles.viewStartDateStyle}>
                <CustomText children={item?.expire_date != "" ? moment(item?.expire_date, 'DD-MM-YYYY').format('MMM YYYY') : ""} style={styles.subDateTitle} />
                <CalenderIcon />
              </View>
              <View style={styles.separatorStartDate} />
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  // HERE WE GETTING EDUCATION DATA IF USER EDIT AND NEW ADD EDUCATION
  const handleEducationSubmit = (educationData) => {
    setIsAddEducationVisible(false);

    // Check if educationDetails is null or undefined
    if (!educationDetails) {
      // Initialize educationDetails if it's null or undefined
      setEducationDetails({ education: [] });
    }

    // Create a new copy of educationDetails with the updated education array
    setEducationDetails((prevEducationDetails) => {
      const updatedEducationDetails = { ...prevEducationDetails };

      // Check if the education property exists in educationDetails
      if (!updatedEducationDetails.education) {
        // Initialize the education property as an empty array if it doesn't exist
        updatedEducationDetails.education = [];
      }

      // Find the index of the education to update based on its unique ID
      const existingIndex = updatedEducationDetails.education.findIndex(
        (edu) => edu.id === educationData?.id
      );

      if (existingIndex !== -1) {
        // Update the existing education at the found index
        updatedEducationDetails.education[existingIndex] = educationData;
      } else {
        // If the education doesn't exist, add it to the end of the array
        updatedEducationDetails.education.push(educationData);
      }
      return updatedEducationDetails;
    });
  };

  // ANDROID DEVICE BACK BUTTON HANDLER
  useEffect(() => {
    const { addBackButtonListener, removeBackButtonListener } = backButtonHandler();
    const handleBackButtonPress = () => {
      // HERE IF USER CLICK BACK THEN BY REDUX WE SET FALSE AND SHOW PROFILE HOME SCREEN
      // WE CAN SET OTHER LOGIC AS WELL WITH HARDWARE BACK BUTTON IF WE WANT
      dispatch(clickOnIsEditProfile(false))
    };
    addBackButtonListener(handleBackButtonPress);
    return () => {
      removeBackButtonListener(handleBackButtonPress);
    };
  }, []);

  // HOBBIES LIST FLATLIST RENDER FUNCTION 
  const RenderHobbiesItem = ({ item, index }) => {
    return (
      <View style={styles.hobbiesView}>
        <CustomText children={item?.Hobby?.hobby_tittle} style={styles.hobbiesName} />
        <TouchableOpacity style={styles.crossButton} onPress={() => handleHobbiesDeleteItem(index)}>
          <CheckmarkIcon />
        </TouchableOpacity>
      </View>
    )
  }

  // DELETE HOBBIES ITEM BY CLICK AND REMOVE FROM LIST
  const handleHobbiesDeleteItem = (index) => {
    setHobbiesItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1); // Remove the item at the specified index
      return updatedItems;
    });
  };

  // SKILL RENDER FLATLIST VIEW
  const RenderSkillsItem = ({ item, index }) => {
    return (
      <View style={styles.hobbiesView}>
        <CustomText children={item?.Skill?.skill_name} style={styles.hobbiesName} />
        <TouchableOpacity style={styles.crossButton} onPress={() => handleSkillDeleteItem(index)}>
          <CheckmarkIcon />
        </TouchableOpacity>
      </View>
    )
  }

  // DELETE SKILL ITEM BY CLICK AND REMOVE FROM LIST
  const handleSkillDeleteItem = (index) => {
    setSelectedItemsOfSkills((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1); // Remove the item at the specified index
      return updatedItems;
    });
  };

  const [listDataSource, setListDataSource] = useState(CONTENT);
  const [multiSelect, setMultiSelect] = useState(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] =
            !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
    }
    setListDataSource(array);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid
      >
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', padding: 10 }}>

            <TouchableOpacity
              onPress={() => setMultiSelect(multiSelect)}>
            </TouchableOpacity>
          </View>

          {listDataSource.map((item, key) => (
            <ProfileExpandableComponent
              key={item.category_name}
              onClickFunction={() => {
                updateLayout(key);
              }}
              item={item}
              about={about}
              searchText={searchText}
              contact={contact}
              searchTextSkill={searchTextSkill}
              setAbout={setAbout}
              setSearchText={setSearchText}
              setContact={setContact}
              setSearchTextSkill={setSearchTextSkill}
              AddNewHobbies={AddNewHobbies}
              AddNewSkill={AddNewSkill}
              isShowHobbiesList={isShowHobbiesList}
              isShowSkillList={isShowSkillList}
              dataSkills={dataSkills}
              filterSkills={filterSkills}
              selectedItemsOfSkills={selectedItemsOfSkills}
              RenderSkillsItem={RenderSkillsItem}
              name={name}
              designation={designation}
              date={date}
              show={show}
              hobbiesItems={hobbiesItems}
              RenderHobbiesItem={RenderHobbiesItem}
              email={email}
              reportingManage={reportingManage}
              joinedDate={joinedDate}
              setISShowHobbiesList={setISShowHobbiesList}
              dataHobbies={dataHobbies}
              filterHobbies={filterHobbies}
              setDataHobbies={setFilterHobbies}
              setDataSkills={setFilterSkills}
              setISShowSkillList={setISShowSkillList}
              getHobbiesDataFromMaster={getHobbiesDataFromMaster}
              getSkillDataFromMaster={getSkillDataFromMaster}
              loginUserId={loginUserId}
              setHobbiesItems={setHobbiesItems}
              setSelectedItemsOfSkills={setSelectedItemsOfSkills}
              achievement={achievement}
              setAchievement={setAchievement}
              img={img}
              setImg={setImg}
              flatListRef={flatListRef}
              educationDetails={educationDetails}
              setDesignation={setDesignation}
              isAddEducationVisible={isAddEducationVisible}
              handleEducationClose={handleEducationClose}
              handleEducationSubmit={handleEducationSubmit}
              RenderItemEduction={RenderItemEduction}
              setIsAddEducationVisible={setIsAddEducationVisible}
              certificationDetails={certificationDetails}
              RenderItemCertification={RenderItemCertification}
              setIsAddCertificationVisible={setIsAddCertificationVisible}
              isAddCertificationVisible={isAddCertificationVisible}
              handleCertificationClose={handleCertificationClose}
              handleCertificationSubmit={handleCertificationSubmit}
            />
          ))}
        </View>
        {/* save and cancel button */}
        <View style={styles.viewButton}>
          <CustomButton
            onPress={handleSubmitClick}
            title={AppString.SAVE}
            style={styles.modalSaveButton}
            textStyle={styles.textSaveColor}
          />
          <CustomButton
            onPress={handleCancel}
            title={AppString.CANCEL}
            style={styles.modalCancelButton}
            textStyle={styles.textCancelColor}
          />
        </View>
      </KeyboardAwareScrollView>
      <AppLoader isLoading={loader} />
    </SafeAreaView>
  );
};

export default ProfessionalInfo;

//Dummy content to show
//You can also use dynamic data by calling webservice
const CONTENT = [
  {
    isExpanded: true,
    category_name: 'Personal Info.',
  },
  {
    isExpanded: false,
    category_name: AppString.EDUCATION,
  },
  {
    isExpanded: false,
    category_name: 'Certification',
  },
  {
    isExpanded: false,
    category_name: 'Skills',
  },
];

// Expandable Component
const ProfileExpandableComponent = React.memo(({ item, onClickFunction, about, searchText,
  contact, searchTextSkill, setAbout, setSearchText, setContact, setSearchTextSkill,
  AddNewHobbies, AddNewSkill, isShowHobbiesList, isShowSkillList, dataSkills, filterSkills,
  selectedItemsOfSkills, RenderSkillsItem, name, designation, date, show, hobbiesItems,
  RenderHobbiesItem, email, reportingManage, joinedDate, setISShowHobbiesList, dataHobbies, filterHobbies,
  setDataHobbies, setISShowSkillList, getSkillDataFromMaster, getHobbiesDataFromMaster, setDataSkills,
  loginUserId, setHobbiesItems, setSelectedItemsOfSkills, achievement, setAchievement, setImg, img,
  flatListRef, educationDetails, setDesignation, isAddEducationVisible, handleEducationClose, handleEducationSubmit,
  RenderItemEduction, setIsAddEducationVisible, certificationDetails, RenderItemCertification, setIsAddCertificationVisible,
  isAddCertificationVisible, handleCertificationClose, handleCertificationSubmit,
}) => {
  //Custom Component for the Expandable List,
  const [layoutHeight, setLayoutHeight] = useState(0);

  useFocusEffect(
    useCallback(() => {
      if (item.isExpanded) {
        setLayoutHeight(null);
      } else {
        setLayoutHeight(0);
      }
    }, [item.isExpanded]));


  const onChangeText = useCallback(
    (fieldName, text) => {
      switch (fieldName) {
        case 'name':
          setName(text.replace(/[^a-zA-Z0-9 ]/g, ''));
          break;
        case 'designation':
          setDesignation(text.replace(/[^a-zA-Z0-9 ]/g, ''));
          break;
        case 'about':
          setAbout(text.replace(/[^a-zA-Z0-9\s.]/g, ''));
          break;
        case 'hobbies':
          setSearchText(text);
          if (text.length !== 0) {
            setISShowHobbiesList(true);
            setSearchText(text);
            const filteredData = dataHobbies.filter((item) =>
              item.hobby_tittle.toLowerCase().includes(text.toLowerCase())
            );
            setDataHobbies(filteredData);
          } else {
            setISShowHobbiesList(false);
            setSearchText('');
            getHobbiesDataFromMaster();
          }
          break;
        case 'contact':
          setContact(text);
          break;
        case 'skill':
          if (text.length !== 0) {
            setISShowSkillList(true);
            setSearchTextSkill(text);
            const filteredData = dataSkills.filter((item) =>
              item.skill_name.toLowerCase().includes(text.toLowerCase())
            );
            setDataSkills(filteredData);
          } else {
            setISShowSkillList(false);
            setSearchTextSkill('');
            getSkillDataFromMaster();
          }
          break;
        // Add more cases for other CustomTextInput components
        default:
          break;
      }
    },
    [about, searchText, contact, searchTextSkill]);

  return (
    <View style={styles.listContainer}>
      <View>
      {/*Header of the Expandable List Item*/}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => { onClickFunction(), setImg(img) }}
        style={styles.header}>
        <View style={styles.viewRowStyle} >
          <Text style={styles.headerText}>
            {item.category_name}
          </Text>
          {item.isExpanded ? <UpArrow width={15} height={15} /> : <DownArrow width={15} height={15} />}
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        {/*Content under the header of the Expandable List Item*/}
        {item.isExpanded && item.category_name == 'Personal Info.' ? (
          <View>
            {/* NAME VIEW */}
            <View style={styles.viewStyle}>
              <CustomText children={AppString.NAME + ' :'} style={styles.title} />
              <CustomTextInput
                placeholder={AppString.NAME}
                keyboardType={'default'}
                editable={false}
                onChangeText={txtName => {
                  setName(txtName.replace(/[^a-zA-Z0-9]/g, ''));
                }}
                value={name}
                style={styles.textInput}
              />
              <View style={styles.separatorBottom} />
            </View>
            {/* DESIGNATION VIEW*/}
            <View style={styles.viewStyle}>
              <CustomText children={AppString.DESIGNATION + ' :'} style={styles.title} />
              <CustomTextInput
                placeholder={AppString.DESIGNATION}
                keyboardType={'default'}
                editable={false}
                onChangeText={txtDesignation => {
                  setDesignation(txtDesignation.replace(/[^a-zA-Z0-9]/g, ''));
                }}
                value={designation}
                style={styles.textInput}
              />
              <View style={styles.separatorBottom} />
            </View>
            {/* D.O.B VIEW*/}
            <View style={styles.viewStyle}>
              <CustomText children={AppString.DOB + ' :'} style={styles.title} />
              <TouchableOpacity>
                {/* <TouchableOpacity onPress={showDatepicker}> */}
                <CustomTextInput
                  placeholder={AppString.SELECT_DATE}
                  keyboardType={'default'}
                  editable={false}
                  onChangeText={txtDate => {
                    setDate(txtDate);
                  }}
                  value={moment(date?.substring(0, 10)).format('DD MMM')}
                  style={styles.textInput}
                />
              </TouchableOpacity>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
              <View style={styles.separatorBottom} />
            </View>
            {/* Hobbies View*/}
            <View style={styles.viewStyle}>
              <CustomText children={AppString.HOBBIES + ' :'} style={styles.hobbiesText} />

              <View style={styles.textInputView}>
                <CustomTextInput
                  placeholder="Enter your hobbies..."
                  style={styles.hobbiesTextInput}
                  placeholderTextColor={GREY}
                  onChangeText={(text) => onChangeText('hobbies', text)}
                  value={searchText}
                />
                {/*  Add Button for Hobbies Typed by user */}
                {isShowHobbiesList && <TouchableOpacity onPress={() => AddNewHobbies(searchText)} style={styles.addHobbiesButton}>
                  <CustomText style={styles.plusText} children={'Add +'} />
                </TouchableOpacity>}
              </View>

              <View style={[styles.separatorBottom, { marginTop: 1 }]} />

              {/* BOTTOM HOBBIES LIST FILTER AFTER SEARCH */}
              {isShowHobbiesList &&
                filterHobbies?.map((item) => {
                  return (
                    <TouchableOpacity
                      key={item?.hobbies_id}
                      onPress={() => {
                        const newHobby = {
                          user_hobbies_id: 1153, // Some unique ID for the new hobby
                          hobbies_id: item?.hobbies_id, // ID of the new hobby
                          user_id: loginUserId,
                          status: item?.status,
                          createdAt: item?.createdAt,
                          updatedAt: item?.creatupdatedAtedAt,
                          Hobby: {
                            hobbies_id: item?.hobbies_id,
                            hobby_tittle: item?.hobby_tittle, // Name of the new hobby
                            status: item?.status,
                            createdAt: item?.createdAt,
                            updatedAt: item?.updatedAt
                          },
                        }
                        // Check if the new hobby's hobbies_id already exists in the hobbiesItems
                        const isDuplicate = hobbiesItems?.some(
                          (hobby) => hobby?.hobbies_id === newHobby?.hobbies_id
                        );
                        if (!isDuplicate) {
                          setHobbiesItems((prevHobbies) => [newHobby, ...prevHobbies]);
                          setSearchText("");
                          setISShowHobbiesList(false);
                        } else {
                          ShowToast(`Hobby ${newHobby?.Hobby?.hobby_tittle} already exists.`);
                        }
                      }}>
                      {/* Hobbies Name Lis Filter */}
                      <CustomText children={item?.hobby_tittle} style={styles.hobbiesListName} />
                      {/* Line */}
                      <View style={styles.line}></View>
                    </TouchableOpacity>
                  )
                })
              }

              <FlatList
                data={hobbiesItems}
                renderItem={RenderHobbiesItem}
                numColumns={4}
                columnWrapperStyle={{ flexWrap: 'wrap' }}
                style={{ marginTop: 5 }}
              />
            </View>
            {/* Select EMAIL*/}
            <View style={styles.viewStyle}>
              <CustomText children={AppString.EMAIL_ID + ' :'} style={styles.title} />
              <CustomTextInput
                placeholder={AppString.EMAIL_ID}
                keyboardType={'email-address'}
                editable={false}
                onChangeText={txtEmail => {
                  setEmail(txtEmail);
                }}
                value={email}
                style={styles.textInput}
              />
              <View style={styles.separatorBottom} />
            </View>
            {/* Select CONTACT*/}
            <View style={styles.viewStyle}>
              <CustomText children={AppString.CONTACT + ' :'} style={styles.title} />
              <CustomTextInput
                placeholder={AppString.CONTACT}
                keyboardType={'phone-pad'}
                onChangeText={(text) => onChangeText('contact', text)}
                value={contact}
                style={styles.textActiveInput}
              />

              <View style={styles.separatorBottom} />
            </View>
            {/* Select REPORTING MANAGER*/}
            <View style={styles.viewStyle}>
              <CustomText children={AppString.REPORTING_MANAGER + ' :'} style={styles.title} />
              <CustomTextInput
                placeholder={AppString.REPORTING_MANAGER}
                keyboardType={'default'}
                editable={false}
                onChangeText={txtReportingManage => {
                  setReportingManage(txtReportingManage);
                }}
                value={reportingManage?.first_name + " " + reportingManage?.last_name}
                style={styles.textInput}
              />

              <View style={styles.separatorBottom} />
            </View>
            {/* Select JOINED SINCE*/}
            <View style={styles.viewStyle}>
              <CustomText children={AppString.JOINED_SINCE + ' :'} style={styles.title} />
              <CustomText children={moment(joinedDate).format('MMM YYYY')} style={styles.acheivmentText} fontSize={FontSize(13)}
              />
              <View style={[styles.separatorBottom, { marginTop: 5 }]} />
            </View>
            {/* Select ABOUT*/}
            <View style={styles.viewStyle}>
              <CustomText children={AppString.ABOUT + ''} style={styles.title} />
              <CustomTextInput
                placeholder={AppString.ABOUT}
                keyboardType={'default'}
                multiline={true}
                maxFontSizeMultiplier={1}
                onChangeText={(text) => onChangeText('about', text)}
                value={about}
                style={styles.aboutText}
              />
              <View style={styles.separatorBottom} />
            </View>
          </View>
        ) : null}
        {item.isExpanded && item.category_name == 'Education' ? (
          <View>
            {/* Education View */}
            <View style={styles.viewStyle}>
              {/* <CustomText children={AppString.EDUCATION + ' :'} style={styles.title} /> */}
              <FlatList
                style={{ marginTop: 5, marginBottom: -10, }}
                data={educationDetails?.education}
                renderItem={({ item, index }) => RenderItemEduction(item, index)}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
              <TouchableOpacity
                style={{ minHeight: 30, marginTop: heightPercentageToDP(4), }}
                onPress={() => {
                  isEducationDataEdit = []
                  educationDetails?.education?.map((item) => {
                    if (item?.id > last_id) {
                      last_id = item?.id
                    }
                  })
                  setIsAddEducationVisible(true)
                }}>
                <CustomText
                  children={"+ " + AppString.ADD_NEW}
                  style={[styles.addNewButtonStyle]}
                />
              </TouchableOpacity>
              {/* Add New Education Bottom Sheet View*/}
              {isAddEducationVisible ? <AddNewEducationBottomNav handleExperienceClose={handleEducationClose}
                visible={isAddEducationVisible} educationData={isEducationDataEdit}
                handleEducationSubmit={handleEducationSubmit} last_id={last_id} /> : null}
            </View>
          </View>
        ) : null}
        {item.isExpanded && item.category_name == 'Certification' ? (
          <View>
            {/* Certificate View */}
            <View style={[styles.viewStyle, { marginTop: 20 }]}>
              {/* <CustomText children={AppString.CRETIFICATION + '  :'} style={styles.title} /> */}
              <FlatList
                ref={flatListRef}
                data={certificationDetails?.certifications}
                renderItem={({ item, index }) => RenderItemCertification(item, index)}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                style={{}}
              />
              <TouchableOpacity onPress={() => {
                isCertificateDataEdit = []
                certificationDetails?.certifications?.map((item) => {
                  if (item?.id > last_id) {
                    last_id = item?.id
                  }
                })
                setIsAddCertificationVisible(true)
              }}>
                <CustomText
                  children={'+ ' + AppString.ADD_NEW}
                  style={[styles.addNewCertifateButtonStyle, {
                  }]}
                />
              </TouchableOpacity>
              {/* Add New Certification Bottom View*/}
              {isAddCertificationVisible ? <AddNewCertificationBottomNav handleExperienceClose={handleCertificationClose}
                handleCertificationSubmit={handleCertificationSubmit}
                visible={isAddCertificationVisible}
                certificateData={isCertificateDataEdit} last_id={last_id} /> : ''}
            </View>
          </View>
        ) : null}
        {item.isExpanded && item.category_name == 'Skills' ? (
          <View>
            {/* Skills View*/}
            {/* if we add new skill it add successully but not getting in
            profile details api. Its Getting in master skill api but if we delete some skill and hobby
            it getting from profile details api not get skill api */}
            <View style={[styles.viewStyle]}>
              {/* <CustomText children={AppString.SKILLS + ' :'} style={[styles.hobbiesText,]} /> */}

              {/* If No Skill Added Show this Text */}

              <View style={styles.textInputView}>
                <CustomTextInput
                  placeholder="Enter Your Skill ..."
                  style={styles.hobbiesTextInput}
                  placeholderTextColor={GREY}
                  onChangeText={(text) => onChangeText('skill', text)}
                  value={searchTextSkill}
                />

                <View style={[styles.separatorBottom, { marginTop: 5 }]} />
                {/*  Add Button for Hobbies Typed by user */}
                {isShowSkillList && <TouchableOpacity onPress={() => AddNewSkill(searchTextSkill)} style={styles.addHobbiesButton}>
                  <CustomText style={styles.plusText} children={'Add +'} />
                </TouchableOpacity>}
              </View>
              {/* BOTTOM LIST FILTER AFTER SEARCH */}
              {console.log("SKill Condition================ ", isShowSkillList,)}

              {isShowSkillList ?
                filterSkills?.map((item) => {

                  return (
                    <TouchableOpacity
                      key={item?.skill_id}
                      onPress={() => {
                        const newSkill = {
                          user_skills_id: 975, // Some unique ID for the new skill
                          skill_id: item?.skill_id, // ID of the new skill
                          user_id: loginUserId,
                          skill_level: null,
                          status: 1,
                          createdAt: item?.createdAt,
                          updatedAt: item?.updatedAt,
                          Skill: {
                            skill_id: item?.skill_id,
                            skill_name: item?.skill_name, // Name of the new skill
                            status: 1,
                            createdAt: item?.createdAt,
                            updatedAt: item?.updatedAt,
                          },
                        };
                        // Check if the new hobby's hobbies_id already exists in the hobbiesItems
                        const isDuplicate = selectedItemsOfSkills?.some(
                          (skill) => skill?.skill_id === newSkill?.skill_id
                        );
                        if (!isDuplicate) {
                          setSelectedItemsOfSkills((prevSkills) => [newSkill, ...prevSkills]);
                          setSearchTextSkill("");
                          setISShowSkillList(false);
                        } else {
                          ShowToast(`Skill ${newSkill?.Skill?.skill_name} already exists.`);
                        }
                      }}>
                      {/* Hobbies Name Lis Filter */}
                      <CustomText children={item.skill_name} style={styles.hobbiesListName} />
                      {/* Line */}
                      <View style={styles.line}></View>
                    </TouchableOpacity>
                  )
                })
                : null}
              <FlatList
                data={selectedItemsOfSkills}
                renderItem={RenderSkillsItem}
                numColumns={4}
                columnWrapperStyle={{ flexWrap: 'wrap' }}
                style={{ marginTop: 5 }}
              />
            </View>
            {/* Select ACHIEVEMENT*/}
            <View style={styles.viewStyle}>
              <CustomText children={AppString.ACHIEVEMENT + ' :'} style={styles.title} />
              <CustomTextInput
                placeholder={AppString.ACHIEVEMENT}
                keyboardType={'default'}
                multiline={true}
                maxFontSizeMultiplier={3}
                onChangeText={txtAcheivmentText => {
                  setAchievement(txtAcheivmentText);
                }}
                value={achievement}
                style={[styles.aboutText, { marginStart: 3 }]}
              />

              <View style={[styles.separatorBottom, { marginTop: 5 }]} />
            </View>
          </View>
        ) : null}
      </View>
      </View>
    </View>
  );
});
