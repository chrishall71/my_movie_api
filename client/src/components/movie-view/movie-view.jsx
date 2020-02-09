import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';


import './movie-view.scss';

// eslint-disable-next-line import/prefer-default-export
export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

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
            <Card.Text>
              Discription:
              {movie.Description}
            </Card.Text>

            <Button variant="primary" onClick={() => onClick()} className="homeButton">Go back</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.string,
    Director: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
