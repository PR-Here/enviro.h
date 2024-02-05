import React, { useState, useLayoutEffect } from 'react';
import { View, TouchableOpacity, Linking, Platform, SafeAreaView } from 'react-native';
import { styles } from './Style';
import CustomText from '../../component/atoms/CustomText';
import AppString from '../../utils/AppString';
import Header from '../../component/header/Header';
import SupportIcon from '../../../assets/images/SVG/head_support.svg';
import Email from '../../../assets/images/SVG/orange_mail.svg';
import HR from '../../../assets/images/SVGOrange/hr_hs.svg';
import IT from '../../../assets/images/SVGOrange/it_hs.svg';
import Admin from '../../../assets/images/SVGOrange/admin_hs.svg';
import { TEXT_COLOR_ORANGE } from '../../theme/Colors';
import { FontName, FontSize } from '../../theme/Fonts';
import useApiEffect from '../../hooks/useApiEffect';
import { GENERAL_SETTING } from '../../services/ApiEndPoint';
import AppLoader from '../../utils/AppLoader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const Support = () => {
  const { makeApiRequest, loading } = useApiEffect()
  const [helpSupportData, setHelpSupportData] = useState(null);

  {/** Email calling */ }
  const emailHandle = (email) => {
    Linking.openURL(`mailto:${email}?subject=SendMail&body=Description`);
  };

  {/** Phone calling */ }
  const dialCall = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  useLayoutEffect(() => {
    HELP_SUPPORT_API()
  }, [])

  {/** Using Apis Method to fetch Help and support data*/ }
  async function HELP_SUPPORT_API() {
    const apiData = await makeApiRequest({ url: GENERAL_SETTING, method: 'POST', isToken: true, data: {} });
    if (apiData?.status == true) {
      setHelpSupportData(apiData?.data)
    } else {
      console.log("Help and support API ERROR: ", apiData)
    }
  }

  const RendEmailDetails = ({ img, title, email, phone, phoneone }) => {
    return (
      <View style={{ marginTop: 20 }}>
        <View style={styles.viewStyle}>
          <View style={styles.emailStyle}>
            {img}
          </View>
          <CustomText children={title} style={{ marginTop: 10 }} />
          <TouchableOpacity
            onPress={() => {
              emailHandle(email);
            }}>
            <CustomText children={email} style={{ color: TEXT_COLOR_ORANGE, marginTop: Platform.OS == 'ios' ? 5 : 3 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dialCall(phone);
            }}>
            <CustomText children={phone} style={{ color: TEXT_COLOR_ORANGE, marginTop: Platform.OS == 'ios' ? 5 : 3 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dialCall(phoneone);
            }}>
            <CustomText children={phoneone} style={{ color: TEXT_COLOR_ORANGE, marginTop: Platform.OS == 'ios' ? 5 : 3 }} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={AppString.HELP_SUPPORT} />
      <KeyboardAwareScrollView>
        <View style={styles.viewStyle}>
          <SupportIcon />
          <CustomText children={"How can we help you?"} style={{ fontFamily: FontName.Gorditas_Bold, fontSize: FontSize(20) }} />
        </View>

        {/** HR Data */}
        {helpSupportData?.hr_gmail != null ?
          <RendEmailDetails
            img=<Email />
            title="HR related queries"
            email={helpSupportData?.hr_gmail}
            phone={helpSupportData?.hr_phone}
            phoneone={""} /> : <View />}

        {/** IT Data */}
        {helpSupportData?.it_gmail != null ?
          <RendEmailDetails
            img=<Email />
            title="IT related queries"
            email={helpSupportData?.it_gmail}
            phone={helpSupportData?.it_phone}
            phoneone={helpSupportData?.enviro_phone} /> : <View />}

        {/** Admin Data */}
        {helpSupportData?.admin_gmail != null ?
          <RendEmailDetails
            img=<Email />
            title="Admin related queries"
            email={helpSupportData?.admin_gmail}
            phone={helpSupportData?.admin_phone}
            phoneone={""} /> : <View />}

        {/** Enviro Data */}
        {helpSupportData?.enviro_gmail != null ?
          <RendEmailDetails
            img=<Email />
            title="Enviro related queries"
            email={helpSupportData?.enviro_gmail}
            phone={""}
            phoneone={""} /> : <View />
        }
      </KeyboardAwareScrollView>
      <AppLoader isLoading={loading} />
    </SafeAreaView>
  );
};

export default Support;
