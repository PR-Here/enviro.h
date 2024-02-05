import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { CLOSE } from '../../utils/AssetsImages';
import { BLACK, WHITE } from '../../theme/Colors';
import { heightPercentageToDP } from 'react-native-responsive-screen';



const UserProfileModal = ({ isVisible, imageUri, onClose }) => {
    return (
        <Modal
            isVisible={isVisible}
            backdropOpacity={0.5}
            animationIn="fadeInUpBig"
            animationOut={"slideInDown"}
            onRequestClose={onClose}
            style={styles.modal}
            onBackdropPress={onClose}
        >
            <View style={styles.container}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Image source={CLOSE} style={styles.closeIcon}
                        tintColor={WHITE} resizeMode='contain' />
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    container: {
        backgroundColor: 'transparent',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    closeButton: {
        padding: 10,
        zIndex: 1,
        alignSelf: 'center',
        backgroundColor: BLACK,
        width: 40,
        height: 40,
        marginTop: heightPercentageToDP(2),
        borderRadius: 100

    },
    closeIcon: {
        width: 20,
        height: 20,
        tintColor: BLACK,

    },
    image: {
        width: '50%',
        height: 300,
        alignSelf: 'center',
        borderRadius: 10
    },
});

export default UserProfileModal;
