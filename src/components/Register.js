import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

import '../css/Login.scss';

const Register = (props) => {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const { handleChange, handleSubmit, values } = useForm(registerUser, {
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: {register: userData }}) {
      context.login(userData);
      history.push('/');
    },
    onError(err) {
      setErrors(err&&err.graphQLErrors[0]?err.graphQLErrors[0].extensions.exception.errors:{});
    },
    variables: values
  })

  function registerUser() {
    addUser();
  }

  const validateForm = values.password !== values.confirmPassword &&
                       values.email !== '' &&
                       values.password !== '' &&
                       values.confirmPassword !== '' ? true : false;

  return (
    <>
      <h1 className="login-title">REGISTER</h1>
      <form className="login-form login-form-register" onSubmit={handleSubmit}>
        <div className="login-wrapper login-wrapper-register">
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
        <div className="login-wrapper">
          <label htmlFor="confirmPassword" className="login-label">Confirm Password</label>
          <input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            required />
        </div>
        {errors.length > 0 && (
          <div className="login-error login-error-register">This credentials is already being used.</div>
        )}
        <button type="submit" disabled={validateForm} className="login-button login-button-register">REGISTER</button>
      </form>
    </>
  );
}

const REGISTER_USER = gql`
  mutation register($email: String!, $password: String!) {
    register(
      email: $email,
      password: $password
    )
  }
`;

export default Register;
