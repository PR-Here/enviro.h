import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { styles } from './ClientMeetingStyle';
import RBSheet from 'react-native-raw-bottom-sheet';
import Cross from '../../../../assets/images/SVG/cros.svg';

const ClientMeetingScreen = ({ handleClientMeetingClose, visible, onDonePress }) => {
    const [selected, setSelected] = useState([]);
    const refRBSheet = useRef();

    const data = [
        { label: 'Item 1', value: 'Dinres' },
        { label: 'Item 2', value: 'Json' },
        { label: 'Item 3', value: 'Holder' },
        { label: 'Item 4', value: 'Api' },
        { label: 'Item 5', value: 'Dats' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];

    useEffect(() => {
        if (visible) {
            refRBSheet.current.open();
        }
    }, [visible]);

    const handelOnDone = () => {
        onDonePress(selected)
        handleClientMeetingClose()
    }

    return (

        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={false}
            closeOnPressMask={false}
            onClose={handleClientMeetingClose}
            height={370}
            openDuration={250}
            customStyles={{
                container: {
                    borderTopLeftRadius: 38,
                    borderTopRightRadius: 38,
                },
                wrapper: {
                    backgroundColor: '#00000070',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
            }}>

            <SafeAreaView style={styles.container}>
                <View>
                    <TouchableOpacity style={{
                        height: 50, width: 50,
                        top: 10,
                        alignSelf: 'flex-end'
                    }} onPress={handelOnDone}>
                        <Cross />
                    </TouchableOpacity>
                    <MultiSelect
                        style={[styles.dropdown, { marginHorizontal: 20 }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        search
                        data={data}
                        labelField="label"
                        valueField="value"
                        placeholder="Select item"
                        searchPlaceholder="Search..."
                        value={selected}
                        onChange={item => {
                            setSelected(item);
                        }}

                        selectedStyle={styles.selectedStyle}
                    />
                </View>
            </SafeAreaView>

        </RBSheet>

    );
}

export default ClientMeetingScreen;
