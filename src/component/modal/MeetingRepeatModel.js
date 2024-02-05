import { useState } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BLACK, GREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors";
import CustomButton from '../atoms/CustomButton';
import { FontName, FontSize } from '../../theme/Fonts';

const MeetingRepeatModel = ({ visible, selectedPosition, onDone }) => {

    const data = [
        {
            key: 'DNR',
            value: 'Does not repeat'
        },
        {
            key: 'DAILY',
            value: 'Every Day'
        },
        {
            key: 'WEEKLY',
            value: 'Every Week'
        },
        {
            key: 'MONTHLY',
            value: 'Every Month'
        },
    ]

    const getLastItem = (position) => {
        let selectedItem = undefined
        data.map((item, index) => {
            if (index == position) {
                selectedItem = item
            }
        })
        return selectedItem
    }


    return (
        <View style={styles.mainContainer}>
            <Modal
                transparent={true}
                visible={visible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {data.map((item, index) => {
                            return (
                                <View style={styles.viewStyle} key={index}>
                                    <CircleCheckBox
                                        label={item.value}
                                        outerColor={PRIMARY_COLOR}
                                        innerColor={PRIMARY_COLOR}
                                        labelPosition={LABEL_POSITION.RIGHT}
                                        checked={selectedPosition == index ? true : false}
                                        onToggle={(checked) => {
                                            onDone(item, index)
                                        }}
                                    />
                                </View>
                            )
                        })}
                        <View style={{ marginTop: 20, backgroundColor: '#0002', height: 1, width: '100%' }}></View>
                        <CustomButton title={'Cancel'} onPress={() => {
                            onDone(getLastItem(selectedPosition), selectedPosition)
                        }}
                            style={{ width: '50%', marginTop: 15, backgroundColor: 'transparent', height: hp(3), }}
                            textStyle={{ fontFamily: FontName.Gordita_Medium, fontSize: FontSize(12), color: BLACK }} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: WHITE,
        padding: hp(3),
        borderRadius: hp(2),
        alignItems: 'center',
        width: wp(80),
    },
    viewStyle: {
        height: 'auto',
        marginVertical: 5,
        width: '100%',
    },
})

export default MeetingRepeatModel