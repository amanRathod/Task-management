import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Header = () => {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  return (
    <div className="header">
      <div className="header__logo">
        <img
          src="https://www.gravatar.com/avatar/b0d9e8c14d7e5a5e8e4e8d9a8f5c7c8d?s=40"
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Header;
