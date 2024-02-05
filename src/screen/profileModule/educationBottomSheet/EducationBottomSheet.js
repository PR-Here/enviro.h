import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import CustomText from '../../../component/atoms/CustomText';
import { CALENDER_ICON } from '../../../utils/AssetsImages';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CustomButton from '../../../component/atoms/CustomButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import { styles } from './Style';
import AppString from '../../../utils/AppString';
import CustomTextInput from '../../../component/atoms/CustomTextInput';
import { ShowToast, formatDate } from '../../../utils/Constant';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Cross from '../../../../assets/images/SVG/cros.svg';
import moment from 'moment';

const AddNewEducationBottomNav = ({ handleExperienceClose, handleEducationSubmit, visible, educationData = [], last_id }) => {
  const [title, setTitle] = useState(educationData[0]?.course);
  const [instituteName, setInstituteName] = useState(educationData[0]?.board);
  const [startDate, setStartDate] = useState(educationData[0]?.start_date);
  const [modeStartDate, setModeStartDate] = useState('date');
  const [showStartDate, setShowStartDate] = useState(false);
  const [endDate, setEndDate] = useState(educationData[0]?.end_date);
  const [modeEndDate, setModeEndDate] = useState('date');
  const [clickType, setClickType] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const refRBSheet = useRef();

  useEffect(() => {
    if (visible) {
      refRBSheet.current.open();
    }
  }, [visible]);

  const onChange = (selectedValue) => {
    setShowDatePicker(false)
    if (clickType == 'endDate') {
      setEndDate(formatDate(selectedValue))
    }
    else if (clickType == 'startDate') {
      setStartDate(formatDate(selectedValue))
    };
  }

  const handleSubmit = () => {

    if (title == '' || title == undefined) {
      ShowToast('Please enter Education Qualification')
    }
    else if (instituteName == '' || instituteName == undefined) {
      ShowToast('Please enter Institute Name')
    }
    else if (startDate == '' || startDate == undefined) {
      ShowToast('Please select Start date')
    }
    else if (endDate == '' || endDate == undefined) {
      ShowToast('Please select End date')
    }
    else {
      const selectedData = {
        course: title,
        board: instituteName,
        start_date: startDate,
        end_date: endDate,
        id: educationData[0]?.id != undefined ? educationData[0]?.id : last_id + 1
      }
      handleEducationSubmit(selectedData)
    }
  };

  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={false}
      closeOnPressMask={true}
      onClose={() => handleExperienceClose()}
      height={410}
      openDuration={250}
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
      <View style={styles.viewMainBottomStyle}>
        <View style={styles.header}>
          <Text style={styles.DetailsTitle}> {AppString.EDUCATION_DETAILS}</Text>
          <TouchableOpacity style={styles.close} onPress={handleExperienceClose}>
            <Cross />
          </TouchableOpacity>
        </View>
          {/**Title View */}
          <View style={styles.viewBottomStyle}>
            <CustomText children={AppString.EDUCATION_QUALIFICATION + ' :'} style={styles.title} />
            <CustomTextInput
              onChangeText={(e) => setTitle(e)}
              value={title}
              placeholder={'Enter education qualification'}
              style={styles.textInput}
            />
            <View style={styles.separatorBottom} />
          </View>
          {/**Institute Name View */}
          <View style={styles.viewBottomStyle}>
            <CustomText children={AppString.INSTITUTE_NAME + ' :'} style={styles.title} />
            <CustomTextInput
              onChangeText={(e) => setInstituteName(e)}
              value={instituteName}
              placeholder={'Enter institute name'}
              style={styles.textInput}
            />
            <View style={styles.separatorBottom} />
          </View>
          {/**Start Date View */}
          <View style={styles.viewDateBottomStyle}>
            <View style={styles.viewColomStyle}>
              <CustomText
                children={AppString.START_DATE + ' :'}
                style={styles.title}
              />
              <TouchableOpacity onPress={() => {
                setClickType('startDate');
                setShowDatePicker(true)
                setStartDate(null)
                setEndDate(null)
              }}>
                <View style={styles.viewStartDateStyle}>
                  <CustomText children={startDate == undefined ? 'Select date' : startDate} style={styles.dateText} />
                  <Image source={CALENDER_ICON} style={styles.imageStyle} />
                </View>
              </TouchableOpacity>
              <View style={styles.separatorBottom} />
            </View>
            {/**End Date View */}
            <View style={styles.viewColomStyle}>
              <CustomText
                children={AppString.END_DATE + ' :'}
                style={styles.title}
              />
              <TouchableOpacity onPress={() => {
                if (startDate == undefined) {
                  ShowToast("Please Choose Start date first")
                  return
                }
                setClickType('endDate');
                setShowDatePicker(true)
              }}>
                <View style={styles.viewStartDateStyle}>
                  <CustomText children={endDate == undefined ? 'Select date' : endDate} style={styles.endDateText} />
                  <Image source={CALENDER_ICON} style={styles.imageStyle} />
                </View>
              </TouchableOpacity>

              <View style={styles.separatorBottom} />
            </View>
          </View>
          {/**Save and Cancel Button View */}
          <View style={styles.viewButton}>

            <CustomButton
              onPress={handleSubmit}
              title={AppString.SAVE}
              style={styles.modalSaveButton}
              textStyle={styles.textSaveColor}
            />
            <CustomButton
              onPress={handleExperienceClose}
              title={AppString.CANCEL}
              style={styles.modalCancelButton}
              textStyle={styles.textCancelColor}
            />
          </View>
        {showDatePicker && (
          <DateTimePicker
            isVisible={true}
            mode="date"
            onConfirm={onChange}
            onCancel={() => {
              setShowDatePicker(false),
                setStartDate(startDate ? startDate : educationData[0]?.start_date),
                setEndDate(educationData[0]?.end_date)
            }}
            minimumDate={startDate == undefined ? null : new Date(moment(startDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))}
            maximumDate={startDate == undefined ? new Date() : null}
          />
        )}
      </View>
    </RBSheet>
  );
};

export default AddNewEducationBottomNav;