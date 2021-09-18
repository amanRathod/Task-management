import React from 'react';
import PropTypes from 'prop-types';

export default function FormInputFullName({ value, handleChange }) {
  return (
    <input
      type="name"
      name="fullName"
      value={value}
      className="form-control"
      onChange={handleChange}
      required
    />
  );
}

FormInputFullName.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
