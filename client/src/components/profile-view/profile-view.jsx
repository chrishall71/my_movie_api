import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

import './profile-view.scss';
import axios from 'axios';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: null,
      username: null,
      email: null,
      favoriteMovies: [],
    };
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
          favoriteMovies: response.data.Favorites,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Delete Favorite Movie
  deleteFavoriteMovie(e, movieId) {
    e.preventDefault();
    axios
      .delete(
        `https://myflix-movies.herokuapp.com/users/${localStorage.getItem(
          'user',
        )}/Movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then((res) => {
        this.getUser(localStorage.getItem('token'));
      })
      .catch((event) => {
        alert('Movie could not be deleted from favorites');
      });
  }

  // Delete Current User
  deleteProfile() {
    axios
      .delete(`https://myflix-movies.herokuapp.com/users/${localStorage.getItem('user')}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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

  render() {
    const {
      userData, username, email, favoriteMovies,
    } = this.state;

    return (
      <Card className="profile-view" style={{ width: '32rem' }}>
        <Card.Body>
          <Card.Title className="profile-title">My Profile</Card.Title>
          <ListGroup className="list-group-flush" variant="flush">
            <ListGroup.Item>
              Username:
              {username}
            </ListGroup.Item>
            <ListGroup.Item>
              Email:
              {email}
            </ListGroup.Item>
            <ListGroup.Item>
              Favorite Movies:
              <div>
                {favoriteMovies.length === 0 && <div className="value" />}
                {favoriteMovies.length > 0 && (
                  <ul>
                    {favoriteMovies.map((favoriteMovie) => (
                      <li key={favoriteMovie}>
                        <p className="favouriteMovies">
                          {
                            JSON.parse(localStorage.getItem('movies')).find(
                              (movie) => movie._id === favoriteMovie,
                            ).Title
                          }
                        </p>
                        <Link to={`/movies/${favoriteMovie}`}>
                          <Button size="sm" variant="info">
                            Open
                          </Button>
                        </Link>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(event) => this.deleteMovieFromFavs(event, favoriteMovie)}
                        >
                          Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ListGroup.Item>
          </ListGroup>
          <div className="text-center">
            <Link to="/movies">
              <Button className="button-back" variant="outline-info">
                MOVIES
              </Button>
            </Link>
            <Link to="/update/:Username">
              <Button className="button-update" variant="outline-secondary">
                Update profile
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}
