import React, { useEffect, useState, useRef } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import Swiper from "react-native-swiper";
import { FontSize } from "../../theme/Fonts";
import { BUTTON_BACKGROUND, LIGHT_GREY, WHITE } from "../../theme/Colors";
import DiscoverA from '../../../assets/images/SVGSTORIES/discover_a.svg';
import FindAll from '../../../assets/images/SVGSTORIES/find_all.svg';
import GrowWith from '../../../assets/images/SVGSTORIES/grow_with.svg';
import InteractWith from '../../../assets/images/SVGSTORIES/interact_with.svg';
import MeetYour from '../../../assets/images/SVGSTORIES/meet_your.svg';
import CustomText from "../../component/atoms/CustomText";
import { useDispatch } from 'react-redux';
import NavString from "../../utils/NavString";
import { isFirstStoriesIntro } from "../../redux/slices/AuthSlice";
import AppString from "../../utils/AppString";
import { ShowToast } from "../../utils/Constant";

const LunchingScreen = ({ navigation }) => {
    const flatListRef = useRef(FlatList);
    const dispatch = useDispatch()
    const [currentIndexData, setCurrentIndexData] = useState(0)
    const [data, setData] = useState([
        {
            id: 1,
            image: <GrowWith width={400} height={400} />,
            label: "Grow With Your like-Minded Tribe "
        },
        {
            id: 2,
            image: <MeetYour width={400} height={400} />,
            label: "Meet Your Personalised Assistive ChatBot Kola"
        },
        {
            id: 3,
            image: <DiscoverA width={400} height={400} />,
            label: "Discover A Unified On-The-Go Task Manager"
        },
        {
            id: 4,
            image: <InteractWith width={400} height={400} />,
            label: "Interact With A Robust Work Messenger"
        },
        {
            id: 5,
            image: <FindAll width={400} height={400} />,
            label: "Find All Things HRMS"
        },
    ]);

    const handleSkipMethod = () => {
        dispatch(isFirstStoriesIntro())
        navigation.navigate(NavString.LOGIN)
    }
    let currentIndex = 0;
    const handleNextMethod = () => {
        if (currentIndex < data.length && currentIndexData != 4) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
            currentIndex++;
            if (currentIndex == 4) {
                setCurrentIndexData(currentIndex)
            }
        } else if (currentIndexData == 4) {
            dispatch(isFirstStoriesIntro())
            navigation.navigate(NavString.LOGIN)
        }
    }

    // const delay = 2500; // 1 second delay


    // // Set Stories to delay for lunch Login Scren
    // useEffect(() => {
    //     dispatch(isFirstStoriesIntro())
    //     const interval = setInterval(() => {
    //         if (currentIndex < data.length) {
    //             flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    //             currentIndex++;
    //             if (currentIndex == 5) {
    //                 setTimeout(() => {
    //                     navigation.navigate(NavString.LOGIN)
    //                 }, 1000);
    //             }
    //         } else {
    //             clearInterval(interval); // Stop when reaching the last item
    //         }
    //     }, delay);

    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleSkipMethod} style={styles.buttonStyle}>
                <CustomText children={AppString.SKIP} fontSize={FontSize(16)} style={styles.buttonTextStyle} />
            </TouchableOpacity>

            <FlatList
                data={data}
                horizontal
                ref={flatListRef}
                pagingEnabled={false}
                disableIntervalMomentum
                scrollEventThrottle={200}
                scrollEnabled={false}
                renderItem={({ item, index }) => {
                    return (
                        <Swiper style={styles.wrapper}
                            showsButtons={false}>
                            <View style={{
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                flex: 1
                            }}>
                                <View>
                                    {item?.image}
                                    <CustomText children={item?.label} style={styles.textStyle} />
                                </View>
                                {/**    <View style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignSelf: "center",
                                    marginBottom: 0,
                                }}>
                                    {data.map((item, i) => {
                                        return (
                                            <View
                                                style={[
                                                    styles.onlineDotView,
                                                    {
                                                        backgroundColor:
                                                            index == i ? WHITE : BUTTON_BACKGROUND,
                                                    },
                                                ]}
                                            >
                                            </View>
                                        );
                                    })}
                                </View>*/}
                            </View>
                        </Swiper>
                    );
                }}
                onScrollToIndexFailed={(error) => {
                    flatListRef.current.scrollToOffset({
                        offset: error.averageItemLength * error.index,
                        animated: true,
                    })
                }}
            />
            
            <TouchableOpacity onPress={handleNextMethod} style={styles.buttonStyle}>
                <CustomText children={currentIndexData == 4 ? AppString.DONE : AppString.NEXT} fontSize={FontSize(16)} style={styles.buttonTextStyle} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
export default LunchingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BUTTON_BACKGROUND,
    },
    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    onlineDotView: {
        width: 8,
        height: 8,
        borderRadius: 100 / 2,
        borderWidth: 0.1,
        borderColor: LIGHT_GREY,
        alignSelf: "center",
        flexDirection: "row",
        marginTop: 0,
        bottom: 0,
        position: "relative",
    },
    textStyle: {
        fontSize: FontSize(24),
        color: WHITE,
        textAlign: "center",
        marginEnd: 30,
        marginStart: 30,
        lineHeight: 35,
        marginTop: 15
    },
    buttonStyle: {
        alignContent: 'center',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginEnd: 18,
        marginVertical: 15,
    },
    buttonTextStyle: {
        color: WHITE
    },
});