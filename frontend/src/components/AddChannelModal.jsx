import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAddChannelModal } from "../slices/channelOptionsSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import SocketApiContext from "../context/SocketApiContext";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const AddChannelModal = () => {

  const { addNewChannel } = useContext(SocketApiContext);

  const show = useSelector((state) => state.channelOptions.isAddChannelModalActive);
  const currentChannels = useSelector((state) => Object.values(state.channels.entities).map((item) => item.name));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('addChannelModal.validation.required')).trim().notOneOf(currentChannels, t('addChannelModal.validation.notOneOf')),
    }),
    onSubmit: values => {
      addNewChannel(values);
      formik.resetForm();
    },
  });

  return (
    <Modal centered show={show} onHide={() => { dispatch(closeAddChannelModal()); formik.resetForm(); }}>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannelModal.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name" className="visually-hidden">{t('addChannelModal.label')}</Form.Label>
              <Form.Control
                name="name"
                // aria-label="Новый канал"
                // placeholder="Введите название нового канала..."
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
              {t('addChannelModal.cansel')}
            </Button>
            <Button type="submit" variant="primary">
              {t('addChannelModal.send')}
            </Button>
          </div>
        </Form>

      </Modal.Body>
    </Modal>
  )
};

export default AddChannelModal;
