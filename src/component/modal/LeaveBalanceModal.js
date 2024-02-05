const { BottomSheet, CheckBox } = require("react-native-btr")
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { BLACK, BUTTON_BACKGROUND, GREY_LIGHT, LIGHTGREY, LIGHT_GREY, LIGHT_SHADE_GREY, PRIMARY_COLOR, TABLE_STROKE_COLOR, WHITE } from "../../theme/Colors";
import CustomText from "../atoms/CustomText";
import { CLOSE } from "../../utils/AssetsImages";
import { FontName, FontSize } from "../../theme/Fonts";
import CustomButton from "../atoms/CustomButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { DONE, LEAVE_BALANCE } from "../../utils/AppString";

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { useState, useEffect } from "react";




const LeaveBalanceModal = ({ visible, onBackButtonPress, onBackdropPress, data, onPress }) => {

    const [tableHeader, setTableHeader] = useState([])
    //const [tableTitle, setTableTitle] = useState([])
    const [tableData, setTableData] = useState([])
    const [widthArray, setWidthArray] = useState([])

    useEffect(() => {
        let leaveType = []
        let current = []
        let unApp = []
        let appr = []
        let actBal = []
        let width = []

        data.map((item, index) => {
            leaveType.push(item.leave_type_name)
            current.push(parseFloat(item?.EmpLeaveBal?.leave_balance).toFixed(2))
            actBal.push(parseFloat(item?.EmpLeaveBal?.actual_bal).toFixed(2))
            width.push(180)

            //let aL = parseFloat(item?.EmpLeaveBal?.actual_bal) - parseFloat(item?.EmpLeaveBal?.leave_balance)
            let aL = 0
            let aul = 0
            item?.EmpLeaveBal?.UserAppliedLeaves.map((leave) => {
                if (leave.status === 1) {
                    leave?.UserAppliedLeavesDates.map(leaveCount => {
                        aul += parseFloat(leaveCount.deducted)
                    })
                }
                if (leave.status === 2) {
                    leave?.UserAppliedLeavesDates.map(leaveCount => {
                        aL += parseFloat(leaveCount.deducted)
                    })
                }
            })
            unApp.push('' + aul.toFixed(2))
            appr.push('' + aL.toFixed(2))

        })

        setTableHeader(leaveType)
        setWidthArray(width)
        setTableData([current, unApp, appr, actBal])
    }, [data])





    const RenderLeaveTypeItem = ({ item, index }) => {
        return (

            <View style={[styles.leaveTypeItemContainer, { borderBottomColor: index < 3 ? TABLE_STROKE_COLOR : null, borderBottomWidth: index < 3 ? 1 : null }]}>

                <CustomText children={item.type} style={styles.leaveTypeValueTextConatainer} />
                <CustomText children={item.clValue} style={styles.leaveTypeValueTextConatainer} />
                <CustomText children={item.slValue} style={styles.leaveTypeValueTextConatainer} />
                <CustomText children={item.elValue} style={styles.leaveTypeValueTextConatainer} />
                <CustomText children={item.OValueL} style={{ flex: 1, padding: 5, fontSize: 14, fontWeight: 'normal', color: BLACK }} />

            </View >
        )


    }


    const MultipleLeaveSelectionView = () => {

        return (
            // <ScrollView style={{ borderRadius: 8, borderWidth: 1, borderColor: TABLE_STROKE_COLOR }}>
            //     <FlatList
            //         ListHeaderComponent={
            //             <View style={styles.leaveTypeHeaderContainer}>

            //                 <CustomText children={'Leave Type'} style={styles.leaveTypeHeadingStyle} />
            //                 <CustomText children={'Casual Leave'} style={styles.leaveTypeHeadingStyle} />
            //                 <CustomText children={'Sick Leave'} style={styles.leaveTypeHeadingStyle} />
            //                 <CustomText children={'Earned Leave'} style={styles.leaveTypeHeadingStyle} />
            //                 <CustomText children={'Optional Leave'} style={{ flex: 1, paddingVertical: 10, fontSize: FontSize(12), fontFamily: FontName.Gordita_Medium, color: BLACK }} />

            //             </View>
            //         }
            //         data={data}
            //         renderItem={({ item, index }) => <RenderLeaveTypeItem item={item} index={index} />}
            //         keyExtractor={item => item.id}

            //     />
            // </ScrollView>

            // <View>
            //     <Table borderStyle={{ borderWidth: 1 }}>
            //         <Row data={tableHeader} style={styles.head} flexArr={[1, 1, 1, 1]} textStyle={styles.text} />
            //         <TableWrapper style={styles.wrapper}>
            //             <Rows data={tableData} heightArr={[50, 50, 50, 50]} style={styles.row} flexArr={[1, 1, 1]} textStyle={styles.text} />
            //         </TableWrapper>
            //     </Table>

            // </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ marginTop: 0.4 }}>

                    <View style={styles.staticHeaderViewStyle}>
                        <CustomText children={"Leave Type"} style={styles.staticHeaderTextStyle} fontSize={FontSize(13)} />
                    </View>

                    <View style={styles.staticValueViewStyle}>
                        <CustomText children={"Current Balance"} style={styles.staticValueTextStyle} fontSize={FontSize(13)} />
                    </View>

                    <View style={styles.staticValueViewStyle}>
                        <CustomText children={"Un-Approved Balance"} style={[styles.staticValueTextStyle, { height: wp(15) }]} fontSize={FontSize(13)} />
                    </View>

                    <View style={styles.staticValueViewStyle}>
                        <CustomText children={"Approved Balance"} style={styles.staticValueTextStyle} fontSize={FontSize(13)} />
                    </View>

                    <View style={styles.staticValueViewStyle}>
                        <CustomText children={"Actual Balance"} style={styles.staticValueTextStyle} fontSize={FontSize(13)} />
                    </View>




                </View>
                <ScrollView style={{ flex: 1 }} horizontal={true}>
                    <View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            <Row data={tableHeader} widthArr={widthArray} style={styles.header} textStyle={styles.textheader} />
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                {
                                    tableData.map((rowData, index) => (

                                        <Row
                                            widthArr={widthArray}
                                            key={index}
                                            data={rowData}
                                            textStyle={[styles.text, { height: index == 1 ? wp(15) : null }]}
                                        />
                                    ))
                                }
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>

        )

    }

    return (

        <BottomSheet
            visible={visible}
            onBackButtonPress={onBackButtonPress}
            onBackdropPress={onBackdropPress}>
            <View style={{ width: '15%', height: wp(1), backgroundColor: WHITE, marginBottom: wp(4), alignSelf: 'center', borderRadius: wp(3) }} />


            <View style={styles.container}>
                <View style={[styles.innerTopContainer]}>
                    <CustomText children={LEAVE_BALANCE} style={[styles.titleTextStyle]} />
                    <TouchableOpacity onPress={onBackdropPress} style={styles.closeView}>
                        <Image source={CLOSE} style={styles.closeIcon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.lineStyle} />

                <View style={styles.tableContainer}>
                    <MultipleLeaveSelectionView />
                </View>

                {/* <CustomButton title={DONE} style={{ backgroundColor: BUTTON_BACKGROUND, alignSelf: 'center', marginTop: 40, marginBottom: Platform.OS === 'ios' ? wp(6) : 0 }} textStyle={{ color: WHITE, fontSize: 16, fontWeight: 'normal' }} onPress={onPress} /> */}

            </View>
        </BottomSheet>
    )




}



const styles = StyleSheet.create({

    container: {
        height: 'auto',
        width: '100%',
        backgroundColor: LIGHT_SHADE_GREY,
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10)
    },

    innerTopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: wp(4)
    },

    innerMiddleContainer: {
        justifyContent: 'center',
        backgroundColor: 'red',
    },

    titleTextStyle: {
        fontSize: FontSize(16),
        fontFamily: FontName.Gordita_Medium,
        color: BLACK,
        alignSelf: 'center'
    },
    closeView: {
        right: wp(4),
        position: 'absolute',
    },
    closeIcon: {
        padding: wp(1),
        tintColor: BLACK,
    },
    lineStyle: {
        width: '100%',
        height: wp(0.2),
        marginTop: 20,
        backgroundColor: LIGHTGREY

    },
    listItemText: {
        fontSize: FontSize(16),
        color: '#00000085',
        fontFamily: FontName.Gordita_Regular

    },
    listItemContainer: {
        paddingStart: wp(3),
        paddingEnd: wp(3),
        paddingTop: wp(1),
        paddingBottom: wp(1),
        backgroundColor: WHITE,
        justifyContent: 'center',
        borderColor: GREY_LIGHT,
        borderWidth: wp(0.6),
        borderRadius: wp(1),
        marginTop: wp(1),
        marginBottom: wp(1),
        marginStart: wp(2),
        marginEnd: wp(2),
    },
    checkboxText: {
        fontSize: FontSize(16),
        fontFamily: FontName.Gordita_Regular,
        color: BLACK,
        paddingHorizontal: wp(2)

    },
    leaveTypeValueTextConatainer: {
        flex: 1,
        padding: wp(1.5),
        fontSize: FontSize(14),
        fontWeight: 'normal',
        color: BLACK,
        borderRightColor: TABLE_STROKE_COLOR,
        borderRightWidth: wp(0.2),


    },
    leaveTypeHeadingStyle: {
        flex: 1,
        paddingVertical: wp(2.5),
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Medium,
        color: BLACK,
        borderRightColor: TABLE_STROKE_COLOR,
        borderRightWidth: wp(0.2),
        justifyContent: 'center',
        alignSelf: 'center'
    },
    leaveTypeItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leaveTypeHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EEF2F8',
        borderBottomColor: GREY_LIGHT,
        borderTopLeftRadius: wp(2),
        borderTopRightRadius: wp(2)
    },
    tableContainer: {
        width: '100%',
        marginTop: wp(4),
        alignSelf: 'center',
        paddingHorizontal: wp(2),
        marginBottom: wp(8)
    },




    header: {
        height: 60,
        backgroundColor: PRIMARY_COLOR,
        // borderBottomColor: GREY_LIGHT,

    },
    text: {
        textAlign: 'center',
        paddingVertical: wp(2.5),
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Medium,
        color: BLACK,
        lineHeight: wp(5),
    },
    textheader: {
        textAlign: 'center',
        paddingVertical: wp(2.5),
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Medium,
        color: WHITE,
        lineHeight: wp(5),
    },
    dataWrapper: {
        marginTop: -1
    },

    row: {
        backgroundColor: '#E7E6E1'
    },
    title: { flex: 1, backgroundColor: '#f6f8fa' },



    wrapper: { flexDirection: 'row' },



    staticHeaderViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60, width: 120,
        backgroundColor: PRIMARY_COLOR,
        //borderBottomColor: '#C1C0B9',
        //borderBottomWidth: 1
    },
    staticHeaderTextStyle: {
        fontSize: FontSize(12), justifyContent: 'center', color: WHITE,
    },

    staticValueViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        borderStartWidth: 1,
        borderEndWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#C1C0B9',
    },
    staticValueTextStyle: {
        textAlign: 'center', paddingVertical: wp(2.5),
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Medium,
        lineHeight: wp(5),
        color: BLACK
    }



})


export default LeaveBalanceModal;