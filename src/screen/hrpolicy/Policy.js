import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Header from '../../component/header/Header';
import useApiEffect from '../../hooks/useApiEffect';
import { POLICY } from '../../services/ApiEndPoint';
import { BLACK, PAGE_BACKGROUND, WHITE } from '../../theme/Colors';
import { FontName } from '../../theme/Fonts';
import AppLoader from '../../utils/AppLoader';
import AppString from '../../utils/AppString';
import { useNavigation } from '@react-navigation/native';
import NavString from '../../utils/NavString';

const Policy = () => {
    const { makeApiRequest, loading } = useApiEffect()
    const [data, setData] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        HR_POLICY_API()
    }, [])

    async function HR_POLICY_API() {

        const apiData = await makeApiRequest({ url: POLICY, method: 'GET', isToken: true });
        if (apiData?.status == true) {
            setData(apiData?.data)
        } else {
            console.log("API ERROR: ", apiData)
        }
    }



    return (
        <View style={{ flex: 1, backgroundColor: PAGE_BACKGROUND }}>
            <Header title={AppString.POLICY} />
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(NavString.HR_POLICY, { data: item })}
                        style={{ padding: heightPercentageToDP(1.5), backgroundColor: WHITE, borderWidth: 1, borderColor: '#E1E1E1', marginHorizontal: heightPercentageToDP(2), marginTop: 10, borderRadius: 5 }}>
                        <Text style={{ color: BLACK, alignSelf: "center", fontFamily: FontName.Gordita_Regular, fontSize: 14, fontWeight: '500' }}>{item?.title} </Text>
                    </TouchableOpacity>
                }

            />
            <AppLoader isLoading={loading} />
        </View>
    )
}

export default Policy