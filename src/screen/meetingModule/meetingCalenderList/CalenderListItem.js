import moment from 'moment';
import React from 'react';
import { TouchableOpacity, View } from "react-native";
import CustomText from '../../../component/atoms/CustomText';
import { PRIMARY_COLOR, TEXT_COLOR_ORANGE, WHITE } from "../../../theme/Colors";
import { FontName, FontSize } from "../../../theme/Fonts";
import { convertTimeToUTC } from '../../../utils/Constant';

const CalenderListItem = ({ data, onPress }) => {
    //console.log('data--------------->', data);
    return (
        <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
            <View style={{ flex: 1, backgroundColor: PRIMARY_COLOR, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5 }}>
                <CustomText style={{ color: WHITE, fontSize: FontSize(13) }} children={moment(data?.date).format('D ddd')} />
            </View>
            <View style={{ marginTop: 10 }}>
                {data?.data?.map((item) => {
                    return (
                        <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(item)}>
                            <View style={{ flex: 1, borderColor: TEXT_COLOR_ORANGE, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, marginBottom: 10 }}>
                                <CustomText style={{ color: TEXT_COLOR_ORANGE, fontSize: FontSize(13), fontFamily: FontName.Gordita_Regular }} children={item.meeting_title} />
                                <CustomText style={{ color: TEXT_COLOR_ORANGE, fontSize: FontSize(13), fontFamily: FontName.Gordita_Regular }} children={`${item?.all_day ? moment(item?.bookedfrom.replace(".000Z", "")).format('hh:mm A') : convertTimeToUTC(moment(item?.bookedfrom.replace(".000Z", "")).format('hh:mm:ss'))} - ${item?.all_day ? moment(item?.bookedto.replace(".000Z", "")).format('hh:mm A') : convertTimeToUTC(moment(item?.bookedto.replace(".000Z", "")).format('hh:mm'))}`} />
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 10, height: 10, backgroundColor: PRIMARY_COLOR, borderRadius: 100 }} />
                <View style={{ height: 1, backgroundColor: PRIMARY_COLOR, flex: 1 }} />
            </View>
        </View>
    )

}


export default CalenderListItem