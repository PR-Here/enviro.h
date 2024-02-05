import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Platform } from "react-native";

export const configureGoogleMeet = () => {
    let webId = Platform.OS == 'ios' ? { webClientId: '48257671350-4durnoajst6un3l2n9g5pebbjc3kaohq.apps.googleusercontent.com' } : {}
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events'],
        ...webId
    });
}

export const handleGoogleSignIn = async (onRefreshToken) => {
    try {
        configureGoogleMeet()
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        //console.log('userInfo=>', userInfo);
        GoogleSignin.getTokens().then((res) => {
            //console.log('res----------->', res);
            onRefreshToken(res?.accessToken)
        });
    } catch (error) {
        console.error(error.code);
    }
}

export const signOutGoogle = async () => {
    try {
        await GoogleSignin.signOut();
    } catch (error) {
        console.error(error);
    }
};