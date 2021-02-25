import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { Button, Form } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

import '../css/Login.scss';

const Login = (props) => {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [userAuthenticate, setUserAuthenticate] = useState('');
  const { handleChange, handleSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.authenticate);
      history.push('/');
      if (userAuthenticate === '' || userAuthenticate === 'error') {
        setUserAuthenticate('error');
      } else {
        setUserAuthenticate('');
      }
    },
    onError(err) {
      setErrors(err&&err.graphQLErrors[0]?err.graphQLErrors[0].extensions.exception.errors:{});
      setUserAuthenticate('error');
    },
    variables: values
  })

  function loginUserCallback() {
    loginUser();
  }

  useEffect(() => {
    if (context.user === null) {
      setUserAuthenticate('');
    } else {
      setUserAuthenticate(context.user);
    }
  }, [context.user]);

  return (
    <>
      <h1 className="login-title">LOGIN</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-wrapper">
          <label htmlFor="email" className="login-label">Email</label>
          <input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            required />
        </div>
        <div className="login-wrapper">
          <label htmlFor="password" className="login-label">Password</label>
          <input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            required />
        </div>
        {userAuthenticate === 'error' && (
          <div className="login-error">Incorrect details. Please register if you haven't registered yet.</div>
        )}
        <button type="submit" className="login-button">LOGIN</button>
      </form>
    </>
  );
}

const LOGIN_USER = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(
      email: $email,
      password: $password
    )
  }
`;

export default Login;
