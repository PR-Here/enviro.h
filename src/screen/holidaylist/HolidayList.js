//import liraries
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import CustomText from '../../component/atoms/CustomText';
import MeetingHomeHeader from '../../component/header/MeetingHeader';
import FilterItem from '../../component/listItems/FilterItem';
import { BLACK, PAGE_BACKGROUND, PRIMARY_COLOR, WHITE } from '../../theme/Colors';
import { FontName, FontSize } from '../../theme/Fonts';
import { HOLIDAY_LIST } from '../../services/ApiEndPoint';
import useApiEffect from '../../hooks/useApiEffect';
import moment from 'moment';
import AppLoader from '../../utils/AppLoader';

const HolidayList = () => {
    const [selectedTab, setSelectedTab] = useState('North')
    const tabData = ['North', 'West', 'South', 'East']

    const { makeApiRequest, loading } = useApiEffect()
    const [publicData, setPublicData] = useState([])
    const [optionalcData, setOptionalData] = useState([])

    useEffect(() => {
        HOLIDAY_LIST_API()
    }, [selectedTab]);

    async function HOLIDAY_LIST_API() {
        const apiData = await makeApiRequest({ url: `${HOLIDAY_LIST}${selectedTab.toLocaleLowerCase()}=1`, method: 'GET', isToken: true });
        if (apiData?.status == true) {
            setPublicData(apiData?.data?.public)
            setOptionalData(apiData?.data?.optional)
        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    return (
        <View style={styles.container}>
            <MeetingHomeHeader headerText={'Holiday List'} />
            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 20, marginBottom: 10 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {tabData?.map((item, index) => (
                        <TouchableOpacity activeOpacity={0.7} style={{ marginRight: 8 }} key={index}
                            onPress={() => { setSelectedTab(item) }}>
                            <FilterItem
                                text={item}
                                key={index}
                                containerStyle={{
                                    backgroundColor: item == selectedTab ? PRIMARY_COLOR : WHITE,
                                    borderColor: item == selectedTab ? PAGE_BACKGROUND : PAGE_BACKGROUND
                                }}
                                textStyle={{ color: item == selectedTab ? WHITE : BLACK, padding: 15 }}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>

                <CustomText children={'Holiday Calendar for 2024'} style={{ fontSize: 16, fontWeight: '500', fontFamily: FontName.Gordita_Medium, marginHorizontal: 16, marginTop: 30 }} />

                <View style={{
                    marginHorizontal: moderateScale(19.8),
                    marginTop: moderateScale(12.44)
                }}>
                    <View >
                        <View style={{
                            borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: PRIMARY_COLOR,
                            borderColor: '#D9D9D9',
                            borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1,
                            flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
                            borderBottomWidth: 1,
                        }}>
                            <View style={{
                                borderRightWidth: 1, borderRightColor: '#D9D9D9',
                                justifyContent: 'center',
                                width: '15%',
                                height: 40,
                                alignItems: 'center'
                            }}>
                                <CustomText style={styles.textStyle}>Sr.No</CustomText>
                            </View>
                            <View style={{
                                borderRightWidth: 1, borderRightColor: '#D9D9D9',
                                height: 40, width: '25%', justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <CustomText style={styles.textStyle}>Date</CustomText>
                            </View>
                            <View style={{
                                borderRightWidth: 1, borderRightColor: '#D9D9D9', paddingRight: moderateScale(13),
                                height: 40, width: '25%', justifyContent: 'center', paddingLeft: 15
                            }}>
                                <CustomText style={styles.textStyle}>Day</CustomText>
                            </View>
                            <View style={{
                                width: '25%', height: 40, borderColor: '#D9D9D9', flex: 1, alignSelf: 'center',
                                paddingLeft: 5, justifyContent: 'center',
                            }}>
                                <CustomText style={styles.textStyle} >Holiday</CustomText>
                            </View>
                        </View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={publicData}
                            scrollEnabled={false}
                            vertical
                            renderItem={({ item, index }) =>
                                <PublicListData item={item} index={index} />
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>

                <CustomText children={'Floating Holidays (Optional)'} style={{ fontSize: 16, fontWeight: '500', fontFamily: FontName.Gordita_Medium, marginHorizontal: 16, marginTop: 30 }} />

                <View style={{
                    marginHorizontal: moderateScale(19.8),
                    marginTop: moderateScale(12.44)
                }}>
                    <View >
                        <View style={{
                            borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: PRIMARY_COLOR,
                            borderColor: '#D9D9D9',
                            borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1,
                            flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
                            borderBottomWidth: 1
                        }}>
                            <View style={{
                                borderRightWidth: 1, borderRightColor: '#D9D9D9',
                                justifyContent: 'center',
                                width: '15%',
                                height: 40,
                                alignItems: 'center'
                            }}>
                                <CustomText style={styles.textStyle}>Sr.No</CustomText>
                            </View>
                            <View style={{
                                borderRightWidth: 1, borderRightColor: '#D9D9D9',
                                height: 40, width: '25%', justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <CustomText style={styles.textStyle}>Date</CustomText>
                            </View>
                            <View style={{
                                borderRightWidth: 1, borderRightColor: '#D9D9D9', paddingRight: moderateScale(13),
                                height: 40, width: '25%', justifyContent: 'center', paddingLeft: 15
                            }}>
                                <CustomText style={styles.textStyle}>Day</CustomText>
                            </View>
                            <View style={{
                                width: '25%', height: 40, borderColor: '#D9D9D9', flex: 1, alignSelf: 'center',
                                paddingLeft: 5, justifyContent: 'center',
                            }}>
                                <CustomText style={styles.textStyle} >Holiday</CustomText>
                            </View>
                        </View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={optionalcData}
                            scrollEnabled={false}
                            vertical
                            renderItem={({ item, index }) =>
                                <PublicListData item={item} index={index} />
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
                <CustomText children={'*Employee can take 2 Floating Holidays in a year against above mentioned floating Holidays.'} style={{ fontSize: 14, fontWeight: '500', fontFamily: FontName.Gordita_Medium, margin: 16, lineHeight: 20 }} />

            </ScrollView>
            <AppLoader isLoading={loading} />
        </View>
    );
};

const PublicListData = ({ item, index }) => {
    return (
        <View style={{ flexDirection: 'row', borderBottomWidth: index == item.length - 1 ? 0 : 1, borderColor: '#D9D9D9', borderLeftWidth: 1 }}>

            <View style={styles.srView}>
                <CustomText style={styles.calendarText}>
                    {index + 1}.
                </CustomText>
            </View>

            <View style={styles.calendarView}>
                {item.date !== 'As per date' ?
                    <CustomText style={styles.calendarText}>
                        {moment(item.date).format('DD-MMM')}
                    </CustomText>
                    : null}
            </View>

            <View style={styles.calendarView}>
                {item.date !== 'As per date' ?
                    <CustomText style={styles.calendarText}>
                        {moment(item.date).format('ddd')}
                    </CustomText>
                    : <CustomText children={'As per date'} style={styles.calendarText} />
                }
            </View>

            <View style={styles.holidayView}>
                <CustomText style={styles.calendarText}>
                    {item.name}
                </CustomText>
            </View>
        </View>
    );
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textStyle: { textAlign: 'center', fontSize: FontSize(12), color: '#fff', fontWeight: '500', fontFamily: FontName.Gordita_Medium },
    srView: {
        borderRightColor: '#D9D9D9',
        paddingHorizontal: 3,
        width: '15%', justifyContent: 'center',
        alignItems: 'center',
        padding: 18,
        borderRightWidth: 1,

    },
    calendarView: {
        borderRightColor: '#D9D9D9',
        paddingHorizontal: 3,
        width: '25%', justifyContent: 'center',
        alignItems: 'center',
        padding: 18,
        borderRightWidth: 1,

    },
    holidayView: {
        borderRightColor: '#D9D9D9',
        paddingHorizontal: 3,
        width: '35%', justifyContent: 'center',
        alignItems: 'center',
        padding: 18,
        borderRightWidth: 1,

    },
    calendarText: {
        textAlign: 'center',
        fontSize: FontSize(13),
        fontFamily: FontName.Gordita_Regular,
        color: BLACK,
    }
});

//make this component available to the app
export default HolidayList;


