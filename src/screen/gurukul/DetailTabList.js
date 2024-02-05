//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native';
import { FontName } from '../../theme/Fonts';
// create a component
const DetailTabList = () => {
    const navigation = useNavigation();
    const introArr = [
        {
            time: '0:10',
            desc: 'Hi, I’m Justin Cutroni. And I’m Krista Seiden. We’re Analytics Advocates at Google. Welcome to Google Analytics for Beginners. In this course we’ll take you through a basic understanding of Google Analytics. Beginners. In this course we’ll take you through a basic understanding of Google Analytics. Beginners. In this course we’ll take you through a basic understanding of Google Analytics. Beginners. In this course we’ll take you through a basic understanding of Google Analytics.'
        },
        {
            time: '0:20',
            desc: 'We’ll show you how to create and implement an account, set up views and filters, read basic reports, set up dashboards, perform basic analysis, and set up goals and campaign tracking. Defining Digital Analytics'
        },
        {
            time: '0:20',
            desc: 'We’ll show you how to create and implement an account, set up views and filters, read basic reports, set up dashboards, perform basic analysis, and set up goals and campaign tracking. Defining Digital Analytics'
        },
    ]
    return (
        <View style={{ marginTop: 20 }}>
            <FlatList
                data={introArr}
                renderItem={({ item, index }) =>
                    // <IntroductionComponet item={item} />
                    <IntroductionComponet index={index} item={item} />
                }
            />

        </View>
    )
}

const IntroductionComponet = ({ item, index }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column' }}>

                <View style={{ height: 10, width: 10, backgroundColor: 'black', borderRadius: 5, marginLeft: 10, }}></View>

                {
                    index === 2 ?
                        null
                        :
                        <View style={{
                            borderStyle: 'dotted',
                            borderWidth: 1,
                            borderRadius: 1,
                            width: 1,
                            marginLeft: 14,
                            flex: 1,

                        }}>
                        </View>
                }
            </View>

            <Text style={{ marginHorizontal: wp(2) }}>{item?.time}</Text>
            <View style={{ marginLeft: wp(1), marginRight: wp(20) }}>
                {
                    index === 0 ? <Text tyle={{ fontSize: 12, fontWeight: '700', fontFamily: FontName.Gordita_Regular, }} >Introduction</Text> : null
                }

                <Text style={{ fontSize: 13, fontWeight: '400', fontFamily: FontName.Gordita_Regular, color: '#8F8F8F', marginVertical: 5, lineHeight: 16 }} >

                    {`${item?.desc} `}
                </Text>
                <View style={{ height: 20 }}></View>
            </View>
        </View>
    )
}

export default DetailTabList;



