const http = require('http'),
	url = require('url'),
	fs = require('fs');

	//this creates new server
http.createServer((request, response) => {
	var addr = request.url,
		q = url.parse (addr, true),
		filePath = '';

		//checks for the documentation file
	if (q.pathname.includes('documentation')) {
		filePath = (__dirname + '/documentation.html');
	} else {
		filePath = 'index.html';
	}

	fs.appendFile('log.txt', 'url: ' + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Added to log.");
		}
		
	})

}).listen(8080);
