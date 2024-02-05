import { View, Text, Image, TouchableOpacity } from 'react-native';
import AssetsImages from '../../utils/AssetsImages';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './Style';
import CustomText from '../atoms/CustomText';
import AppString from '../../utils/AppString';
import CustomButton from '../atoms/CustomButton';
import { BLACK, GREY, GREY_LIGHT, PRIMARY_COLOR, WHITE } from '../../theme/Colors';
import { FontName, FontSize } from '../../theme/Fonts';
import { formatDateTime, getTimeAgo } from '../../utils/Constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Page = ({ item, footerTitle, onPress, onClickLink, onDownloadClick }) => {
  return (
    <View style={{ flex: 1 }}>
      {item.description == "" ? <View>
        <Image
          resizeMode='stretch'
          style={{
            backgroundColor: 'white',
            height: '100%',
            width: '100%'
          }} source={item.image == null ? AssetsImages.DEFAULT_ANNOUNCEMENT : { uri: item.image }} />

        <TouchableOpacity onPress={onPress} style={{ position: 'absolute', right: widthPercentageToDP(2), top: widthPercentageToDP(2), backgroundColor: BLACK, borderRadius: 100, padding: 3 }}>
          <Image style={{ tintColor: WHITE }} source={AssetsImages.CLOSE} />
        </TouchableOpacity>
      </View> :
        <View style={styles.container}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            enableOnAndroid>
            <View>
              <CustomText style={styles.eventTextStyle}>Announcement</CustomText>
              <CustomText style={styles.eventTimeStyle}>{formatDateTime(item.createdAt, 'DD MMM yyyy hh:mm A')}</CustomText>
              {/* <Image style={styles.imageStyle1} source={AssetsImages.CLOSE} /> */}
              <CustomText style={styles.titleTextStyle}>
                {item.title}
              </CustomText>
              <CustomText style={styles.postedTextStyle}>Posted {getTimeAgo(item.createdAt)}</CustomText>
              <View style={{ flex: 1 }}>
                <Image
                  resizeMode='stretch'
                  style={styles.imageStyle2} source={item.image == null ? AssetsImages.DEFAULT_ANNOUNCEMENT : { uri: item.image }} />
              </View>
              {/* <CustomText style={styles.textStyle1}>
                {item.description}
              </CustomText> */}
              <CustomText style={styles.textStyle2}>
                {item.description}
              </CustomText>
            </View>
          </KeyboardAwareScrollView>
          <TouchableOpacity onPress={onPress} style={styles.closeButtonTouchStyle}>
            <Image style={styles.closeImageStyle} source={AssetsImages.CLOSE} />
          </TouchableOpacity>
          {
            footerTitle != "" ? <CustomText style={styles.footerTextStyle}>{footerTitle}</CustomText>
              : <></>
          }
          {
            item.annoucement_link_url || item.attachment ?
              <View style={{ marginTop: 20, height: 0.3, backgroundColor: GREY_LIGHT, width: "100%" }} /> : <></>
          }
          <View style={styles.attachmentStyle}>
            {
              item.annoucement_link_url ? <View style={styles.clickLinkStyle}>
                <Image style={{ width: 14, height: 14, marginRight: 8, tintColor: GREY }} source={AssetsImages.ATTACHMENT} />
                <TouchableOpacity onPress={onClickLink}>
                  <CustomText style={styles.clickLinkTextStyle}>{item.annoucement_link_title ? item.annoucement_link_title : 'Click this link'}</CustomText>
                </TouchableOpacity>
              </View> : <View style={{ flex: 1 }} />
            }
            {
              item.attachment ? <CustomButton title={AppString.PDF_DOWNLOAD}
                textStyle={styles.buttonTextStyle}
                style={styles.submitButtonStyle}
                onPress={onDownloadClick} /> : <View style={{ flex: 1 }} />
            }
          </View>
        </View>
      }
    </View>
  );
};

export default Page;
