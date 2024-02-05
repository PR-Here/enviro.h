//import liraries
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import NavString from '../../utils/NavString';
import { handleStackNavigation } from '../../utils/Constant';
import LottieView from 'lottie-react-native';
import SensitiveInfo from 'react-native-sensitive-info';
import useApiEffect from '../../hooks/useApiEffect';
import { REFRESH_TOKEN_API } from '../../services/ApiEndPoint';


// create a component
const InitialLoading = ({ navigation }) => {
    const { makeApiRequest, load } = useApiEffect()
    // const [state, setState] = useState('')
    let isFirstTimeLunch = useSelector(state => state?.auth?.isFirstStories);
    let fcmToken = useSelector(state => state?.fcm?.token);
    let isLogged = useSelector(state => state?.auth?.isLoggedIn);

    async function setSensitiveFlag() {
        try {
            await SensitiveInfo.setItem('disableScreenshots', 'true', {});
        } catch (error) {
            console.error('Error setting sensitive flag:', error);
        }
    }


    useEffect(() => {
        setSensitiveFlag()
        setTimeout(() => {
            if (isFirstTimeLunch) {
                handleStackNavigation(NavString.LOGIN, navigation);
            } else {
                handleStackNavigation(NavString.LUNCHINGSCREEN, navigation);
            }
        }, 3000);
        if (isLogged) {
            // Refresh Fcm token In backend api called
            async function REFRESH_TOKEN() {
                const apiData = await makeApiRequest({ url: REFRESH_TOKEN_API, method: 'POST', isToken: true, data: { fcm_token: fcmToken }, showProgress: false });
                console.log('REFRESH_TOKEN response------>', JSON.stringify(apiData))
            }
            REFRESH_TOKEN()
        }

    }, []);


    return (
        <View style={{ flex: 1 / 0.9 }}>
            <LottieView
                style={{ flex: 1 }}
                source={require('./splash.json')}
                autoPlay
                loop
                resizeMode="cover"
            />
        </View>

    );
};

export default InitialLoading;
