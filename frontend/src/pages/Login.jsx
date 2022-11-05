import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loggedIn, loggedOut, authError } from '../slices/authSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(t('signinPage.validationRequired')),
      password: Yup.string().required(t('signinPage.validationRequired')),
    }),
    onSubmit: values => {
      axios({
        method: 'post',
        url: '/api/v1/login',
        data: values,
        headers: {'content-type':'application/json'}
      })
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('username', res.data.username);
          dispatch(loggedIn(res.data.username));
          navigate("/");
        })
        .catch((err) => {
          let message = '';
          if (err.code === 'ERR_BAD_REQUEST') {
            message = t('signinPage.wrongCredentials');
          } else {
            message = err.message;
          }
          dispatch(authError({ message }));
          toast.error(message);
        })
    },
  });

  return (

  <Container fluid className="h-100 d-flex flex-column">
  <Row className="justify-content-center align-content-center h-100">
    <Col xs={12} md={8} xxl={6}>
      <Card className="shadow-sm">
        <Card.Body className="row p-5">
          <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
            <Image className="img-fluid p-4" src="./chat.png"/>
          </Col>

          <Form className="col-12 col-md-6 mt-3 mt-mb-0 p-3" onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">{t('loginHeading')}</h1>
              <Form.Group className="form-floating mb-3">
                <FloatingLabel controlId="username" label={t('userNameLabel')} className="mb-3">
                  <Form.Control onBlur={formik.handleBlur} type="username" placeholder="admin" onChange={formik.handleChange} value={formik.values.username} isInvalid={!!formik.errors.username && formik.touched.username} />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="form-floating mb-3" controlId="password">
                <FloatingLabel controlId="password" label={t('passwordLabel')} className="mb-3">
                  <Form.Control onBlur={formik.handleBlur} type="password" placeholder="admin" onChange={formik.handleChange} value={formik.values.password} isInvalid={!!formik.errors.password && formik.touched.password} />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            <Button className="w-100" variant="outline-primary" type="submit">{t('loginButton')}</Button>
          </Form>

        </Card.Body>
        <Card.Footer className="p-4">
          <div className='text-center'>
            <span>{t('NoAccountAnswer')}</span>
            <Link to={'/signup'}>{t('signUp')}</Link>
          </div>
        </Card.Footer>
      </Card>
    </Col>
  </Row>
  </Container>

  )

}

export {Login}
