import React from 'react';
import PropTypes from 'prop-types';

const Password = ({ value, handleChange }) => (
  <input
    type="password"
    className="form-control"
    placeholder="****..."
    value={value}
    onChange={handleChange}
    required
  />
);

export default Password;

Password.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func
};
