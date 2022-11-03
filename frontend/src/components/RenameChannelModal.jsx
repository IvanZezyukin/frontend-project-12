import React, { useContext, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showRenameChannelModal, closeRenameChannelModal } from "../slices/channelOptionsSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import SocketApiContext from "../context/SocketApiContext";
import * as Yup from "yup";

const renameChannelModal = () => {

  const currentChannelId = useSelector((state) => state.currentChannel.currentChannelId);
  const currentChannelName = useSelector((state) => state.currentChannel.currentChannelName);
  const currentChannels = useSelector((state) => Object.values(state.channels.entities).map((item) => item.name));
  const dispatch = useDispatch();
  const { renameChannel } = useContext(SocketApiContext);

  const renameInput = useRef(null);
  useEffect(() => {
    renameInput.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      name: currentChannelName,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Введите имя канала').trim().notOneOf(currentChannels, 'Такой канал уже существует'),
    }),
    onSubmit: values => {
      const extendedValues = { id: currentChannelId, name: values.name };
      renameChannel(extendedValues);
      formik.resetForm();
    },
  });

  return (
    <Modal centered show onHide={() => { dispatch(closeRenameChannelModal()); formik.resetForm(); }}>
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
              isInvalid={!!formik.errors.name}
              ref={renameInput}
             />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
         <div className="d-flex justify-content-end">
           <Stack direction="horizontal" gap={3}>
             <Button variant="secondary" onClick={() => { dispatch(closeRenameChannelModal()); formik.resetForm(); }}>
               Отменить
             </Button>
             <Button type="submit" variant="primary">
                Отправить
             </Button>
           </Stack>
          </div>
        </Form>

      </Modal.Body>
    </Modal>
  )
};

export default renameChannelModal;
