/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import './registration-view.scss';
import Axios from 'axios';

export function RegistrationView() {
  const [name, createName] = useState('');
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createDob] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();
    Axios.post('https://myflix-movies.herokuapp.com/users', {
      Name: name,
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    })
      .then((response) => {
        const { data } = response;
        console.log(data);
        window.open('/', '_self'); // with '_self' page will open in the current tab
      })
      .catch((e) => {
        console.log('error registering the user');
      });
  };

  return (
    <Container className="registrationContainer">
      <h2 className="registerHeader">Register</h2>
      <Form className="registrationForm">
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => createName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => createUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => createEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We will never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => createPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="01/01/1985"
            value={birthday}
            onChange={(e) => createDob(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleRegistration}>
          Register me!
        </Button>
        <Form.Group controlId="newUser">
          <Form.Text>
            Already Registerd?
            <Button variant="link" onClick={() => (window.location.href = '/')}>
              Login
            </Button>
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}
