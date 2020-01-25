/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
// IMPORT DEPENDENCIES
const express = require('express');

const app = express();
const morgan = require('morgan');
// const uuid = require('uuid');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

require('./passport');

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware functions
app.use(morgan('common'));// log all request with Morgan
app.use(express.static('public')); // retrieves files from public folder
app.use(bodyParser.json());

let auth = require('./auth')(app);

// Error Handling in Express
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// GET Request
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

// --MOVIES--

// Get list of data about ALL Movies (GET)
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    });
});

// Get one movie by title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    });
});

// Delete a movie from the list
app.delete('/movies/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  let movie = Movies.find((movieParam) => {
    return movieParam.id === req.params.id;
  });

  if (movie) {
    Movies.filter((obj) => {
      return obj.id !== req.params.id;
    });
    res.status(201).send(`Movie${movie.title}with id ${req.params.id}was deleted.`);
  }
});

// --DIRECTORS--

// Get one director by name
app.get('/movies/directors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
    .then((movies) => {
      res.json(movies.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    });
});


// --GENRE--

// Get one movie Genre
app.get('/movies/genres/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Name })
    .then((movies) => {
      res.json(movies.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    });
});

// --USERS--

// Get all Users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    });
});

// Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    });
});

// Add a USER
/* We'll expect JSON in this format
{
  ID: Integer,
  // eslint-disable-next-line no-tabs
  // eslint-disable-next-line no-tabs
  // eslint-disable-next-line no-tabs
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
  FavoriteMovie: []
} */
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        return res.status(400).send(`${req.body.Username}  already exist.`);
      // eslint-disable-next-line no-else-return
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Brithday: req.body.Birthday,
        })
          .then((userParam) => { res.status(201).json(userParam); })
          .catch((error) => {
            console.error(error);
            res.status(500).send(`Error: ${error}`);
          });
      }
    }).catch((error) => {
      console.error(error);
      res.status(500).send(` Error: ${error}`);
    });
});

// Update user information, by username
/* We'll expect JSON in this format
{
  Username: String, (Required)
  Password: String, (Required)
  Email: Sting, (Required)
  Birthday: Date
} */
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    {
      $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday,
    },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      } else {
        res.json(updatedUser);
      }
    });
});

// Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(`${req.params.Username} was not found.`);
      } else {
        res.status(200).send(`${req.params.Username} was deleted.`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    });
});

// --LIST OF FAVORITES--

// Add a favorite Movie to a User
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID },
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    } else {
      res.json(updatedUser);
    }
  });
});

// Remove a favorite Movie from a User.
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { FavoriteMovies: req.params.MovieID },
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    } else {
      res.json(updatedUser);
    }
  });
});

// START SERVER
const PORT = process.env.PORT || 5000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
