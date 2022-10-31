import SocketApiContext from "./SocketApiContext";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentChannelId, setCurrentChannelName } from "../slices/currentChannelSlice";
import { closeAddChannelModal } from "../slices/channelOptionsSlice";
import { closeRemoveChannelModal } from "../slices/channelOptionsSlice";
import { remove } from "../slices/channelsSlice";

const SocketApiContextProvider = ({socket, children}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newChannel', (data) => {
      dispatch(setCurrentChannelId(data.id));
      dispatch(setCurrentChannelName(data.name));
    });

    socket.on('removeChannel', (data) => {
      dispatch(setCurrentChannelId(1));
      dispatch(remove(data.id));
    });
  }, [socket]);

  const addNewChannel = (values) => {
    socket.emit('newChannel', values, (response) => {
      if (response.status === 'ok') {
        dispatch(closeAddChannelModal());
      }
    });
  };

  const removeChannel = (values) => {
    socket.emit('removeChannel', values, (response) => {
      if (response.status === 'ok') {
        dispatch(closeRemoveChannelModal());
      }
    });
  };

  return (
    <SocketApiContext.Provider value={{ addNewChannel, removeChannel }}>
      {children}
    </SocketApiContext.Provider>
  )
};

export default SocketApiContextProvider;
