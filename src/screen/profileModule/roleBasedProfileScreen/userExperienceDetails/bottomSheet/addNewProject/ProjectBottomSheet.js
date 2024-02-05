import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { styles } from './Style';
import AppString from '../../../../../../utils/AppString';
import CustomText from '../../../../../../component/atoms/CustomText';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CustomButton from '../../../../../../component/atoms/CustomButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ShowToast, formatDate } from '../../../../../../utils/Constant';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CalenderIcon from '../../../../../../../assets/images/SVG/calendar_days.svg'
import Cross from '../../../../../../../assets/images/SVG/cros.svg';
import moment from 'moment';

const ProjectBottomSheet = ({ handleCloseofAddNewProjectBottomSheet,
  showAddNewProjectBottomSheet, projectData = [], handelProjClose,
  companyStartDate, companyEndDate }) => {

  const [title, setTitle] = useState(projectData[0]?.projects[0]?.role);
  const [startDate, setStartDate] = useState(projectData[0]?.projects[0]?.start_date);
  const [endDate, setEndDate] = useState(projectData[0]?.projects[0]?.end_date);
  const [editableText, seteditableText] = useState(false);
  const [project, setProject] = useState(projectData[0]?.projects[0]?.description);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clickType, setClickType] = useState(null);
  const refRBSheet = useRef();



  useEffect(() => {
    if (showAddNewProjectBottomSheet) {
      refRBSheet.current.open();
    }
  }, [showAddNewProjectBottomSheet]);

  // START DATE AFTER SELECT
  const onChange = (selectedValue) => {
    setShowDatePicker(false);
    if (clickType == 'startDate') setStartDate(formatDate(selectedValue))
    else if (clickType == 'endDate') {
      setEndDate(formatDate(selectedValue))
    }
  };

  const handleSubmit = () => {
    if (title == null || title == '') {
      ShowToast(AppString.PLEASE_ENTER_TITLE);
    } else if (startDate == null || startDate == '') {
      ShowToast(AppString.PLEASE_SELECT_START_DATE);
    } else if (endDate == null || endDate == '') {
      ShowToast(AppString.PLEASE_SELECT_END_DATE);
    } else if (project == null || project == '') {
      ShowToast(AppString.PLEASE_ENTER_PROJECT_DESC);
    }
    else {
      const selectedData = {
        role: title,
        description: project,
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
        companyDetails: projectData
      };
      handleCloseofAddNewProjectBottomSheet(selectedData);
    }
  };

  const handleClose = () => {
    handleCloseofAddNewProjectBottomSheet()
  }

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={false}
      closeOnPressMask={true}
      onClose={() => handelProjClose()}
      height={420}
      openDuration={230}
      customStyles={{
        container: {
          borderTopLeftRadius: 38,
          borderTopRightRadius: 38,
        },
        wrapper: {
          backgroundColor: '#00000070',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}>

      <KeyboardAwareScrollView enableOnAndroid>
        {/* PROJECT NAME */}
        <View style={styles.viewMainBottomStyle}>
          <View style={styles.header}>
            <Text style={styles.DetailsTitle}> {AppString.PROJECT_DETAILS}</Text>
            <TouchableOpacity style={styles.close} onPress={handelProjClose}>
              <Cross />
            </TouchableOpacity>
          </View>

          <View style={styles.viewBottomStyle}>
            <CustomText children={'Project Role:'} style={styles.title} />
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
              placeholder={'Project name'}
              multiline={false}
              maxFontSizeMultiplier={1}
              style={styles.textInput}
            />
            <View style={styles.separatorBottom} />

          </View>
          {/* START DATE */}
          <View style={styles.viewDateBottomStyle}>
            <View style={styles.viewColomStyle}>
              <CustomText children={'Start Date:'} style={styles.title} />
              <TouchableOpacity onPress={() => {
                setShowDatePicker(true)
                setClickType('startDate')
                // setStartDate(null)
                // setEndDate(null)
              }}>
                <View style={styles.viewStartDateStyle}>
                  <TextInput
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
                    placeholder={'Start Date'}
                    multiline={true}
                    maxFontSizeMultiplier={1}
                    style={styles.startDateButton}
                  />
                  <CalenderIcon />
                </View>
              </TouchableOpacity>

              <View style={styles.separatorBottom} />
            </View>
            {/* END DATE */}
            <View style={styles.viewColomStyle}>
              <CustomText children={'End Date:'} style={styles.title} />
              <TouchableOpacity onPress={() => {
                setShowDatePicker(true)
                setClickType('endDate')
              }}>
                <View style={styles.viewStartDateStyle}>
                  <TextInput
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
                    placeholder={'End Date'}
                    multiline={true}
                    maxFontSizeMultiplier={1}
                    style={styles.startDateButton}
                  />
                  <CalenderIcon />
                </View>
              </TouchableOpacity>
              <View style={styles.separatorBottom} />
            </View>

          </View>
          {/* PROJECT DESCRIPTION */}
          <View style={styles.viewBottomStyle}>
            <CustomText children={'Project Description :'} style={styles.title} />
            <TextInput
              value={project}
              editable={true}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={txtProject => {
                setProject(txtProject);
              }}
              underlineColorAndroid="transparent"
              placeholder={'Project description'}
              multiline={true}
              style={styles.textInput}
            />
            <View style={styles.separatorBottom} />
          </View>

          {/* save and cancel button */}
          <View style={styles.viewButton}>
            <CustomButton
              onPress={handleSubmit}
              title={AppString.SAVE}
              style={styles.modalSaveButton}
              textStyle={styles.textSaveColor}
            />
            <CustomButton
              onPress={handleClose}
              title={AppString.CANCEL}
              style={styles.modalCancelButton}
              textStyle={styles.textCancelColor}
            />
          </View>
        </View>



        {showDatePicker &&
          <DateTimePicker
            isVisible={true}
            mode="date"
            onConfirm={onChange}
            onCancel={() => {
              setShowDatePicker(false)
              // setStartDate(startDate ? startDate : educationData[0]?.start_date),
              // setEndDate(educationData[0]?.end_date)
            }}
            // minimumDate={startDate == undefined ? null : new Date(moment(companyStartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))}
            // maximumDate={companyStartDate == undefined ? new Date() : new Date(moment(companyEndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))}
            minimumDate={new Date(moment(companyStartDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))}
            maximumDate={new Date(moment(companyEndDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))}
          />}
      </KeyboardAwareScrollView>
    </RBSheet>
  );
};

export default ProjectBottomSheet;
