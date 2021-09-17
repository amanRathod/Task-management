import React from 'react';
import PropTypes from 'prop-types';

const Email = ({ value, handleChange }) => (
  <input
    type="email"
    className="form-control"
    placeholder="abc@gmail..."
    value={value}
    onChange={handleChange}
    required
  />
);

export default Email;

Email.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func
};
