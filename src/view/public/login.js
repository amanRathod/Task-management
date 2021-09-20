/* eslint-disable no-empty */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInputEmail from '../../component/input/email';
import FormInputPassword from '../../component/input/password';
import ValidateEmail from '../../utils/validation/email';
import FirebaseContext from '../../utils/context/firebase';
import notify from '../../component/public/notification';

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [state, setState] = useState({
    email: '',
    password: '',
    error1: '',
    error2: ''
  });

  const isValid = state.email === '' || state.password === '' || state.error1 !== '';

  const handleChange = (e) => {
    e.persist();
    if (e.target.name === 'email') {
      ValidateEmail({ value: e.target.value, setState });
    }
    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(state.email, state.password);
      notify({
        type: 'success',
        message: 'Login successfully'
      });
      setTimeout(() => {
        history.push('/');
      }, 1000);
    } catch (err) {
      notify({
        type: 'error',
        message: err.message
      });
    }
  };
  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div className="flex-row">
      <ToastContainer />
      <div className="flex-column box">
        <form onSubmit={handleSubmit}>
          <div className="flex-column">
            <label htmlFor="email">Email</label>
            <FormInputEmail value={state.email} handleChange={handleChange} />
            {state.error1 && <p className="error">{state.error1}</p>}
          </div>
          <div className="flex-column">
            <label htmlFor="password">Password</label>
            <FormInputPassword value={state.password} handleChange={handleChange} />
          </div>
          <div className="button">
            <button disabled={isValid} type="submit" className={`btn ${isValid && 'opacity-70'}`}>
              login
            </button>
          </div>
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-color">
              Singup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
