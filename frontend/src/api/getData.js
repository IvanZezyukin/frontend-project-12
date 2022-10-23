import axios from 'axios';
import { useSelector, useDispatch, batch } from 'react-redux';
import { addChannel, addChannels, removeChannel, updateChannel } from "../slices/channelsSlice";
import { setCurrentChannelId, setCurrentChannelName } from "../slices/currentChannelSlice";
import { addMessage, addMessages, removeMessage, updateMessage } from "../slices/messagesSlice";
import React from 'react';



const getData = () => {

  const dispatch = useDispatch();

  axios({
    method: 'get',
    url: '/api/v1/data',
    headers: {Authorization : `Bearer ${localStorage.token}`},
  })
    .then((res) => {
      batch(() => {
        console.log(res.data);
        const currentChannelName = res.data.channels.filter((channel) => channel.id === res.data.currentChannelId).map((channel) => channel.name)[0];
        dispatch(addChannels(res.data.channels));
        dispatch(setCurrentChannelId(res.data.currentChannelId));
        dispatch(setCurrentChannelName(currentChannelName));
        dispatch(addMessages(res.data.messages));
      })
      //console.log(res.data);
      
    })
};

export default getData;
