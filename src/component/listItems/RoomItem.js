import { useState } from 'react';
import { Image, StyleSheet, View, FlatList } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { BLACK, BUTTON_BACKGROUND, GREY, LIGHT_BLUE, PRIMARY_COLOR, WHITE } from "../../theme/Colors";
import { FontName, FontSize } from "../../theme/Fonts";
import AssetsImages from "../../utils/AssetsImages";
import CustomButton from "../atoms/CustomButton";
import CustomText from '../atoms/CustomText';
import User from '../../../assets/images/SVG/users-2.svg'
import Printer from '../../../assets/images/SVG/printer.svg'
import Wifi from '../../../assets/images/SVG/wifi.svg'
import Projector from '../../../assets/images/SVG/projector.svg'

const RoomItem = ({ room_id, data, index, selectedIndex, onPress }) => {
    console.log('room_id----->', room_id);
    const name = data?.Meetingroomfloor
    const handleButtonPress = () => {
        onPress(index, data)
    };

    const seats = `${data?.no_of_seats}` == '0' ? {} : {
        image: <User />,
        value: `${data?.no_of_seats} seats`
    }

    const printer = `${data?.printer}` == '0' ? {} : {
        image: <Printer />,
        value: `Printer`
    }

    const projector = `${data?.projector}` == '0' ? {} : {
        image: <Projector />,
        value: `Projector`
    }

    const wifi = `${data?.wifi}` == '0' ? {} : {
        image: <Wifi />,
        value: `Wifi`
    }

    let list = [
        seats,
        printer,
        wifi,
        projector,
    ]
    list = list.filter(item => item.hasOwnProperty("value"))
    return (
        <View>
            <View style={styles.conatiner}>
                <Image source={{ uri: data?.room_image }} style={styles.image} />
                <CustomText numberOflines={2} children={`${name.BuildingModel?.building_name}, ${name.floor_name},${data.meeting_room_name}, ${data?.Meetingroomfloor?.BuildingModel?.Location?.location_name}`} style={{ marginVertical: 15, alignSelf: 'flex-start', marginHorizontal: 20, fontWeight: 500, color: WHITE, lineHeight: 20 }} />
                <View style={{ marginHorizontal: 10, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={list}
                        scrollEnabled={false}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ marginHorizontal: 15, marginVertical: 3, flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                    {item?.image}
                                    <CustomText children={item?.value} style={{ marginLeft: 10, color: '#A09F9E', fontWeight: '400' }} />
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                <CustomButton style={{
                    backgroundColor: selectedIndex == index ? '#F4F4F4' : WHITE, width: '92%',
                    margin: '5%',
                    marginTop: '5%',
                }} textStyle={{ color: selectedIndex == index ? '#A09F9E' : PRIMARY_COLOR }}
                    title={room_id == data.room_id && selectedIndex == index ? 'Booked' : selectedIndex == index ? 'Selected' : 'Book'}
                    onPress={() => {
                        if (selectedIndex != index) {
                            handleButtonPress()
                        } else {
                            onPress(-1, null)
                        }
                    }}
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    conatiner: {
        width: widthPercentageToDP(80),
        //borderRadius: 'mixed'
        alignItems: 'center',
        elevation: 7,
        height: heightPercentageToDP(48),
        shadowColor: GREY,
        shadowOffset: 3,
        shadowRadius: 10,
        backgroundColor: WHITE,
        borderRadius: 10,
        margin: 10,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: PRIMARY_COLOR
    },
    image: {
        width: '100%',
        height: heightPercentageToDP(20),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    iconContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

    },
    icon: {
        height: 20,
        width: 20,
        marginStart: 10
    },
    text: {
        color: GREY,
        margin: 10,
        fontSize: FontSize(12),
    },
    title: {
        fontSize: FontSize(14),
        fontWeight: '500',
        color: BLACK,
        fontFamily: FontName.Gordita_Regular,
        margin: 10,
        alignSelf: 'flex-start'
    },
    button: {
        width: '92%',
        backgroundColor: BUTTON_BACKGROUND,
        margin: '5%',
        marginTop: '5%',
        fontWeight: 500
    }
})

export default RoomItem

