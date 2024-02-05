import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { BUTTON_BACKGROUND, GREY } from '../../theme/Colors';
import { PLACEHOLDER } from '../../utils/AssetsImages';
import * as Progress from 'react-native-progress';

const CustomImage = ({ imageUrl, height = 100, width = 100, on }) => {

    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <>
            <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 100 }}>
                {loading && <Progress.Circle style={{ position: 'absolute', alignSelf: 'center' }} indeterminate={true} size={100} color={BUTTON_BACKGROUND} />}

                <Image
                    source={imageUrl == '' || imageUrl == null || imageUrl == undefined ? PLACEHOLDER : { uri: imageUrl }}
                    style={[styles.imageStyle, { width: width, height: height }]}
                    onLoad={handleImageLoad} // Call handleImageLoad when the image is loaded
                />

            </View >
        </>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        borderRadius: 100 / 2,
        borderWidth: 1,
        borderColor: GREY
    }
})


export default CustomImage;