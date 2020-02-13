/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import './profile-view.scss';
import axios from 'axios';

export function ProfileView2() {
  const [username, createUsername] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createDob] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();
    axios
      .post('https://myflix-movies.herokuapp.com/users', {
        Username: username,
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

  const currentUser = (token) => {
    axios
      .get('https://myflix-movies.herokuapp.com/users/:username', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assing the result to the state
        this.setState({
          user: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className="profile-view">
      <h2 className="registerHeader">User Information</h2>
      <Form className="updateUserForm">
        <Form.Label>Current User:</Form.Label>
        <br />
        <Form.Label>Email:</Form.Label>
        <br />
        <Form.Label>Birthday:</Form.Label>
        <br />
        <Form.Label>Favorite Movies:</Form.Label>
        <br />
        <Card className="profilecard">
          <h5>Update User Information</h5>
          <br />
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => createEmail(e.target.value)}
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
            Update User!
          </Button>
        </Card>
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
