//import liraries
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ProgressBar } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';
import CalenderSVG from '../../../assets/images/SVG/calenderSVG.svg';
import LeaveSVG from '../../../assets/images/SVG/leaveSVG.svg';
import MyTemSVG1 from '../../../assets/images/SVG/myTemSVG1.svg';
import NextSVG from '../../../assets/images/SVG/nextSVG.svg';
import Notification from '../../../assets/images/SVG/notification.svg';
import UserGroupSVG from '../../../assets/images/SVG/userGroupSVG.svg';
import CustomText from '../../component/atoms/CustomText';
import { BLACK, WHITE } from '../../theme/Colors';
import { FontName, FontSize } from '../../theme/Fonts';
import NavString from '../../utils/NavString';
//import { Image } from 'react-native-svg';
import AssetsImages, { DummyUsersPic } from '../../utils/AssetsImages';

export const horizontalData = [
    {
        id: 5,
        title: 'Maruti Commercial',
        image: '',
        color: '#F49D7C',
        borderColor: BLACK,
        textColor: WHITE
    },
    {
        id: 6,
        title: 'Muthoot Social Media',
        image: '',
        color: '#0BA476',
        borderColor: BLACK,
        textColor: WHITE
    },
    {
        id: 6,
        title: 'Maruti  Website',
        image: '',
        color: '#2398CE',
        borderColor: BLACK,
        textColor: WHITE
    },


]
export const myTeamData = [
    {
        id: 5,
        title: 'Maruti Commercial',
        image: '',
        color: '#F49D7C',
        borderColor: BLACK,
        textColor: WHITE
    },
    {
        id: 6,
        title: 'Muthoot Social Media',
        image: '',
        color: '#0BA476',
        borderColor: BLACK,
        textColor: WHITE
    },
    {
        id: 6,
        title: 'Maruti  Website',
        image: '',
        color: '#2398CE',
        borderColor: BLACK,
        textColor: WHITE
    },


]
export const verticalData = [
    {
        id: 4,
        title: 'In Progress',
        image: '',
        color: '#FFF7F2',
        borderColor: BLACK,
        textColor: WHITE
    },
    {
        id: 2,
        title: 'Stuck',
        image: '',
        color: '#FFF7F2',
        borderColor: BLACK,
        textColor: WHITE
    },
    {
        id: 5,
        title: 'Pending Approval',
        image: '',
        color: '#FFF7F2',
        borderColor: BLACK,
        textColor: WHITE
    },
    {
        id: 1,
        title: 'Over Due Date',
        image: '',
        color: '#ECEEFA',
        borderColor: BLACK,
        textColor: WHITE
    }, {
        id: 7,
        title: 'Due Today',
        image: '',
        color: '#ECEEFA',
        borderColor: BLACK,
        textColor: WHITE
    },
    {
        id: 6,
        title: 'Due Tomorrow',
        image: '',
        color: '#ECEEFA',
        borderColor: BLACK,
        textColor: WHITE
    },
]
export const myTeamAvilData = [
    {
        id: 4,
        title: 'Not In Offcie',
        userImg: '',
        type: '',
        color: '#FFF7F2',
        leaveType: 'L',
        borderColor: BLACK,
        textColor: WHITE,
        leaveTypeColor: '#0BA476',
        image: AssetsImages.MaskGroup1
    },
    {
        id: 2,
        title: 'Manav',
        userImg: <MyTemSVG1 />,
        type: <LeaveSVG />,
        leaveType: 'L',
        borderColor: BLACK,
        textColor: WHITE,
        leaveTypeColor: '#0BA476',
        image: AssetsImages.MaskGroup1
    },
    {
        id: 5,
        title: 'Nikhil',
        userImg: <MyTemSVG1 />,
        type: <LeaveSVG />,
        leaveType: 'L',
        borderColor: BLACK,
        textColor: WHITE,
        leaveTypeColor: '#0BA476',
        image: AssetsImages.MaskGroup2
    },
    {
        id: 1,
        title: 'Pooja',
        userImg: <MyTemSVG1 />,
        type: <LeaveSVG />,
        leaveType: 'W',
        borderColor: BLACK,
        textColor: WHITE,
        leaveTypeColor: '#4FB194',
        image: AssetsImages.MaskGroup3
    }, {
        id: 7,
        title: 'Arti',
        userImg: <MyTemSVG1 />,
        type: <LeaveSVG />,
        borderColor: BLACK,
        textColor: WHITE,
        leaveType: '!',
        leaveTypeColor: '#F49D7C',
        image: AssetsImages.MaskGroup4
    },



]
// create a component
const ProjectManagement = ({ navigation }) => {


    const ProjectItems = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => (navigation.navigate(NavString.PROJECT_MANAGEMENTS_DETAILS))}>
                <View backgroundColor={item.color} style={{
                    height: moderateScale(148.47), width: moderateScale(130),
                    borderRadius: moderateScale(12), marginRight: moderateScale(10)
                }}>
                    <Text style={{
                        fontSize: 18, fontWeight: '900', fontFamily: FontName.Gordita_Regular, color: WHITE,
                        marginTop: moderateScale(13.51), marginLeft: moderateScale(9.02),
                        marginRight: 5
                    }}>{item.title}</Text>
                    <View style={{
                        flexDirection: 'row', marginLeft: moderateScale(9.02),
                        marginTop: moderateScale(7.65),
                        alignItems: 'center'
                    }}>
                        <CalenderSVG />
                        <CustomText children={'Mon 29 Aug 2023'} style={{
                            fontSize: 8, fontFamily: FontName.Gordita_Regular, color: WHITE,
                            marginLeft: moderateScale(7.76)
                        }} />
                    </View>

                    <Image source={AssetsImages.DummyUsersPic} style={{
                        marginLeft: moderateScale(6.85),
                        marginTop: moderateScale(8.4), height: 30, width: 65, resizeMode: 'stretch'
                    }} />


                    <View style={{
                        flexDirection: 'row', marginHorizontal: moderateScale(9.02),
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>

                        <CustomText children={'Progress'} style={{
                            fontSize: 9, fontFamily: FontName.Gordita_Regular, color: WHITE,
                            fontWeight: '500'
                        }} />
                        <CustomText children={'45%'} style={{
                            fontSize: 10, fontFamily: FontName.Gordita_Regular, color: WHITE,
                            fontWeight: '500'

                        }} />
                    </View>
                    <ProgressBar progress={0.3} color={WHITE}
                        style={{
                            marginHorizontal: moderateScale(10.36),
                            marginTop: moderateScale(3.5)
                        }} />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>

            <View style={{
                alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between',
                paddingHorizontal: 15, paddingVertical: 8
            }}>
                <CustomText style={{ fontWeight: '700' }} children={'Project Management'} />
                <TouchableOpacity onPress={() => { }} style={{
                    paddingHorizontal: widthPercentageToDP(1.2), paddingVertical: widthPercentageToDP(1.2),
                    borderColor: '#EEEEEE', borderWidth: 1, borderRadius: 8, alignSelf: 'center'
                }}>
                    <Notification />
                </TouchableOpacity>
            </View>

            <View style={{
                height: moderateScale(1),
                backgroundColor: '#DEDEDE',
            }}>

            </View>
            <ScrollView>
                <CustomText style={{
                    fontWeight: '700',
                    fontSize: FontSize(16), color: BLACK,
                    marginTop: moderateScale(25),
                    marginBottom: moderateScale(10),
                    marginHorizontal: moderateScale(16.14)
                }}
                    children={'Projects'}></CustomText>
                <View style={{ marginHorizontal: moderateScale(16.14) }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={horizontalData}
                        renderItem={ProjectItems}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                <Text style={{
                    fontSize: FontSize(16), fontWeight: '700', fontFamily: FontName.Gordita_Regular, color: BLACK,
                    marginTop: moderateScale(35.23),
                    marginBottom: moderateScale(10),
                    marginHorizontal: moderateScale(16.14)
                }}>My Task:</Text>
                <View style={{ marginHorizontal: moderateScale(16.14) }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={verticalData}
                        numColumns={3}
                        renderItem={MyTaskItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <Text style={{
                    fontSize: FontSize(16), fontWeight: '700', fontFamily: FontName.Gordita_Regular, color: BLACK,
                    marginTop: moderateScale(35.23),
                    marginBottom: moderateScale(20),
                    marginHorizontal: moderateScale(16.14)
                }}>My Team Availability</Text>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: moderateScale(16.14)
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={myTeamAvilData}
                            horizontal
                            renderItem={myTeamAvailabliity}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <TouchableOpacity style={{
                            width: 15,
                            height: 24,
                            marginTop: moderateScale(25)
                        }}
                            onPress={() => (navigation.navigate(NavString.MY_TEAM_AVAILABILITY))}>
                            <NextSVG style={{

                            }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const myTeamAvailabliity = ({ item }) => {
    return (
        <View style={{
            flexDirection: 'row', alignItems: 'center', marginBottom: moderateScale(40)
        }}>
            {
                item.userImg === '' ?
                    <Text style={{
                        height: moderateScale(64.47), width: moderateScale(64.47),

                        fontFamily: FontName.Geo_Auto_Regular,
                        fontSize: 16,
                        fontWeight: '500',
                        paddingTop: moderateScale(10),
                    }}>Not in Office</Text>
                    :
                    <View style={{ alignItems: 'center', flex: 1, }}>
                        <Image source={item.image} style={{ top: 5, resizeMode: 'contain', height: 70, width: 70 }} />
                        <View style={{
                            backgroundColor: item.leaveTypeColor,
                            height: moderateScale(25), width: moderateScale(25),
                            position: 'absolute',
                            right: 5,
                            borderRadius: 12,
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: 2
                        }}>
                            <CustomText style={{ fontSize: FontSize(12), fontFamily: FontName.Gorditas_Bold, color: WHITE }}
                            >{item.leaveType}</CustomText>
                        </View>
                        <CustomText style={{
                            textAlign: 'center',
                            fontSize: FontSize(13), fontFamily: FontName.Gordita_Medium, color: "#868686",
                        }}>{item.name}</CustomText>
                    </View>
                // <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                //     {/* <MyTemSVG1 style={{ marginTop: moderateScale(10) }} /> */}
                //     {item.userImg}
                //     <LeaveSVG style={{
                //         position: 'absolute',
                //         right: 10
                //     }} />
                //     {/* {item.type} */}
                //     <Text style={{
                //         fontSize: 12, fontWeight: '300', fontFamily: FontName.Gordita_Regular, color: BLACK,
                //     }}>{item.title}</Text>
                // </View>
            }
        </View>
    );
}

const MyTaskItem = ({ item }) => {
    return (
        <View backgroundColor={item.color} style={{
            height: moderateScale(94.79), width: '32%',
            borderRadius: moderateScale(12), marginRight: moderateScale(6),
            marginTop: moderateScale(5),
        }}>
            <Text style={{
                fontSize: 12, fontWeight: '500',
                fontFamily: FontName.Gordita_Regular,
                color: BLACK,
                marginTop: moderateScale(9.61),
                marginHorizontal: moderateScale(5),
                width: moderateScale(80),
                height: moderateScale(30),

                marginLeft: moderateScale(9.61),

            }}>{item.title}</Text>
            <Text style={{
                fontSize: 32, fontWeight: '500', fontFamily: FontName.Gordita_Medium, color: BLACK,
                alignSelf: 'center',
                marginTop: moderateScale(0),
            }}>{item.id}</Text>
        </View>
    );
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

        // backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default ProjectManagement;


