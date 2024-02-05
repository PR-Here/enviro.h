import { Text, View, StyleSheet } from "react-native";
import CheckBox from 'react-native-check-box';
import { FontName, FontSize } from "../../theme/Fonts";
import { BLACK } from "../../theme/Colors";
import * as React from 'react'
import { heightPercentageToDP } from "react-native-responsive-screen";

const CustomCheckBox = ({ label }) => {
    const [checked, setChecked] = React.useState(false);

    return (
        <View style={styles.conatiner}>
            <CheckBox
                isChecked={checked}
                onClick={() => setChecked(!checked)}
                style= {{margin: 0}}
            />
            <Text style={styles.label}>{label}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    conatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto',
    },
    label: {
        fontSize: FontSize(14),
        fontFamily: FontName.Gordita_Regular,
        color: BLACK,
        paddingHorizontal: 10
    }
})

export default CustomCheckBox