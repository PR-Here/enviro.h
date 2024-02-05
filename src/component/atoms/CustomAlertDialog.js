// CustomAlertDialog.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { BLACK, GREY, LIGHTWHITE, RED, WHITE } from '../../theme/Colors';
import Warning from '../../../assets/images/SVG/warning.svg'
import { FontName } from '../../theme/Fonts';

const CustomAlertDialog = ({ visible, onClose, title, message }) => {
    return (
        <Modal
            transparent
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black overlay
            }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10, elevation: 5, shadowOpacity: 10, shadowOffset: 1, shadowColor: GREY }}>
                    <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10 }}>
                        <Warning style={{ marginTop: 0, alignSelf: 'center' }} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', marginBottom: 10, fontFamily: FontName.Gordita_Regular }}>{message}</Text>
                        <TouchableOpacity onPress={onClose} style={{ marginTop: 20, alignSelf: 'center', backgroundColor: BLACK, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8 }}>
                            <Text style={{ color: WHITE, fontSize: 16, fontFamily: FontName.Gordita_Medium }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </Modal>
    );
};

export default CustomAlertDialog;