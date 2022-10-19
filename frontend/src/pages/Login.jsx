import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loggedIn, loggedOut, authError } from '../slices/authSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import chatImage from '../images/chat.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import React, { useState } from 'react';
import AlertAuth from '../components/AlertAuth';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Login is required'),
      password: Yup.string().min(4, 'Must be 4 characters or more').required('Password is required'),
    }),
    onSubmit: values => {
      //alert(JSON.stringify(values));
      axios({
        method: 'post',
        url: '/api/v1/login',
        data: values,
        headers: {'content-type':'application/json'}
      })
        .then((res) => {
          // {
          //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NTc1MDA3OH0.x-6fTM8IoulWlcZUhkkXZuyool--k8dL6DzuvgmF3YM",
          //   "username": "admin"
          // }
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('username', res.data.username);
          dispatch(loggedIn());
          navigate("/");
        })
        .catch((err) => {
          const message = err.message;
          dispatch(authError({ message }));
        })
    },
  });

  return (

  <>

  <AlertAuth />

  <Container fluid className="h-100 d-flex flex-column">
  <Row className="justify-content-center align-content-center h-100">
    <Col xs={12} md={8} xxl={6}>
      <Card className="shadow-sm">
        <Card.Body className="row p-5">
          <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
            <Image className="img-fluid p-4" src="./chat.png"/>
          </Col>
          
          <Form className="col-12 col-md-6 mt-3 mt-mb-0 p-3" onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">Войти</h1>
              <Form.Group className="form-floating mb-3">
                <FloatingLabel controlId="username" label="Имя пользователя" className="mb-3">
                  <Form.Control type="username" placeholder="admin" onChange={formik.handleChange} value={formik.values.username} isInvalid={!!formik.errors.username} />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="form-floating mb-3" controlId="password">
                <FloatingLabel controlId="password" label="Пароль" className="mb-3">
                  <Form.Control type="password" placeholder="admin" onChange={formik.handleChange} value={formik.values.password} isInvalid={!!formik.errors.password} />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            <Button className="w-100" variant="outline-primary" type="submit">Войти</Button>
          </Form>

        </Card.Body>
        <Card.Footer className="p-4">
          <div className='text-center'>
            <span>Нет аккаунта? </span>
            <a href="">Регистрация</a>
          </div>
        </Card.Footer>
      </Card>
    </Col>
  </Row>
  </Container>

  </>

  )

}

export {Login}
