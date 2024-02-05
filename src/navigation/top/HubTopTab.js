import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { FontName, FontSize } from "../../theme/Fonts"
import { heightPercentageToDP } from "react-native-responsive-screen"
import { GREY, GREY_LIGHT, LIGHTGREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors"
import { AllEventsScreen } from "../../screen"
import NavString from "../../utils/NavString"
import { useState } from "react"
import { useNavigation } from '@react-navigation/native';

function HubTopTab() {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const navigation = useNavigation();

    const screens = [
        {
            name: 'All',
            screen: NavString.ALL_EVENTS
        },
        {
            name: 'Communities',
            screen: NavString.COMMUNITIES
        },
        {
            name: 'Events',
            screen: NavString.EVENT_HOME_SCREEN
        }
    ]
    return (
        <View style={styles.container}>
            {screens.map((el, index) => {
                return (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate(el.screen)
                        setSelectedIndex(index)
                    }}
                        style={[styles.labelContainer, { backgroundColor: selectedIndex == index ? PRIMARY_COLOR : WHITE, }]}
                    >
                        <Text style={[styles.label,
                        { color: index == selectedIndex ? WHITE : GREY, }
                        ]}
                        >{el.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: heightPercentageToDP(1),
        padding: 5,
        borderRadius: 10,
        elevation: 23,
        shadowOffset: {
            width: 2, height: 4
        },
        shadowRadius: 23,
        backgroundColor: WHITE,
        shadowColor: GREY,
        shadowOpacity: 0.2
    },
    label: {
        textTransform: 'capitalize',
        fontSize: FontSize(16),
        fontWeight: '400',
        fontFamily: FontName.Gordita_Medium,
        paddingVertical: heightPercentageToDP(1),
        paddingHorizontal: heightPercentageToDP(3),
        color: WHITE,
    },
    labelContainer: {
        height: 'auto',
        width: 'auto',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 8
    }
})

export default HubTopTab