import SocketApiContext from "./SocketApiContext";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { setCurrentChannelId, setCurrentChannelName } from "../slices/currentChannelSlice";
import {closeAddChannelModal, closeRenameChannelModal} from "../slices/channelOptionsSlice";
import { closeRemoveChannelModal } from "../slices/channelOptionsSlice";
import {remove, updateChannel} from "../slices/channelsSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const SocketApiContextProvider = ({socket, children}) => {

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    socket.on('newChannel', (data) => {
      dispatch(setCurrentChannelId(data.id));
      dispatch(setCurrentChannelName(data.name));
    });

    socket.on('removeChannel', (data) => {
      dispatch(setCurrentChannelId(1));
      dispatch(remove(data.id));
    });

    socket.on('renameChannel', (data) => {
      dispatch(setCurrentChannelName(data.name));
      dispatch(updateChannel({
        id: data.id,
        changes: { name: data.name },
      }));
    });
  }, [socket]);

  const addNewChannel = (values) => {
    socket.emit('newChannel', values, (response) => {
      if (response.status === 'ok') {
        dispatch(closeAddChannelModal());
        toast.success(t('addChannelModal.channelCreated'));
      }
    });
  };

  const removeChannel = (values) => {
    socket.emit('removeChannel', values, (response) => {
      if (response.status === 'ok') {
        dispatch(closeRemoveChannelModal());
        toast.success(t('removeChannelModal.channelRemovedToast'));
      }
    });
  };

  const renameChannel = (values) => {
    socket.emit('renameChannel', values, (response) => {
      if (response.status === 'ok') {
        dispatch(closeRenameChannelModal());
        toast.success(t('renameChannelModal.channelRenamedToast'));
      }
    });
  };

  return (
    <SocketApiContext.Provider value={{ addNewChannel, removeChannel, renameChannel }}>
      {children}
    </SocketApiContext.Provider>
  )
};

export default SocketApiContextProvider;
