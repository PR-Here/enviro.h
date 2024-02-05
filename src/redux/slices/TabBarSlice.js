import { createSlice } from '@reduxjs/toolkit';

const tabBarSlice = createSlice({
  name: 'tabBar',
  initialState: {
    hideTabBar: false,
  },
  reducers: {
    onTabBarSroll: (state, action) => {
      state.hideTabBar = action.payload;
    },

  },
});

export const { onTabBarSroll } = tabBarSlice.actions;
export default tabBarSlice.reducer;
