import React from "react";
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

const socket = io.connect();

const removeChannelModal = () => {

  const show = useSelector((state) => state.channelOptions.isRemoveChannelModalActive);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      // socket.emit('newChannel', values, (response) => {
      //   if (response.status === 'ok') {
      //     dispatch(closeAddChannelModal());
      //   }
      // });
    },
  });

  useEffect(() => {
    // socket.on('newChannel', (data) => {
    //   console.log(data.id);
    //   dispatch(setCurrentChannelId(data.id));
    //   dispatch(setCurrentChannelName(data.name));
    // });
  }, [socket]);

  return (
    <Modal show={show} onHide={() => dispatch(closeRemoveChannelModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Подтвердите удаление канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы действительно хотите удалить канал? Все сообщения из данного канала будут удалены.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(closeRemoveChannelModal())}>
          Отменить
        </Button>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Button type="submit" variant="primary">
              Отправить
            </Button>
          </Form.Group>
        </Form>
      </Modal.Footer>
    </Modal>
  )
};

export default removeChannelModal;
