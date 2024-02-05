//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { GREY, WHITE } from '../../theme/Colors';
import MeetingHomeHeader from '../../component/header/MeetingHeader';
import CustomText from '../../component/atoms/CustomText';
import { FontName } from '../../theme/Fonts';
import { useNavigation } from '@react-navigation/native';
import { GURUKUL_CONTINUE_LEARNING } from '../../services/ApiEndPoint';
import BookmarkIcon from '../../../assets/images/SVG/bookmark.svg';
import BookmarKSAVE from '../../../assets/images/SVG/bookmarkSave.svg';
import ClockIcon from '../../../assets/images/SVG/clock.svg';
import PlayIcon from '../../../assets/images/SVG/play.svg';


// create a component
const ContinueLearning = () => {
    
    const [listData, setListData] = useState([])
    useEffect(() => {
        GURUKUL_CATEGORIES_LIST_API()
    })

    async function GURUKUL_CATEGORIES_LIST_API() {

        const apiData = await makeApiRequest({ url: GURUKUL_CONTINUE_LEARNING, method: 'GET', isToken: true });
        if (apiData?.status == true) {
            setListData(apiData?.data)
        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    const bookmaredCalled = async (item, index, bookMarkedId = null) => {
        const apiData = await makeApiRequest({
            url: GURUKUL_COURSE_BOOKMARK, method: 'POST', isToken: true, showProgress: false,
            data: {
                "course_id": item?.course_id,
                "user_id": "2835",
                "status":bookMarkedId,
            }
        })
        console.log('----.', JSON.stringify(apiData));
        if (apiData?.data != undefined)
            if (apiData?.status == true) {
                ShowToast(`${apiData?.message}`)
                updateValue(bookMarkedId, index)
            }

    }
    // update index after click on bookmark icon
    const updateValue = (newValue, index) => {
        var newObject = [...listData];
        newObject[index].course_bookmark = newValue;
        setListData(newObject);
    };

    return (
        <View style={styles.container}>
            <MeetingHomeHeader
                headerText={'Continue Learning'}
                filter={true}
            />
            <View style={{ flex: 1 }}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 10 }}
                    data={listData}
                    renderItem={({ item, index }) =>
                        <ContinueLearninList item={item} index={index} />
                    }
                />
            </View>
        </View>
    );
};

const ContinueLearninList = ({ item, index }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.itemStyle} onPress={() => navigation.navigate(NavString.CATEGORIES, { course_id: item?.course_id })}>
            <Image source={{ uri: item?.image }} style={styles.listImage} />
            <View style={{ flex: 1, marginHorizontal: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CustomText children={item?.title} style={{ marginTop: 10, fontWeight: '500', fontFamily: FontName.Gordita_Medium, fontSize: 14, flex: 116 }} />
                    <TouchableOpacity
                        onPress={() => {
                            bookmaredCalled(item, index, item?.course_bookmark == 1 ? 0 : 1)
                        }}
                    >
                        {item?.course_bookmark ? <BookmarKSAVE /> : <BookmarkIcon />}
                    </TouchableOpacity>
                </View>

                <CustomText children={item?.User?.full_name} numberOflines={2} style={{ marginTop: 10, fontWeight: '400', color: '#212121', marginVertical: 8, fontFamily: FontName.Gordita_Regular, fontSize: 12, lineHeight: 16 }} />

                <View style={{ flexDirection: 'row', marginTop: 10, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <PlayIcon height={16} width={16} />
                        <CustomText numberOflines={1} children={item?.total_modules + " Lessons"} style={styles.textStyle} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, flex: 1 }}>
                        <ClockIcon height={16} width={16} />
                        <CustomText numberOflines={1} children={item?.duration} style={[styles.textStyle, { marginTop: 3 }]} />
                    </View>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 20, }}>
                        {item?.rating > 0 ? <StarFill height={16} width={16} /> : <StarIcon height={16} width={16} />}
                        <CustomText numberOflines={1} children={item?.rating} style={[styles.textStyle, { marginTop: 3 }]} />
                    </View> */}
                </View>

            </View>
        </TouchableOpacity>
    )
}
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        backgroundColor: '#FAFCFD',
    },
    textStyle: {
        fontSize: 12,
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '500',
        color: '#88898A',
        marginLeft: 2,
        marginTop: 2
    },
    itemStyle: {
        marginTop: 10,
        marginHorizontal: 16,
        elevation: 7,
        shadowColor: GREY,
        shadowOffset: 3,
        shadowRadius: 10,
        backgroundColor: WHITE,
        borderRadius: 10,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        flexDirection: 'row',
        padding: 10
    },
    viewAll: {
        color: '#9E9E9E',
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '500'
    },
    header: {
        fontSize: 16,
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '500'
    },
    listImage: {
        width: 70,
        height: 80,
        borderRadius: 10
    }
});

//make this component available to the app
export default ContinueLearning;
