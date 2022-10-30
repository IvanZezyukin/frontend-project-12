import React, { useContext } from "react";
import {closeAddChannelModal} from "../slices/channelOptionsSlice";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import io from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import { useEffect } from "react";
import {setCurrentChannelId, setCurrentChannelName} from "../slices/currentChannelSlice";
import {closeRemoveChannelModal} from "../slices/channelOptionsSlice";
import SocketApiContext from "../context/SocketApiContext";

const removeChannelModal = () => {

  const { removeChannel } = useContext(SocketApiContext);

  const show = useSelector((state) => state.channelOptions.isRemoveChannelModalActive);
  const currentChannelId = useSelector((state) => state.currentChannel.currentChannelId);
  const currentChannelObject = useSelector((state) => state.channels.entities[currentChannelId]);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      removeChannel(currentChannelObject);
      formik.resetForm();
    },
  });

  return (
    <Modal centered show={show} onHide={() => dispatch(closeRemoveChannelModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Уверены?
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="secondary" onClick={() => dispatch(closeRemoveChannelModal())}>
                Отменить
              </Button>
              <Button type="submit" variant="danger">
                Удалить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
};

export default removeChannelModal;
