/* eslint-disable no-empty */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as ROUTES from '../../constants/routes';
import FirebaseContext from '../../utils/context/firebase';
import FormInputEmail from '../../component/input/email';
import FormInputFullName from '../../component/input/name';
import FormInputPassword from '../../component/input/password';
import ValidateEmail from '../../utils/validation/email';
import ValidatePassword from '../../utils/validation/password';
import ValidateConfirmPassword from '../../utils/validation/confirmPassword';
import notify from '../../component/public/notification';

const Register = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [state, setState] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    error1: '',
    error2: '',
    error3: ''
  });

  const isValid =
    state.email === '' ||
    state.password === '' ||
    state.confirmPassword === '' ||
    state.fullName === '' ||
    state.error1 !== '' ||
    state.error2 !== '' ||
    state.error3 !== '';

  const handleChange = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case 'email':
        ValidateEmail({ value: e.target.value, setState });
        break;
      case 'password':
        ValidatePassword({ value: e.target.value, setState });
        break;
      case 'confirmPassword':
        ValidateConfirmPassword({ value: e.target.value, setState, password: state.password });
        break;
      default:
        break;
    }

    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdUserResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(state.email, state.password);

      await createdUserResult.user.updateProfile({
        displayName: state.fullName
      });
      notify({
        type: 'success',
        message: 'Registered successfully'
      });
      await firebase.firestore().collection('users').add({
        userId: createdUserResult.user.uid,
        fullName: state.fullName,
        email: state.email.toLowerCase(),
        dateCreated: Date.now()
      });
      setTimeout(() => {
        history.push(ROUTES.LOGIN);
      }, 1000);
    } catch (err) {
      notify({
        type: 'error',
        message: err.message
      });
    }
  };
  useEffect(() => {
    document.title = 'Register';
  }, []);

  return (
    <div className="flex-row">
      <ToastContainer />
      <div className="flex-column box">
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="fullName">Full Name</label>
            </div>
            <FormInputFullName value={state.fullName} handleChange={handleChange} />
          </div>
          <div className="flex-column">
            <label htmlFor="email">Email</label>
            <FormInputEmail value={state.email} handleChange={handleChange} />
            {state.error1 && <p className="error">{state.error1}</p>}
          </div>
          <div className="flex-column">
            <label htmlFor="password">Password</label>
            <FormInputPassword value={state.password} handleChange={handleChange} />
            {state.error2 && <p className="error">{state.error2}</p>}
          </div>
          <div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <input
              type="password"
              name="confirmPassword"
              value={state.confirmPassword}
              className="form-control"
              onChange={handleChange}
              required
            />
            {state.error3 && <p className="error">{state.error3}</p>}
          </div>
          <div className="button">
            <button disabled={isValid} type="submit" className={`btn ${isValid && 'opacity-70'}`}>
              Register
            </button>
          </div>
          <p>
            already have an account?{' '}
            <Link to="/login" className="text-color">
              login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
