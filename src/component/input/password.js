import React from 'react';
import PropTypes from 'prop-types';

export default function FormInputPassword({ value, handleChange }) {
  return (
    <input
      type="password"
      name="password"
      value={value}
      className="form-control"
      onChange={handleChange}
      required
    />
  );
}

FormInputPassword.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
