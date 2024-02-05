import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontName, FontSize } from '../../../theme/Fonts';
import CustomText from '../../../component/atoms/CustomText';
const FlightInfoView = ({ item }) => {

    return (
        <View style={styles.startViewStyle}>
            <View style={styles.columnStyle}>
                <CustomText
                    children={item?.source}
                    fontSize={FontSize(13)}
                    style={{ alignSelf: 'flex-start', fontFamily: FontName.Gordita_Regular }}
                />
                <CustomText
                    children={item?.boardingTime}
                    fontSize={FontSize(13)}
                    style={{ alignSelf: 'flex-start', fontFamily: FontName.Gordita_Regular }}
                />
            </View>
            <View style={{ height: 1, width: '30%', borderRadius: 1, borderWidth: 1, borderColor: 'black', borderStyle: 'dashed', zIndex: 0, }}>
                <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
            </View>
            {item?.image}
            <View style={{ height: 1, width: '30%', borderRadius: 1, borderWidth: 1, borderColor: 'black', borderStyle: 'dashed', zIndex: 0, }}>
                <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
            </View>
            <View style={styles.columnStyle}>

                <CustomText
                    children={item?.destination}
                    fontSize={FontSize(13)}
                    style={{ alignSelf: 'flex-start', fontFamily: FontName.Gordita_Regular }}
                />
                <CustomText
                    children={item?.ArrivalTime}
                    fontSize={FontSize(13)}
                    style={{ alignSelf: 'flex-start', fontFamily: FontName.Gordita_Regular }}
                />
            </View>
        </View>

    );
};


// define your styles
const styles = StyleSheet.create({
    startViewStyle: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',

    },
    columnStyle: {
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default FlightInfoView;
