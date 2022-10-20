import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice.js';
import channelsReducer from './channelsSlice'
import currentChannelReducer from "./currentChannelSlice.js";
import messagesReducer from "./messagesSlice.js";
import channelOptionsReducer from "./channelOptionsSlice.js";

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    currentChannel: currentChannelReducer,
    messages: messagesReducer,
    channelOptions: channelOptionsReducer,
  }
});
