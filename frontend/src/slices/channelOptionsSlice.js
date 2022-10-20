import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddChannelModalActive: false,
};

const channelOptionsSlice = createSlice({
  name: 'channelOptions',
  initialState,
  reducers: {
    showAddChannelModal: (state) => {
      state.isAddChannelModalActive = true;
    },
    closeAddChannelModal: (state) => {
      state.isAddChannelModalActive = false;
    },
  }
});

export const { showAddChannelModal, closeAddChannelModal } = channelOptionsSlice.actions;
export default channelOptionsSlice.reducer;
