import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { authErrorDismissal } from '../slices/authSlice';

const AlertAuth = () => {

  const isError = useSelector((state) => state.auth.isError);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const dispatch = useDispatch();

  if (!isError) return null;

  return (

    <Alert variant="danger" onClose={() => dispatch(authErrorDismissal())} dismissible>
      <Alert.Heading>Ой! Произошла ошибка!</Alert.Heading>
      <p>
        Возможно введено неправильно имя пользователя или пароль. Ну а сервер подсказывает вот такой код ошибки: {errorMessage}
      </p>
    </Alert>

  );
  
}

export default AlertAuth;
