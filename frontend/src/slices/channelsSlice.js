import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    updateChannel: channelsAdapter.updateOne,
    remove: (state, action) => {
      channelsAdapter.removeOne(state, action.payload);
    },
  },
});

export default channelsSlice.reducer;
export const {
  addChannel, addChannels, updateChannel, remove,
} = channelsSlice.actions;
