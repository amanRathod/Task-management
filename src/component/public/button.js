/* eslint-disable react/prop-types */
import React from 'react';

const Button = ({ value, handleChange }) => (
  <button type="button" className="btn-task" onClick={handleChange}>
    {value}
  </button>
);

export default Button;
