import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import './movie-view.scss';

export class MovieView extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const { movie, onClick } = this.props;

		if (!movie) return null;

		return (
			<div className='movieview'>
				<Card>
					<Card.Img variant="top" src={movie.ImagePath} />
					<Card.Body>
						<Card.Title>{movie.Title}</Card.Title>
						<Card.Text>Genre: {movie.Genre.Name}</Card.Text>
						<Card.Text>Director: {movie.Director.Name}</Card.Text>
						<Card.Text>Discription: {movie.Description}</Card.Text>

						<Button variant="primary" onClick={() => onClick()} className="homeButton">Go back</Button>
					</Card.Body>
				</Card>
			</div >
		);
	}
}