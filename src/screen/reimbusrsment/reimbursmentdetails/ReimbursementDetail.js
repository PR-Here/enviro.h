import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import Header from "../../../component/header/Header";
import AppString from '../../../utils/AppString'
import { WHITE } from "../../../theme/Colors";
import { PLUS_ICON, CHECK_WHITE, ALIGN_LEFT, DOCUMENT } from "../../../utils/AssetsImages";
import { styles } from './Style';

const ReimbursementDetail = () => {

    const ReimbursementDetailList = [
        {
            id: '',
            description: 'Expense Type',
            detail: 'Travel'
        },
        {
            id: '',
            description: 'Amount',
            detail: '₹ 344.00'
        },
        {
            id: '',
            description: 'Date of Expenditure',
            detail: '19 / 05 / 2023'
        },
        {
            id: '',
            description: 'Description',
            detail: 'Uber Transport to Client'
        },
        {
            id: '',
            description: 'Invoice(s)',
            detail: 'receipt_64745657db2e3.pdf'
        },
        {
            id: '',
            description: 'Mode of Payment',
            detail: 'Online'
        },
        {
            id: '',
            description: 'GST(%)',
            detail: '5%'
        },
        {
            id: '',
            description: 'Place of Expense',
            detail: 'Gurugram'
        },
        {
            id: '',
            description: 'Other Details',
            detail: '------'
        }

    ]

    return (
        <View style={styles.container}>
            <Header title={AppString.REIMBURSEMENT} />

            <View style={styles.timeSheetVIewStyle}>
                <View style={styles.timeSheetHeader}>
                    <View style={styles.headerItemStyle}>
                        <Image source={ALIGN_LEFT} />
                        <Text style={styles.headerItemImageStyle}>Description</Text>
                    </View>

                    <View style={styles.headerItemStyle}>
                        <Image source={DOCUMENT} />
                        <Text style={styles.headerItemImageStyle}>details</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: WHITE, elevation: 5 }}>
                    <FlatList
                        data={ReimbursementDetailList}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.itemViewStyle}>
                                    <Text style={styles.taskTextStyle}>{item.description}</Text>
                                    <Text style={styles.timeTextStyle}>{item.detail}</Text>
                                </View>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.5}>
                <View style={[styles.addTimeButtonSheetStyle, styles.shadowProp,]}>
                    <Image source={PLUS_ICON} />
                </View>
            </TouchableOpacity>
            <View style={[styles.bottomViewStyle, styles.shadowProp]}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.totalHourTextStyle}>Total hours:</Text>
                    <Text style={styles.totalHourStyle}>10:00 Hrs</Text>
                </View>
                <TouchableOpacity>
                    <View style={styles.buttonStyle}>
                        <Image source={CHECK_WHITE} />
                        <Text style={styles.buttonSubmitStyle}>{AppString.SUBMIT}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default ReimbursementDetail;