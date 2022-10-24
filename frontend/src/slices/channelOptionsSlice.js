import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddChannelModalActive: false,
  isRemoveChannelModalActive: false,
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
    showRemoveChannelModal: (state) => {
      state.isRemoveChannelModalActive = true;
    },
    closeRemoveChannelModal: (state) => {
      state.isRemoveChannelModalActive = false;
    },
  }
});

export const { showAddChannelModal, closeAddChannelModal, showRemoveChannelModal, closeRemoveChannelModal } = channelOptionsSlice.actions;
export default channelOptionsSlice.reducer;
