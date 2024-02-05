// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const PunchInTabSlice = createSlice({
    name: 'punchInTabSlice',
    initialState: {
        selectedTab: null
    },
    reducers: {
        setSelectedTabId: (state, action) => {
            state.selectedTab = action.payload
        },
    },
},
);

export const { setSelectedTabId, } = PunchInTabSlice.actions;

export default PunchInTabSlice.reducer;
