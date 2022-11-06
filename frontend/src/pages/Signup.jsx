import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { signupError, loggedIn } from '../slices/authSlice';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordCheck: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(t('signupPage.validationRequired')).min(3, t('signupPage.validationMin3Max20')).max(20, t('signupPage.validationMin3Max20')),
      password: Yup.string().min(6, t('signupPage.validationMin6')).required(t('signupPage.validationPasswordRequired')),
      passwordCheck: Yup.string().required(t('signupPage.validationPasswordRequired')).oneOf([Yup.ref('password'), null], t('signupPage.validationMustMatch')),
    }),
    onSubmit: (values) => {
      axios({
        method: 'post',
        url: '/api/v1/signup',
        data: values,
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('username', res.data.username);
          dispatch(loggedIn(res.data.username));
          navigate('/');
        })
        .catch((err) => {
          // eslint-disable-next-line functional/no-let
          let message = '';
          if (err.response.request.status === 409) {
            message = t('signupPage.userAlreadyExists');
          } else {
            message = err.message;
          }
          dispatch(signupError({ message }));
          toast.error(message);
        });
    },
  });

  return (

    <Container fluid className="h-100 d-flex flex-column">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image className="img-fluid p-4" src="./chat.png" />
              </Col>

              <Form className="col-12 col-md-6 mt-3 mt-mb-0 p-3" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signupPage.signupHeading')}</h1>
                <Form.Group className="form-floating mb-3">
                  <FloatingLabel controlId="username" label={t('signupPage.usernameLabel')} className="mb-3">
                    <Form.Control onBlur={formik.handleBlur} type="username" placeholder={t('signupPage.usernameLabel')} onChange={formik.handleChange} value={formik.values.username} isInvalid={!!formik.errors.username && formik.touched.username} />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-3" controlId="password">
                  <FloatingLabel controlId="password" label={t('signupPage.passwordLabel')} className="mb-3">
                    <Form.Control onBlur={formik.handleBlur} type="password" placeholder={t('signupPage.passwordLabel')} onChange={formik.handleChange} value={formik.values.password} isInvalid={!!formik.errors.password && formik.touched.password} />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-3" controlId="password">
                  <FloatingLabel controlId="passwordCheck" label={t('signupPage.passwordConfirmationLabel')} className="mb-3">
                    <Form.Control onBlur={formik.handleBlur} type="password" placeholder={t('signupPage.passwordConfirmationLabel')} onChange={formik.handleChange} value={formik.values.passwordCheck} isInvalid={!!formik.errors.passwordCheck && formik.touched.passwordCheck} />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.passwordCheck}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button className="w-100" variant="outline-primary" type="submit">{t('signupPage.signupButton')}</Button>
              </Form>

            </Card.Body>

          </Card>
        </Col>
      </Row>
    </Container>

  );
};

export default Signup;
