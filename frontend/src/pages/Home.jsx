import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loggedIn, loggedOut } from "../slices/authSlice";
import Container from 'react-bootstrap/Container';

const Home = () => {

  const redirect = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  // if (!localStorage.token) {
  //   //return <Navigate to="/login" replace={true} />
  //   redirect("/login");
  // }

  useEffect(() => {
    if (!localStorage.token) {
      redirect("/login");
      return
    }
  });

  return (
    <div>
      <h1>Home page</h1>
    </div>
  )
}

export {Home}
