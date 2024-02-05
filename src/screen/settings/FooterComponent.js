// FooterComponent.js
import React from 'react';
import { View, Text } from 'react-native';
import VersionNumber from 'react-native-version-number';

const FooterComponent = () => {
    const { appVersion, buildVersion } = VersionNumber;

    return (
        <View style={{ padding: 10, alignItems: 'center' }}>
            <Text>{`Version: ${appVersion}`}</Text>
            <Text>{`Build: ${buildVersion}`}</Text>
        </View>
    );
};

export default FooterComponent;
