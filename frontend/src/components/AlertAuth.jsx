import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { authErrorDismissal } from '../slices/authSlice';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const AlertAuth = () => {

  const isError = useSelector((state) => state.auth.isError);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (!isError) return null;

  return (

    <Container fluid className="d-flex flex-column">
      <Row className="justify-content-center align-content-center">

        <Alert className="w-75 m-2" variant="danger" onClose={() => dispatch(authErrorDismissal())} dismissible>
          <Alert.Heading>Ой! Произошла ошибка!</Alert.Heading>
          <p>
            {t('alertAuth.errorText')}
          </p>
        </Alert>

      </Row>
    </Container>

  );

}

export default AlertAuth;
