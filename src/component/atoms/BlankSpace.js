
import { View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


const BlankSpace=()=>{
    return(
        <View style={{paddingBottom:hp(10)}}></View>
    )
}

export default BlankSpace;