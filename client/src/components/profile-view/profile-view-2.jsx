import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
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
          favoriteMovies: response.data.FavoriteMovies,
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
        `http://myflix-movies.herokuapp.com/users/${localStorage.getItem(
          'user',
        )}/movies/${favoriteMovie}`,
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

  deleteProfile() {
    axios
      .delete(`https://myflix-movies.herokuapp.com/users/${localStorage.getItem('user')}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => {
        alert('Do you really want to delete your account?');
      })
      .then((res) => {
        alert('Account was successfully deleted');
      })
      .then((res) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        this.setState({
          user: null,
        });
        window.open('/', '_self');
      })
      .catch((e) => {
        alert(`Account could not be deleted ${e}`);
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
        <ListGroup>
          <ListGroup.Item variant="secondary">
            <b>Username:</b>
            {' '}
            {username}
          </ListGroup.Item>
          <ListGroup.Item variant="secondary">
            <b>Email:</b>
            {' '}
            {email}
          </ListGroup.Item>
          <ListGroup.Item variant="secondary">
            <b>Birthday:</b>
            {' '}
            {birthday && birthday.slice(0, 10)}
          </ListGroup.Item>
          <ListGroup.Item variant="secondary">
            <b>Favorite Movies:</b>
            <div>{favoriteMovies}</div>
          </ListGroup.Item>
        </ListGroup>
        <Form>
          <Form.Group controlId="newUser">
            <Form.Text>
              <div className="profile-div">
                <Link to="/movies">
                  <Button className="home-button" type="button" variant="link" size="sm">
                    Back
                  </Button>
                </Link>
                <Link to="/update">
                  <Button className="button-update" size="sm" variant="link">
                    Update profile
                  </Button>
                </Link>
                <Link to="/update">
                  <Button
                    className="button-update"
                    size="sm"
                    variant="link"
                    onClick={() => this.deleteProfile()}
                  >
                    Delete User
                  </Button>
                </Link>
              </div>
            </Form.Text>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
