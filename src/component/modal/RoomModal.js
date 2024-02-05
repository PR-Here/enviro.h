import { View, Text, StyleSheet, Image, TouchableOpacity, } from "react-native";
import { BottomSheet } from 'react-native-btr';
import { BLACK, EXTRA_LIGHT_GREY, GREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors";
import { FontName, FontSize } from "../../theme/Fonts";
import AssetsImages from "../../utils/AssetsImages";
import RoomList from "../../screen/bookRoom/RoomList";

const RoomModal = ({ visible, onBackButtonPress, onBackdropPress, onBook }) => {

    return (
        <BottomSheet
            visible={visible}
            //setting the visibility state of the bottom shee
            onBackButtonPress={onBackButtonPress}
            //Toggling the visibility state
            onBackdropPress={onBackdropPress}
        //Toggling the visibility state

        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Rooms Available</Text>
                    <TouchableOpacity
                        style={styles.close}
                        onPress={onBackButtonPress}
                    >
                        <Image source={AssetsImages.CLOSE} style={styles.close} />
                    </TouchableOpacity>

                </View>
                <View style={styles.subContainer}>
                    <RoomList onBook={onBook} />
                </View>
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        width: '100%',
        backgroundColor: WHITE,
        borderTopLeftRadius: 38,
        borderTopRightRadius: 38
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
        fontFamily: FontName.Gordita_Regular,
        color: BLACK
    },
    close: {
        tintColor: BLACK,
        position: 'absolute',
        right: '5%',
        width: 20,
        height: 20
    },
    subContainer: {
        margin: 10,
    },
    listHeading: {
        fontSize: FontSize(12),
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '500',
        color: GREY,
        lineHeight: 20
    },
    verticalMargin: {
        height: '5%'
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
        marginTop: 0,
        marginBottom: 0,
        margin: 0,
    }
})

export default RoomModal