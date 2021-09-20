import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FirebaseContext from '../../utils/context/firebase';
import * as ROUTES from '../../constants/routes';
import UserContext from '../../utils/context/user';
import Button from '../public/button';
import notify from '../public/notification';

const Header = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      firebase.auth().signOut();
      notify({
        type: 'success',
        message: 'Logout successfully'
      });
      history.push(ROUTES.LOGIN);
    } catch (err) {
      notify({
        type: 'error',
        message: err.message
      });
    }
  };

  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  return (
    <div className="header">
      <ToastContainer />
      <h1 className="header-logo">Task Management</h1>
      <div className="left">
        <h3>{user._delegate ? user._delegate.displayName : ''}</h3>
        <Button value="logout" handleChange={handleLogout} />
      </div>
    </div>
  );
};

export default Header;
