import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import LoginRegister from '../components/LoginRegister';
import { AUTH_TOKEN } from '../utils/constants';
import { AuthContext } from '../context/auth';

import '../css/Header.scss';
import logo from '../images/logo.svg';

const Header = () => {
  const history = useHistory();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const buttonText = showLogin ? 'CLOSE' : 'LOGIN';
  const { user, logout } = useContext(AuthContext);

  const handleClick = () => {
    if (isLoggedIn) {
      setLoggedIn(false);
      setShowLogin(false);
      localStorage.removeItem(AUTH_TOKEN);
      history.push('/');
      logout();
    } else {
      setLoggedIn(false);
      setShowLogin(!showLogin);
    }
  }

  useEffect(() => {
    if(showLogin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showLogin]);

  useEffect(() => {
    if(user) {
      setShowLogin(false);
      setLoggedIn(true);
    }
  }, [user]);

  return (
    <>
      <header className="header">
        <div className="l-container">
          <div className="header-wrapper">
            <div className="header-logo">
              <Link to="/">
                <img src={logo} alt="BLOG" />
              </Link>
            </div>
            <div className="header-login">
              <button className="header-login-btn" onClick={handleClick}>{ isLoggedIn ? 'LOGOUT' : buttonText }</button>
            </div>
          </div>
        </div>
      </header>
      <LoginRegister showLogin={showLogin} />
    </>
  );
}

export default Header;
