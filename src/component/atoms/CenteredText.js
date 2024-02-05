import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontSize } from '../../theme/Fonts';
import CustomText from './CustomText';

const CenteredText = ({ text }) => {
    return (
        <View style={styles.container}>
            <CustomText style={styles.text}>{text}</CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        top: 0, bottom: 0, right: 0, left: 0
    },
    text: {
        fontSize: FontSize(16),
        textAlign: 'center',
    },
});

export default CenteredText;
