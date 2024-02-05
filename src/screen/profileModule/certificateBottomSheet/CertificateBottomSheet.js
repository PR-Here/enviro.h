import {
  View,
  Text,
  TouchableOpacity,
  Image,
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
import { WHITE } from '../../../theme/Colors';
import { ShowToast, formatDate } from '../../../utils/Constant';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Cross from '../../../../assets/images/SVG/cros.svg';
import moment from 'moment';

const AddNewCertificationBottomNav = ({ handleExperienceClose, handleCertificationSubmit, visible, certificateData = [], last_id }) => {
  const [title, setTitle] = useState(certificateData[0]?.certification_name);
  const [issueOrganization, setIssueOrganization] = useState(certificateData[0]?.institute);
  const [issueDate, setIssueDate] = useState(certificateData[0]?.issue_date);
  const [expireDate, setExpireDate] = useState(certificateData[0]?.expire_date);
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
    if (clickType == 'endDate') setExpireDate(formatDate(selectedValue))
    else if (clickType == 'startDate') {
      setIssueDate(formatDate(selectedValue))
    };
  }

  const handleSaveButtonClick = () => {
    if (title == '' || title == undefined) {
      showToastMsg('Please enter Education Qualification')
    }
    else if (issueOrganization == '' || issueOrganization == undefined) {
      showToastMsg('Please enter Institute Name')
    }
    else if (issueDate == '' || issueDate == undefined) {
      showToastMsg('Please select Start date')
    }
    else if (expireDate == '' || expireDate == undefined) {
      showToastMsg('Please select End date')
    }
    else {
      const selectedData = {
        certification_name: title,
        institute: issueOrganization,
        issue_date: issueDate,
        expire_date: expireDate,
        id: certificateData[0]?.id != undefined ? certificateData[0]?.id : last_id + 1
      }
      handleCertificationSubmit(selectedData)
    }
  }

  const showToastMsg = (msg) => {
    ShowToast(`${msg}`);
  }

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
          <Text style={styles.DetailsTitle}> {AppString.CRETIFICATION_DETAILS}</Text>
          <TouchableOpacity style={styles.close} onPress={handleExperienceClose}>
            <Cross />
          </TouchableOpacity>
        </View>
        {/** intial value data define and data set */}

        {/**Title View */}
        <View style={styles.viewBottomStyle}>
          <CustomText children={'Certificate Name :'} style={styles.title} />
          <CustomTextInput
            onChangeText={(e) => setTitle(e)}
            value={title}
            placeholder={'Enter certificate name'}
            style={styles.textInputStyle}
          />
          <View style={styles.separatorBottom} />
        </View>
        {/**Issue Organization View */}
        <View style={styles.viewBottomStyle}>
          <CustomText children={AppString.ISSUING_ORGANIZATION + ' :'} style={styles.title} />
          <CustomTextInput
            onChangeText={(e) => setIssueOrganization(e)}
            value={issueOrganization}
            placeholder={'Enter issuing organization name'}
            style={styles.textInputStyle}
          />
          <View style={styles.separatorBottom} />
        </View>
        {/**Issue Date View */}
        <View style={styles.viewDateBottomStyle}>
          <View style={styles.viewColomStyle}>
            <CustomText
              children={AppString.ISSUE_DATE + ' :'}
              style={styles.title}
            />
            <TouchableOpacity onPress={() => {
              setClickType('startDate');
              setShowDatePicker(true);
              setIssueDate(null);
              setExpireDate(null);
            }}>
              <View style={styles.viewStartDateStyle}>
                <CustomText children={issueDate == undefined ? 'Select Date' : issueDate} style={styles.dateText} />
                <Image source={CALENDER_ICON} style={styles.imageStyle} />
              </View>
            </TouchableOpacity>

            <View style={[styles.separatorBottom, {}]} />
          </View>
          {/**Expire Date View */}
          <View style={styles.viewColomStyle}>
            <CustomText
              children={AppString.EXPIRY_DATE + ' :'}
              style={styles.title}
            />
            <TouchableOpacity onPress={() => {
              setClickType('endDate');
              setShowDatePicker(true);
            }}>
              <View style={styles.viewStartDateStyle}>
                <CustomText children={expireDate == undefined ? 'Select Date' : expireDate} style={styles.dateText} />
                <Image source={CALENDER_ICON} style={styles.imageStyle} />
              </View>
            </TouchableOpacity>
            <View style={styles.separatorBottom} />
          </View>
        </View>
        {/**Save and Cancel Button View */}
        <View style={styles.viewButton}>
          <CustomButton
            onPress={handleSaveButtonClick}
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
                setIssueDate(certificateData[0]?.issue_date),
                setExpireDate(certificateData[0]?.expire_date)
            }}
            minimumDate={issueDate == undefined ? null : new Date(moment(issueDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))}
            maximumDate={issueDate == undefined ? new Date() : null}
          />
        )}
      </View>
    </RBSheet>
  );
};
export default AddNewCertificationBottomNav;
