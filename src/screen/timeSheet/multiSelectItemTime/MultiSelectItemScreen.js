//import liraries
import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, TouchableHighlight, Dimensions } from 'react-native';
import { styles } from './MultiSelectStyle';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppString from '../../../utils/AppString';
import CustomText from '../../../component/atoms/CustomText';
import { INACTIVE_COLOR, PRIMARY_COLOR, WHITE } from '../../../theme/Colors';
import { LIST_CLIENTS, LIST_CLIENTS_PROJECT, LIST_CLIENTS_PROJECT_TASK } from '../../../services/ApiEndPoint';
import useApiEffect from "../../../hooks/useApiEffect";
import CustomSearchTimeSheetBox from '../../../component/atoms/CustomSerachTimeSheetBox';
import { FontName } from '../../../theme/Fonts';
import AppLoader from '../../../utils/AppLoader';

// create a component
const MultiSelectItemScreen = ({ visible, handleClose, isLabelHeader = {} }) => {
    const refRBSheet = useRef();
    const refFlatList = useRef();
    const [myIndex, setIndex] = useState(null);
    const [isResClient, setIsResClient] = useState(null);
    const [searchText, setSearchText] = useState(false);
    const [filteredData, setFilteredData] = useState(null);
    const [selectedFilteredData, setSelectedFilteredData] = useState(null);

    const screenHeight = Dimensions.get('screen').height;
    const bottomSheetHeight = screenHeight * 0.75;

    const { makeApiRequest, loading } = useApiEffect()

    // Visible Bottmsheet Method
    useEffect(() => {
        if (visible) {
            refRBSheet.current.open();
        }
    }, [visible]);

    // Use useEffect to filter the data when the search text changes
    useEffect(() => {
        filterData(searchText);
    }, [searchText]);


    {/** Using Apis Method and static data*/ }
    useEffect(() => {
        if (isLabelHeader?.title === AppString.SELECT_CLIENT) {
            {/** Using Apis Method for fetching client list**/ }
            // apiReqClient(LIST_CLIENTS)
            apiReqClient(`${LIST_CLIENTS}?typeOfPresent=${isLabelHeader?.typeOfPresent}`)
        } else if (isLabelHeader?.title === AppString.SELECT_PROJECT) {
            {/** Using Apis Method for fetching project list**/ }
            apiReqClient(`${LIST_CLIENTS_PROJECT}?client_id=${isLabelHeader?.id}`)
        } else if (isLabelHeader?.title === AppString.SELECT_TASK) {
            {/** Using Apis Method for fetching task list **/ }
            apiReqClient(`${LIST_CLIENTS_PROJECT_TASK}?project_id=${isLabelHeader?.id}`)
        } else if (isLabelHeader?.title === AppString.SELECT_BILLING_METHOD) {
            {/** Handle static data for Billing Mehtod list**/ }
            setIsResClient({
                "data": [
                    {
                        id: 1,
                        billingName: 'Billable'
                    },
                    {
                        id: 2,
                        billingName: 'Non Billable'
                    },
                    {
                        id: 3,
                        billingName: 'Mockup'
                    }
                ]
            })
        } else {
            console.log('Error', "Error")
        }
    }, [searchText, selectedFilteredData]);

    {/** Using Apis Method for fetching event list**/ }
    const apiReqClient = async (url) => {
        const apiResponse = await makeApiRequest({ url: url, method: 'GET', isToken: true })
        if (apiResponse?.status == true) {
            setFilteredData(null)
            setIsResClient(apiResponse)
        }
    }

    // filterData function
    const filterData = (text) => {
        if (typeof text !== 'boolean') {
            const lowercaseSearchText = text.toLowerCase();
            const filteredData = isResClient?.data?.filter((item) => {
                const clientName = (item.client_name || '').toLowerCase();
                const projectName = (item.project_name || '').toLowerCase();
                const taskName = (item.task_name || '').toLowerCase();
                const billingName = (item.billingName || '').toLowerCase();

                const itemText = clientName + ' ' + projectName + ' ' + taskName + ' ' + billingName;

                if (itemText.trim() !== '') {
                    const wordsToSearch = lowercaseSearchText.split(' ');

                    // Check if any of the individual words in the search text match any part of the item text
                    return wordsToSearch.some((word) => itemText.includes(word));
                }

                return true; // Return true for all items when search text is empty
            });

            setFilteredData(filteredData);
        }
    }


    {/** Selecting row on click**/ }
    const RenderItemSelect = (item, index) => {
        return (
            <TouchableHighlight
                underlayColor={WHITE}
                activeOpacity={0.3}
                onPress={() => {
                    {/** Set slected data**/ }
                    handleClose(isLabelHeader?.title === AppString.SELECT_CLIENT ?
                        { id: item?.client_id, name: item?.client_name, selectedType: AppString.SELECT_CLIENT }
                        : isLabelHeader?.title === AppString.SELECT_PROJECT ?
                            { id: item?.project_id, name: item?.project_name, selectedType: AppString.SELECT_PROJECT }
                            : isLabelHeader?.title === AppString.SELECT_TASK ?
                                { id: item?.task_id, name: item?.task_name, selectedType: AppString.SELECT_TASK }
                                : { id: item?.id, name: item?.billingName, selectedType: AppString.SELECT_BILLING_METHOD })
                    setIndex(index)

                }}>
                {/** Set text of selected data**/}
                <View style={styles.viewStyle}>
                    <CustomText children={
                        isLabelHeader?.title === AppString.SELECT_CLIENT ? item?.client_name :
                            isLabelHeader?.title === AppString.SELECT_PROJECT ? item?.project_name :
                                isLabelHeader?.title === AppString.SELECT_TASK ? item?.task_name :
                                    isLabelHeader?.title === AppString.SELECT_BILLING_METHOD ? item?.billingName : ''
                    } style={[styles.textStyle, { color: myIndex === index ? PRIMARY_COLOR : INACTIVE_COLOR }, { fontFamily: myIndex === index ? FontName.Gordita_Medium : FontName.Gordita_Regular },
                    ]} />
                </View>
            </TouchableHighlight>
        )
    }
    return (
        <RBSheet
            onClose={() => handleClose(null)}
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={bottomSheetHeight}
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
                    backgroundColor: '#8F8F8F',
                },
            }}>
            <View style={styles.container}>
                <CustomText children={isLabelHeader?.title} style={styles.title} />
                <View style={styles.verticalLine} />

                {isLabelHeader?.title === AppString.SELECT_BILLING_METHOD ? <View /> :
                    <CustomSearchTimeSheetBox onPress={(searchValue) => { searchValue == "" ? (setSearchText(!searchText), setSelectedFilteredData(isLabelHeader?.title)) : filterData(searchValue) }} />}

                {/** Set the API response to show list**/}
                <FlatList
                    ref={refFlatList} // add ref
                    numColumns={1}
                    data={filteredData || isResClient?.data}
                    renderItem={({ item, index }) => RenderItemSelect(item, index)}
                    nestedScrollEnabled
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
                {/**Hanlde the Apply buttion and naivagate it to add time sheet screen**/}

                {/**   <CustomButton
                title={AppString.APPLY}
                onPress={() => handleClose(isSelectClient)}
                style={styles.buttonStyle} />*/ }
                <AppLoader isLoading={loading} />
            </View>
        </RBSheet>
    );
};

//make this component available to the app
export default MultiSelectItemScreen;
