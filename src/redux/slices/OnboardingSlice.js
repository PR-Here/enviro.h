import { createSlice } from "@reduxjs/toolkit";

const OnboardingSlice = createSlice({
    name: 'onboarding',
    initialState: { announcement: [] },
    reducers: {
        saveAnnouncement: (state, action) => {
            state.announcement.push(action.payload)
        },
        getAnnouncement: (state) => {
            return state.announcement
        },
        removeAnnouncement: (state) => {
            state.announcement = []
        }
    }
})
export const { saveAnnouncement, getAnnouncement, removeAnnouncement } = OnboardingSlice.actions

export default OnboardingSlice.reducer