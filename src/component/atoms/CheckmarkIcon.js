import React from 'react';
import { Image, Text } from 'react-native';
import { CHECK_HOBBY, CROSS_HOBBY, DOWN_ARROW, SEARCH } from '../../utils/AssetsImages';
import { SELECTED_OUTER_COLOR } from '../../theme/Colors';

export const CheckmarkIcon = () => {
    return (
        <Image
            source={CROSS_HOBBY}
            style={{ width: 20, height: 20, tintColor:SELECTED_OUTER_COLOR }}
        />

    );
};

export const SelectedIcon = () => {
    return (
        <Image
            source={CHECK_HOBBY}
            style={{ width: 20, height: 20 }}
        />
    );
};


export const DownArrowIcon = () => {
    return (
        <Image
            source={DOWN_ARROW}
            style={{ width: 20, height: 20 }}
        />
    );
};

export const SearchArrowIcon = () => {
    return (
        <Image
            source={SEARCH}
            style={{ width: 20, height: 20 }}
        />
    );
};