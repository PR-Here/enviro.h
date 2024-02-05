import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { BottomSheet } from 'react-native-btr';
import { BLACK, EXTRA_LIGHT_GREY, GREY, LIGHTGREY, PRIMARY_COLOR, WHITE } from "../../../theme/Colors";
import { FontName, FontSize } from "../../../theme/Fonts";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { useEffect, useState } from 'react'
import CustomText from "../../../component/atoms/CustomText";
import { ScrollView } from "react-native-gesture-handler";

import Cross from '../../../../assets/images/SVG/cros.svg'

import AppLoader from "../../../utils/AppLoader";
import CustomButton from "../../../component/atoms/CustomButton";
import FilterItem from "../../../component/listItems/FilterItem";
import DateTimePicker from "react-native-modal-datetime-picker";
import CALENDERICON from "../../../../assets/images/SVG/ic_calender.svg"
import moment from "moment";

const FilterManageRequest = ({ visible, onBackButtonPress, onBackdropPress, onApplyClick, list, selectedFilterData, onClearFilter }) => {
    // const [selectedTypes, setSelectedTypes] = useState(null)
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [selectedApproval, setSelectedApproval] = useState(null)

    const [startDate, setStartDate] = useState('');
    const [showStartDate, setShowStartDate] = useState(false);
    const [endDate, setEndDate] = useState('');
    const [showEndDate, setShowEndDate] = useState(false);


    useEffect(() => {
        if (visible) {

            let status = selectedFilterData?.statusId == undefined || selectedFilterData?.statusId == '' ? null : selectedFilterData?.statusId
            let approvalType = selectedFilterData?.approvalId == undefined || selectedFilterData?.approvalId == '' ? null : selectedFilterData?.approvalId
            let startDate = selectedFilterData?.startDate == undefined || selectedFilterData?.startDate == '' ? null : selectedFilterData?.startDate
            let endDate = selectedFilterData?.endDate == undefined || selectedFilterData?.endDate == '' ? null : selectedFilterData?.endDate


            list[0]?.status?.map((item, index) => {
                if (item.id == status) {
                    setSelectedStatus(index)
                }
            })

            list[1]?.Approvals?.map((item, index) => {
                if (item.id == approvalType) {
                    setSelectedApproval(index)
                }
            })

            setStartDate(startDate)
            setEndDate(endDate)

        }
    }, [visible]);

    // START DATE AFTER SELECT
    const onChange = (selectedValue) => {

        const currentDate = selectedValue
        setStartDate(currentDate)
        setShowStartDate(!showStartDate)
    };

    const showDatepicker = () => {
        setShowStartDate(!showStartDate);
    };


    // END DATE AFTER SELECT
    const onEndChange = (selectedValue) => {
        const currentDate = selectedValue
        setEndDate(currentDate)
        setShowEndDate(!showEndDate)

    };

    const showEndDatepicker = () => {
        setShowEndDate(!showEndDate);
    };




    const getSelectedData = () => {

        const selectedData = {};


        if (selectedStatus != null) {
            const status = list[0]?.status[selectedStatus]

            selectedData.statusId = status.id
            selectedData.statusName = status.name
            selectedData.status = status.status
        }

        if (selectedApproval != null) {
            const approval = list[1]?.Approvals[selectedApproval]

            selectedData.approvalId = approval.id

        }

        selectedData.startDate = startDate
        selectedData.endDate = endDate

        return selectedData;
    };

    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={onBackButtonPress}
            onBackdropPress={onBackdropPress}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Filters</Text>
                    <TouchableOpacity style={styles.close} onPress={onBackButtonPress}>
                        <Cross />
                    </TouchableOpacity>
                </View>
                <View style={styles.verticalMargin} />
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* View date Start and end date data set*/}
                    <View style={styles.viewStyle}>
                        <CustomText children={"Filter by Date Range"} style={styles.customTextViewStyle} fontSize={12} />
                        <View style={{ flexDirection: 'row' }}>
                            {/* start date */}
                            <View style={styles.viewDateBottomStyle}>
                                <View style={styles.viewEndColumStyle}>
                                    <TouchableOpacity onPress={showDatepicker}>
                                        <View style={styles.viewStartDateStyle}>
                                            <CustomText children={startDate ? moment(startDate).format('YYYY-MM-DD') : "From"} style={styles.subDateTitle} />
                                            <View style={styles.imageStyle}>
                                                <CALENDERICON />
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    {showStartDate && (
                                        <DateTimePicker
                                            isVisible={showStartDate}
                                            testID="dateTimePicker"
                                            value={startDate}
                                            mode='date'
                                            is24Hour={true}
                                            // display="default"
                                            onConfirm={onChange}
                                            onCancel={() => setShowStartDate(false)}
                                        />
                                    )
                                    }
                                </View>
                                {/* End date */}
                                <View style={styles.viewEndColumStyle}>
                                    <TouchableOpacity onPress={showEndDatepicker}>
                                        <View style={styles.viewStartDateStyle}>
                                            <CustomText children={endDate ? moment(endDate).format('YYYY-MM-DD') : "To"} style={styles.subDateTitle} />
                                            <View style={styles.imageStyle}>
                                                <CALENDERICON />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    {showEndDate && (
                                        <DateTimePicker
                                            isVisible={showEndDate}
                                            testID="dateTimePicker1"
                                            value={endDate}
                                            mode='date'
                                            is24Hour={true}
                                            // display="default"
                                            onConfirm={onEndChange}
                                            onCancel={() => setShowEndDate(false)}
                                            minimumDate={new Date(startDate)}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>



                    <CustomText children={'Approvals Types'} style={styles.headerText} />
                    <View style={styles.itemContainer}>
                        {list[1]?.Approvals?.map((approval, index) => (

                            <TouchableOpacity key={index} activeOpacity={0.7} style={{ margin: 8 }} onPress={() => setSelectedApproval(index)}>
                                <FilterItem
                                    text={approval.name}
                                    containerStyle={{
                                        backgroundColor: index == selectedApproval ? PRIMARY_COLOR : WHITE,
                                        borderColor: index == selectedApproval ? PRIMARY_COLOR : LIGHTGREY,
                                        paddingHorizontal: 10
                                    }}
                                    textStyle={{ color: index == selectedApproval ? WHITE : BLACK }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>


                    <CustomText children={'Status'} style={styles.headerText} />
                    <View style={styles.itemContainer}>
                        {list[0]?.status?.map((status, index) => (
                            <TouchableOpacity activeOpacity={0.7} style={{ margin: 8 }} key={index} onPress={() => {
                                setSelectedStatus(index);
                            }}>
                                <FilterItem
                                    text={status.name}
                                    key={index}
                                    containerStyle={{
                                        backgroundColor: index == selectedStatus ? PRIMARY_COLOR : WHITE,
                                        borderColor: index == selectedStatus ? PRIMARY_COLOR : LIGHTGREY,
                                        paddingHorizontal: 10
                                    }}
                                    textStyle={{ color: index == selectedStatus ? WHITE : BLACK }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>



                </ScrollView>
                <View style={styles.verticalMargin} />

                <View style={styles.verticalMargin} />
                <CustomButton title={'Apply'} style={styles.button}
                    onPress={() => {
                        const selectedData = getSelectedData()
                        onApplyClick(selectedData);
                    }}
                />

                <CustomButton title={'Clear Filter'} style={styles.clearbutton}
                    onPress={() => {
                        onClearFilter({ approvalId: 1, statusId: 1, status: 1, statusName: 'Pending' });
                        setStartDate('')
                        setEndDate('')
                        setSelectedStatus(0)
                        setSelectedApproval(0)
                    }}

                    textStyle={{ color: PRIMARY_COLOR }}

                />

            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: '90%',
        height: 'auto',
        backgroundColor: WHITE,
        borderTopLeftRadius: 38,
        borderTopRightRadius: 38,

    },
    headerText: {
        margin: 8, fontFamily: FontName.Gordita_Regular, fontSize: 12, fontWeight: '500', color: '#8F8F8F'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: EXTRA_LIGHT_GREY,
        height: '10%',
        justifyContent: 'center'
    },
    title: {
        fontSize: FontSize(16),
        fontWeight: '500',
        fontFamily: FontName.Gordita_Medium,
        color: BLACK
    },
    close: {
        tintColor: BLACK,
        position: 'absolute',
        right: 20,
        width: heightPercentageToDP(2.8),
        height: heightPercentageToDP(2.8),
        alignItems: 'center',
        justifyContent: 'center'
    },
    verticalMargin: {
        height: '2%'
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
        marginTop: 0,
        alignSelf: 'center',
        fontSize: 16
    },

    clearbutton: {
        backgroundColor: WHITE,
        marginTop: 0,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30,
        fontSize: 16,
        borderWidth: 2,
        borderColor: PRIMARY_COLOR
    },
    itemContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },










    titleBottomTxtStyle: {
        margin: FontSize(14),
        alignContent: 'flex-start',
        justifyContent: 'space-around',
        fontSize: 20,
        color: BLACK,
        fontFamily: FontName.Gorditas_Bold
    },
    iconStyle: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: 20,
        tintColor: BLACK
    },
    viewTextFilterStyle: {
        marginEnd: 15,
        marginStart: 15,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    verticleLine: {
        height: 1,
        width: 'auto',
        backgroundColor: GREY,
    },
    viewCellStyle: {
        flexDirection: 'row',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: LIGHTGREY,
        backgroundColor: WHITE,
        borderRadius: 8,
        marginEnd: 2,
        marginStart: 3,
        justifyContent: 'center',
        width: widthPercentageToDP(20),
    },
    viewCellActiveStyle: {
        color: BLACK,
        fontSize: FontSize(13),
        fontFamily: FontName.Gordita_Medium,
        paddingTop: 10,
        paddingBottom: 10,
    },
    viewStyle: {
        margin: 5
    },
    viewDateBottomStyle: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        marginTop: heightPercentageToDP(2),
        flex: 1,

    },
    viewStartDateStyle: {
        flexDirection: 'row',
        paddingHorizontal: widthPercentageToDP(2)
    },
    subDateTitle: {
        fontWeight: "normal",
        color: BLACK,
        backgroundColor: WHITE,
        fontSize: FontSize(13),
        paddingVertical: widthPercentageToDP(3),
        fontFamily: FontName.Geo_Auto_Regular,
        textAlignVertical: 'center',
        alignSelf: 'center',
        marginStart: 5,
        flex: 1
    },
    imageStyle: {
        height: 20,
        width: 20,
        alignSelf: 'center'
    },
    viewEndColumStyle: {
        padding: 2,
        borderWidth: 1,
        borderColor: LIGHTGREY,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: widthPercentageToDP(2)
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: widthPercentageToDP(100),
    },
    saveButton: {
        backgroundColor: PRIMARY_COLOR,
        fontSize: FontSize(12),
        justifyContent: 'center',
        borderRadius: 10
    },
    customTextViewStyle: {
        marginStart: 10, color: GREY, fontFamily: FontName.Gorditas_Bold,
    },
})

export default FilterManageRequest