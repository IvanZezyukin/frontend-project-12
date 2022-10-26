import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loggedOut } from '../slices/authSlice';
import Button from 'react-bootstrap/Button';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from "./RemoveChannelModal";
import RenameChannelModal from './RenameChannelModal';

const Layout = () => {

  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(loggedOut());
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column h-100">

    <header>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to={'/'}>Slack-Chat</Link>
          {isAuth ? <Button onClick={logOut}>Выйти</Button> : null}
        </div>
      </nav>
    </header>

    <AddChannelModal />
    <RemoveChannelModal />
    <RenameChannelModal />

    <Outlet />

    {/* <footer>
      <p />
      <hr />
      Technical data<br />
      Status from redux state: {isAuth ? 'авторизован' : 'не авторизован'}<br />
      Token: {localStorage.token}<br />
      Username: {localStorage.username}<br />
    </footer> */}

    </div>
  )
}

export {Layout}
