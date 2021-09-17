import React from 'react';
import PropTypes from 'prop-types';

const Username = ({ value, handleChange }) => (
  <input
    type="name"
    className="form-control"
    placeholder="unique name"
    value={value}
    onChange={handleChange}
    required
  />
);

export default Username;

Username.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func
};
