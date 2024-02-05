import { Platform, TouchableOpacity } from "react-native";
import FilterItem from "../../../component/listItems/FilterItem";
import { useEffect, useState } from "react";
import { BLACK, BUTTON_BACKGROUND, LIGHTGREY, WHITE } from "../../../theme/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const LeaveTypeFiltersList = ({ getIndex, selectedTypeId, data }) => {

    const [listIndex, setListIndex] = useState(-1)

    useEffect(() => {

        data?.map((el, index) => {
            if (el?.id == selectedTypeId) {
                setListIndex(index)
            }
        })

    }, [])

    return (
        <>
            {
                data?.map((el, index) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            getIndex({ id: el?.id, name: el?.name, deducted_leave: el?.deducted_leave })
                            setListIndex(index)
                        }} style={{ margin: wp(2), marginLeft: 0, marginBottom: 0 }}>
                            <FilterItem
                                text={el?.name}
                                key={index}
                                containerStyle={{
                                    height: wp(10),
                                    width: wp(30),
                                    backgroundColor: index == listIndex ? BUTTON_BACKGROUND : WHITE,
                                    borderColor: index == listIndex ? BUTTON_BACKGROUND : LIGHTGREY, padding: Platform.OS == 'ios' ? 8 : 2
                                }}
                                textStyle={{ color: index == listIndex ? WHITE : BLACK }}
                                fromTime={el?.from_time}
                                toTime={el?.to_time}
                            />
                        </TouchableOpacity >
                    )
                })
            }
        </>
    )
}

export default LeaveTypeFiltersList