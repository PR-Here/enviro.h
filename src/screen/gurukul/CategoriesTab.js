import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import CustomText from '../../../src/component/atoms/CustomText';
import AppString from '../../../src/utils/AppString';
import { styles } from './Style';
import { useSelector } from 'react-redux';
import Polygon from '../../../assets/images/SVG/Polygon.svg';
import Pdf from '../../../assets/images/SVG/pdf_icon.svg';
import DropDownArrow from '../../../assets/images/SVG/dropDownArrow.svg';
import LockIcon from '../../../assets/images/SVG/lock-keyhole.svg';
import { BLACK } from '../../theme/Colors';
import { FontName } from '../../theme/Fonts';
import AssetsImages from '../../utils/AssetsImages';
import { FontFamily } from '../settings/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import NavString from '../../utils/NavString';

const CategoriesTab = ({ data, tabClick, recommendedCourse }) => {

    const tabs = [
        { id: 'Lesson', label: AppString.MODULE },
        { id: 'Description', label: AppString.DESCRIPTION },
    ];
    const [activeTab, setActiveTab] = useState('Lesson');
    const navigation = useNavigation()
    const handleTabChange = tabId => {
        setActiveTab(tabId);
        tabClick(tabId)
    };

    return (
        <View style={[styles.container, { marginHorizontal: wp(1.5) }]}>
            {/* <View style={{ marginHorizontal: wp(10) }}></View> */}
            <View style={[styles.tabBarContainer]}>

                {tabs?.map(tab => (

                    <TouchableOpacity
                        key={tab.id}
                        TouchableOpacity={0.5}
                        style={[
                            [styles.tabButton,
                            tab.id === activeTab ? styles.activeTab : null, { alignItems: 'center', }]
                        ]}
                        onPress={() => handleTabChange(tab.id)}>
                        <CustomText
                            style={[
                                styles.tabText,
                                tab?.id === activeTab ? styles.activeTextColor : null,
                            ]}
                            children={tab.label}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            {activeTab === 'Lesson' && (
                <>
                    {/* CategoriesModules */}
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data?.Gurukul_modules}
                        scrollEnabled={false}
                        renderItem={({ item }) =>
                            <CategoriesModules data={item} navigation={navigation} />
                        }
                        keyExtractor={(index) => index.toString()}
                    />

                    {/* InstructorUser  */}
                    <InstructorUser data={data} />

                    {/* Feedbacks */}
                    <Text style={{ fontFamily: FontFamily.gordita, fontWeight: '700', fontSize: 16, marginVertical: hp(2), color: "#000000" }}>Feedbacks</Text>
                    <View style={{ height: 0.5, backgroundColor: '#D9D9D9', marginBottom: hp(2) }}></View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data?.Gurukul_courses_ratings}
                        scrollEnabled={false}
                        renderItem={({ item }) =>
                            <FeedbackUser data={item} />
                        }
                        keyExtractor={(index) => index.toString()}
                    />

                    {/* RecommendedCourse */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: FontName.Gordita_Medium, fontWeight: '700', fontSize: 16, color: BLACK }}>Recommended Courses</Text>
                    </View>
                    <View style={{ height: 0.5, backgroundColor: '#D9D9D9', marginVertical: hp(2) }}></View>

                    <FlatList
                        data={recommendedCourse}
                        numColumns={2}
                        renderItem={({ item }) =>
                            <RecommendedCourse data={item} />
                        }
                    />
                    <View style={{ height: hp(12) }} />
                </>
            )}

            {activeTab === 'Description' && (
                <Text style={{ fontSize: 12, fontWeight: '400', fontFamily: FontName.Gordita_Regular, marginTop: hp(1.5), color: '#000', lineHeight: 17 }}>
                    {data?.description}
                </Text>
            )}

        </View>
    );
};

const CategoriesModules = ({ data, navigation }) => {
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (sectionIndex) => {
        setExpandedSections((prevExpandedSections) => ({
            ...prevExpandedSections,
            [sectionIndex]: !prevExpandedSections[sectionIndex]
        }));
    };

    return (
        <View style={{ marginHorizontal: hp(2), marginVertical: hp(2) }}>
            <Text style={{ fontFamily: FontFamily.gordita, fontWeight: '700', fontSize: 14, color: '#000000' }}>{data?.module_name}</Text>
            <Text style={{ fontFamily: FontFamily.gordita, fontWeight: '400', fontSize: 12, marginVertical: hp(2), color: '#000000' }}>{data?.module_details}</Text>

            <View style={{ height: 0.5, backgroundColor: '#D9D9D9', marginBottom: hp(2) }}></View>

            {
                data?.Gurukul_lessions?.map((section, sectionIndex) => (
                    <>
                        <TouchableOpacity onPress={() => toggleSection(sectionIndex)} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: FontName.Gordita_Regular, fontWeight: '700', fontSize: 12, marginVertical: hp(1), color: '#000000' }}>{section?.lesson_name}</Text>
                            <DropDownArrow style={{ transform: expandedSections[sectionIndex] ? [{ rotate: '-0deg' }] : [{ rotate: '-180deg' }] }} />
                        </TouchableOpacity>

                        {expandedSections[sectionIndex] &&
                            <>
                                <Text style={{ fontFamily: FontName.Gordita_Regular, fontWeight: '400', fontSize: 12, marginVertical: hp(1), color: '#000000' }}>{section?.lesson_details}</Text>

                                <View key={sectionIndex} style={{ marginTop: 20 }}>
                                    {section?.Gurukul_lession_attechments.map((subItem, subIndex) => (
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                            if (subItem?.attachment_type == 1) {
                                                navigation.navigate(NavString.CATEGORIES_DETAILS, { attachment_data: subItem?.attachment_data })
                                            } else if (subItem?.attachment_type == 2) {
                                                navigation.navigate(NavString.PDF_VIEW, { lesson_name: section?.lesson_name, attachment_data: subItem?.attachment_data })
                                            }
                                        }} style={{ flexDirection: 'row', opacity: subItem.status == 'Lock' ? 0.3 : 1 }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={{
                                                    height: 30, width: 30,
                                                    backgroundColor: '#D9D9D9', borderRadius: 15,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    {subItem?.attachment_type == 1 ? <Polygon /> : <Pdf />}
                                                </View>

                                                {subIndex == section.length - 1 &&
                                                    <View style={{
                                                        borderStyle: 'dotted',
                                                        borderWidth: 1,
                                                        borderRadius: 1,
                                                        width: 1,
                                                        marginLeft: wp(4),
                                                        flex: 1,
                                                    }}>
                                                    </View>
                                                }
                                            </View>

                                            <Text style={{ marginHorizontal: wp(2) }}>{subIndex.title}</Text>
                                            <View >

                                                <Text style={{ fontSize: 12, fontWeight: '400', fontFamily: FontName.Gordita_Regular, color: 'blue', color: '#000000' }} >{subItem.title}</Text>

                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: hp(0) }}>

                                                    <Text style={{
                                                        fontFamily: FontFamily.gordita, fontSize: 12, fontWeight: '400',
                                                        marginLeft: wp(1.5), color: '#8F8F8F', marginTop: wp(1)
                                                    }}>
                                                        {subItem?.duration}
                                                    </Text>
                                                    <View style={{ height: hp(1), width: wp(0.3), marginRight: 8, backgroundColor: '#8F8F8F', marginLeft: wp(2) }} />
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        {subItem.status === 'Lock' && <LockIcon />}
                                                        <Text style={{

                                                            fontFamily: FontFamily.gordita, fontSize: 12, fontWeight: '400',
                                                            marginLeft: wp(1.5), color: '#8F8F8F', marginLeft: wp(2),
                                                            color: subItem.status === 'Lock' ? '#8F8F8F' : '#F17C1D',

                                                        }}>
                                                            {subItem.status}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ height: 20, }}></View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}

                                    {sectionIndex === 0 ? <View style={{ height: 0.5, backgroundColor: '#D9D9D9', marginBottom: hp(2) }}></View>
                                        : null
                                    }
                                </View>
                            </>
                        }
                    </>
                ))}

        </View>
    )
}

const InstructorUser = ({ data }) => {
    const profile_image = useSelector((state) => state?.auth?.profileImage);

    return (
        <>
            <Text style={{ fontFamily: FontFamily.gordita, fontWeight: '700', fontSize: 16, marginVertical: hp(2), color: "#000000" }}>Instructor</Text>
            <View style={{ height: 0.5, backgroundColor: '#D9D9D9', marginBottom: hp(2) }}></View>

            <View>
                <View style={{ flexDirection: 'row', }}>
                    <Image source={data?.User?.profile_image == null ? AssetsImages.DUMMY : { uri: profile_image }} style={{ marginLeft: 10, height: 40, width: 40, borderRadius: 400 / 2 }} />

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: FontFamily.gordita, fontSize: 12, fontWeight: '500', marginLeft: wp(3), marginTop: wp(0.5), color: "#000000" }}>{data?.User?.full_name}</Text>
                        <Text style={{
                            fontFamily: FontFamily.gordita, fontSize: 12, fontWeight: '400',
                            color: '#8F8F8F', marginVertical: hp(0.5), marginHorizontal: wp(3)
                        }}>
                            {data?.User?.about}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: hp(2) }}>
                </View>
            </View>
        </>
    )
}

const FeedbackUser = ({ data }) => {

    return (
        <>
            <View>
                <View style={{ flexDirection: 'row', }}>
                    <Image source={data?.User?.profile_image == null ? AssetsImages.DUMMY : { uri: data?.User?.profile_image }} style={{ marginLeft: 10, height: 40, width: 40, borderRadius: 400 / 2 }} />

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: FontFamily.gordita, fontSize: 12, fontWeight: '500', marginLeft: wp(3), marginTop: wp(0.5), color: "#000000" }}>{data?.User?.full_name}</Text>
                        <Text style={{
                            fontFamily: FontFamily.gordita, fontSize: 12, fontWeight: '400',
                            color: '#8F8F8F', marginVertical: hp(0.5), marginHorizontal: wp(3)
                        }}>
                            {data?.feedback}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: hp(2) }}>
                </View>
            </View>
        </>
    )
}

const RecommendedCourse = ({ data }) => {
    return (
        <>
            <View style={{
                borderWidth: 1, borderColor: '#D9D9D9',
                borderRadius: 10,
                alignItems: 'center', padding: 5, marginHorizontal: 10, marginTop: 15
            }}>
                <Image source={{ uri: data?.image }} style={{ height: 160, width: 160, margin: 5, borderRadius: 20 }} />
                <Text numberOfLines={1} style={{ alignSelf: 'flex-start', marginHorizontal: wp(2), fontFamily: FontFamily.gordita, fontSize: 12, fontWeight: '500', marginTop: hp(1) }}>
                    {data.title}
                </Text>
                <Text style={{ alignSelf: 'flex-start', marginHorizontal: wp(2), fontFamily: FontFamily.gordita, fontSize: 10, fontWeight: '400', color: '#8F8F8F', marginTop: hp(0.5) }}>
                    By: {data?.User?.full_name}
                </Text>
            </View>
        </>
    )
}

export default CategoriesTab;


