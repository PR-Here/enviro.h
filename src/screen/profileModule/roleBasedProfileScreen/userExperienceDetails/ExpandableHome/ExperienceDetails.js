import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  LayoutAnimation,
  View,
  UIManager,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { styles } from './Style';
import AppString from '../../../../../utils/AppString';
import ExpandableComponent from '../ExpandableComponent/expandComponent/ExpandableComponent';
import ProjectBottomSheet from '../bottomSheet/addNewProject/ProjectBottomSheet';
import AddExperience from '../bottomSheet/addNewExperience/AddNewExperience';
import { useSelector, useDispatch } from 'react-redux';
import CustomText from '../../../../../component/atoms/CustomText';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { generateUniqueId, safeParseJSON } from '../../../../../utils/Constant'
import CustomButton from '../../../../../component/atoms/CustomButton';
import { useNavigation } from '@react-navigation/native';
import useApiEffect from '../../../../../hooks/useApiEffect';
import AppLoader from '../../../../../utils/AppLoader';
import { UPDATE_PROFILE } from '../../../../../services/ApiEndPoint';
import { clickOnIsEditProfile, userProfileData } from '../../../../../redux/slices/AuthSlice';
import CenteredText from '../../../../../component/atoms/CenteredText';
import { ShowToast } from '../../../../../utils/Constant';
import backButtonHandler from '../../../../../component/molecules/BackButtonHandler';

let last_id = 0
var companyStartDate = null;
var companyEndDate = null;

const UserExperienceDetails = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { makeApiRequest, loading } = useApiEffect()
  const [isAddExperienceVisible, setIsAddExperienceVisible] = useState(false);
  const [isAddProjectBottomSheetVisible, setIsAddNewProjectVisible] = useState(false);
  const loginUserData = useSelector((state) => state?.auth?.profileData);
  const loginUserSkill = useSelector((state) => state?.auth?.userSkill);
  const loginUserHobbies = useSelector((state) => state?.auth?.userHobbies);
  const userExperiance = loginUserData?.experiance == null ? ' ' : safeParseJSON(loginUserData?.experiance);
  const [listDataSource, setListDataSource] = useState(userExperiance?.company);
  const [educationDetails, setEducationDetails] = useState(safeParseJSON(loginUserData?.education_detail));
  const [projectData, setProjectData] = useState(null);

  // HERE WE GETTING PROJECTS BOTTOM SHEET DATA IF USER ADD AND EDIT PROJECT

  const handelProjClose = () => {
    setIsAddNewProjectVisible(false);
  }

  const handleCloseofAddNewProjectBottomSheet = (editedProjectData) => {
    setIsAddNewProjectVisible(false);
    if (!editedProjectData) {
      return;
    }
    // Create a copy of the listDataSource array
    const updatedListDataSource = [...listDataSource];
    // Check if there's a selected company ID in the editedProjectData
    const companyIdToAddProject = editedProjectData?.companyDetails[0]?.id;
    const projectIdToEdit = editedProjectData?.companyDetails[0]?.projects[0]?.id;

    if (companyIdToAddProject) {
      // Find the company with the matching ID
      const companyToUpdate = updatedListDataSource.find(
        (company) => company.id === companyIdToAddProject
      );

      if (companyToUpdate) {
        if (projectIdToEdit) {
          // Find the project within the company with the matching ID
          const projectToUpdate = companyToUpdate.projects.find(
            (project) => project.id === projectIdToEdit
          );

          if (projectToUpdate) {
            // Update the project data within the existing project
            projectToUpdate.role = editedProjectData?.role;
            projectToUpdate.description = editedProjectData?.description;
            projectToUpdate.start_date = editedProjectData?.start_date;
            projectToUpdate.end_date = editedProjectData?.end_date;
          } else {
            //console.log(`Project not found with ID: ${projectIdToEdit}`);
          }
        } else {
          // Project ID is not provided, create a new project
          const newProject = {
            role: editedProjectData?.role,
            description: editedProjectData?.description,
            start_date: editedProjectData?.start_date,
            end_date: editedProjectData?.end_date,
            // Assign a unique ID to the new project, you can generate one as needed
            id: generateUniqueId(),
          };

          companyToUpdate.projects.push(newProject);
        }
      } else {
        //console.log(`Company not found with ID: ${companyIdToAddProject}`);
      }
    } else {
      //console.log("Company ID not provided in editedCompanyDetail");
    }
    setListDataSource(updatedListDataSource);
  };


  const handleBottomNavigationPopup = () => {
    setIsAddNewProjectVisible(true);
  }

  // WHEN  COMPANY DETAILS BOTTOM SHEET CLOSE THIS WILL BE CALLED
  // AND ADD OR EDIT COMPANY AND 1ST PROJECT DETAILS
  const handleExpClose = () => {
    setIsAddExperienceVisible(false);
  }

  const handleExperienceClose = (companyDetails) => {
    setIsAddExperienceVisible(false);
    if (companyDetails === 'cancelPopup') return;

    // Create a new company object with updated details
    const projectDetails = {
      role: companyDetails?.projectTitle,
      start_date: companyDetails?.projectStartDate,
      end_date: companyDetails?.projectEndDate,
      description: companyDetails?.projectDesc,
    };

    const updatedCompany = {
      id: companyDetails?.company_id !== undefined ? companyDetails?.company_id : last_id + 1,
      company_name: companyDetails?.companyName,
      designation: companyDetails?.title,
      from_date: companyDetails?.startDate,
      to_date: companyDetails?.endDate,
      projects: [
        {
          id: companyDetails?.project_id !== undefined ? companyDetails?.project_id : last_id + 1,
          ...projectDetails, // Include the project details here
        }
      ],
      isExpanded: false
    };

    if (!listDataSource) {
      // If listDataSource is undefined, initialize it with the updated company
      setListDataSource([updatedCompany]);
      return;
    }

    // Check if the company already exists in listDataSource
    const existingCompanyIndex = listDataSource.findIndex(
      (company) => company?.id === updatedCompany?.id
    );

    if (existingCompanyIndex !== -1) {
      // Company already exists, update its details
      const updatedListDataSource = [...listDataSource];
      updatedListDataSource[existingCompanyIndex] = updatedCompany;
      setListDataSource(updatedListDataSource);
    } else {
      // Company doesn't exist, add a new company
      setListDataSource([...listDataSource, updatedCompany]);
    }
  };

  useEffect(() => {
  }, [listDataSource])

  const [multiSelect, setMultiSelect] = useState(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  {/* Update Layout for Expanded View */ }
  const updateLayout = index => {
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


  const handleSubmitClick = async () => {
    let educationArray = []
    let educationObject = {}
    if (educationDetails?.education) {
      educationObject["id"] = educationDetails?.education[0]?.id
      educationObject["course"] = educationDetails?.education[0]?.course
      educationObject["board"] = educationDetails?.education[0]?.board
      educationObject["start_date"] = educationDetails?.education[0]?.start_date
      educationObject["end_date"] = educationDetails?.education[0]?.end_date

    } else {
      // Handle the case where educationDetails?.education[0] is undefined
      //console.log("educationDetails?.education[0] is undefined");
    }
    educationArray?.push(educationObject)
    let experience = {}
    let projectsDetails = {}
    experience['projects'] = projectsDetails



    const editData = {
      about: loginUserData?.about ? loginUserData?.about : 'About',
      achivements: loginUserData?.achievements ? loginUserData?.achievements : 'achievements',
      skills: loginUserSkill,
      hobbies: loginUserHobbies,
      education_detail: safeParseJSON(loginUserData?.education_detail) || {},
      experience: {
        company: listDataSource
      },
      certifications: safeParseJSON(loginUserData?.certifications) || {},
      contact: loginUserData?.phone_number
    }

    const apiEditResponce = await makeApiRequest({ url: UPDATE_PROFILE, method: "POST", isToken: true, data: editData });
    ShowToast(`${apiEditResponce?.message}`)
    if (apiEditResponce?.status == true) {
      dispatch(userProfileData(apiEditResponce?.data))
      dispatch(clickOnIsEditProfile(false))
    }
  };

  // we declare a function in ExpandableComponet GET_BACK_DATA_FROM_EXPANDABLELIST 
  // And we are getting value of this function here if user click on project details
  const getBackProjectDetails = (clickType, ProjectDetails) => {
    setProjectData(ProjectDetails);
    if (clickType == 'clickOnCompanyName') {
      setIsAddExperienceVisible(true)
    } else {
      setIsAddNewProjectVisible(true);
    }
    // For Set Date in Project Bottom Sheet Start and End Date
    companyStartDate = ProjectDetails[0]?.from_date
    companyEndDate = ProjectDetails[0]?.to_date;

  }

  // ANDROID DEVICE BACK BUTTON HANDLER
  useEffect(() => {
    const { addBackButtonListener, removeBackButtonListener } = backButtonHandler();
    const handleBackButtonPress = () => {
      dispatch(clickOnIsEditProfile(false))
    };
    addBackButtonListener(handleBackButtonPress);

    return () => {
      removeBackButtonListener(handleBackButtonPress);
    };
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {listDataSource == undefined ?
        <CenteredText text={AppString.No_Experience_Added} /> : null}
      <View style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid >
          {/**Add Component Data for Expand List */}
          {listDataSource?.map((item, key) => (
            <ExpandableComponent
              key={key}
              onClickFunction={() => {
                updateLayout(key);
              }}
              item={item}
              getBackProjectDetails={getBackProjectDetails}
            />
          ))}
        </KeyboardAwareScrollView>
        <TouchableOpacity onPress={() => {
          setMultiSelect(multiSelect)
          setProjectData([])
          setIsAddExperienceVisible(true)
          listDataSource?.map((item) => {
            if (item?.id > last_id) {
              last_id = item?.id
            }
          })
        }}>
          <CustomText
            children={AppString.ADD_NEW_EXPERIENCE}
            style={styles.addExperienceStyle}
          />
        </TouchableOpacity>
      </View>


      {/* OPEN COMPANY DETAILS BOTTOM SHEET HERE */}
      {isAddExperienceVisible ? (
        <AddExperience handleExperienceClose={handleExperienceClose}
          visible={isAddExperienceVisible} handleBottomNavigationPopup={handleBottomNavigationPopup}
          projectData={projectData} last_id={last_id} handleExpClose={handleExpClose} />
      ) : null}

      {/* Add Or Edit Project Details Bottom Sheet */}
      {isAddProjectBottomSheetVisible ? (
        <ProjectBottomSheet
          handleCloseofAddNewProjectBottomSheet={handleCloseofAddNewProjectBottomSheet}
          showAddNewProjectBottomSheet={isAddProjectBottomSheetVisible}
          projectData={projectData}
          last_id={last_id}
          handelProjClose={handelProjClose}
          companyStartDate={companyStartDate}
          companyEndDate={companyEndDate}
        />)
        : null}

      {/* save and cancel button */}
      <View style={styles.viewButton}>
        <CustomButton
          onPress={handleSubmitClick}
          title={AppString.SAVE}
          style={styles.modalSaveButton}
          textStyle={styles.textSaveColor}
        />
        <CustomButton
          onPress={() => dispatch(clickOnIsEditProfile(false))}
          title={AppString.CANCEL}
          style={styles.modalCancelButton}
          textStyle={styles.textCancelColor}
        />
      </View>
      <AppLoader isLoading={loading} />
    </SafeAreaView>
  );
};
export default UserExperienceDetails;
