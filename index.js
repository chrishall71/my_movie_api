const express = require('express');
const app = express();

var myLogger = (req, res, next) => {
	console.log(req.url);
	next();
};

var requestTime = (req, res, next)=>{
	req.requestTime = Date.now();
	next();
}

app.use(myLogger);
app.use(requestTime);
app.get('/', function (req, res){
	var responseText = 'Welcome to my app!';
	responseText += '<small> Requested at: ' + req.requestTime + '</small>';
	res.send(responseText);
});

app.get('/secreturl', (req, res)=>{
	var responseText = 'This is a secret site!';
	responseText += '<small> Requested at: ' + req.requestTime + '</small>';
	res.send(responseText);
});

app.listen(8080);