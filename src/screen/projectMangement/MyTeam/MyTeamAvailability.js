//import liraries
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import LeaveSVG from '../../../../assets/images/SVG/leaveSVG.svg';
import MyTemSVG1 from '../../../../assets/images/SVG/myTemSVG1.svg';
import MeetingHomeHeader from '../../../component/header/MeetingHeader';
import { BLACK, WHITE } from '../../../theme/Colors';
import { FontName, FontSize } from '../../../theme/Fonts';
import CustomText from '../../../component/atoms/CustomText';
import AssetsImages from '../../../utils/AssetsImages';


export const myTeamAvilData = [
    {
        id: 4,
        name: 'Manav',
        member: 'Casual Leave',
        applied: '2nd March',
        userImg: <MyTemSVG1 />,
        type: <LeaveSVG />,
        approved: 'You',
        color: '#0BA476',
        leaveType: 'L',
        leaveTypeColor: '#0BA476',
        image: AssetsImages.MaskGroup1

    },
    {
        id: 2,
        name: 'Nikhil',
        member: 'Sick Leave',
        applied: 'Today',
        userImg: <MyTemSVG1 />,
        type: <LeaveSVG />,
        approved: 'Arti',
        color: '#0BA476',
        leaveType: 'L',
        leaveTypeColor: '#0BA476',
        image: AssetsImages.MaskGroup2
    },
    {
        id: 5,
        name: 'Pooja',
        member: 'Work from Home',
        applied: 'Work from Home',
        userImg: <MyTemSVG1 />,
        type: <LeaveSVG />,
        approved: 'You',
        color: '#272727',
        leaveType: 'W',
        leaveTypeColor: '#4FB194',
        image: AssetsImages.MaskGroup3
    },
    {
        name: 'Arti',
        id: 1,
        member: 'No Punch in',
        applied: '18th March',
        userImg: <MyTemSVG1 />,
        type: <LeaveSVG />,
        approved: '',
        color: '#272727',
        leaveType: '!',
        leaveTypeColor: '#F49D7C',
        image: AssetsImages.MaskGroup4
    }, {
        name: 'Dan',
        id: 7,
        member: 'Work from Home',
        applied: 'Work from Home',
        userImg: <MyTemSVG1 />,
        type: <LeaveSVG />,
        approved: 'You',
        color: '#272727',
        leaveType: 'W',
        leaveTypeColor: '#4FB194',
        image: AssetsImages.MaskGroup2
    }, {
        name: 'Dan',
        id: 7,
        member: 'Work from Home',
        applied: 'Work from Home',
        userImg: <MyTemSVG1 />,
        type: <LeaveSVG />,
        approved: 'You',
        color: '#272727',
        leaveType: 'W',
        leaveTypeColor: '#4FB194',
        image: AssetsImages.MaskGroup1
    }, {
        name: 'Dan',
        id: 7,
        member: 'Work from Home',
        applied: 'Work from Home',
        userImg: <MyTemSVG1 />,
        type: <LeaveSVG />,
        approved: 'You',
        color: '#272727',
        leaveType: 'W',
        leaveTypeColor: '#4FB194',
        image: AssetsImages.MaskGroup4
    }, {
        name: 'Dan',
        id: 7,
        member: 'Work from Home',
        applied: 'Work from Home',
        userImg: <MyTemSVG1 />,
        type: <LeaveSVG />,
        approved: 'You',
        color: '#272727',
        leaveType: 'W',
        leaveTypeColor: '#4FB194',
        image: AssetsImages.MaskGroup3
    },



]
// create a component
const MyTeamAvailability = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <MeetingHomeHeader headerText={'My team’s availability'} icon={'notification'} />
            <View style={{
                height: moderateScale(1),
                backgroundColor: '#DEDEDE',
            }}>
            </View>
            <View style={{
                marginHorizontal: moderateScale(19.8),
                marginTop: moderateScale(12.44)
            }}>
                <View >
                    <View style={{
                        borderTopLeftRadius: 10, borderTopRightRadius: 10, borderColor: '#D9D9D9',
                        borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1,
                        flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
                        borderBottomWidth: 1, borderColor: '#D9D9D9'
                    }}>
                        <View style={{
                            borderRightWidth: 1, borderRightColor: '#D9D9D9',
                            justifyContent: 'center',
                            width: '25%',
                            height: 40,
                            alignItems: 'center'
                        }}>
                            <CustomText style={styles.textStyle}>Team Members</CustomText>
                        </View>
                        <View style={{
                            borderRightWidth: 1, borderRightColor: '#D9D9D9',
                            height: 40, width: '25%', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <CustomText style={styles.textStyle}>Status</CustomText>
                        </View>
                        <View style={{
                            borderRightWidth: 1, borderRightColor: '#D9D9D9', paddingRight: moderateScale(13),
                            height: 40, width: '25%', justifyContent: 'center', paddingLeft: 15
                        }}>
                            <CustomText style={styles.textStyle}>Applied</CustomText>
                        </View>
                        <View style={{
                            width: '25%', height: 40, borderColor: '#D9D9D9', flex: 1, alignSelf: 'center',
                            paddingLeft: 5, justifyContent: 'center',
                        }}>
                            <CustomText style={styles.textStyle} >Approved by</CustomText>
                        </View>
                    </View>
                    <FlatList
                        style={{
                            marginBottom: '12%',
                            borderColor: '#D9D9D9',
                            borderLeftWidth: 1, borderRightWidth: 1,
                            borderBottomWidth: 1,
                            borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                        }}
                        showsVerticalScrollIndicator={false}
                        data={myTeamAvilData}
                        vertical
                        renderItem={teamAvailCompo}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>

        </View>
    );
};

const teamAvailCompo = ({ item, index }) => {
    return (
        <View style={{ flexDirection: 'row', borderBottomWidth: index == myTeamAvilData.length - 1 ? 0 : 1, borderColor: '#D9D9D9' }}>
            <View style={{
                borderRightWidth: 1,
                borderRightColor: '#D9D9D9',
                width: '25%',
                padding: 10
            }}
            >
                <View style={{ alignItems: 'center', flex: 1, }}>
                    {/* <MyTemSVG1 style={{ top: 5 }} /> */}
                    <Image source={item.image} style={{ top: 5, resizeMode: 'contain', height: 70, width: 70 }} />
                    
                    <View style={{
                        backgroundColor: item.leaveTypeColor,
                        height: moderateScale(25), width: moderateScale(25),
                        position: 'absolute',
                        right: 5,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: -4
                    }}>
                        <CustomText style={{ fontSize: FontSize(12), fontFamily: FontName.Gorditas_Bold, color: WHITE }}
                        >{item.leaveType}</CustomText>
                    </View>
                    <CustomText style={{
                        textAlign: 'center',
                        fontSize: FontSize(13), fontFamily: FontName.Gordita_Medium, color: "#868686",
                    }}>{item.name}</CustomText>
                </View>
            </View>

            <View style={{
                borderRightWidth: 1, borderRightColor: '#D9D9D9',
                width: '25%',
                paddingHorizontal: 3,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <CustomText style={{
                    textAlign: 'center',
                    fontSize: FontSize(13), fontFamily: FontName.Gordita_Regular, color: item.color,
                }}>
                    {item.member}
                </CustomText>
            </View>

            <View style={{
                borderRightWidth: 1, borderRightColor: '#D9D9D9',
                paddingHorizontal: 3,
                width: '25%', justifyContent: 'center',
                alignItems: 'center',
            }}>
                <CustomText style={{
                    textAlign: 'center',
                    fontSize: FontSize(13), fontFamily: FontName.Gordita_Regular, color: BLACK,
                }}>
                    {item.applied}
                </CustomText>
            </View>

            <View style={{
                borderRightColor: '#D9D9D9',
                paddingHorizontal: 3,
                width: '25%', justifyContent: 'center',
                alignItems: 'center',
            }}>
                <CustomText style={{
                    textAlign: 'center',
                    fontSize: FontSize(13), fontFamily: FontName.Gordita_Regular, color: BLACK,
                }}>
                    {item.approved}
                </CustomText>
            </View>
        </View>
    );
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: '30%'
        // backgroundColor: '#2c3e50',
    },
    textStyle: { textAlign: 'center', fontSize: FontSize(11), color: '#B0B0B0' }
});

//make this component available to the app
export default MyTeamAvailability;


