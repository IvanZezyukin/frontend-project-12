import React, { useRef } from "react";
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import io from 'socket.io-client';
import { useEffect } from "react";
import { addMessage } from "../slices/messagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const socket = io.connect();

const MessageTextInput = () => {

  const messageTextInputControl = useRef(null);
  useEffect(() => {
    messageTextInputControl.current.focus();
  });

  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.currentChannel.currentChannelId);
  const { t } = useTranslation();
  const additionalData = {
    user: localStorage.username,
    channelId: currentChannelId,
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: values => {
      socket.emit('newMessage', Object.assign(additionalData, values));
      formik.resetForm();
    }
  });

  useEffect(() => {
    socket.on('newMessage', (data) => {
      dispatch(addMessage(data))
    });
  }, [socket]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="py-1 border rounded-2 d-flex">
        <Form.Control
          className="border-0 p-0 ps-2 form-control"
          name="message"
          aria-label={t('messageTextInput.ariaLabel')}
          placeholder={t('messageTextInput.placeholder')}
          onChange={formik.handleChange}
          value={formik.values.message}
          ref={messageTextInputControl}
        />
        <button type="submit" className="btn btn-group-vertical ms-1 h-100 border-0" variant="light">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z">
            </path>
          </svg>
        </button>
      </Form.Group>
    </Form>
  )
};

export default MessageTextInput;
