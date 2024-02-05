import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import AppString from '../../../../../../utils/AppString';
import CustomText from '../../../../../../component/atoms/CustomText';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CustomButton from '../../../../../../component/atoms/CustomButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import { styles } from './Style';
import { ShowToast, formatDate, generateUniqueId } from '../../../../../../utils/Constant';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BLACK } from '../../../../../../theme/Colors';
import CalenderIcon from '../../../../../../../assets/images/SVG/calendar_days.svg';
import Cross from '../../../../../../../assets/images/SVG/cros.svg';
import { moderateScale } from 'react-native-size-matters';
import moment from 'moment';

const AddNewExperience = ({ handleExperienceClose, visible, projectData, handleExpClose, last_id }) => {
  const [title, setTitle] = useState(projectData[0]?.designation);
  const [companyName, setCompanyName] = useState(projectData[0]?.company_name);
  const [startDate, setStartDate] = useState(projectData[0]?.from_date);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [endDate, setEndDate] = useState(projectData[0]?.to_date);
  const [clickType, setClickType] = useState(null);

  const [projectTitle, setProjectTitle] = useState(projectData[0]?.projects[0]?.role);
  const [projectDesc, setProjectDesc] = useState(projectData[0]?.projects[0]?.description);
  const [projectStartDate, setProjectStartDate] = useState(projectData[0]?.projects[0]?.start_date);
  const [projectEndDate, setProjectEndDate] = useState(projectData[0]?.projects[0]?.end_date);
  const refRBSheet = useRef();


  useEffect(() => {
    if (visible) {
      refRBSheet.current.open();
    }
  }, [visible, projectData]);

  const onChange = (event, selectedValue, clickType) => {

    if (event?.nativeEvent?.type == 'dismissed') setShowDatePicker(false);
    setShowDatePicker(false);
    if (clickType == 'CompanyStartDate') setStartDate(formatDate(selectedValue))
    else if (clickType == 'CompanyEndDate') setEndDate(formatDate(selectedValue))
    else if (clickType == 'ProjectStartDate') setProjectStartDate(formatDate(selectedValue))
    else if (clickType == 'ProjectEndDate') setProjectEndDate(formatDate(selectedValue))
  };

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleConfirm = (date) => {
    // setShowDatePicker(Platform.OS === 'ios');
    // if (modeStartDate == 'date') {
    //   setStartDate(formatDate(date));
    // }
    hideDatePicker();

    setShowDatePicker(false);
    if (clickType == 'CompanyStartDate') {
      setStartDate(formatDate(date))
    }
    else if (clickType == 'CompanyEndDate') setEndDate(formatDate(date))
    else if (clickType == 'ProjectStartDate') {
      setProjectStartDate(formatDate(date))
    }
    else if (clickType == 'ProjectEndDate') setProjectEndDate(formatDate(date))
  };

  const handleSubmit = () => {
    if (title == null || title == '') {
      ShowToast(AppString.PLEASE_ENTER_COMPANY_DESIGNATION);
    } else if (companyName == null || companyName == '') {
      ShowToast(AppString.PLEASE_ENTER_COMPANY_NAME);
    } else if (startDate == null || startDate == '') {
      ShowToast(AppString.PLEASE_ENTER_START_DATE);
    } else if (endDate == null || endDate == '') {
      ShowToast(AppString.PLEASE_SELECT_END_DATE);
    } else if (projectTitle == null || projectTitle == '') {
      ShowToast(AppString.PLEASE_ENTER_PROJECT_TITLE);
    } else if (projectStartDate == null || projectStartDate == '') {
      ShowToast(AppString.PLEASE_SELECT_PROJECT_START_DATE);
    } else if (projectEndDate == null || projectEndDate == '') {
      ShowToast(AppString.PLEASE_SELECT_PROJECT_END_DATE);
    } else if (projectDesc == null || projectDesc == '') {
      ShowToast(AppString.PLEASE_ENTER_PROJECT_DESC);
    } else {
      const company_id = projectData[0]?.id == undefined ? last_id + 1 : projectData[0]?.id;
      const project_id = projectData[0]?.projects[0]?.id == undefined ? last_id + 1 : projectData[0]?.projects[0]?.id;
      handleExperienceClose({
        title, companyName, startDate, endDate, projectTitle,
        projectStartDate, projectEndDate, projectDesc, company_id
        , project_id
      })
    }
  };

  return (
    // <View style={styles.container}>
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={false}
      closeOnPressMask={true}
      height={moderateScale(600)}
      onClose={() => handleExpClose()}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 38,
          borderTopRightRadius: 38,

        },
        wrapper: {
          backgroundColor: '#00000099',
        },
        draggableIcon: {
          backgroundColor: BLACK,
        },
      }}>
      <KeyboardAwareScrollView enableOnAndroid>
        <View style={styles.viewMainBottomStyle}>
          <View style={styles.header}>
            <Text style={styles.DetailsTitle}> {AppString.ADD_NEW_EXPERIENCE}</Text>
            <TouchableOpacity style={styles.close} onPress={handleExpClose}>
              <Cross />
            </TouchableOpacity>
          </View>

          <View style={styles.viewBottomStyle}>
            <CustomText children={'Title :'} style={styles.title} />
            <TextInput
              value={title}
              editable={true}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={txtTitle => {
                setTitle(txtTitle);
              }}
              underlineColorAndroid="transparent"
              placeholder={""}
              multiline={false}
              maxFontSizeMultiplier={1}
              style={[styles.textInput, { height: Platform.OS == 'ios' ? 30 : 40 }]}
            />
            <View style={[styles.separatorBottom, { marginTop: 0 }]} />
          </View>
          <View style={[styles.viewBottomStyle]}>
            <CustomText children={'Company Name:'} style={styles.title} />
            <TextInput
              value={companyName}
              editable={true}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={txtTitle => {
                setCompanyName(txtTitle);
              }}
              underlineColorAndroid="transparent"
              placeholder={""}
              multiline={false}
              maxFontSizeMultiplier={1}
              style={[styles.textInput, { height: Platform.OS == 'ios' ? 30 : 40 }]}
            />
            <View style={[styles.separatorBottom, { marginTop: 0 }]} />
          </View>

          {/* START DATE AND END DATE OF COMPAINE */}
          <View style={[styles.viewDateBottomStyle, , { marginTop: 4 }]}>
            <View style={styles.viewColomStyle}>
              {/* start date */}
              <CustomText children={'Start Date:'} style={styles.title} />
              <TouchableOpacity onPress={() => {
                setClickType('CompanyStartDate')
                setShowDatePicker(true)
                setStartDate(null)
                setEndDate(null)
                setProjectStartDate(null)
                setProjectEndDate(null)
              }}>
                <View style={styles.viewStartDateStyle}>
                  <CustomText children={formatDate(startDate)} style={styles.startDateButton} />
                  {/** <TextInput
                    value={formatDate(startDate)}
                    editable={editableText}
                    keyboardType="default"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={txtStartDate => {
                      setStartDate(txtStartDate);
                    }}
                    underlineColorAndroid="transparent"
                    placeholder={""}
                    multiline={true}
                    maxFontSizeMultiplier={1}
                    style={styles.startDateButton}
                  /> */}
                  <CalenderIcon />
                </View>
              </TouchableOpacity>

              <View style={styles.separatorBottom} />
            </View>
            {/* END DATE COMPANY */}
            <View style={styles.viewColomStyle}>
              <CustomText children={'End Date:'} style={styles.title} />
              <TouchableOpacity onPress={() => {
                setClickType('CompanyEndDate')
                setShowDatePicker(true)
              }}>
                <View style={styles.viewStartDateStyle}>
                  <CustomText children={formatDate(endDate)} style={styles.startDateButton} />
                  {/**  <TextInput
                    value={formatDate(endDate)}
                    editable={editableText}
                    keyboardType="default"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={txtEndDate => {
                      setEndDate(txtEndDate);
                    }}
                    underlineColorAndroid="transparent"
                    placeholder={""}
                    multiline={true}
                    maxFontSizeMultiplier={1}
                    style={styles.startDateButton}
                  /> */}
                  <CalenderIcon />
                </View>
              </TouchableOpacity>

              <View style={styles.separatorBottom} />
            </View>
          </View>
          {/* Project Name */}
          <View style={[styles.viewBottomStyle, , { marginTop: -19 }]}>
            <CustomText children={'Project Title:'} style={styles.title} />
            <TextInput
              value={projectTitle}
              editable={true}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={txtProject => {
                setProjectTitle(txtProject);
              }}
              underlineColorAndroid="transparent"
              placeholder={""}
              multiline={true}
              maxFontSizeMultiplier={1}
              style={styles.textInput}
            />
            <View style={[styles.separatorBottom, { marginTop: 0 }]} />
          </View>
          {/* Project Start Date */}
          <View style={[styles.viewDateBottomStyle, { marginTop: 10 }]}>
            <View style={styles.viewColomStyle}>
              <CustomText children={'Start Date:'} style={styles.title} />
              <TouchableOpacity onPress={() => {
                if (startDate == null || endDate == null) {
                  ShowToast("Please Select Company Dates")
                } else {
                  setClickType('ProjectStartDate')
                  setShowDatePicker(true)
                  setProjectStartDate(startDate)
                  // setProjectEndDate(null)
                }


              }}>
                <View style={styles.viewStartDateStyle}>
                  <CustomText children={formatDate(projectStartDate)} style={styles.startDateButton} />
                  {/**  <TextInput
                    value={formatDate(projectStartDate)}
                    editable={editableText}
                    keyboardType="default"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={txtStartDate => {
                      setStartDate(txtStartDate);
                    }}
                    underlineColorAndroid="transparent"
                    placeholder={""}
                    multiline={true}
                    maxFontSizeMultiplier={1}
                    style={styles.startDateButton}
                  />*/}
                  <CalenderIcon />
                </View>
              </TouchableOpacity>

              <View style={styles.separatorBottom} />
            </View>
            {/* Project  End Date */}
            <View style={styles.viewColomStyle}>
              <CustomText children={'End Date:'} style={styles.title} />
              <TouchableOpacity onPress={() => {
                if (startDate == null || endDate == null) {
                  ShowToast("Please Select Company Dates")
                } else {
                  setClickType('ProjectEndDate')
                  setShowDatePicker(true)
                  // setProjectEndDate(endDate)
                  // console.log("object", new Date(moment(endDate, 'DD-MM-YYYY').format('YYYY-MM-DD')))
                }

              }}>
                <View style={styles.viewStartDateStyle}>
                  <CustomText children={formatDate(projectEndDate)} style={styles.startDateButton} />
                  {/**  <TextInput
                    value={formatDate(projectEndDate)}
                    editable={editableText}
                    keyboardType="default"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={txtEndDate => {
                      setEndDate(txtEndDate);
                    }}
                    underlineColorAndroid="transparent"
                    placeholder={""}
                    multiline={true}
                    maxFontSizeMultiplier={1}
                    style={styles.startDateButton}
                  />*/}
                  <CalenderIcon />
                </View>
              </TouchableOpacity>

              <View style={styles.separatorBottom} />
            </View>
          </View>
          {/* Project Description */}
          <View style={[styles.viewBottomStyle, { marginTop: -10 }]}>
            <CustomText children={'Project Description:'} style={styles.title} />
            <TextInput
              value={projectDesc}
              editable={true}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={txtDescription => {
                setProjectDesc(txtDescription);
              }}
              underlineColorAndroid="transparent"
              placeholder={""}
              multiline={true}
              style={styles.textInput}
            />
            <View style={[styles.separatorBottom, , { marginTop: 0 }]} />
          </View>

          <View style={styles.viewButton}>
            <CustomButton
              onPress={handleSubmit}
              title={AppString.SAVE}
              style={styles.modalSaveButton}
              textStyle={styles.textSaveColor}
            />
            <CustomButton
              onPress={() => handleExperienceClose('cancelPopup')}
              title={AppString.CANCEL}
              style={styles.modalCancelButton}
              textStyle={styles.textCancelColor}
            />
          </View>
          {showDatePicker && (
            <DateTimePicker
              isVisible={showDateTimePicker}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={() => {
                setShowDatePicker(false),
                  clickType == 'CompanyStartDate' || clickType == 'CompanyEndDate' ?
                    (setStartDate(startDate ? startDate : projectData[0]?.from_date),
                      setEndDate(projectData[0]?.to_date))
                    : (setProjectStartDate(projectStartDate ? projectStartDate : projectData[0]?.projects[0]?.start_date),
                      setProjectEndDate(projectData[0]?.projects[0]?.end_date))
              }}
              minimumDate={clickType == 'CompanyStartDate' || clickType == 'CompanyEndDate' ? (startDate == undefined ? null : new Date(moment(startDate, 'DD-MM-YYYY').format('YYYY-MM-DD')))
                : (projectStartDate == undefined ? null : new Date(moment(startDate, 'DD-MM-YYYY').format('YYYY-MM-DD')))}
              maximumDate={clickType == 'CompanyStartDate' || clickType == 'CompanyEndDate' ? (startDate == undefined ? new Date() : null)
                : (projectStartDate == undefined ? null : new Date(moment(endDate, 'DD-MM-YYYY').format('YYYY-MM-DD')))}
            />
          )}
        </View>
      </KeyboardAwareScrollView>

    </RBSheet>
  );
};

export default AddNewExperience