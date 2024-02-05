import { FlatList, TouchableOpacity } from "react-native";
import FilterItem from "../../component/listItems/FilterItem";
import { useState } from "react";
import { BLACK, GREY, LIGHTGREY, PRIMARY_COLOR, WHITE } from "../../theme/Colors";

const FiltersList = (props) => {

    const [listIndex, setListIndex] = useState(0)

    return (
        <>
            {
                props.data.map((el, index) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            // props?.getIndex(index)
                            setListIndex(index)
                        }} style={{ margin: 10, marginLeft: 0, marginBottom: 0 }}>
                            <FilterItem
                                text={el}
                                key={index}
                                containerStyle={{
                                    backgroundColor: index == listIndex ? PRIMARY_COLOR : WHITE,
                                    borderColor: index == listIndex ? PRIMARY_COLOR : LIGHTGREY
                                }}
                                textStyle={{ color: index == listIndex ? WHITE : BLACK }}
                            />
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}

export default FiltersList