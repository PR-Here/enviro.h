//import liraries
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { BACKGROUND_COLOR_DASHBOARD, BLACK, BLUE, GREEN, GREY, LIGHT_BLUE, PRIMARY_COLOR, WHITE } from '../../../theme/Colors';
import Ruppes from '../../../../assets/images/SVG/WalletIcons/rupee.svg'
import { ProgressBar } from 'react-native-paper';
import Header from '../../../component/header/Header';
import AppString from '../../../utils/AppString';
import PaidRupee from '../../../../assets/images/SVG/WalletIcons/paidrupee.svg'
import CustomText from '../../../component/atoms/CustomText';
import { FontName, FontSize } from '../../../theme/Fonts';
import Invoice from '../../../../assets/images/SVG/WalletIcons/invoice.svg'
import Camera from '../../../../assets/images/SVG/WalletIcons/camera.svg'
import Upload from '../../../../assets/images/SVG/WalletIcons/upload_black.svg'
import DummyBill from '../../../../assets/images/SVG/WalletIcons/dummy_bill.svg'
import NavString from '../../../utils/NavString';
import DocumentPicker from 'react-native-document-picker';
import AlertDialog from '../../../component/atoms/AlertDialog';
import { launchCamera } from 'react-native-image-picker';
import CustomImage from '../../../component/atoms/CustomImage';

// create a component
const AfterPay = ({ navigation }) => {

    const [fileResponse, setFileResponse] = useState([]);
    const [pickImage, setPickImage] = useState('');

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Enviro App Camera Permission',
                    message:
                        'Enviro App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );

            if (granted) {
                onUpdateImagePress();
            } else if (granted == 'never_ask_again') {
                Alert.alert("Permission Denied", "Camera permission is denied. Please enable from device setting", [{
                    text: 'Enbale',
                    onPress: () => Linking.openSettings()
                }])
            }
        } catch (err) {
            console.log("-- ", err);
        }
    };


    const onUpdateImagePress = () =>
        AlertDialog('Select Image', 'Please Select Type', [
            // {
            //     onPress: () => {
            //         launchImageLibrary(
            //             {
            //                 mediaType: 'photo'
            //             },
            //             response => {
            //                 if (response?.didCancel) {
            //                     return;
            //                 }
            //                 PROFILE_IMAGE_API(response)
            //                 // if (response.assets && response.assets[0]?.fileSize) {
            //                 //   if (response.assets[0]?.fileSize.size > 1024 * 1024) {
            //                 //     console.log("File with maximum size of 1MB is allowed");
            //                 //     return false;
            //                 //   }

            //             },
            //         );
            //     },
            //     label: 'Pick From Gallery',
            // },
            {
                onPress: () => {
                    launchCamera(
                        {
                            selectionLimit: 0,
                            mediaType: 'photo',
                        },
                        response => {
                            if (response?.errorCode == 'others') {
                                ShowToast("Camera permission denied. Please enable from device setting.")
                            }
                            if (response?.didCancel) {
                                return;
                            }
                            setPickImage(response)
                            // console.log(response?.assets[0]?.uri)
                        },

                    );
                },
                label: AppString.CAPTURE_FROM_CAMERA,
            }
        ]);




    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
            });
            setFileResponse(response);
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Header title={AppString.PAY} />
            <View style={{
                marginTop: moderateScale(15), backgroundColor: WHITE, height: moderateScale(155),
                marginHorizontal: moderateScale(10),
                borderRadius: 8
            }}>
                <View style={{ marginTop: moderateScale(10), flexDirection: 'row' }}>
                    <PaidRupee width={60} height={60} style={{ marginStart: 4, marginEnd: 4 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: moderateScale(10) }}>
                        <View>
                            <CustomText children={"Paid to McDonald’s"} style={styles.cellTextStyle} fontSize={FontSize(14)} />
                            <CustomText children={"City Market"} style={[styles.cellTextTimeStyle, { marginTop: 5 }]} fontSize={FontSize(12)} />
                        </View>
                        <View style={[styles.subInnerView, { marginTop: -3 }]}>
                            <Ruppes width={20} height={20} style={{ marginTop: 2, alignItems: 'center', marginHorizontal: 'center', justifyContent: 'center' }} />
                            <CustomText children={"1500"} style={[styles.textStyle, { fontFamily: FontName.Gordita_Medium, fontWeight: '500' }]} fontSize={FontSize(16)} />
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginHorizontal: moderateScale(6), marginTop: moderateScale(5) }}>
                    <Text style={{ color: BLACK }}>Transaction Id- 1238764590</Text>
                    <Text style={{ color: BLACK, marginTop: moderateScale(0) }}>Sep 7, 2023 5:30 PM</Text>
                </View>

                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', marginBottom: moderateScale(11),
                    alignItems: 'center'
                }}>
                    <View style={{ flexDirection: 'row', marginLeft: moderateScale(10) }}>
                        <Invoice width={20} height={20} style={{ marginTop: 0, alignItems: 'center', marginHorizontal: 'center', justifyContent: 'center' }} />
                        <CustomText children={"Invoice : "} style={[styles.cellTextStyle, { marginStart: 8 }]} fontSize={FontSize(14)} />
                        <CustomText children={"Not Uploaded"} style={[styles.cellTextStyle, { color: LIGHT_BLUE }]} fontSize={FontSize(14)} />
                    </View>
                    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                        <TouchableOpacity style={{
                            borderRadius: 4,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: moderateScale(15),
                            backgroundColor: BLACK,
                            height: moderateScale(26),
                            width: moderateScale(33)
                        }}
                            onPress={handleDocumentSelection}
                        >
                            <Upload width={40} height={40} style={{ alignItems: 'center', marginHorizontal: 'center', justifyContent: 'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            borderRadius: 4,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: moderateScale(5),
                            backgroundColor: BLACK,
                            height: moderateScale(26),
                            width: moderateScale(33)
                        }}
                            // onPress={() => (navigation.navigate(NavString.BILL_SCREEN))}
                            onPress={requestCameraPermission}
                        >
                            <Camera width={40} height={40} style={{ alignItems: 'center', marginHorizontal: 'center', justifyContent: 'center' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Text style={{ marginLeft: moderateScale(15), marginTop: moderateScale(20), fontSize: FontSize(16), fontFamily: FontName.Gorditas_Bold, color: PRIMARY_COLOR }}>Bill Images</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    marginLeft: moderateScale(20),
                    marginTop: moderateScale(10),
                    height: moderateScale(104), width: moderateScale(104), borderWidth: 0,
                    borderColor: '#D9D9D9',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <Image source={{ uri: pickImage == '' ? null : pickImage?.assets[0]?.uri }} style={{ width: 120, height: 90, marginTop: 0, borderRadius: 8 }} />
                    {/*  <DummyBill /> */}

                </View>
                <View style={{
                    marginLeft: moderateScale(20),
                    marginTop: moderateScale(14),
                    height: moderateScale(94), width: moderateScale(100), borderWidth: 1,
                    borderColor: '#D9D9D9',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View>
                        <Text>Uploading....</Text>
                        <ProgressBar style={{ marginTop: moderateScale(15) }} progress={0.9} color={BLUE} />
                    </View>
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR_DASHBOARD
    },
    cellTextStyle: {
        color: BLACK,
        fontFamily: FontName.Gordita_Medium,
        fontWeight: '500',
        marginStart: 2,
    },
    cellTextTimeStyle: {
        color: GREY,
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '400',
        marginStart: 2,
    },
    subInnerView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: -15
    },
});

//make this component available to the app
export default AfterPay;
