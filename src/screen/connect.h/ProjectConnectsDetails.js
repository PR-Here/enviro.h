import React from "react"
import { FlatList, StyleSheet, View, ScrollView } from "react-native"
import CustomText from "../../component/atoms/CustomText"
import { FontName, FontSize } from "../../theme/Fonts"
import { ALERTBG, PRIMARY_COLOR, WHITE } from "../../theme/Colors"
import MeetingHomeHeader from "../../component/header/MeetingHeader"
import AssetsImages from "../../utils/AssetsImages"
import { Image } from "react-native-svg"
import PdfFile from '../../../assets/images/SVG/pdf_file.svg'
import MarutiSuzuki from '../../../assets/images/SVG/Maruti_Suzuki.svg'

const ProjectConnectsDetails = ({ navigation }) => {

    const directConnectsArray = [
        {
            title: 'Sarah Selvanam',
            time: '2:36 PM',
            desp: '@Rahul.C we need the mockups ready on the creatives. Get it done by friday.',
            color: '#7FD671',
            //image: AssetsImages.DUMMY_CLIENT,
            repost: {
                title: 'Maruti Suzuki',
                name: 'Status of Website Designing',
                desc: 'Hello, \nLorem ipsum dolor sit amet, consectetur adipiscing eiusmod tempor incididunt. Can you look into this matter? Thanks'
            }
        },
        {
            title: 'Angad Bajwa',
            time: '2:36 PM',
            desp: '@Archit.D we also require to freeze the layout for the banners. I have forwarded the design to the client. They should give their approval by today evening',
            color: '#8598FF',
            attachment: {
                title: 'Launch Announcement Promo',
                size: '7KB',
                name: 'Announcement Promo'
            }
        },
        {
            title: 'Rahul C ',
            time: '2:36 PM',
            desp: '@Archit.D yes I’m nearly finished. Will post the update by EOD. Do you require it to be animated?',
            color: '#7FD671'
        },
        {
            title: 'Sarah Selvanam ',
            time: '2:36 PM',
            desp: 'Great! I think it looks fine. @Angad.B the design is fine from my end. If @Aman.K is ready with the copy, we can send it forward . @Rahul.C I think that will do. We dont need the animation right now, Once the mockup is ready, then we can start work on the animation',
            color: '#8598FF',
            // image: AssetsImages.DUMMY_CLIENT
        },
        {
            title: 'Sarah Selvanam',
            time: '2:36 PM',
            desp: '@Rahul.C we need the mockups ready on the creatives. Get it done by friday.',
            color: '#7FD671',
            // image: AssetsImages.DUMMY_CLIENT
        },
        {
            title: 'Angad Bajwa',
            time: '2:36 PM',
            desp: '@Archit.D we also require to freeze the layout for the banners. I have forwarded the design to the client. They should give their approval by today evening',
            color: '#8598FF'
        },
        {
            title: 'Rahul C ',
            time: '2:36 PM',
            desp: '@Archit.D yes I’m nearly finished. Will post the update by EOD. Do you require it to be animated?',
            color: '#7FD671',
            attachment: {
                title: 'Launch Announcement Promo',
                size: '7KB',
                name: 'Announcement Promo'
            }
        },
        {
            title: 'Sarah Selvanam ',
            time: '2:36 PM',
            desp: 'Great! I think it looks fine. @Angad.B the design is fine from my end. If @Aman.K is ready with the copy, we can send it forward . @Rahul.C I think that will do. We dont need the animation right now, Once the mockup is ready, then we can start work on the animation',
            color: '#8598FF',
            // image: AssetsImages.DUMMY_CLIENT
        },
        {
            title: 'Rahul C ',
            time: '2:36 PM',
            desp: '@Archit.D yes I’m nearly finished. Will post the update by EOD. Do you require it to be animated?',
            color: '#7FD671',
            attachment: {
                title: 'Launch Announcement Promo',
                size: '7KB',
                name: 'Announcement Promo'
            }
        },
        {
            title: 'Sarah Selvanam ',
            time: '2:36 PM',
            desp: 'Great! I think it looks fine. @Angad.B the design is fine from my end. If @Aman.K is ready with the copy, we can send it forward . @Rahul.C I think that will do. We dont need the animation right now, Once the mockup is ready, then we can start work on the animation',
            color: '#8598FF',
            //image: AssetsImages.DUMMY_CLIENT
        }
    ]

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <MeetingHomeHeader headerText={"# Diwali Brief - Mondelez 2"} />
            {/* Direct Connects */}
            <View style={{ height: 1, backgroundColor: ALERTBG, marginTop: 5, marginHorizontal: 15 }} />
            <FlatList
                style={{ marginHorizontal: 15 }}
                showsVerticalScrollIndicator={false}
                data={directConnectsArray}
                renderItem={({ item }) =>
                    <DirectConnects directItem={item} />
                }
            />
        </View>
    )
}

const DirectConnects = ({ directItem }) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
            {directItem.image == undefined ?
                <View style={{ backgroundColor: directItem.color, height: 40, width: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                    <CustomText children={'V'} style={{ color: WHITE, marginTop: Platform.OS == 'ios' ? 5 : 0, }} />
                </View> :
                <Image
                    style={{ height: 40, width: 40 }}
                    source={AssetsImages.DUMMY_CLIENT} />
            }
            <View style={{ flex: 1, marginLeft: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <CustomText children={directItem.title} style={{ fontSize: FontSize(13), fontFamily: FontName.Gordita_Regular }} />
                    <CustomText children={directItem.time} style={{ color: '#A4A4A4', fontSize: FontSize(12), fontFamily: FontName.Gordita_Regular }} />
                </View>
                <CustomText children={directItem.desp} style={{ color: '#A4A4A4', fontSize: FontSize(12), fontWeight: '400', fontFamily: FontName.Gordita_Regular }} />

                {
                    directItem.repost != undefined ?
                        <View style={{
                            marginTop: 10,
                            paddingHorizontal: 5,
                            borderLeftWidth: 1,
                            borderLeftColor: '#2398CE'

                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MarutiSuzuki />
                                <View style={{ marginStart: 10 }}>
                                    <CustomText children={directItem?.repost?.title} style={{ fontSize: FontSize(12), fontFamily: FontName.Gordita_Regular }} />
                                </View>
                            </View>
                            <View style={{ margin: 5 }}>
                                <CustomText children={directItem?.repost?.name} style={{ color: '#2398CE', fontSize: FontSize(12) }} />
                                <CustomText children={directItem?.repost?.desc} style={{ color: PRIMARY_COLOR, fontSize: FontSize(13), fontFamily: FontName.Gordita_Regular }} />
                            </View>
                        </View>
                        : <></>
                }
                {
                    directItem.attachment != undefined ?
                        <View style={{
                            marginTop: 10,
                            marginEnd: 5,
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                            elevation: 2,
                            borderRadius: 5,
                            backgroundColor: WHITE,
                            shadowOpacity: 0.3,
                            shadowOffset: { width: 0, height: 1 }
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <PdfFile />
                                <View style={{ marginStart: 10 }}>
                                    <CustomText children={directItem?.attachment?.title} style={{ fontSize: FontSize(12), fontFamily: FontName.Gordita_Regular }} />
                                    <CustomText children={directItem?.attachment?.size} style={{ color: '#A4A4A4', fontSize: FontSize(13), fontFamily: FontName.Gordita_Regular }} />
                                </View>
                            </View>
                            <View style={{ margin: 5, minHeight: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F1F1' }}>
                                <CustomText children={directItem?.attachment?.name} style={{ color: PRIMARY_COLOR, fontSize: FontSize(13), fontFamily: FontName.Gordita_Regular }} />
                            </View>
                        </View>
                        : <></>
                }
            </View>
        </View>
    )
}

export default ProjectConnectsDetails

const styles = StyleSheet.create({
    title: {
        fontSize: FontSize(15),
        marginTop: 20
    }
});

