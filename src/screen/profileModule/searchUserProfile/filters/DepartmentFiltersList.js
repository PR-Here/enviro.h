import { TouchableOpacity } from "react-native";
import FilterItem from "../../../../component/listItems/FilterItem";
import { BLACK, LIGHTGREY, PRIMARY_COLOR, WHITE } from "../../../../theme/Colors";
import CustomText from "../../../../component/atoms/CustomText";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { capitalizeFirstLetter } from "../../../../utils/Constant";

const DepartmentFiltersList = (props) => {

    //const [listIndex, setListIndex] = useState(-1)

    return (
        <>
            {props?.data?.length > 0 ?


                props.data.map((el, index) => {
                    let exist = props.filterTextString.includes(capitalizeFirstLetter(el?.name))

                    return (
                        <TouchableOpacity onPress={() => {
                            props.getIndex(el?.id, el?.name)
                            //setListIndex(index)
                        }} style={{ margin: wp(2), marginLeft: 0, marginBottom: 0 }}>
                            <FilterItem
                                text={el?.name}
                                key={index}
                                containerStyle={{
                                    backgroundColor: exist ? PRIMARY_COLOR : WHITE,
                                    borderColor: exist ? PRIMARY_COLOR : LIGHTGREY,
                                    paddingHorizontal: 5
                                }}
                                textStyle={{ color: exist ? WHITE : BLACK }}
                            />
                        </TouchableOpacity >
                    )
                })

                : props.type == 'Designation' ? <CustomText children={'Please select department'} /> : <CustomText children={'No Data Found'} />
            }
        </>
    )
}

export default DepartmentFiltersList