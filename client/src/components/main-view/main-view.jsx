import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    // Super class constructor
    super();

    // Init an empty state
    this.state = {
      movies: null,
      selectedMovie: null
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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it dows nothing by default
  render() {
    const { movies, selectedMovie } = this.state;

    // Before the movie has been loaded
    if (!movies) return (<div className='main-view' />);

    return (
      <div className='main-view'>
        {selectedMovie
          ? <MovieView
            movie={selectedMovie} />
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