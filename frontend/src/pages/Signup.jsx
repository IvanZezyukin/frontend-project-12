import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import {Link, useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {signupError, loggedIn} from "../slices/authSlice";
import AlertSignup from "../components/AlertSignup";

const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordCheck: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Login is required').min(3, 'Must be 3 characters or more').max(20, 'Max 20'),
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Password is required'),
      passwordCheck: Yup.string().required('Password confirmation is required').min(6, 'Must be 6 characters or more').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: values => {
      //alert(JSON.stringify(values));
      axios({
        method: 'post',
        url: '/api/v1/signup',
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
          if (err.response.request.status === 409) {
            message = 'Такой пользователь уже существует'
          } else {
            message = err.message;
          }
          dispatch(signupError({ message }));
        })
    },
  });

  return (
    <>

      <AlertSignup />

    <Container fluid className="h-100 d-flex flex-column">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image className="img-fluid p-4" src="./chat.png"/>
              </Col>

              <Form className="col-12 col-md-6 mt-3 mt-mb-0 p-3" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <FloatingLabel controlId="username" label="Имя пользователя" className="mb-3">
                    <Form.Control onBlur={formik.handleBlur} type="username" placeholder="Имя пользователя" onChange={formik.handleChange} value={formik.values.username} isInvalid={!!formik.errors.username && formik.touched.username} />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-3" controlId="password">
                  <FloatingLabel controlId="password" label="Пароль" className="mb-3">
                    <Form.Control onBlur={formik.handleBlur} type="password" placeholder="Пароль" onChange={formik.handleChange} value={formik.values.password} isInvalid={!!formik.errors.password && formik.touched.password} />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-3" controlId="password">
                  <FloatingLabel controlId="passwordCheck" label="Подтвердите пароль" className="mb-3">
                    <Form.Control onBlur={formik.handleBlur} type="password" placeholder="Подтвердите пароль" onChange={formik.handleChange} value={formik.values.passwordCheck} isInvalid={!!formik.errors.passwordCheck && formik.touched.passwordCheck} />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.passwordCheck}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button className="w-100" variant="outline-primary" type="submit">Зарегистрироваться</Button>
              </Form>

            </Card.Body>

          </Card>
        </Col>
      </Row>
    </Container>

    </>

  )
};

export {Signup};