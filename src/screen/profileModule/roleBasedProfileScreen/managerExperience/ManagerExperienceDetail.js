import { View, SafeAreaView, FlatList, Text } from 'react-native';
import React, { useState, useRef } from 'react';
import { styles } from './Style';
import CustomText from '../../../../component/atoms/CustomText';
import { useSelector, useDispatch } from 'react-redux';
import { safeParseJSON, onScrollHandler, capitalizeFirstLetter } from '../../../../utils/Constant';
import { onTabBarSroll } from '../../../../redux/slices/TabBarSlice';
import { BLACK, BLUE, GREY, TEXT_COLOR_GREY } from '../../../../theme/Colors';
import CenteredText from '../../../../component/atoms/CenteredText';
import AppString from '../../../../utils/AppString';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import moment from 'moment';


let hideTabBar = false
const ManagerExperienceDetail = () => {
    const dispatch = useDispatch();
    const textRef = useRef(null);
    const loginUserData = useSelector((state) => state?.auth?.profileData);
    const experienceDetails = safeParseJSON(loginUserData?.experiance)?.company;

    console.log("Before sorting:", experienceDetails);

    // sordting date function
    const sortedExperienceDetails = experienceDetails?.sort((a, b) => {
        const toDateA = new Date(a.to_date.split('-').reverse().join('-'));
        const toDateB = new Date(b.to_date.split('-').reverse().join('-'));
    
        if (toDateA > toDateB) {
            return -1;
        } else if (toDateA < toDateB) {
            return 1;
        } else {
            // If to_date is the same, compare based on from_date
            const fromDateA = new Date(a.from_date.split('-').reverse().join('-'));
            const fromDateB = new Date(b.from_date.split('-').reverse().join('-'));
    
            return fromDateA > fromDateB ? -1 : fromDateA < fromDateB ? 1 : 0;
        }
    });
    

    const onScroll = (e) => {
        hideTabBar = onScrollHandler(e)
        dispatch(onTabBarSroll(hideTabBar))
    }

    const MyProfileExperience = ({ title, designation, duration, data }) => {
        return (
            <View style={styles.viewStyle}>
                <CustomText children={capitalizeFirstLetter(title)} style={styles.companyNameText} />
                <CustomText children={capitalizeFirstLetter(designation)} style={styles.designationText} />
                <View style={{ flexDirection: 'row' }}>
                    <CustomText children={duration} style={styles.durationText} />
                </View>

                <FlatList
                    style={{ marginTop: 15 }}
                    data={data}
                    renderItem={({ item, index }) => <MyProfileStepperItem item={item} index={index} />}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                />
            </View>
        );
    };

    // PROJECT NAME
    const MyProfileStepperItem = ({ item, index }) => {
        const [isExpanded, setIsExpanded] = useState(false);

        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', marginStart: 5 }}>
                    <View style={[styles.viewCircleStyle, { backgroundColor: index == 0 ? BLACK : GREY }]} />
                    <View style={styles.viewLineStyle} />
                </View>
                <View style={styles.designationTextbottom}>
                    <CustomText children={item?.role} style={styles.roleText} />
                    <CustomText
                        children={moment(item.start_date, 'DD-MM-YYYY').format('MMM YYYY') + " - " + moment(item.end_date, 'DD-MM-YYYY').format('MMM YYYY')}
                        style={styles.dateStyle}
                    />
                    <View style={styles.row}>
                        <Text ref={textRef} numberOfLines={isExpanded ? undefined : 4} style={[styles.projectDescText]}>
                            {item.description == null ? AppString.NO_DATA_ADDED : item.description}
                        </Text>
                        {item.description && (
                            <Text onPress={() => setIsExpanded(!isExpanded)} style={{ color: BLUE, marginLeft: 2 }}>
                                {isExpanded ? AppString.READ_LESS : "...Read More"}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {sortedExperienceDetails == undefined ?
                <CenteredText text={AppString.No_Experience_Added} /> : null}
            <FlatList
                style={{ marginBottom: hideTabBar ? 0 : heightPercentageToDP(0) }}
                onScroll={(e) => onScroll(e)}
                data={sortedExperienceDetails}
                renderItem={({ item, index }) => {
                    return <MyProfileExperience
                        title={item?.company_name}
                        designation={item?.designation}
                        duration={moment(item?.from_date, 'DD-MM-YYYY').format('MMM YYYY') + " - " + moment(item?.to_date, 'DD-MM-YYYY').format('MMM YYYY')}
                        data={item?.projects}
                    />
                }}
                keyExtractor={(item, index) => `${index}`}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
            />
        </SafeAreaView>
    );
};

export default ManagerExperienceDetail;