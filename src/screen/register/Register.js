import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../component/header/Header';
import {styles} from './Style';
import AppString from '../../utils/AppString';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomButton from '../../component/atoms/CustomButton';
import CustomText from '../../component/atoms/CustomText';
import CustomTextInput from '../../component/atoms/CustomTextInput';
import ErrorMessage from '../../component/atoms/ErrorMessage';

const Register = ({navigation}) => {
  const handleRegisterClick = () => {};
  const handleBackClick = () => {
    navigation.goBack();
  };

  const initialValue = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(AppString.PLEASE_ENTER_VALID_EMAIL)
      .required(AppString.PLEASE_ENTER_EMAIL),
    password: yup.string().min(8).required(AppString.PLEASE_ENTER_PASSWORD),
    confirmPassword: yup
      .string()
      .min(8)
      .required(AppString.PLEASE_ENTER_CONFIRM_PASS)
      .oneOf([yup.ref('password'), null], AppString.PASSWORD_MISMATCH),
  });

  return (
    <View style={styles.container}>
      <Header title={AppString.REGISTER} />
      <CustomText style={styles.registerText} children={AppString.REGISTER} />
      <Formik
        initialValues={initialValue}
        onSubmit={handleRegisterClick}
        validationSchema={validationSchema}>
        {({
          errors,
          handleBlur,
          handleSubmit,
          handleChange,
          touched,
          values,
        }) => (
          <View style={styles.textInputView}>
            <CustomTextInput
              placeholder={AppString.ENTER_EMAIL}
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              value={values.email}
            />
            <ErrorMessage error={touched.email && errors.email} />
            <CustomTextInput
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              value={values.password}
              placeholder={AppString.ENTER_PASSWORD}
            />
            <ErrorMessage error={touched.password && errors.password} />
            <CustomTextInput
              onBlur={handleBlur('confirmPassword')}
              onChangeText={handleChange('confirmPassword')}
              value={values.confirmPassword}
              placeholder={AppString.ENTER_CONFIRM_PASS}
            />
            <ErrorMessage
              error={touched.confirmPassword && errors.confirmPassword}
            />
            <CustomButton title={AppString.REGISTER} onPress={handleSubmit} />
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

export default Register;
