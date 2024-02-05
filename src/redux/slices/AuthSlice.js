// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loginUser: null,
        profileData: null,
        isLoggedIn: false,
        userHobbies: null,
        userSkill: null,
        clickOnIsEditProfile: false,
        profileImage: "",
        isFirstStories: false,
        appLogo: "",
        localSavedSkill: null,
        localSavedHobbies: null
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.loginUser = action.payload;
            state.isLoggedIn = true;
        },
        userProfileData: (state, action) => {
            state.profileData = action.payload;
        },
        clickOnIsEditProfile: (state, action) => {
            state.clickOnIsEditProfile = action.payload
        },
        userSelectedHobbies: (state, action) => {
            state.userHobbies = action.payload;
        },
        userSelectedSkill: (state, action) => {
            state.userSkill = action.payload
        },
        logoutSuccess: (state) => {
            state.loginUser = null
            state.profileData = null;
            state.appLogo = null;
            state.isLoggedIn = false;
        },
        updateProfileImage: (state, action) => {
            state.profileImage = action.payload;
        },
        isFirstStoriesIntro: (state, action) => {
            state.isFirstStories = true;
        },
        appLogoImage: (state, action) => {
            state.appLogo = action.payload;
        },
        setLocalUserSkill: (state, action) => {
            state.localSavedSkill = action.payload
        },
        setLocalUserHobbies: (state, action) => {
            state.localSavedHobbies = action.payload
        }
    },
},
);

export const { loginSuccess, userProfileData, clickOnIsEditProfile, userSelectedHobbies,
    userSelectedSkill, logoutSuccess, updateProfileImage, isFirstStoriesIntro, appLogoImage, setLocalUserSkill, setLocalUserHobbies } = authSlice.actions;
export default authSlice.reducer;
