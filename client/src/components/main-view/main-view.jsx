import React, { useReducer } from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view.jsx'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {
	constructor() {
		super();

		this.state = {
			movies: null,
			selectedMovie: null,
			user: null,
			register: false
		};
	}

	componentDidMount() {
		axios.get('https://myflix-movies.herokuapp.com/movies')
			.then(response => {
				//Assign the result to the state
				this.setState({
					movies: response.data
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	// clicking movie to get more info
	onMovieClick(movie) {
		this.setState({
			selectedMovie: movie
		});
	}

	onLoggedIn(user) {
		this.setState({
			user
		});
	}

	// button to return back
	onButtonClick() {
		this.setState({
			selectedMovie: null
		})
	}

	register() {
		this.setState({
			register: true
		})
	}

	alreadyMember() {
		this.setState({
			register: false
		})
	}


	render() {
		const { movies, selectedMovie, user, register } = this.state;

		if (!user && register === false) return <LoginView onClick={() => this.register()} onLoggedIn={user =>
			this.onLoggedIn(user)} />

		if (register) return <RegistrationView onCLick={() => this.alreadyMember()} onSignedIn={user => this.onSignedIn(user)} />
		// Before the movie has been loaded
		if (!movies) return (<div className='main-view' />);

		return (
			<div className='main-view'>
				{selectedMovie
					? <MovieView
						movie={selectedMovie} onClick={() => this.onButtonClick()} />
					: movies.map(movie => (
						<MovieCard
							key={movie._id}
							movie={movie}
							onClick={movie => this.onMovieClick(movie)} />
					))
				}
			</div>
		);
	}
}
