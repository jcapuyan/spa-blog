import React, { useState } from 'react';

import Login from '../components/Login';
import Register from '../components/Register';

import '../css/Login.scss';

const LoginRegister = ({ showLogin }) => {
  const [login, setLogin] = useState(true);
  const classLogin = showLogin ? 'is-active' : '';

  return (
    <div className={`login ${classLogin}`}>
      <div className="l-container">
        <div className="login-inner">
          {login ?
            <Login />
            : <Register />
          }
          {login ?
            <p className="login-account">
              No account yet? <button className="login-register" onClick={() => setLogin(!login)}>REGISTER HERE</button>
            </p>
            : <p className="login-account">
              Already have an account? <button className="login-register" onClick={() => setLogin(!login)}>LOGIN HERE</button>
            </p>
          }
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
