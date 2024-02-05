import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BottomSheet } from 'react-native-btr';
import { BLACK, EXTRA_LIGHT_GREY, LIGHTGREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors";
import { FontName, FontSize } from "../../theme/Fonts";
import CustomButton from "../atoms/CustomButton";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useEffect, useState } from 'react'
import FilterItem from "../listItems/FilterItem";
import CustomText from "../atoms/CustomText";
import { ScrollView } from "react-native-gesture-handler";
import useApiEffect from '../../hooks/useApiEffect';
import { MEETING_FILTER_LIST } from "../../services/ApiEndPoint";
import AppLoader from "../../utils/AppLoader";
import Cross from '../../../assets/images/SVG/cros.svg'

const FilterModal = ({ visible, onBackButtonPress, onBackdropPress, onApplyClick, locationName, list }) => {

    const [selectedLocation, setSelectedLocation] = useState(null)
    const [selectedOffice, setSelectedOffice] = useState(null)
    const [selectedFloor, setSelectedFloor] = useState(null)
    const [data, setData] = useState(null)
    const [buildingModels, setBuildingModels] = useState([])
    const [meetingroomfloors, setMeetingroomfloors] = useState([])

    const { makeApiRequest, loading } = useApiEffect()

    useEffect(() => {
        if (visible) {
            setSelectedLocation(null)
            setSelectedOffice(null)
            setSelectedFloor(null)
            setBuildingModels([])
            setMeetingroomfloors([])
            GET_LOCATIONS_API()
        }
    }, [visible]);



    async function GET_LOCATIONS_API() {
        const apiData = await makeApiRequest({ url: MEETING_FILTER_LIST, method: 'GET', isToken: true });
        if (apiData?.status == true) {
            setData(apiData?.data)

            const defaultLocationIndex = apiData?.data.findIndex(item => item?.location_name === locationName);

            if (defaultLocationIndex !== -1) {
                setSelectedLocation(defaultLocationIndex);
                setBuildingModels(apiData?.data[defaultLocationIndex]?.BuildingModels);
                setMeetingroomfloors([]);
            }
            if (list.length > 0) {
                apiData?.data?.map((item, index) => {
                    if (list.includes(item?.location_name)) {
                        setSelectedLocation(index)
                        setBuildingModels(item?.BuildingModels)
                        item?.BuildingModels?.map((building, buildingIndex) => {
                            if (list.includes(building?.building_name)) {
                                setSelectedOffice(buildingIndex)
                                setMeetingroomfloors(building?.Meetingroomfloors)
                                building?.Meetingroomfloors?.map((floor, floorIndex) => {
                                    if (list.includes(floor?.floor_name)) {
                                        setSelectedFloor(floorIndex)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        } else {
            console.log("API ERROR: ", apiData)
        }
    }

    const getSelectedData = () => {

        const selectedData = {};

        if (selectedLocation !== null) {
            const location = data[selectedLocation];
            selectedData.location_name = location?.location_name;
            selectedData.location_id = location?.location_id;
        }

        if (selectedOffice !== null) {
            const office = data[selectedLocation]
            const selectedOfficeData = office?.BuildingModels[selectedOffice];

            selectedData.building_name = selectedOfficeData?.building_name
            selectedData.building_id = selectedOfficeData?.building_id
        }

        if (selectedFloor !== null) {
            const office = data[selectedLocation]
            const floor = office?.BuildingModels[selectedOffice];
            const selectedFloorData = floor?.Meetingroomfloors[selectedFloor];

            selectedData.floor_name = selectedFloorData?.floor_name
            selectedData.floor_id = selectedFloorData?.floor_id
        }

        return selectedData;
    };

    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={onBackButtonPress}
            onBackdropPress={onBackdropPress}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Filters</Text>
                    <TouchableOpacity style={styles.close} onPress={onBackButtonPress}>
                        <Cross />
                    </TouchableOpacity>
                </View>
                <View style={styles.verticalMargin} />
                <ScrollView showsVerticalScrollIndicator={false}>

                    <CustomText children={'Location'} style={styles.headerText} />
                    <View style={styles.itemContainer}>
                        {data?.map((item, index) => (
                            <>
                                {item?.is_room_available === 1 &&
                                    <TouchableOpacity activeOpacity={0.7} style={{ margin: 8 }} key={index} onPress={() => {
                                        setSelectedLocation(index);
                                        setSelectedOffice(null)
                                        setBuildingModels(item?.BuildingModels);
                                        setMeetingroomfloors([])
                                    }}>
                                        <FilterItem
                                            text={item?.location_name}
                                            key={index}
                                            containerStyle={{
                                                backgroundColor: index == selectedLocation ? PRIMARY_COLOR : WHITE,
                                                borderColor: index == selectedLocation ? PRIMARY_COLOR : LIGHTGREY
                                            }}
                                            textStyle={{ color: index == selectedLocation ? WHITE : BLACK, marginHorizontal: 5 }}

                                        />
                                    </TouchableOpacity>
                                }
                            </>
                        ))}
                    </View>

                    {buildingModels.length > 0 ?
                        <>
                            <CustomText children={'Offices'} style={styles.headerText} />
                            <View style={styles.itemContainer}>
                                {buildingModels?.map((office, index) => (
                                    <TouchableOpacity activeOpacity={0.7} style={{ margin: 8 }} key={index} onPress={() => {
                                        setSelectedOffice(index);
                                        setSelectedFloor(null)
                                        setMeetingroomfloors(office.Meetingroomfloors)
                                    }}>
                                        <FilterItem
                                            text={office?.building_name}
                                            key={index}
                                            containerStyle={{
                                                backgroundColor: index == selectedOffice ? PRIMARY_COLOR : WHITE,
                                                borderColor: index == selectedOffice ? PRIMARY_COLOR : LIGHTGREY
                                            }}
                                            textStyle={{ color: index == selectedOffice ? WHITE : BLACK, marginHorizontal: 5 }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                        : null
                    }

                    {meetingroomfloors.length > 0 ?
                        <>

                            <CustomText children={'Floors'} style={styles.headerText} />
                            <View style={styles.itemContainer}>
                                {meetingroomfloors.map((floor, index) => (

                                    <TouchableOpacity key={index} activeOpacity={0.7} style={{ margin: 8 }} onPress={() => setSelectedFloor(index)}>
                                        <FilterItem
                                            text={floor?.floor_name}
                                            containerStyle={{
                                                backgroundColor: index == selectedFloor ? PRIMARY_COLOR : WHITE,
                                                borderColor: index == selectedFloor ? PRIMARY_COLOR : LIGHTGREY
                                            }}
                                            textStyle={{ color: index == selectedFloor ? WHITE : BLACK, marginHorizontal: 5 }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                        : null
                    }
                </ScrollView>
                <View style={styles.verticalMargin} />

                <View style={styles.verticalMargin} />
                <CustomButton title={'Apply'} style={styles.button}
                    onPress={() => {
                        const selectedData = getSelectedData()
                        onApplyClick(selectedData);
                    }}
                />
                <AppLoader isLoading={loading} />
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: '90%',
        height: 'auto',
        backgroundColor: WHITE,
        borderTopLeftRadius: 38,
        borderTopRightRadius: 38,

    },
    headerText: {
        margin: 8, fontFamily: FontName.Gordita_Regular, fontSize: 12, fontWeight: '500', color: '#8F8F8F'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: EXTRA_LIGHT_GREY,
        height: '15%',
        justifyContent: 'center'
    },
    title: {
        fontSize: FontSize(16),
        fontWeight: '500',
        fontFamily: FontName.Gordita_Regular,
        color: BLACK
    },
    close: {
        tintColor: BLACK,
        position: 'absolute',
        right: 20,
        width: heightPercentageToDP(2.8),
        height: heightPercentageToDP(2.8),
        alignItems: 'center',
        justifyContent: 'center'
    },
    verticalMargin: {
        height: '2%'
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
        marginTop: 0,
        alignSelf: 'center',
        marginBottom: 30,
        fontSize: 16
    },
    itemContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})

export default FilterModal