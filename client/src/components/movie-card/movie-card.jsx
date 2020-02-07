//clients/src/components/movie-card/movie-card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'

import './movie-card.scss';

export class MovieCard extends React.Component {
	render() {
		const { movie, onClick } = this.props;

		return (
			<div className='moviecarddiv'>
				<CardDeck >
					<Card className='moviecard' style={{ width: '13rem' }} >
						<Card.Img variant="top" src={movie.ImagePath} />
						<Card.Body>
							<Card.Title>{movie.Title}</Card.Title>
							<Card.Text>{movie.Description}</Card.Text>
							<Button onClick={() => onClick(movie)} variant="link">Open</Button>
						</Card.Body>
					</Card>
				</CardDeck>
			</div>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired
	}).isRequired,
	onClick: PropTypes.func.isRequired
};
