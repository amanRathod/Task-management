/* eslint-disable no-empty */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Email from '../../component/input/email';
import Password from '../../component/input/password';
import ValidateEmail from '../../utils/validation/email';

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    error1: '',
    error2: ''
  });

  const isValid = state.email === '' || state.password === '';

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      ValidateEmail({ value: e.target.value, setState });
    }

    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div className="flex-row">
      <div className="flex-column box">
        <form onSubmit={handleSubmit}>
          <div className="flex-column">
            <div>
              <label htmlFor="email">Email</label>
            </div>
            <Email value={state.email} handleChange={handleChange} />
            {state.error1 && <p className="error">{state.error1}</p>}
          </div>
          <div className="flex-column">
            <label htmlFor="password">Password</label>
            <Password value={state.password} handleChange={handleChange} />
          </div>
          <button disabled={isValid} type="submit" className={`btn ${isValid && 'opacity-70'}`}>
            login
          </button>
          <p>
            don't have account?
            <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
