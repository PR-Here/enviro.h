import { StyleSheet, View, Text, Image } from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
import { FontName, FontSize } from '../../theme/Fonts'
import { BLACK, EXTRA_LIGHT_GREY } from '../../theme/Colors'
import AssetsImages from '../../utils/AssetsImages'
import { useState } from 'react'
import History from '../../../assets/images/SVG/history.svg'

const HistorySwitch = ({ title, image, containerStyle, onChange, status }) => {


    return (
        <View style={[styles.conatainer, containerStyle]}>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <History />
                <Text style={styles.text}>{title}</Text>
            </View>

            <View>
                <ToggleSwitch
                    isOn={status}
                    onColor="green"
                    offColor={EXTRA_LIGHT_GREY}
                    label=""
                    labelStyle={{ color: "black", fontWeight: "900" }}
                    size="small"
                    onToggle={() => {
                        onChange(!status)
                    }
                    }
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    conatainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        height: 18,
        width: 18,
        tintColor: BLACK
    },
    text: {
        fontFamily: FontName.Gordita_Regular,
        color: BLACK,
        fontSize: FontSize(14),
        marginLeft: 10,
    }
})


export default HistorySwitch