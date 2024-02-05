import { SafeAreaView, ScrollView, View } from "react-native"
import { Text } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"
import { hubScreens } from "../../redux/slices/EventSlice"
import React, { useEffect } from "react"
import { useFocusEffect } from '@react-navigation/native';
import CommCatgItem from "../../component/listItems/CommCatgItem"
import styles from "./styles"
import CommExploreItem from "../../component/listItems/CommExploreItem"
import CustomText from "../../component/atoms/CustomText"
import { onScrollHandler } from "../../utils/Constant"
import { onTabBarSroll } from "../../redux/slices/TabBarSlice"
import { heightPercentageToDP } from "react-native-responsive-screen"


function CommunitiesScreen() {
    const dispatch = useDispatch()

    useFocusEffect(
        React.useCallback(() => {
            dispatch(hubScreens('Your Communities'));
        }, [])
    );

    const onScroll = (e) => {
        const hideTabBar = onScrollHandler(e)
        dispatch(onTabBarSroll(hideTabBar))
    }

    return (
        <SafeAreaView style={styles.conatiner}>
            <ScrollView
                onScroll={onScroll}
                style={{ margin: heightPercentageToDP(1) }}
            >
                <CommCatgItem style={styles.catgItem} />
                <CommCatgItem style={styles.catgItem} />
                <CommCatgItem style={styles.catgItem} />
                <CustomText style={styles.heading}>Explore Communities</CustomText>
                <CommExploreItem style={styles.commExploreItem} />
                <CommExploreItem style={styles.commExploreItem} />
                <CommExploreItem style={styles.commExploreItem} />

            </ScrollView>
        </SafeAreaView>
    )
}

export default CommunitiesScreen