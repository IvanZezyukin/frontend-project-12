import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAddChannelModal, closeAddChannelModal } from "../slices/channelOptionsSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import io from 'socket.io-client';

const socket = io.connect();

const AddChannelModal = () => {

  const show = useSelector((state) => state.channelOptions.isAddChannelModalActive);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: values => {
      socket.emit('newChannel', values);
    },
  });

  return (
    <Modal show={show} onHide={() => dispatch(closeAddChannelModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!

      <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control 
          name="name" 
          aria-label="Новый канал" 
          placeholder="Введите название нового канала..." 
          onChange={formik.handleChange} 
          value={formik.values.name} 
        />
        <button type="submit" variant="light">
          Отправить
        </button>
      </Form.Group>
    </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(closeAddChannelModal())}>
          Close
        </Button>
        <Button variant="primary" onClick={() => dispatch(closeAddChannelModal())}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddChannelModal;
