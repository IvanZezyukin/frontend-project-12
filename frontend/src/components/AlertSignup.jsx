import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { signupErrorDismissal } from '../slices/authSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const AlertSignup = () => {

  const isError = useSelector((state) => state.auth.isSignupError);
  const errorMessage = useSelector((state) => state.auth.signupErrorMessage);
  const dispatch = useDispatch();

  if (!isError) return null;

  return (

    <Container fluid className="d-flex flex-column">
      <Row className="justify-content-center align-content-center">

        <Alert className="w-75 m-2" variant="danger" onClose={() => dispatch(signupErrorDismissal())} dismissible>
          <Alert.Heading>Ой! Произошла ошибка!</Alert.Heading>
          <p>
            {errorMessage}
          </p>
        </Alert>

      </Row>
    </Container>

  );

}

export default AlertSignup;
