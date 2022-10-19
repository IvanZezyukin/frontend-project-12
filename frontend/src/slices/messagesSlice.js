import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessage: messagesAdapter.removeOne,
    updateMessage: messagesAdapter.updateOne,
  }
});

export const { addMessage, addMessages, removeMessage, updateMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
