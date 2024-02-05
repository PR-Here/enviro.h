import {
    View,
    FlatList,
} from 'react-native';
import React, { useState } from 'react';
import FlightIcon from '../../../assets/images/SVG/PlanGo/flightIcon.svg';
import PGExpandibleList from './PGExpandibleList';
import { styles } from './Style';
import AppString from '../../utils/AppString';
import NotificationHeader from '../../component/header/NotificationHeader';
import NavString from '../../utils/NavString';


const PlanGoList = ({ navigation, route }) => {
    const handleBackPress = () => {
        navigation?.goBack()

    }
    const handleActionPress = () => {
        navigation.navigate(NavString.WALLET)
    };

    const data = [
        {
            title: 'Upcoming Bookings',
            items:
                [
                    {
                        id: 1,
                        image: <FlightIcon />,
                        source: 'DEL',
                        destination: 'MUB',
                        boardingTime: '22:00',
                        ArrivalTime: '00:40',
                        startDate: '25 Aug 23',
                        endDate: '30 Aug 23',
                        numberOfDays: '1 Day',
                        airportName: 'Delhi International Airport',
                        terminalName: 'T3 Terminal',
                        buttonName: 'Boarding Pass',
                        isShowDownloadIcon: true
                    }
                ]
        },
        {
            title: 'Request Booking',
            items:
                [{
                    id: 1,
                    image: <FlightIcon />,
                    source: 'DEL',
                    destination: 'MUB',
                    boardingTime: '22:00',
                    ArrivalTime: '00:40',
                    startDate: '25 Aug 23',
                    endDate: '30 Aug 23',
                    numberOfDays: '1 Day',
                    airportName: 'Delhi International Airport',
                    terminalName: 'T3 Terminal',
                    buttonName: 'Web Checkin',
                }]
        },
        {
            title: 'My Bookings',
            items:
                [{
                    id: 1,
                    image: <FlightIcon />,
                    source: 'DEL',
                    destination: 'MUB',
                    boardingTime: '22:00',
                    ArrivalTime: '00:40',
                    startDate: '25 Aug 23',
                    endDate: '30 Aug 23',
                    numberOfDays: '1 Day',
                    airportName: 'Delhi International Airport',
                    terminalName: 'T3 Terminal',
                    buttonName: 'View Details',
                    bookingStatus: 'Awaiting'
                }]
        },
    ];


    return (
        <View style={styles.container}>
            <NotificationHeader
                headerText={AppString.PLAN_GO}
                handleBackPress={handleBackPress}
                onActionPress={handleActionPress}
                isShowWalletIcon={true} />
            {/* <NotificationHeader
        actionText={isEdit || loginRole != "loginUser" ? '' : 'Edit'}
        headerText={isEdit ? NavString.EDIT_PROFILE : NavString.VIEW_PROFILE}
        onActionPress={handleActionPress}
        isEditable={isEdit || loginRole != "loginUser" ? true : false}
        handleBackPress={handleBackPress} */}
            {/* /> */}
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false} // Set this to false to hide the indicator
                renderItem={({ item, index }) => (
                    <PGExpandibleList navigation={navigation} data={item.items} sectionTitle={item.title} />
                )}
            />
        </View>
    );
};

export default PlanGoList