/* eslint-disable no-console */

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication
    axios({
      method: 'post',
      url: 'https://myflix-movies.herokuapp.com/login',
      params: {
        Username: username,
        Password: password,
      },
    })
      .then((response) => {
        const { data } = response;
        // This method triggers onLoggedIn method in Mainview and updates user state
        props.onLoggedIn(data);
      })
      .catch((error) => {
        console.log('no such user');
      });
  };

  return (
    <Form className="login-form">
      <h1 className="text-center">
        <span className="font-weight-bold">MyFlix</span>
        {' '}
        Movies
      </h1>
      <h2 className="text-center">Welcome</h2>
      <Form.Group controlId="formBasicUsername">
        <Form.Label className="text-center">Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button className="btn-lg btn-dark btn-block" type="submit" onClick={handleLogin}>
        Log in
      </Button>
      <br />
      <br />

      <Form.Group controlId="newUser">
        <Form.Text>
          New User? Click
          <Link to="/register">
            <Button className="login-button btn-sm btn" id="registerButton" variant="link">
              Register
            </Button>
          </Link>
        </Form.Text>
      </Form.Group>
    </Form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
