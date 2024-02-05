import { Platform, StyleSheet, TouchableOpacity, View } from "react-native"
import { BLACK, LIGHTWHITE, LIGHT_GREY } from "../../theme/Colors"
import { FontName, FontSize } from "../../theme/Fonts"
import Calendar from '../../../assets/images/SVG/calendar-room.svg'
import RightArrow from '../../../assets/images/SVG/right_arrow.svg'
import CustomText from "./CustomText"

const TimeSelect = ({ date, time, containerStyle, onPress, isAllDay, fromMeeting }) => {
    //console.log('fromMeeting =>', fromMeeting);
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
            <View style={[styles.container, containerStyle]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                        fromMeeting != undefined ? <Calendar width={24} height={24} /> : <View style={styles.iconBackground}>
                            <Calendar width={24} height={24} />
                        </View>
                    }

                    <View style={{ marginLeft: 15, justifyContent: 'center' }}>
                        <CustomText children={date} style={styles.date} />
                        {isAllDay ? <CustomText children={time} style={styles.time} /> : <View />}
                    </View>
                </View>
                <RightArrow width={30} height={30} />
            </View>
        </TouchableOpacity>
    )
}

export default TimeSelect

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconBackground: {
        height: 40,
        width: 40,
        borderRadius: 44,
        backgroundColor: LIGHTWHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    caldIcon: {
        height: 20,
        width: 20,
        tintColor: BLACK
    },
    time: {
        fontSize: FontSize(14),
        color: BLACK,
        paddingTop: Platform.OS == 'ios' ? 6 : 0,
        //fontFamily: FontName.Gordita_Regular,
        fontWeight: '500',
    },
    date: {
        fontFamily: FontName.Gordita_Regular,
        fontSize: FontSize(12),
        color: LIGHT_GREY,

    }

})