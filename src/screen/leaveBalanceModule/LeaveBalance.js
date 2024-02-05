import { FlatList, View } from "react-native";
import { styles } from './Style';
import MeetingHomeHeader from "../../component/header/MeetingHeader";
import { BLACK, GREY, GREY_LIGHT, LEAVESTATUSCOLOR, PRIMARY_COLOR, TERNARY_COLOR } from "../../theme/Colors";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import CustomText from "../../component/atoms/CustomText";
import { useEffect, useState } from "react";
import { FontName, FontSize } from "../../theme/Fonts";
import { GET_LEAVE_BALANCE } from "../../services/ApiEndPoint";
import useApiEffect from "../../hooks/useApiEffect";
import AppLoader from "../../utils/AppLoader";




const LeaveBalance = () => {


    const [balanceList, setBalanceList] = useState([])
    const { makeApiRequest, loading } = useApiEffect()


    useEffect(() => {
        //console.log('in use Effect')
        async function GET_LEAVE_BALANCES() {
            const apiData = await makeApiRequest({ url: GET_LEAVE_BALANCE, method: 'GET', isToken: true, showProgress: true });

            if (apiData?.status == true) {
                setBalanceList(filterLeaveBalnces(apiData?.data))
            } else {
                console.log("PROFILE API ERROR: ", apiData)
            }
        }
        GET_LEAVE_BALANCES()

    }, [])


    const filterLeaveBalnces = (list) => {

       // console.log('data are==========>', list)
        let BalaceData = []

        list?.map((item) => {

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


            BalaceData.push({
                leaveType: item?.leave_type_name,
                currentBalance: parseFloat(item?.EmpLeaveBal?.leave_balance).toFixed(2),
                actualBalance: parseFloat(item?.EmpLeaveBal?.actual_bal).toFixed(2),
                unApprovedBalance: aul.toFixed(2),
                ApprovedBalace: aL.toFixed(2)

            })


        })

       // console.log('balanceData', BalaceData)

        return BalaceData

    }

    const ListView = ({ item, index }) => {

        return (

            <View style={{
                paddingVertical: 10, elevation: 2, shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 0 }, alignContent: 'center',
                marginHorizontal: 14, marginVertical: 10, borderRadius: 5, backgroundColor: '#FFFFFF'
            }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: widthPercentageToDP(3) }}>

                    <CustomText children={item?.leaveType} style={{
                        fontSize: FontSize(14),
                        color: PRIMARY_COLOR,
                        paddingHorizontal: widthPercentageToDP(1.5),
                        fontFamily: FontName.Gordita_Medium
                    }} />


                    <CustomText children={item?.currentBalance} style={{
                        fontSize: FontSize(14),
                        color: LEAVESTATUSCOLOR,
                        paddingHorizontal: widthPercentageToDP(1.5),
                        fontFamily: FontName.Gordita_Regular
                    }} />



                </View>


                <View style={{ marginTop: 10, width: "90%", backgroundColor: '#00000008', height: 1.5, justifyContent: 'center', alignSelf: 'center' }} />


                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, paddingHorizontal: widthPercentageToDP(2) }}>

                    <View style={{flex: 1, alignItems: 'center', paddingHorizontal: widthPercentageToDP(1) }}>

                        <CustomText children={'Un-approved \n Balance'} style={{
                            fontSize: FontSize(12),
                            color: TERNARY_COLOR,
                            fontFamily: FontName.Gordita_Regular,
                            textAlign: 'center',
                            lineHeight: widthPercentageToDP(5)
                        }} />
                        <CustomText children={item?.unApprovedBalance} style={{
                            marginTop: 5,
                            fontSize: FontSize(12),
                            color: BLACK,
                            fontFamily: FontName.Gordita_Regular
                        }} />
                    </View>

                    <View style={{flex: 1, alignItems: 'center', paddingHorizontal: widthPercentageToDP(1) }}>

                        <CustomText children={'Future Approved \n Balance'} style={{
                            fontSize: FontSize(12),
                            color: TERNARY_COLOR,
                            fontFamily: FontName.Gordita_Regular,
                            textAlign: 'center',
                            lineHeight: widthPercentageToDP(5)
                        }} />
                        <CustomText children={item?.ApprovedBalace} style={{
                            marginTop: 5,
                            fontSize: FontSize(12),
                            color: BLACK,
                            fontFamily: FontName.Gordita_Regular
                        }} />
                    </View>

                    <View style={{flex: 1, alignItems: 'center', paddingHorizontal: widthPercentageToDP(1) }}>

                        <CustomText children={'Actual \n Balance'} style={{
                            fontSize: FontSize(12),
                            color: TERNARY_COLOR,
                            fontFamily: FontName.Gordita_Regular,
                            textAlign: 'center',
                            lineHeight: widthPercentageToDP(5)
                        }} />
                        <CustomText children={item?.actualBalance} style={{
                            marginTop: 5,
                            fontSize: FontSize(12),
                            color: BLACK,
                            fontFamily: FontName.Gordita_Regular
                        }} />
                    </View>



                </View>



            </View>
        )
    }


    return (

        <View style={styles.container}>

            {/* Header */}
            <MeetingHomeHeader
                headerText={'Leave Balance'}
            />

            <FlatList
                showsVerticalScrollIndicator={false}
                data={balanceList}
                renderItem={ListView}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: heightPercentageToDP(100) }}>
                        <CustomText children={'No Record Found'} style={{ fontSize: 12, color: GREY }} />
                    </View>
                }
            />



            <AppLoader isLoading={loading} />

        </View>

    );

}



export default LeaveBalance;