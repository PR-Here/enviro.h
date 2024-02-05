//import liraries
import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, TouchableHighlight, Platform, TouchableOpacity } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from '../../../component/atoms/CustomText';
import CustomButton from '../../../component/atoms/CustomButton';
import { styles } from './FilterTimeSheetStyle';
import AppString from '../../../utils/AppString';
import { BLACK, WHITE } from '../../../theme/Colors';
import { FontName } from '../../../theme/Fonts';
import Cross from '../../../../assets/images/SVG/cros.svg';

// create a component
const FilterTimeSheet = ({ visible, handleApply, handleFilterClose }) => {
    const refRBSheet = useRef();
    const refFlatList = useRef();
    const [isResClient, setIsResClient] = useState();
    const [isPaidClient, setIsPaidClient] = useState();
    const [myIndex, setIndex] = useState(null);
    const [myPaidIndex, setMyPaidIndex] = useState(null);
    const [isSelectClient, setIsSelectClient] = useState(null);
    const [isSelectPaid, setIsSelectPaid] = useState(null);

    // Visible Bottmsheet Method
    useEffect(() => {
        if (visible) {
            refRBSheet.current.open();
        }
    }, [visible]);

    useEffect(() => {
        {/** Handle static data for Filter Mehtod list**/ }
        setIsResClient({
            "data": [
                {
                    filterId: 1,
                    filterName: AppString.WEEKLY
                },
                {
                    filterId: 2,
                    filterName: AppString.MONTHLY
                },
                {
                    filterId: 3,
                    filterName: AppString.LAST_MONTH
                }
            ]
        })

        setIsPaidClient({
            "data": [
                {
                    paidId: 1,
                    paidName: AppString.BILLING
                },
                {
                    paidId: 2,
                    paidName: AppString.NON_BILLING
                },
                {
                    paidId: 3,
                    paidName: AppString.MOCKUP
                }
            ]
        })
    }, [])

    {/** Selecting row on click**/ }
    const RenderItemSelect = (item, index) => {
        return (
            <TouchableHighlight
                underlayColor={WHITE}
                activeOpacity={0.3}
                onPress={() => {
                    {/** Set slected data**/ }
                    setIsSelectClient({ id: item?.filterId, name: item?.filterName })
                    setIndex(index)
                }}>
                {/** Set text of selected data**/}
                <View style={myIndex === index ? styles.viewSelectStyle : styles.viewStyle}>
                    <CustomText children={item?.filterName} style={[styles.textStyle,
                    { color: myIndex === index ? WHITE : BLACK },
                    { fontFamily: myIndex === index ? FontName.Gordita_Medium : FontName.Gordita_Regular }]} />
                </View>
            </TouchableHighlight>
        )
    }

    {/** Selecting row on paid click**/ }
    const RenderItemPaidSelect = (item, index) => {
        return (
            <TouchableHighlight
                underlayColor={WHITE}
                activeOpacity={0.3}
                onPress={() => {
                    {/** Set slected data**/ }
                    setIsSelectPaid({ id: item?.paidId, name: item?.paidName })
                    setMyPaidIndex(index)
                }}>
                {/** Set text of selected data**/}
                <View style={myPaidIndex === index ? styles.viewSelectStyle : styles.viewStyle}>
                    <CustomText children={item?.paidName} style={[styles.textStyle,
                    { color: myPaidIndex === index ? WHITE : BLACK },
                    { fontFamily: myPaidIndex === index ? FontName.Gordita_Medium : FontName.Gordita_Regular }]} />
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <RBSheet
            onClose={() => handleFilterClose()}
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={260}
            openDuration={250}
            customStyles={{
                container: {
                    borderTopLeftRadius: 38,
                    borderTopRightRadius: 38,
                },
                wrapper: {
                    backgroundColor: '#00000070',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
            }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <CustomText children={"Filters"} />
                    <TouchableOpacity style={styles.close} onPress={handleFilterClose}>
                        <Cross />
                    </TouchableOpacity>
                </View>
                {/** Set the response to show list**/}
                <FlatList
                    ref={refFlatList} // add ref
                    numColumns={1}
                    data={isResClient?.data}
                    renderItem={({ item, index }) => RenderItemSelect(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    style={{marginTop: 10}}
                />
                {/** Set the response to show paid list**/}
                <FlatList
                    ref={refFlatList} // add ref
                    numColumns={1}
                    data={isPaidClient?.data}
                    renderItem={({ item, index }) => RenderItemPaidSelect(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />

                {/**Hanlde the Apply buttion and naivagate it to add time sheet screen**/}
                <CustomButton
                    title={AppString.APPLY}
                    onPress={() => handleApply(isSelectClient, isSelectPaid)}
                    style={styles.buttonStyle} />

            </View>
        </RBSheet>
    );
};

//make this component available to the app
export default FilterTimeSheet;
