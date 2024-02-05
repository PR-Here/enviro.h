import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {styles} from './Style';
import Header from '../../component/header/Header';
import AppString from '../../utils/AppString';
import CustomButton from '../../component/atoms/CustomButton';
import CustomTextInput from '../../component/atoms/CustomTextInput';
import CustomText from '../../component/atoms/CustomText';
import ErrorMessage from '../../component/atoms/ErrorMessage';

const ForgotPassword = ({navigation}) => {
  const initialValue = {
    email: '',
  };

  const validationScheme = yup.object({
    email: yup
      .string()
      .email(AppString.PLEASE_ENTER_VALID_EMAIL)
      .required(AppString.PLEASE_ENTER_REGISTERED_EMAIL),
  });

  const handleButtonClick = values => {};
  const handleBackClick = values => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title={AppString.FORGOT_PASSWORD} />
      <CustomText
        children={AppString.FORGOT_PASSWORD}
        style={styles.forgotPassText}
      />
      <Formik
        initialValues={initialValue}
        validationSchema={validationScheme}
        onSubmit={handleButtonClick}>
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          errors,
        }) => (
          <View style={styles.textInputView}>
            <CustomTextInput
              onChangeText={handleChange('email')}
              value={values.email}
              onBlur={handleBlur('email')}
              placeholder={AppString.FORGOT_PASSWORD}
              style={styles.textInput}
            />
            <ErrorMessage error={touched.email && errors.email} />
            <CustomButton onPress={handleSubmit} title={AppString.GET_OTP} />
          </View>
        )}
      </Formik>
      {/* Back Button */}
      <View style={styles.BackButtonView}>
        <TouchableOpacity onPress={handleBackClick}>
          <CustomText children={AppString.BACK} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
