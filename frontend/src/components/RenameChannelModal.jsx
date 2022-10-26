import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showRenameChannelModal, closeRenameChannelModal } from "../slices/channelOptionsSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import io from 'socket.io-client';
import { useEffect } from "react";
import { setCurrentChannelId, setCurrentChannelName } from "../slices/currentChannelSlice";
import { updateChannel } from "../slices/channelsSlice";
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';

const socket = io.connect();

const renameChannelModal = () => {

  const show = useSelector((state) => state.channelOptions.isRenameChannelModalActive);
  const currentChannelId = useSelector((state) => state.currentChannel.currentChannelId);
  const currentChannelName = useSelector((state) => state.currentChannel.currentChannelName);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: currentChannelName,
    },
    onSubmit: values => {
      socket.emit('renameChannel', { id: currentChannelId, name: values.name }, (response) => {
        if (response.status === 'ok') {
          dispatch(closeRenameChannelModal());
        }
      });
    },
  });

  useEffect(() => {
    socket.on('renameChannel', (data) => {
      dispatch(setCurrentChannelName(data.name));
      dispatch(updateChannel({
        id: data.id,
        changes: { name: data.name },
      }));
    });
  }, [socket]);

  return (
    <Modal show={show} onHide={() => dispatch(closeRenameChannelModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control 
          name="name" 
          aria-label="Новое название канала" 
          placeholder="Введите новое название канала..." 
          onChange={formik.handleChange} 
          value={formik.values.name} 
        />
      </Form.Group>
      <div className="d-flex justify-content-end">
      <Stack direction="horizontal" gap={3}>
        <Button variant="secondary" onClick={() => dispatch(closeRenameChannelModal())}>
          Отменить
        </Button>
        <Button type="submit" variant="primary">
          Переименовать
        </Button>
        </Stack>
        </div>
    </Form>

      </Modal.Body>
    </Modal>
  )
};

export default renameChannelModal;
