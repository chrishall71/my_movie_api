/* eslint-disable react/prefer-stateless-function */
// clients/src/components/movie-card/movie-card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

// eslint-disable-next-line import/prefer-default-export
export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <div className="moviecarddiv">
        <Card className="moviecard" style={{ width: '15rem' }}>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text className="card-text">{movie.Description}</Card.Text>
          </Card.Body>
          <div className="card-footer">
            <Button onClick={() => onClick(movie)} variant="outline-primary" size="sm">Open</Button>
          </div>
        </Card>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
