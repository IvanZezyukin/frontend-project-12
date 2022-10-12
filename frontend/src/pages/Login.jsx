import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: Yup.object({
      login: Yup.string().required('Login is required'),
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Password is required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values));
    },
  })

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="login">Login</label>
        <input id="login" name="login" type="text" onChange={formik.handleChange} value={formik.values.login} onBlur={formik.handleBlur} />
        {formik.touched.login && formik.errors.login ? (<div>{formik.errors.login}</div>) : null}
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="text" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
        {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}
        <button type="submit">Login</button>
      </form>
    </div>
  )

}

export {Login}
