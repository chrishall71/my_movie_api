//IMPORT DEPENDENCIES
const express = require('express'),
	morgan = require('morgan'),
	uuid = require ('uuid'),
	bodyParser = require('body-parser');
	
const app = express();	

	app.use(morgan ('common'));//log all request with Morgan
	app.use(express.static('public')); //retrieves files from public folder
	app.use(bodyParser.json());

//USER Data base
let Users = [
	{
		id: '1',
		name:"John Doe",
		username:"jonhdoe81",
		password:'Pw1234',
		email:'john@gmail.com',
		dateofbirth:'october 19, 1971',
		favorites: ['3']
	}
];

let Genre = [
	{
		name:'Drama',
		discription:"Drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone"
	},
	{
		name:'Action',
		discription:"Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, and frantic chases. Action films tend to feature a resourceful hero struggling against incredible odds, which include life-threatening situations, a villain, or a pursuit which usually concludes in victory for the hero.",
	},
	{
		name:'Sci-Fi',
		discription:'Science fiction (often abbreviated Sci-Fi or SF) is a genre of speculative fiction that has been called the "literature of ideas". It typically deals with imaginative and futuristic concepts such as advanced science and technology, time travel, parallel universes, fictional worlds, space exploration, and extraterrestrial life. Science fiction often explores the potential consequences of scientific innovations.'
	},
	{
		name:'Comedy',
		discription:"A comedy film is a genre of film in which the main emphasis is on humor."
	},
	{
		name:'animation',
		discription:"Animation is a method in which pictures are manipulated to appear as moving images. ",
	}
];


let Directors = [
	{
		name:'Josh Cooley',
		bio:"Joshua Cooley (born May 23, 1980) is an American animator, screenwriter, director and voice actor. He is best known for working on the 2015 Pixar animated film Inside Out and directing the short film Riley's First Date? that was included in its home video release. He made his feature film directorial debut in 2019 with Toy Story 4, the fourth installment of the Toy Story film franchise series.",
		birth:'1980',
		death:''
	},
	{
		name:'Ron Howard',
		bio:"Academy Award-winning filmmaker Ron Howard is one of this generation's most popular directors. From the critically acclaimed dramas A Beautiful Mind (2001) and Apollo 13 (1995) to the hit comedies Parenthood (1989) and Splash (1984), he has created some of Hollywood's most memorable films.",
		birth:'1954',
		death:''
	},
	{
		name:'Andrew Stanton',
		bio:"Oscar-winning filmmaker Andrew Stanton was raised in Rockport, Massachusetts. He was educated at The California Institute of the Arts in Los Angeles, where he studied character animation. After graduation, Stanton began working as a writer on the TV series Mighty Mouse: The New Adventures. In 1990, he became only the second animator and ninth employee to join Pixar Animation Studios. Stanton went on to help establish Pixar as one of the world's leading animation studios",
		birth:'1965',
		death:''
	},{
		name:'Stephen Spielberg',
		bio:"One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.",
		birth:'1946',
		death:''
	},{
		name:'Frank Darabont',
		bio:"Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution. Brought to America as an infant, he settled with his family in Los Angeles and attended Hollywood High School. His first job in movies was as a production assistant on the 1981 low-budget film, Hell Night (1981), starring Linda Blair. He spent the next six years working in the art department as a set dresser and in set construction while struggling to establish himself as a writer. His first produced writing credit (shared) was on the 1987 film, A Nightmare on Elm Street 3: Dream Warriors (1987), directed by Chuck Russell. Darabont is one of only six filmmakers in history with the unique distinction of having his first two feature films receive nominations for the Best Picture Academy Award: 1994's The Shawshank Redemption (1994) (with a total of seven nominations) and 1999's The Green Mile (1999) (four nominations). ",
		birth:'1959',
		death:''
	},
	{
		name:'Justin Lin',
		bio:"Justin Lin is a Taiwanese-American film director whose films have grossed $2 billion worldwide. He is best known for his work on Better Luck Tomorrow, The Fast and the Furious 3-6 and Star Trek Beyond. He is also known for his work on television shows like Community and the second season of True Detective. Lin was born in Taipei, Taiwan, and grew up in a working-class neighborhood in Cypress, California, in Orange County. He attended Cypress High School and University of California, San Diego for two years before transferring to UCLA, where he earned a B.A. in Film & Television and a MFA in Film Directing & Production from the UCLA film school.",
		birth:'1973',
		death:''
	},{
		name:'David Leitch',
		bio:"David Leitch is a billion dollar film director, actor, stuntman, writer, producer, and stunt coordinator. He co-directed John Wick (2014) with Chad Stahelski, which he also served as producer. David directed Atomic Blonde (2017) starring Charlize Theron. David also directed the box office smash and critically acclaimed Deadpool 2 (2018). He is the director of Fast and Furious spin off: Hobbs and Shaw (2019).",
		birth:'1975',
		death:''
	},
	{
		name:'Todd Phillips',
		bio:"Todd Phillips was born on December 20, 1970 in Brooklyn, New York City, New York, USA as Todd Bunzl. He is a producer and director, known for Joker (2019), Old School (2003) and Due Date (2010).",
		birth:'1970',
		death:''
	}
];

let Movies = [
	{
		id: '1',
		title: 'Toy Story 4',
		description: 'Toy Story 4 is a 2019 American computer-animated comedy film produced by Pixar Animation Studios for Walt Disney Pictures. It is the fourth installment in Pixars Toy Story series.',
		genre: 'animation',
		director: 'Josh Cooley',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Toy_Story_4_poster.jpg',
		featured: 'false'
	},
	{
		id: '2',
		title: 'A Beautiful Mind',
		description: 'A Beautiful Mind: a Biography of John Forbes Nash, Jr., Winner of the Nobel Prize in Economics, 1994',
		genre: 'drama',
		director: 'Ron Howard',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b8/A_Beautiful_Mind_Poster.jpg',
		featured: 'false'	
	},
	{
		id: '3',
		title: 'In the Heart of the Sea',
		description: "A recounting of a New England whaling ship's sinking by a giant whale in 1820, an experience that later inspired the great novel Moby-Dick.",
		genre: 'drama',
		director: 'Ron Howard',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8b/In_the_Heart_of_the_Sea_poster.jpg',
		featured: 'false'	
	},
	{
		id: '4',
		title: 'Finding Nemo',
		description: 'After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.',
		genre: 'animation',
		director: 'Andrew Stanton',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg',
		featured: 'false'	
	},
	{
		id: '5',
		title: 'Catch Me If You Can',
		description: "A seasoned FBI agent pursues Frank Abagnale Jr. who, before his 19th birthday, successfully forged millions of dollars' worth of checks while posing as a Pan Am pilot, a doctor, and a legal prosecutor.",
		genre: 'drama',
		director: 'Stephen Spielberg',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_UX182_CR0,0,182,268_AL_.jpg',
		featured: 'false'	
	},
	{
		id: '6',
		title: 'The Shawshank Redemption',
		description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
		genre: 'drama',
		director: 'Frank Darabont',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
		featured: 'false'	
	},
	{
		id: '7',
		title: 'Fast and Furious',
		description: "Brian O'Conner, back working for the FBI in Los Angeles, teams up with Dominic Toretto to bring down a heroin importer by infiltrating his operation.",
		genre: 'action',
		director: 'Justin Lin',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BYjQ1ZTMxNzgtZDcxOC00NWY5LTk3ZjAtYzRhMDhlNDZlOWEzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg',
		featured: 'false'
	},
	{	id: '8',
		title: 'Star Trek Beyond',
		description: "The crew of the USS Enterprise explores the furthest reaches of uncharted space, where they encounter a new ruthless enemy, who puts them, and everything the Federation stands for, to the test.",
		genre: 'Sci-Fi',
		director: 'Justin Lin',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BZDRiOGE5ZTctOWIxOS00MWQwLThlMDYtNWIwMDQwNzBjZDY1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg',
		featured: 'false'
	},
	{
		id: '9',
		title: 'Hobbs & Shaw',
		description: "Lawman Luke Hobbs (Dwayne Johnson) and outcast Deckard Shaw (Jason Statham) form an unlikely alliance when a cyber-genetically enhanced villain threatens the future of humanity.",
		genre: 'action',
		director: 'David Leitch',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BOTIzYmUyMmEtMWQzNC00YzExLTk3MzYtZTUzYjMyMmRiYzIwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SY1000_CR0,0,685,1000_AL_.jpg',
		featured: 'false'
	},
	{
		id: '10',
		title: 'The Hangover',
		description: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.",
		genre: 'comedy',
		director: 'Todd Phillips',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg',
		featured: 'false'
	},
];

//GET Request
app.get('/', function (req, res) {
	res.redirect('/index.html');
});

//--MOVIES--

// Get list of data about ALL Movies (GET)
app.get('/movies', function (req, res) {
	res.json(Movies);
  });

  //Get one movie by title
app.get('/movies/:title', (req, res) =>{
	res.json(Movies.find( (movie) => {
		return movie.title === req.params.title
	}));
});

//Add new movie to the list (POST)
app.post('/add_movie', (req, res) => {
	let newMovie = req.body;

	if (!newMovie.title) {
		const message = 'Missing name in request body';res.status(400).send(message);
	} else {
		newMovie.id = uuid.v4();//create unique ID
		Movies.push(newMovie);
		res.status(201).send(newMovie);
	}
});

// Delete a movie from the list
app.delete('/movies/:id', (req, res) => {
	let movie = Movies.find((movie) => {
		return movie.id == req.params.id
	});

	if (movie) {
		Movies.filter (function(obj) {
			return obj.id !== req.params.id
		});
		res.status(201).send('Movie' + movie.title + 'with id' + req.params.id + 'was deleted.')
	}
});

// --DIRECTORS--

//Get one director by name
app.get('/directors/:name', (req, res) => {
	res.json(Directors.find( (director) => {
		return director.name === req.params.name
	}));
});

//--GENRE--

//Get a list of ALL the genres
app.get('/genres', (req, res) => {
	res.json(Genre);
});

//Get one movie Genre
app.get('/genres/:name', (req, res) => {
	res.json(Genre.find( (genre) => {
		return genre.name === req.params.name
	}));
});

//--USERS--

//Adds a new user to the list of USERS.
app.post('/users', (req, res) => {
	let newUser = req.body;

	if(!newUser.name) {
		const message = 'Missing name in request body';
		res.status(400).send(message);
	} else {
		newUser.id = uuid.v4();//create unique ID
		Users.push(newUser);
		res.status(201).send(newUser);
	}
});

//Edit user information

app.put('/users/:id', (req, res) => {
	const requestId = req.params.id; //ID for the contact
	
	//filters the array for the specific contact object
	let contact = Users.filter(contact => { 
		return contact.id == requestId; 
	})[0];

	//get the index of where the contact is in array
	const index = Users.indexOf(contact);

	//look for a specific value to edit
	const keys = Object.keys(req.body);

	//sets the value of to new information
	keys.forEach(key => {
		contact[key] = req.body[key];
	});

	Users[index] = contact;
	
	res.json(Users[index]);
});

// Deletes a user from the list by ID
app.delete('/users/:id', (req, res) => {
	let user = Users.find((user) => { return user.id === req.params.id; });
  
	if (user) {
	  Users = Users.filter(function(obj) { return obj.id !== req.params.id; });
	  res.status(201).send('User ' + user.name + ' with id ' + req.params.id + ' was deleted.')
	}
  });
  
//--LIST OF FAVORITES--

//Add a favorite Movie to a User
app.post('/users/:id/movies/:movie_id', (req, res) => {
	let user = Users.find((user) => { return user.id === req.params.id; });
	let movie = Movies.find((movie) => { return movie.id === req.params.movie_id; });
  
	if (user && movie) {
	  user.favorites = [...new Set([...user.favorites, req.params.movie_id])];
	  res.status(201).send(user);
	} else if (!movie) {
	  res.status(404).send('Movie with id ' + req.params.movie_id + ' was not found.');
	} else {
	  res.status(404).send('User with id ' + req.params.id + ' was not found.');
	}
  });

  // Remove a favorite Movie from a User.
app.delete('/users/:id/movies/:movie_id', (req, res) => {
	let user = Users.find((user) => { return user.id === req.params.id; });
	let movie = Movies.find((movie) => { return movie.id === req.params.movie_id; });
  
	if (user && movie) {
	  user.favorites = user.favorites.filter((movie_id) => { return movie_id !== req.params.movie_id; });
	  res.status(201).send(user);
	} else if (!movie) {
	  res.status(404).send('Movie with id ' + req.params.movie_id + ' was not found.');
	} else {
	  res.status(404).send('User with id ' + req.params.id + ' was not found.');
	}
  });


//Error Handling in Express
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

//START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
