import { combineReducers } from "@reduxjs/toolkit";
import FcmReducer from "../slices/FcmSlice";
import authReducer from "../slices/AuthSlice";
import tabBarReducer from "../slices/TabBarSlice";
import TokenReducer from "../slices/TokenSlice";
import OnboardingReducer from "../slices/OnboardingSlice";
import eventReducer from "../slices/EventSlice"
import googleMeetReducer from "../slices/GoogleMeetSlice"
import NotificationReducer from "../slices/NotificationSlice";
import PunchInSelectedTabReducer from '../slices/PunchInTabSlice'

export const rootReducer = combineReducers({
    fcm: FcmReducer,
    auth: authReducer,
    tabBar: tabBarReducer,
    authToken: TokenReducer,
    onboarding: OnboardingReducer,
    event: eventReducer,
    googleMeet: googleMeetReducer,
    receivePushNotification: NotificationReducer,
    punchInTab: PunchInSelectedTabReducer
});