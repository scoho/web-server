var express = require('express');
var app = express();

// 3000 is good for testing on your computer
// process.enc.port is what heroku uses
var PORT = process.env.PORT || 3000;

var middleware = require('./middleware.js') // fetches code from middleware.js file

// / is the root url
// app.get corresponds to the http request method
// app.get('/', function (req, res) { // request and response
// 	res.send('hello Express'); // res.send specifies what to send back to the user
// });

// this will run every time a page is requested anywehre on the localhost port (i.e. it's global)
// if you want route-level middleware, specify it as the second argument in app.get, as below
// app.use(middleware.requireAuthentication);

app.use(middleware.logger) // global log

app.get('/about', middleware.requireAuthentication, function (req, res) {
	res.send('this is the about page');
});

// __dirname grabs the current working directory (that's two underscores at the beginning)
// console.log(__dirname); 

// lets us expose local folders to node/browser
// this will take us to the 'public' folder in the current directory, which will default to the localhost port if no root declared above
app.use(express.static(__dirname + '/public'));

// app.listen(port to listen on, optional terminal message to display)
// when you run this from the terminal, nothing seems to happen; go to http://localhost:3000/ in a browser to see it run
app.listen(PORT, function () {
	console.log('...Express server started on port ' + PORT + '...');
	console.log('............ctrl-c to cancel.............');
});