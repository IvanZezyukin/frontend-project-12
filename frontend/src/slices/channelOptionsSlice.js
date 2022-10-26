import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddChannelModalActive: false,
  isRemoveChannelModalActive: false,
  isRenameChannelModalActive: false,
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
    showRenameChannelModal: (state) => {
      state.isRenameChannelModalActive = true;
    },
    closeRenameChannelModal: (state) => {
      state.isRenameChannelModalActive = false;
    },
  }
});

export const { showAddChannelModal, closeAddChannelModal, showRemoveChannelModal, closeRemoveChannelModal, showRenameChannelModal, closeRenameChannelModal } = channelOptionsSlice.actions;
export default channelOptionsSlice.reducer;
