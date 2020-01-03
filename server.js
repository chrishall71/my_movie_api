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

	fs.appendFile('log.txt', 'url: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Added to log.");
		}
		
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write (data);
	response.end('Hello Node!\n');
		
	})

}).listen(8080);