import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAddChannelModal } from "../slices/channelOptionsSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import SocketApiContext from "../context/SocketApiContext";
import * as Yup from 'yup';

const AddChannelModal = () => {

  const { addNewChannel } = useContext(SocketApiContext);

  const show = useSelector((state) => state.channelOptions.isAddChannelModalActive);
  const currentChannels = useSelector((state) => Object.values(state.channels.entities).map((item) => item.name));
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Введите имя канала').trim().notOneOf(currentChannels, 'Такой канал уже существует'),
    }),
    onSubmit: values => {
      addNewChannel(values);
      formik.resetForm();
    },
  });

  return (
    <Modal centered show={show} onHide={() => { dispatch(closeAddChannelModal()); formik.resetForm(); }}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control 
              name="name" 
              aria-label="Новый канал" 
              placeholder="Введите название нового канала..." 
              onChange={formik.handleChange}
              value={formik.values.name} 
              isInvalid={!!formik.errors.name}
              className='mb-2'
              autoFocus={true}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={() => { dispatch(closeAddChannelModal()); formik.resetForm(); }}>
              Отменить
            </Button>
            <Button type="submit" variant="primary">
              Отправить
            </Button>
          </div>
        </Form>

      </Modal.Body>
    </Modal>
  )
};

export default AddChannelModal;
