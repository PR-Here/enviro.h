import { View, Image, SafeAreaView, TouchableOpacity } from "react-native"
import { styles } from "./Style"
import { BACK_ARROW, LOGO } from "../../utils/AssetsImages"
import CustomTextInput from "../../component/atoms/CustomTextInput"
import CustomButton from "../../component/atoms/CustomButton"
import * as yup from "yup"
import { Formik } from "formik"
import AppString from "../../utils/AppString"
import ErrorMessage from "../../component/atoms/ErrorMessage"
import { WHITE } from "../../theme/Colors"




const ChangePassword = ({ navigation }) => {
    const initialValue = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    const validationSchema = yup.object({
        oldPassword: yup
            .string()
            .required('Please Enter Old Password'),
        newPassword: yup
            .string()
            .required('Please Enter New Password'),
        confirmPassword: yup
            .string()
            .required('Please Enter Confirm Password')
    });

    return (
        <SafeAreaView style={[styles.container]}>
            <View>
                <Formik
                    initialValues={initialValue}
                    validationSchema={validationSchema}
                    onSubmit={values => console.log(values)}
                >
                    {({
                        handleSubmit, handleBlur, handleChange, values, errors, touched
                    }) => (

                        <>

                            <TouchableOpacity onPress={() => {
                                navigation.goBack()
                            }}>
                                <Image style={[styles.smallImage, { marginTop: 20, marginLeft: 10, tintColor: WHITE }]}
                                    source={BACK_ARROW} />
                            </TouchableOpacity>

                            <Image style={[styles.logo, { alignSelf: 'center', marginTop: 100 }]}
                                source={LOGO} />
                            <CustomTextInput style={[{ marginTop: 50 }]}
                                placeholder={'Old Password'}
                                keyboardType={'default'}
                                onChangeText={handleChange('oldPassword')}
                                onBlur={handleBlur('oldPassword')}
                                value={values.oldPassword}
                            />
                            <ErrorMessage error={touched.oldPassword && errors.oldPassword} />
                            <CustomTextInput style={[{ marginTop: 10 }]}
                                placeholder={'New Password'}
                                keyboardType={'default'}
                                onChangeText={handleChange('newPassword')}
                                onBlur={handleBlur('newPassword')}
                                value={values.newPassword}
                            />
                            <ErrorMessage error={touched.newPassword && errors.newPassword} />

                            <CustomTextInput style={[{ marginTop: 10 }]}
                                placeholder={'Confirm Password'}
                                keyboardType={'default'}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                            />
                            <ErrorMessage error={touched.confirmPassword && errors.confirmPassword} />

                            <CustomButton
                                onPress={handleSubmit}
                                title={AppString.CHANGE_PASSWORD}
                            />
                        </>

                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
}

export default ChangePassword;
