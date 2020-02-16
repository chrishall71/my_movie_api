import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container, Row, Col, Form, Button,
} from 'react-bootstrap';

import './profile-update.scss';

export function ProfileUpdate() {
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [email, updateEmail] = useState('');
  const [birthday, updateBirthday] = useState('');

  const currentUser = localStorage.getItem('user');

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://myflix-movies.herokuapp.com/users/${currentUser}`,
        {
          Username: username,
          Password: password,
          Birthday: birthday,
          Email: email,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then((res) => {
        const { data } = res;
        alert('Your profile data was updated successfully');
        localStorage.setItem('user', data.Username);
        window.open('/profile');
      })
      .catch((error) => {
        alert(`error updating user ${error}`);
      });
  };

  return (
    <div className="update-view justify-content-center">
      <h2 className="update-header">
        Update
        {' '}
        {currentUser}
        's profile
      </h2>
      <h6 className="page-info">
        Please make sure you fill in every input field before pressing update-button. If you want to
        keep some data as it is, fill in original data again.
      </h6>

      <Row className="justify-content-center">
        <Col>
          <Container className="container update-container border-0 mt-0">
            <Form className="update-form">
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Update username or repeat original"
                  onChange={(e) => updateUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Update password or repeat original"
                  onChange={(e) => updatePassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Update your email adress or repeat original"
                  onChange={(e) => updateEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicBirthday">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="Update your birthday or repeat original"
                  onChange={(e) => updateBirthday(e.target.value)}
                />
              </Form.Group>
              <Row className="justify-content-end">
                <Link to="" onClick={() => history.back()}>
                  <Button className="back-btn1" type="button" variant="primary" size="sm">
                    Back
                  </Button>
                </Link>

                <Button
                  className="update-btn mr-3"
                  variant="primary"
                  type="submit"
                  size="sm"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Row>
            </Form>
          </Container>
          <Container className="mt-4">
            <Row className="d-flex align-items-center justify-content-center">
              <span>Want to delete your myFlix account?</span>
              <Link to="/profile">
                <Button variant="link" className="unregister-btn">
                  Delete
                </Button>
              </Link>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
