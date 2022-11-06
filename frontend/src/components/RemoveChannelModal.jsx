import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { closeRemoveChannelModal } from '../slices/channelOptionsSlice';
import SocketApiContext from '../context/SocketApiContext';

const RemoveChannelModal = () => {
  const { removeChannel } = useContext(SocketApiContext);
  const show = useSelector((state) => state.channelOptions.isRemoveChannelModalActive);
  const currentChannelId = useSelector((state) => state.currentChannel.currentChannelId);
  const currentChannelObject = useSelector((state) => state.channels.entities[currentChannelId]);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      removeChannel(currentChannelObject);
      formik.resetForm();
    },
  });

  return (
    <Modal centered show={show} onHide={() => dispatch(closeRemoveChannelModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannelModal.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('removeChannelModal.sure')}
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="secondary" onClick={() => dispatch(closeRemoveChannelModal())}>
                {t('removeChannelModal.canselBtn')}
              </Button>
              <Button type="submit" variant="danger">
                {t('removeChannelModal.removeBtn')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
