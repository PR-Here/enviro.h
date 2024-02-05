const { BottomSheet, CheckBox } = require("react-native-btr")
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CloseIcon from '../../../assets/images/SVG/close_icon.svg';
import DepartmentFiltersList from "../../screen/profileModule/searchUserProfile/filters/DepartmentFiltersList";
import { BLACK, BORDER_COLOR, LIGHT_SHADE_GREY, WHITE } from "../../theme/Colors";
import { FontName, FontSize } from "../../theme/Fonts";
import CustomText from "../atoms/CustomText";




const SearchUserModal = ({ visible, onBackButtonPress, onBackdropPress, data, filterTextString, onPress, type = '' }) => {
    // console.log('data =>' + data)
    //  console.log(filterTextString)
    return (

        <BottomSheet
            visible={visible}
            onBackButtonPress={onBackButtonPress}
            onBackdropPress={onBackdropPress}>

            <View style={styles.container}>

                <View style={[styles.innerTopContainer]}>
                    <CustomText children={type} style={[styles.titleTextStyle]} />
                    <TouchableOpacity onPress={onBackdropPress} style={styles.closeView}>
                        <CloseIcon />
                    </TouchableOpacity>
                </View>

                <View style={styles.lineStyle} />



                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: wp(4), alignSelf: 'center', paddingHorizontal: wp(2), marginBottom: wp(5) }}>

                        <DepartmentFiltersList data={data}
                            getIndex={onPress}
                            filterTextString={filterTextString}
                            type={type}
                        />

                    </View>
                </ScrollView>

                {/* <View style={{ marginTop: 15, paddingStart: 20, flexDirection: 'row', marginBottom: 20 }}>
                    <CheckBox color={GREY_LIGHT} />
                    <Text style={styles.checkboxText}>Set As Default</Text>
                </View> */}
            </View>
        </BottomSheet>
    )




}



const styles = StyleSheet.create({

    container: {
        height: 'auto',
        maxHeight: '70%',
        width: '100%',
        backgroundColor: LIGHT_SHADE_GREY,
        borderTopLeftRadius: wp(8),
        borderTopRightRadius: wp(8)
    },

    innerTopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: wp(4)
    },

    innerMiddleContainer: {
        justifyContent: 'center',
        backgroundColor: 'red',
    },

    titleTextStyle: {
        fontSize: FontSize(16),
        fontFamily: FontName.Gordita_Medium,
        color: BLACK,
        alignSelf: 'center'
    },
    closeView: {
        right: wp(4),
        position: 'absolute',
    },
    closeIcon: {
        padding: wp(1),
        tintColor: BLACK,
    },
    lineStyle: {
        width: '100%',
        height: wp(0.3),
        marginTop: wp(4),
        backgroundColor: '#E9E9E9'

    },
    listItemText: {
        fontSize: FontSize(14),
        fontFamily: FontName.Geo_Auto_Regular,
        fontWeight: 400,
        color: '#00000085',
        fontWeight: 'normal'

    },
    listItemContainer: {
        paddingHorizontal: wp(3),
        paddingVertical: wp(1),
        backgroundColor: WHITE,
        justifyContent: 'center',
        borderColor: BORDER_COLOR,
        borderWidth: wp(0.2),
        borderRadius: wp(2),
        marginVertical: wp(1),
        marginHorizontal: wp(2)
    }



})


export default SearchUserModal;