/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
// IMPORT DEPENDENCIES
const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Models = require('./models.js');

const app = express();
const Movies = Models.Movie;
const Users = Models.User;


app.use(morgan('common'));// log all request with Morgan
app.use(express.static('public')); // retrieves files from public folder
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });


// GET Request
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

// --MOVIES--

// Get list of data about ALL Movies (GET)
app.get('/movies', (req, res) => {
  res.json(Movies);
});

// Get one movie by title
app.get('/movies/:title', (req, res) => {
  res.json(Movies.find((movie) => {
    return movie.title === req.params.title;
  }));
});

// Add new movie to the list (POST)
app.post('/add_movie', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing name in request body'; res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();// create unique ID
    Movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

// Delete a movie from the list
app.delete('/movies/:id', (req, res) => {
  let movie = Movies.find((movie) => {
    return movie.id === req.params.id;
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
app.get('/directors/:name', (req, res) => {
  res.json(Directors.find((director) => {
    return director.name === req.params.name;
  }));
});

// --GENRE--

// Get a list of ALL the genres
app.get('/genres', (req, res) => {
  res.json(Genre);
});

// Get one movie Genre
app.get('/genres/:name', (req, res) => {
  res.json(Genre.find((genre) => {
    return genre.name === req.params.name;
  }));
});

// --USERS--

// Get all Users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
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
    .then((user) => {
      if (user) {
        return res.status(400).send(`${req.body.Username}  already exist.`);
      // eslint-disable-next-line no-else-return
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Brithday: req.body.Birthday
          })
          .then((user) => {res.status(201).json(user);})
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
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }},
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      } else {
        res.json(updatedUser)
      }
    })
});


/* app.put('/users/:id', (req, res) => {
  const requestId = req.params.id; // ID for the contact

  // filters the array for the specific contact object
  let contact = Users.filter(contact => contact.id == requestId)[0];

  // get the index of where the contact is in array
  const index = Users.indexOf(contact);

  // look for a specific value to edit
  const keys = Object.keys(req.body);

  // sets the value of to new information
  keys.forEach((key) => {
    contact[key] = req.body[key];
  });

  Users[index] = contact;

  res.json(Users[index]);
});

// Deletes a user from the list by ID
app.delete('/users/:id', (req, res) => {
  let user = Users.find((user) => { return user.id === req.params.id; });

  if (user) {
    Users = Users.filter((obj) => obj.id !== req.params.id);
    res.status(201).send(`User ${user.name} with id ${req.params.id} was deleted.`);
  }
}); */

// --LIST OF FAVORITES--

// Add a favorite Movie to a User
app.post('/users/:Username/Movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser)
    }
  })
});


/* app.post('/users/:id/movies/:movie_id', (req, res) => {
  let user = Users.find((user) => { return user.id === req.params.id; });
  let movie = Movies.find((movie) => { return movie.id === req.params.movie_id; });

  if (user && movie) {
    user.favorites = [...new Set([...user.favorites, req.params.movie_id])];
    res.status(201).send(user);
  } else if (!movie) {
    res.status(404).send(`Movie with id ${req.params.movie_id} was not found.`);
  } else {
    res.status(404).send(`User with id ${req.params.id} was not found.`);
  }
}); */

// Remove a favorite Movie from a User.
app.delete('/users/:id/movies/:movie_id', (req, res) => {
  let user = Users.find((user) => user.id === req.params.id);
  let movie = Movies.find((movie) => movie.id === req.params.movie_id);

  if (user && movie) {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line camelcase
    user.favorites = user.favorites.filter((movie_id) => movie_id !== req.params.movie_id);
    res.status(201).send(user);
  } else if (!movie) {
    // eslint-disable-next-line prefer-template
    res.status(404).send('Movie with id ' + req.params.movie_id + ' was not found.');
  } else {
    // eslint-disable-next-line prefer-template
    res.status(404).send('User with id ' + req.params.id + ' was not found.');
  }
});


// Error Handling in Express
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// START SERVER
const PORT = process.env.PORT || 5000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));