import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChannelId: '1',
}

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    }
  }
});

export const { setCurrentChannelId } = currentChannelSlice.actions;
export default currentChannelSlice.reducer;
