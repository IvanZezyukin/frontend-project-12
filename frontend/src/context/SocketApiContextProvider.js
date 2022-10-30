import SocketApiContext from "./SocketApiContext";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentChannelId, setCurrentChannelName } from "../slices/currentChannelSlice";
import { closeAddChannelModal } from "../slices/channelOptionsSlice";

const SocketApiContextProvider = ({socket, children}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newChannel', (data) => {
      console.log(data.id);
      dispatch(setCurrentChannelId(data.id));
      dispatch(setCurrentChannelName(data.name));
    });
  }, [socket]);

  const addNewChannel = (values) => {
    socket.emit('newChannel', values, (response) => {
      if (response.status === 'ok') {
        dispatch(closeAddChannelModal());
      }
    });
  }

  return (
    <SocketApiContext.Provider value={{ addNewChannel }}>
      {children}
    </SocketApiContext.Provider>
  )
};

export default SocketApiContextProvider;
