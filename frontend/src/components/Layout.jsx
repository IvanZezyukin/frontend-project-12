import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import { loggedOut } from '../slices/authSlice';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const Layout = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line max-len
  const isRenameChannelModalActive = useSelector((state) => state.channelOptions.isRenameChannelModalActive);
  const { t } = useTranslation();

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(loggedOut());
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column h-100">

      <header>
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Link className="navbar-brand" to="/">{t('logo')}</Link>
            {isAuth ? <Button onClick={logOut}>{t('logoutButton')}</Button> : null}
          </div>
        </nav>
      </header>

      <AddChannelModal />
      <RemoveChannelModal />
      {isRenameChannelModalActive && <RenameChannelModal />}
      <ToastContainer />

      <Outlet />

    </div>
  );
};

export default Layout;
