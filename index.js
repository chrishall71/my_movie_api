const express = require('express'),
	morgan = require('morgan'),
	app = express();

var myMovies = [
	{
		title: 'Toy Story 4',
		year: '2019'
	},
	{
		title: 'Coco',
		year: '2017'	
	},
	{
		title: 'Up',
		year: '2009'	
	},
	{
		title: 'Finding Nemo',
		year: '2003'	
	},
	{
		title: 'The Lego Movie',
		year: '2014'	
	},
	{
		title: 'Mary Poppins',
		year: '1964'	
	},
	{
		title: '101 Dalmation',
		year: '1961'
	},
	{
		title: 'Ghostbuters',
		year: '1984'
	},
	{
		title: 'Back to the Future',
		year: '1985'
	},
	{
		title: 'The Truman Show',
		year: '1998'
	},
];

app.use(morgan ('common'));//log all request with Morgan
app.use(express.static('public')); //retrieves files from public folder

//GET Request
app.get('/movies', function (req, res) {
	res.json(myMovies);
  });

app.get('/', function (req, res) {
	res.send('My Movie Home Page');
});

//Error Handling in Express
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

app.listen(8080); 