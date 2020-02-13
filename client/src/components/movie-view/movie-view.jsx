import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './movie-view.scss';

// eslint-disable-next-line import/prefer-default-export
export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movieview">
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>
              Genre:
              {movie.Genre.Name}
            </Card.Text>
            <Card.Text>
              Director:
              {movie.Director.Name}
            </Card.Text>
            <Card.Text className="description-box">
              Discription:
              {movie.Description}
            </Card.Text>
            <div className="movie-footer">
              <Link to="/movies">
                <Button type="button" variant="link" size="sm">
                  Go Back
                </Button>
              </Link>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button type="button" variant="link" size="sm">
                  Director
                </Button>
              </Link>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button type="button" variant="link" size="sm">
                  Genres
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Brith: PropTypes.string,
      Death: PropTypes.string,
    }),
  }).isRequired,
};
