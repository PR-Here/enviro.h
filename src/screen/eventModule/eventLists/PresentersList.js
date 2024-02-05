//presenters list component
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import PresenterItem from "../../../component/listItems/PresenterItem";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { FontName, FontSize } from "../../../theme/Fonts";
import { BLACK, GREEN, GREY, WHITE } from "../../../theme/Colors";
import CustomText from "../../../component/atoms/CustomText";
import Collapsible from 'react-native-collapsible';
import React, { useEffect, useState } from "react";
import AssetsImages from "../../../utils/AssetsImages";
import moment from "moment";

function PresentersList({ collapse, onCollapse, presenList }) {

    //console.log('presenmters list', presenList)

    useEffect(() => {

    }, [presenList])

    return (
        <View style={[styles.presenterConatiner, { paddingBottom: collapse ? widthPercentageToDP(3) : 0 }]}>
            <View style={styles.presentersHeadingView}>
                <CustomText style={styles.presentersHeading}>
                    {`Presenters (${presenList.length})`}
                </CustomText>
                <TouchableOpacity onPress={onCollapse}>
                    <Image
                        source={
                            collapse ? AssetsImages.DOWN_ARROW : AssetsImages.ARROW_UP
                        }
                        style={styles.arrowIcon}
                    />
                </TouchableOpacity>
            </View>
            <Collapsible collapsed={collapse}>
                {presenList.map((element, index) => {
                    return (
                        <PresenterItem
                            key={element.event_module_id}
                            title={element.title}
                            name={element.name}
                            date={element.date}
                            startTime={element.start_time}
                            endTime={element.end_time}
                            content={element.description}
                            containerStyle={{ marginTop: heightPercentageToDP(2) }}
                            presenterImage={element?.image ? { 'uri': element?.image } : AssetsImages.PRESENTER}
                        />
                    );
                })}
            </Collapsible>
        </View>
    )
}

const styles = StyleSheet.create({
    presenterConatiner: {
        //marginTop: heightPercentageToDP(1),
        width: 'auto',
        alignSelf: 'center',
        width: '100%',
        paddingHorizontal: widthPercentageToDP(3),
        paddingTop: widthPercentageToDP(3),
        height: 'auto',
    },
    presentersHeading: {
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(18),
        color: BLACK,
        fontWeight: '400',
    },
    presentersHeadingView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: heightPercentageToDP(1)
    },
    arrowIcon: {
        height: 20,
        width: 20,
        tintColor: BLACK
    }
})

export default PresentersList