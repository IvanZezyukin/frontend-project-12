/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: 1,
  currentChannelName: '',
};

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    setCurrentChannelName: (state, action) => {
      state.currentChannelName = action.payload;
    },
  },
});

export const { setCurrentChannelId, setCurrentChannelName } = currentChannelSlice.actions;
export default currentChannelSlice.reducer;
