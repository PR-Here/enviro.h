import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { BLUE, BUTTON_BACKGROUND, WHITE } from '../../theme/Colors';
import LinearGradient from 'react-native-linear-gradient';


const GradientBorderComponent = ({ sourceImage, onPress, gradientColor }) => {



    return (

        <TouchableOpacity onPress={onPress}>
            <View style={styles.border}>
                <LinearGradient
                    colors={gradientColor}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={styles.gradientViewStyle}>

                    <Image style={styles.imageStyle} source={sourceImage} resizeMode='contain' />


                </LinearGradient>
            </View>
        </TouchableOpacity>
    )

}



const styles = StyleSheet.create({


    gradientViewStyle: {
        flex: 1,
        borderRadius: 100 / 2
    },
    imageStyle: {
        height: 100,
        width: 100,
        margin: wp(1),
        justifyContent: 'center',
        borderRadius: wp(3.5),
    },
    border: {

        borderRadius: 100 / 2,
        overflow: 'hidden',
        borderColor: 'transparent',
        borderWidth: 2
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }



})

const MyInstaStory = ({ data, duration, renderCloseComponent }) => {




    return (

        <View style={styles.container}>


            {data.map((item, index) => {

                <GradientBorderComponent sourceImage={item?.image} onPress={console.log('print')} gradientColor={[BUTTON_BACKGROUND, BLUE]} />
            })
            }

            {renderCloseComponent &&
                renderCloseComponent()
            }
        </View>
    )

}






export default MyInstaStory;