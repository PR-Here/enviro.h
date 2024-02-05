import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { styles } from './ClientMeetingStyle';
import RBSheet from 'react-native-raw-bottom-sheet';

const ClientMeetingScreen = ({ handleClientMeetingClose, visible }) => {
    const [selected, setSelected] = useState([]);
    const refRBSheet = useRef();

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];

    useEffect(() => {
        if (visible) {
            refRBSheet.current.open();
        }
    }, [visible]);


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
                <MultiSelect
                    style={styles.dropdown}
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
            </SafeAreaView>
        </RBSheet>
    );
}

export default ClientMeetingScreen;
