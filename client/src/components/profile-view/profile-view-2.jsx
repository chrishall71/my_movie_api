import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './profile-view.scss';

export class ProfileView2 extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      birthday: null,
      userData: null,
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    // authentication
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    axios
      .get(`https://myflix-movies.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          userData: response.data,
          username: response.data.Username,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.Favorites,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteMovieFromFavs(event, favoriteMovie) {
    event.preventDefault();
    console.log(favoriteMovie);
    axios
      .delete(
        `https://myflix-movies.herokuapp.com/users/${localStorage.getItem(
          'user',
        )}/Favorites/${favoriteMovie}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then((response) => {
        this.getUser(localStorage.getItem('token'));
      })
      .catch((event) => {
        alert('Oops... something went wrong...');
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      username, email, birthday, favoriteMovies,
    } = this.state;

    return (
      <Container className="profile-view">
        <h2 className="registerHeader">User Information</h2>
        <Form className="updateUserForm">
          <Form.Label>
            Username:
            {username}
            >
          </Form.Label>
          <br />
          <Form.Label>
            Email:
            {email}
          </Form.Label>
          <br />
          <Form.Label>
            Birthday:
            {birthday && birthday.slice(0, 10)}
          </Form.Label>
          <br />
          <Form.Label>
            Favorite Movies:
            {favoriteMovies}
          </Form.Label>
          <br />
          <Card className="profilecard">
            <h5>Update User Information</h5>
            <br />
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>

            <Form.Group controlId="formBasicDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" placeholder="01/01/1985" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update User!
            </Button>
          </Card>
          <Form.Group controlId="newUser">
            <Form.Text>
              Already Registerd?
              <Button variant="link">Login</Button>
            </Form.Text>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
