import React from 'react';
import { StyleSheet, View } from 'react-native';

import FlightInfoView from './FlightInfoView';
import FormToDays from './FormToDays';
import PGAirtportDetailView from './PGAirtportDetailView';
import { WHITE } from '../../../theme/Colors';
import { widthPercentageToDP } from 'react-native-responsive-screen';
const PGExpandView = ({ navigation, item, activeTab }) => {

    return (
        <View style={styles.rowStyle}>
            {/*Source-----FlightImage----Destination*/}
            <FlightInfoView item={item} />
            {/*From To Days*/}
            <FormToDays item={item} />

            <View style={styles.separatorBottom} />
            {/*Ariport Detail View*/}
            <PGAirtportDetailView navigation={navigation} item={item} activeTab={activeTab} />
        </View>

    );
};


// define your styles
const styles = StyleSheet.create({
    rowStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: WHITE,
        // backgroundColor: LEAVETYPECOLOR,
        margin: 10
    },
    separatorBottom: {
        backgroundColor: '#808080',
        marginTop: 5,
        borderWidth: 0.2,
        width: widthPercentageToDP(100)
    },
});
export default PGExpandView;

